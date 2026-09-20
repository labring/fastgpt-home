---
title: Tool Calling and Plugins for Traditional Chinese Medicine Financial Report Analysis
slug: /en/industry/finance-d014-c006-f008
page_type: Industry scenario page
article_section: Financial Statement Analysis and Reporting
is_part_of: FastGPT Tech Center
meta_title: Tool Calling and Plugins for Traditional Chinese Medicine
meta_description: Traditional Chinese medicine (TCM) enterprise financial report data primarily comes from periodic reports and temporary announcements disclosed by
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Tool Calling and Plugins for Traditional Chinese Medicine Financial Report Analysis

## What the Data for This Category Looks Like
Traditional Chinese medicine (TCM) enterprise financial report data primarily comes from periodic reports and temporary announcements disclosed by domestic stock exchanges, as well as annual operating data publicly available on corporate investor relations sections. Update schedules follow A-share disclosure rules: annual reports are released by the end of April of the following year, semi-annual reports by the end of August, quarterly reports within one month after the quarter concludes, and temporary announcements are updated immediately for major events. Most financial report PDF documents range from 100 to 300 pages. The main body includes revenue composition, R&D investment, and production capacity data. The notes section details specific fields such as the unit price of Chinese medicinal material purchases (unit: yuan/kilogram), decoction piece production capacity (unit: ton), and core product sales revenue (unit: ten thousand yuan). Some enterprises also disclose operating data for GAP cultivation bases.

## Constraints on Tool Calling and Plugins from Data Characteristics
The unique data traits of TCM financial reports create multiple constraints for the tool calling and plugins workflow. Long documents and scattered detailed sub-fields require parsing plugins to support complex table extraction and precise field positioning, to avoid missing core data such as Chinese medicinal material purchases and production capacity. Fixed-cycle periodic reports and real-time updated temporary announcements require calling interfaces to support batch parsing and low-latency responses, adapting to file processing needs across different disclosure schedules. Unique fields such as GAP cultivation base operating data and formula granule revenue proportion require plugins to support custom field mapping rules, adapting to data analysis logic for non-standard financial reports. The units of some detailed sub-fields are yuan/kilogram or ton, so unit verification and conversion logic must be built into the tool calling chain to ensure accurate data calculations.

## Configuration Settings
| Configuration Item | Recommended Setting | Rationale |
|---|---|---|
| `PARSE_FILE_TIMEOUT_SECONDS` | `900 seconds` | Most TCM enterprise financial report PDFs are 100–300 pages long with complex note tables; 900 seconds covers the full parsing process |
| `UPLOAD_FILE_MAX_SIZE` | `2000 MB` | Annual report PDFs for large TCM enterprises can exceed 1000 MB; this setting reserves sufficient space for multiple financial report files |
| `pdf_marker_version` | `v2.1.0` | Version v2.1.0 fixes compatibility issues with complex multi-column table parsing, adapts to the table structure of TCM financial report notes, and has been verified by the community for stable use of the `/v2/parse/file` interface |
| `custom_field_mapping` | `Match Chinese medicinal material and production capacity fields by financial report note chapters` | Core detailed sub-fields for TCM financial reports are concentrated in specific chapters of the notes; custom mapping improves data extraction accuracy |
| `plugin_request_retry_count` | `3 retries` | Network fluctuations may occur when parsing large files or temporary announcements; retries reduce call failure rates |
| `markdown_docx_convert_template` | `Use a dedicated TCM financial report formatting template` | TCM financial reports follow fixed disclosure formats; dedicated templates optimize post-conversion formatting and avoid layout chaos |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis, and testing on internal samples is recommended before finalizing settings.

## Three Common Misconfigurations
- Calling the `/v2/parse/file` interface returns a 404 error, or no note table data is returned after parsing. This occurs when the pdf-marker plugin is not using version v2.1.0 or higher. Older versions do not expose this interface and cannot adapt to the multi-column table structure of TCM financial reports.
- After converting Markdown-formatted financial report parsing results to DOCX, tables are misaligned and paragraph formatting is chaotic. This happens when a dedicated TCM financial report conversion template is not configured; generic templates cannot adapt to the multi-chapter, complex table layout requirements of financial reports.
- Model configuration for a new application overwrites the API key of an existing application, causing failed calls for the existing application. This occurs when the configuration to bind exclusive keys per application is not enabled; global key configurations will be overwritten by new configuration items.

## How to Verify Successful Configuration
- Upload a test annual report PDF for a TCM enterprise, check if the parsed text includes core fields such as Chinese medicinal material purchase unit price and production capacity, and verify that field units match the original financial report.
- Call the `/v2/parse/file` interface, check if the returned JSON data includes table parsing results, and confirm that the plugin version is v2.1.0 or higher.
- Configure exclusive API keys for two different applications, test calling the model interface, and confirm that neither key is overwritten by the other.
- Generate Markdown-formatted financial report parsing results, use the configured dedicated template to convert to DOCX, and check if table and paragraph layouts conform to the disclosure format of TCM financial reports.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
