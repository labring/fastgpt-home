---
title: FastGPT 4.16.2 List of Resolved Bug Fixes
slug: /en/deploy/fastgpt-4162-bug-fixes
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-16/4162
source_type: 官方文档
---

# FastGPT 4.16.2 List of Resolved Bug Fixes

## FastGPT 4.16.2 Bug Fix Overview
This document details all resolved bugs and stability improvements included in the FastGPT 4.16.2 self-hosted upgrade. All changes address reported issues across admin tools, dataset management, file parsing, workflow configurations, billing, and account operations.

## Admin, Billing & Account Fixes
This section covers fixes for admin portal functionality, billing, and account operations:
- Resolved avatar display errors in the admin Template Marketplace
- Fixed an issue preventing system tools from being reinstalled after uninstallation
- Addressed admin plan listing failures caused by plans associated with deleted teams
- Fixed account deletion verification mismatches caused by client-side re-resolved verification methods, and added tracking for deletion reminder status
- Fixed missing order IDs in the pending-invoice list
- Corrected inconsistent month formats in historical bills
- Addressed validation failures when historical invoices have no contact phone number

## XLSX Parsing Safeguard Updates
To prevent excessive memory usage from malformed XLSX files, three new enforcement parameters were added to the parsing pipeline:
| Parameter | Purpose |
|-----------|---------|
| Worksheet range limits | Restricts parsed data to valid cell ranges within worksheets |
| Merged cell limits | Blocks oversized merged cell structures from consuming excess memory |
| Worker memory limits | Caps memory usage per XLSX parsing worker process |
These safeguards activate automatically upon upgrading to FastGPT 4.16.2, no additional manual configuration is required.

## Dataset, Workflow & App Configuration Fixes
This section covers fixes for dataset handling, workflow tools, and application templates:
- Fixed CSV backup import failures for empty datasets or datasets with a single chunk
- Resolved compatibility issues with historical chat settings missing favorite tags or containing empty historical member names
- Fixed custom Workflow Tool avatar display, and added fallback avatars for system tools
- Addressed validation errors for historical Dataset chunk settings stored as numeric strings, and prevented sync requests before Dataset details finish loading
- Updated legacy workflow field handling to allow older App templates to load using the current application structure
- Fixed fuzzy file extension matching that incorrectly displayed DOC icons for Markdown files with DOCX-related text, added new document format icon mappings, and added a dedicated EPUB icon
- Resolved chat configuration validation failures for historical App Variables with empty or null `valueType`; FastGPT now derives `valueType` from the Variable input type during load and save, falls back to `any` for unmapable or invalid types, and runs Zod validation prior to saving. No additional cleanup script is required for existing datasets or applications.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/4-16/4162)
