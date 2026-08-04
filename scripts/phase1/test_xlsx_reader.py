#!/usr/bin/env python3
"""Regression tests for the locked W2 XLSX sources."""

from __future__ import annotations

import copy
import hashlib
import os
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from xlsx_reader import XlsxReaderError, build_source_manifest, canonical_digest


DATA_ROOT = Path(
    os.environ.get(
        "FASTGPT_W2_DATA_DIR",
        "/Users/longnv/bin/repo/fastgpt-data/W2-内容方向与首批内容-20260730",
    )
)
FAQ_WORKBOOK = DATA_ROOT / "FastGPT-精选规范FAQ-首批60条-V1.1-星触达-20260730.xlsx"
INVENTORY_WORKBOOK = (
    DATA_ROOT / "存量修复/FastGPT-存量FAQ分类重挂对照表-V1.1-星触达-20260730.xlsx"
)


class XlsxReaderTests(unittest.TestCase):
    def test_faq_sheet_shape_and_fingerprint(self) -> None:
        manifest = build_source_manifest(FAQ_WORKBOOK, "FAQ Data", 1, 2, 61)
        self.assertEqual(
            manifest["headers"],
            [
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
            ],
        )
        self.assertEqual(manifest["data_row_count"], 60)
        self.assertEqual(
            manifest["source_sha256"],
            "53a6f0d89f1ef2cd688e4c50dc7b59d69276a8ebb24e65f9979e0156e8a85547",
        )
        self.assertEqual(manifest["rows"][0]["source_row"], 2)
        self.assertEqual(manifest["rows"][0]["values"]["slug"], "private-deployment-data-boundary")
        self.assertEqual(manifest["rows"][0]["values"]["category"], "私有化部署")

    def test_inventory_sheet_shape_and_fingerprint(self) -> None:
        manifest = build_source_manifest(INVENTORY_WORKBOOK, "分类重挂对照表", 4, 5, 2004)
        self.assertEqual(
            manifest["headers"],
            ["序号", "原分类", "建议新分类", "置信度", "需人工复核", "问题（原文）", "线上 URL"],
        )
        self.assertEqual(manifest["data_row_count"], 2000)
        self.assertEqual(
            manifest["source_sha256"],
            "751a479680bfc987b9394c7429100d8f09269cc7ad8a698ff97b34415a6733b0",
        )
        self.assertEqual(manifest["rows"][0]["source_row"], 5)
        self.assertTrue(manifest["rows"][0]["values"]["线上 URL"])
        self.assertTrue(manifest["rows"][0]["values"]["问题（原文）"])

    def test_canonical_digest_ignores_generated_at(self) -> None:
        first = build_source_manifest(FAQ_WORKBOOK, "FAQ Data", 1, 2, 61)
        second = copy.deepcopy(first)
        second["generated_at"] = "2099-01-01T00:00:00Z"
        self.assertEqual(canonical_digest(first), canonical_digest(second))
        self.assertEqual(first["canonical_digest"], canonical_digest(first))

    def test_unknown_sheet_is_rejected(self) -> None:
        with self.assertRaisesRegex(XlsxReaderError, "Worksheet not found"):
            build_source_manifest(FAQ_WORKBOOK, "missing", 1, 2, 61)

    def test_row_outside_worksheet_is_rejected(self) -> None:
        with self.assertRaisesRegex(XlsxReaderError, "exceeds worksheet"):
            build_source_manifest(FAQ_WORKBOOK, "FAQ Data", 1, 2, 62)

    def test_source_hash_matches_file_bytes(self) -> None:
        expected = hashlib.sha256(FAQ_WORKBOOK.read_bytes()).hexdigest()
        manifest = build_source_manifest(FAQ_WORKBOOK, "FAQ Data", 1, 2, 61)
        self.assertEqual(manifest["source_sha256"], expected)


if __name__ == "__main__":
    unittest.main()
