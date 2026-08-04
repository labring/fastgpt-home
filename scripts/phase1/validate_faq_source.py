#!/usr/bin/env python3
"""Validate and snapshot the locked W2 FAQ source workbook."""

from __future__ import annotations

import argparse
import copy
import hashlib
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Iterable

try:
    from xlsx_reader import XlsxReaderError, build_source_manifest
except ImportError:  # pragma: no cover - supports package-style imports
    from .xlsx_reader import XlsxReaderError, build_source_manifest


EXPECTED_HEADERS = [
    "slug",
    "no",
    "category",
    "question",
    "answer",
    "title",
    "description",
    "keywords",
    "事实来源",
    "待客户确认",
]
PUBLISH_FIELDS = EXPECTED_HEADERS[:8]
EXPECTED_SOURCE_SHA256 = "53a6f0d89f1ef2cd688e4c50dc7b59d69276a8ebb24e65f9979e0156e8a85547"
SLUG_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")


def _sha256(value: str) -> str:
    return hashlib.sha256(value.encode("utf-8")).hexdigest()


def _row_digest(values: dict[str, Any]) -> str:
    ordered = [str(values.get(field, "")) for field in EXPECTED_HEADERS]
    encoded = json.dumps(ordered, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
    return hashlib.sha256(encoded).hexdigest()


def _report_digest(report: dict[str, Any]) -> str:
    payload = {
        key: value
        for key, value in report.items()
        if key not in {"generated_at", "report_digest"}
    }
    return _sha256(json.dumps(payload, ensure_ascii=False, sort_keys=True, separators=(",", ":")))


def _error(code: str, message: str, **details: Any) -> dict[str, Any]:
    item: dict[str, Any] = {"code": code, "message": message}
    item.update(details)
    return item


def validate_faq_rows(
    manifest: dict[str, Any],
    *,
    expected_source_sha256: str = EXPECTED_SOURCE_SHA256,
    expected_report: dict[str, Any] | None = None,
) -> dict[str, Any]:
    """Validate a reader manifest without changing any source cell values."""

    errors: list[dict[str, Any]] = []
    headers = manifest.get("headers")
    if headers != EXPECTED_HEADERS:
        errors.append(
            _error(
                "header-schema",
                "FAQ Data headers must match the locked ten-column order",
                expected=EXPECTED_HEADERS,
                actual=headers,
            )
        )

    if manifest.get("sheet") not in (None, "FAQ Data"):
        errors.append(_error("sheet-name", "FAQ source must use the FAQ Data sheet"))
    if manifest.get("source_sha256") != expected_source_sha256:
        errors.append(
            _error(
                "source-fingerprint",
                "Source SHA-256 does not match the locked V1.1 workbook",
                expected=expected_source_sha256,
                actual=manifest.get("source_sha256"),
            )
        )

    rows = manifest.get("rows")
    if not isinstance(rows, list):
        rows = []
        errors.append(_error("rows-shape", "Manifest rows must be a list"))
    if len(rows) != 60:
        errors.append(_error("row-count", "FAQ Data must contain exactly 60 data rows", actual=len(rows)))
    if manifest.get("data_row_count") not in (None, len(rows)):
        errors.append(
            _error(
                "manifest-row-count",
                "Manifest data-row count does not match emitted rows",
                actual=manifest.get("data_row_count"),
                emitted=len(rows),
            )
        )

    slugs: list[str] = []
    numbers: list[int] = []
    categories: list[str] = []
    missing_required: list[dict[str, Any]] = []
    row_records: list[dict[str, Any]] = []
    seen_rows: set[int] = set()

    for index, row in enumerate(rows):
        source_row = row.get("source_row") if isinstance(row, dict) else None
        values = row.get("values") if isinstance(row, dict) else None
        if not isinstance(values, dict):
            values = {}
            errors.append(_error("row-shape", "Row values must be an object", index=index))
        if not isinstance(source_row, int) or source_row <= 0:
            errors.append(_error("source-row", "Each row must retain a positive source row number", index=index))
            source_row = index + 2
        if source_row in seen_rows:
            errors.append(_error("duplicate-source-row", "Source row numbers must be unique", source_row=source_row))
        seen_rows.add(source_row)

        if set(values) != set(EXPECTED_HEADERS) or list(values) != EXPECTED_HEADERS:
            errors.append(
                _error(
                    "row-schema",
                    "Each row must retain all ten fields in source order",
                    source_row=source_row,
                    actual=list(values),
                )
            )
        normalized_values = {field: values.get(field, "") for field in EXPECTED_HEADERS}
        slug = str(normalized_values["slug"])
        slugs.append(slug)
        if not SLUG_RE.fullmatch(slug):
            errors.append(_error("invalid-slug", "Slug does not match the lowercase hyphen contract", source_row=source_row, slug=slug))
        try:
            number = int(str(normalized_values["no"]))
        except (TypeError, ValueError):
            number = -1
            errors.append(_error("invalid-no", "FAQ no must be an integer", source_row=source_row))
        numbers.append(number)
        category = str(normalized_values["category"])
        categories.append(category)
        for field in PUBLISH_FIELDS:
            value = normalized_values[field]
            if value is None or not str(value).strip():
                missing_required.append({"source_row": source_row, "field": field})

        row_records.append(
            {
                "source_row": source_row,
                "values": normalized_values,
                "field_hashes": {field: _sha256(str(normalized_values[field])) for field in EXPECTED_HEADERS},
                "row_digest": _row_digest(normalized_values),
            }
        )

    if len(set(slugs)) != len(slugs):
        errors.append(_error("duplicate-slug", "FAQ slugs must be unique", unique_slugs=len(set(slugs))))
    if numbers != list(range(1, 61)):
        errors.append(_error("no-sequence", "FAQ no values must be the contiguous sequence 1..60", actual=numbers))
    if len(set(categories)) != 14:
        errors.append(_error("category-count", "FAQ source must contain exactly 14 categories", actual=len(set(categories))))
    if missing_required:
        errors.append(_error("missing-required-fields", "Publish fields must be non-empty", fields=missing_required))

    report: dict[str, Any] = {
        "status": "blocked" if errors else "passed",
        "source": {
            key: manifest.get(key)
            for key in (
                "workbook",
                "source_sha256",
                "source_bytes",
                "sheet",
                "header_row",
                "data_start_row",
                "data_end_row",
                "headers",
                "data_row_count",
                "canonical_digest",
            )
        },
        "headers": EXPECTED_HEADERS,
        "summary": {
            "rows": len(rows),
            "categories": len(set(categories)),
            "unique_slugs": len(set(slugs)),
            "invalid_slugs": sum(1 for slug in slugs if not SLUG_RE.fullmatch(slug)),
            "missing_required_fields": len(missing_required),
        },
        "rows": row_records,
        "errors": errors,
        "generated_at": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
    }
    if expected_report is not None:
        expected_digest = expected_report.get("report_digest")
        if expected_digest and _report_digest(report) != expected_digest:
            errors.append(_error("field-digest-drift", "FAQ canonical field digest differs from the expected baseline"))
            report["status"] = "blocked"
    report["report_digest"] = _report_digest(report)
    return report


def write_baseline_report(report: dict[str, Any], destination: str | Path) -> None:
    path = Path(destination)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def _parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--workbook", required=True)
    parser.add_argument("--sheet", default="FAQ Data")
    parser.add_argument("--write", required=True)
    parser.add_argument("--expected-report")
    return parser


def main(argv: Iterable[str] | None = None) -> int:
    args = _parser().parse_args(argv)
    try:
        manifest = build_source_manifest(args.workbook, args.sheet, 1, 2, 61)
        expected_report = None
        if args.expected_report:
            expected_report = json.loads(Path(args.expected_report).read_text(encoding="utf-8"))
        report = validate_faq_rows(manifest, expected_report=expected_report)
        write_baseline_report(report, args.write)
    except (OSError, ValueError, json.JSONDecodeError, XlsxReaderError) as exc:
        print(f"validate_faq_source: {exc}", file=sys.stderr)
        return 2
    if report["status"] != "passed":
        print(json.dumps(report, ensure_ascii=False, indent=2), file=sys.stderr)
        return 2
    print(json.dumps(report["summary"], ensure_ascii=False, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
