#!/usr/bin/env python3
"""Small, deterministic XLSX worksheet reader for W2 audit inputs.

The reader deliberately works on the XLSX package directly.  It preserves the
text stored in worksheet cells and does not apply spreadsheet formatting or
business-specific transformations.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import posixpath
import re
import sys
import zipfile
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Iterable
from xml.etree import ElementTree as ET


MAIN_NS = "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
REL_NS = "http://schemas.openxmlformats.org/package/2006/relationships"
OFFICE_REL_NS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
NS = {"main": MAIN_NS, "rel": OFFICE_REL_NS, "pkgrel": REL_NS}
CELL_REF_RE = re.compile(r"^([A-Za-z]+)([0-9]+)$")


class XlsxReaderError(ValueError):
    """Raised when a requested worksheet or row boundary is invalid."""


def _column_index(reference: str) -> int:
    match = CELL_REF_RE.match(reference)
    if not match:
        raise XlsxReaderError(f"Invalid cell reference: {reference}")
    index = 0
    for letter in match.group(1).upper():
        index = index * 26 + ord(letter) - ord("A") + 1
    return index


def _read_xml(archive: zipfile.ZipFile, member: str) -> ET.Element:
    try:
        return ET.fromstring(archive.read(member))
    except KeyError as exc:
        raise XlsxReaderError(f"Missing XLSX member: {member}") from exc
    except ET.ParseError as exc:
        raise XlsxReaderError(f"Malformed XML member: {member}") from exc


def _normalise_target(target: str, base: str = "xl") -> str:
    target = target.replace("\\", "/")
    if target.startswith("/"):
        return target.lstrip("/")
    return posixpath.normpath(posixpath.join(base, target))


def _worksheet_member(archive: zipfile.ZipFile, sheet_name: str) -> str:
    workbook = _read_xml(archive, "xl/workbook.xml")
    relationships = _read_xml(archive, "xl/_rels/workbook.xml.rels")
    relationship_map: dict[str, str] = {}
    for relation in relationships.findall("pkgrel:Relationship", NS):
        relation_id = relation.attrib.get("Id")
        target = relation.attrib.get("Target")
        relation_type = relation.attrib.get("Type", "")
        if relation_id and target and relation_type.endswith("/worksheet"):
            relationship_map[relation_id] = _normalise_target(target)

    for sheet in workbook.findall("main:sheets/main:sheet", NS):
        if sheet.attrib.get("name") != sheet_name:
            continue
        relation_id = sheet.attrib.get(f"{{{OFFICE_REL_NS}}}id")
        if not relation_id or relation_id not in relationship_map:
            raise XlsxReaderError(
                f"Worksheet {sheet_name!r} has no valid worksheet relationship"
            )
        member = relationship_map[relation_id]
        if member not in archive.namelist():
            raise XlsxReaderError(f"Worksheet relationship target is missing: {member}")
        return member

    raise XlsxReaderError(f"Worksheet not found: {sheet_name}")


def _shared_strings(archive: zipfile.ZipFile) -> list[str]:
    if "xl/sharedStrings.xml" not in archive.namelist():
        return []
    root = _read_xml(archive, "xl/sharedStrings.xml")
    values: list[str] = []
    for item in root.findall("main:si", NS):
        values.append("".join(text.text or "" for text in item.findall(".//main:t", NS)))
    return values


def _cell_value(cell: ET.Element, shared_strings: list[str]) -> str:
    cell_type = cell.attrib.get("t")
    if cell_type == "inlineStr":
        return "".join(text.text or "" for text in cell.findall(".//main:t", NS))

    value = cell.find("main:v", NS)
    raw = "" if value is None or value.text is None else value.text
    if cell_type == "s":
        try:
            return shared_strings[int(raw)]
        except (IndexError, ValueError) as exc:
            raise XlsxReaderError(f"Invalid shared string index: {raw}") from exc
    if cell_type == "b":
        return "TRUE" if raw == "1" else "FALSE" if raw == "0" else raw
    return raw


def _worksheet_rows(root: ET.Element, shared_strings: list[str]) -> tuple[dict[int, dict[int, str]], int]:
    rows: dict[int, dict[int, str]] = {}
    max_row = 0
    for row in root.findall("main:sheetData/main:row", NS):
        row_number_text = row.attrib.get("r")
        if not row_number_text:
            raise XlsxReaderError("Worksheet row is missing its source row number")
        try:
            row_number = int(row_number_text)
        except ValueError as exc:
            raise XlsxReaderError(f"Invalid worksheet row number: {row_number_text}") from exc
        if row_number <= 0:
            raise XlsxReaderError(f"Invalid worksheet row number: {row_number}")
        values: dict[int, str] = {}
        for cell in row.findall("main:c", NS):
            reference = cell.attrib.get("r")
            if not reference:
                raise XlsxReaderError(f"Cell in row {row_number} is missing its reference")
            match = CELL_REF_RE.match(reference)
            if not match or int(match.group(2)) != row_number:
                raise XlsxReaderError(f"Cell reference does not belong to row {row_number}: {reference}")
            values[_column_index(reference)] = _cell_value(cell, shared_strings)
        rows[row_number] = values
        max_row = max(max_row, row_number)

    dimension = root.find("main:dimension", NS)
    if dimension is not None:
        ref = dimension.attrib.get("ref", "")
        end_match = re.search(r"[A-Za-z]+([0-9]+)$", ref)
        if end_match:
            max_row = max(max_row, int(end_match.group(1)))
    return rows, max_row


def _canonical_payload(manifest: dict[str, Any]) -> dict[str, Any]:
    return {
        key: value
        for key, value in manifest.items()
        if key not in {"generated_at", "canonical_digest"}
    }


def canonical_digest(manifest: dict[str, Any]) -> str:
    payload = json.dumps(
        _canonical_payload(manifest), ensure_ascii=False, sort_keys=True, separators=(",", ":")
    ).encode("utf-8")
    return hashlib.sha256(payload).hexdigest()


def read_sheet(
    workbook: str | Path,
    sheet_name: str,
    header_row: int,
    data_start_row: int,
    data_end_row: int,
) -> dict[str, Any]:
    """Read one worksheet range while retaining original row and header order."""

    if header_row <= 0 or data_start_row <= 0 or data_end_row < data_start_row:
        raise XlsxReaderError("Invalid worksheet row range")
    path = Path(workbook)
    if not path.is_file():
        raise XlsxReaderError(f"Workbook not found: {path}")

    try:
        with zipfile.ZipFile(path) as archive:
            member = _worksheet_member(archive, sheet_name)
            root = _read_xml(archive, member)
            shared_strings = _shared_strings(archive)
            rows, max_row = _worksheet_rows(root, shared_strings)
    except zipfile.BadZipFile as exc:
        raise XlsxReaderError(f"Malformed XLSX ZIP package: {path}") from exc

    if header_row > max_row or data_end_row > max_row:
        raise XlsxReaderError(
            f"Requested row range {header_row}:{data_end_row} exceeds worksheet maximum row {max_row}"
        )
    if header_row not in rows:
        raise XlsxReaderError(f"Header row is missing: {header_row}")

    header_cells = rows[header_row]
    if not header_cells:
        raise XlsxReaderError(f"Header row is empty: {header_row}")
    max_column = max(header_cells)
    headers = [header_cells.get(index, "") for index in range(1, max_column + 1)]
    if any(not header for header in headers):
        raise XlsxReaderError("Header row contains an empty column name")
    if len(set(headers)) != len(headers):
        raise XlsxReaderError("Header row contains duplicate column names")

    output_rows: list[dict[str, Any]] = []
    for row_number in range(data_start_row, data_end_row + 1):
        cells = rows.get(row_number, {})
        output_rows.append(
            {
                "source_row": row_number,
                "values": {header: cells.get(index, "") for index, header in enumerate(headers, 1)},
            }
        )
    return {"headers": headers, "rows": output_rows, "max_row": max_row}


def build_source_manifest(
    workbook: str | Path,
    sheet_name: str,
    header_row: int,
    data_start_row: int,
    data_end_row: int,
) -> dict[str, Any]:
    """Read a sheet and add immutable source provenance and a stable digest."""

    path = Path(workbook)
    sheet = read_sheet(path, sheet_name, header_row, data_start_row, data_end_row)
    manifest: dict[str, Any] = {
        "workbook": str(path),
        "source_sha256": hashlib.sha256(path.read_bytes()).hexdigest(),
        "source_bytes": path.stat().st_size,
        "sheet": sheet_name,
        "header_row": header_row,
        "data_start_row": data_start_row,
        "data_end_row": data_end_row,
        "headers": sheet["headers"],
        "rows": sheet["rows"],
        "data_row_count": len(sheet["rows"]),
        "generated_at": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
    }
    manifest["canonical_digest"] = canonical_digest(manifest)
    return manifest


def _parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--workbook", required=True)
    parser.add_argument("--sheet", required=True)
    parser.add_argument("--header-row", required=True, type=int)
    parser.add_argument("--data-start-row", required=True, type=int)
    parser.add_argument("--data-end-row", required=True, type=int)
    return parser


def main(argv: Iterable[str] | None = None) -> int:
    args = _parser().parse_args(argv)
    try:
        manifest = build_source_manifest(
            args.workbook,
            args.sheet,
            args.header_row,
            args.data_start_row,
            args.data_end_row,
        )
    except (OSError, XlsxReaderError) as exc:
        print(f"xlsx_reader: {exc}", file=sys.stderr)
        return 2
    json.dump(manifest, sys.stdout, ensure_ascii=False, indent=2)
    sys.stdout.write("\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
