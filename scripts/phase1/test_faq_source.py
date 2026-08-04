#!/usr/bin/env python3
"""FAQ source validation and drift regression tests."""

from __future__ import annotations

import copy
import json
import os
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from validate_faq_source import EXPECTED_HEADERS, validate_faq_rows, write_baseline_report
from xlsx_reader import build_source_manifest


DATA_ROOT = Path(
    os.environ.get(
        "FASTGPT_W2_DATA_DIR",
        "/Users/longnv/bin/repo/fastgpt-data/W2-内容方向与首批内容-20260730",
    )
)
FAQ_WORKBOOK = DATA_ROOT / "FastGPT-精选规范FAQ-首批60条-V1.1-星触达-20260730.xlsx"


def source_manifest() -> dict:
    return build_source_manifest(FAQ_WORKBOOK, "FAQ Data", 1, 2, 61)


class FaqSourceValidationTests(unittest.TestCase):
    def test_locked_source_passes_and_retains_ten_fields(self) -> None:
        report = validate_faq_rows(source_manifest())
        self.assertEqual(report["status"], "passed")
        self.assertEqual(report["summary"], {"rows": 60, "categories": 14, "unique_slugs": 60, "invalid_slugs": 0, "missing_required_fields": 0})
        self.assertEqual(report["headers"], EXPECTED_HEADERS)
        self.assertEqual(list(report["rows"][0]["values"]), EXPECTED_HEADERS)

    def assert_blocked(self, mutate) -> dict:
        manifest = source_manifest()
        mutate(manifest)
        report = validate_faq_rows(manifest)
        self.assertEqual(report["status"], "blocked")
        self.assertTrue(report["errors"])
        return report

    def test_reordered_header_blocks(self) -> None:
        self.assert_blocked(lambda m: m["headers"].__setitem__(0, "question"))

    def test_missing_header_blocks(self) -> None:
        self.assert_blocked(lambda m: m["rows"][0]["values"].pop("事实来源"))

    def test_duplicate_slug_blocks(self) -> None:
        self.assert_blocked(lambda m: m["rows"][1]["values"].__setitem__("slug", m["rows"][0]["values"]["slug"]))

    def test_invalid_slug_blocks(self) -> None:
        self.assert_blocked(lambda m: m["rows"][0]["values"].__setitem__("slug", "Bad_Slug"))

    def test_non_contiguous_no_blocks(self) -> None:
        self.assert_blocked(lambda m: m["rows"][2]["values"].__setitem__("no", "99"))

    def test_empty_publish_field_blocks(self) -> None:
        self.assert_blocked(lambda m: m["rows"][0]["values"].__setitem__("description", ""))

    def test_category_count_blocks(self) -> None:
        self.assert_blocked(lambda m: m["rows"][0]["values"].__setitem__("category", "new-category"))

    def test_audit_field_change_is_detected_by_expected_digest(self) -> None:
        baseline = validate_faq_rows(source_manifest())
        changed = source_manifest()
        changed["rows"][0]["values"]["事实来源"] = "changed source"
        report = validate_faq_rows(changed, expected_report=baseline)
        self.assertEqual(report["status"], "blocked")
        self.assertIn("field-digest-drift", {error["code"] for error in report["errors"]})

    def test_source_fingerprint_blocks(self) -> None:
        self.assert_blocked(lambda m: m.__setitem__("source_sha256", "0" * 64))

    def test_generated_at_does_not_change_report_digest(self) -> None:
        first = validate_faq_rows(source_manifest())
        second = copy.deepcopy(first)
        second["generated_at"] = "2099-01-01T00:00:00Z"
        from validate_faq_source import _report_digest

        self.assertEqual(_report_digest(first), _report_digest(second))

    def test_write_baseline_report_round_trip(self) -> None:
        report = validate_faq_rows(source_manifest())
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "faq-source-baseline.json"
            write_baseline_report(report, output)
            loaded = json.loads(output.read_text(encoding="utf-8"))
        self.assertEqual(loaded["status"], "passed")
        self.assertEqual(loaded["summary"]["rows"], 60)
        self.assertEqual(loaded["headers"], EXPECTED_HEADERS)


if __name__ == "__main__":
    unittest.main()
