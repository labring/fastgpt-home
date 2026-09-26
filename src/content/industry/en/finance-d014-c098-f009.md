---
title: Citation Sources and Traceability for Coal Chemical Financial Report Analysis
slug: /en/industry/finance-d014-c098-f009
page_type: Industry scenario page
article_section: Financial Statement Analysis and Reporting
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Coal Chemical
meta_description: Financial report data for the coal chemical category mainly comes from periodic announcements of domestic and overseas listed companies, monthly
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Coal Chemical Financial Report Analysis

## What Data for Coal Chemical Financial Reports Looks Like
Financial report data for the coal chemical category mainly comes from periodic announcements of domestic and overseas listed companies, monthly monitoring data from industry associations, and third-party industry research reports. Update cycles follow quarterly and annual reports as fixed schedules. Temporary announcements such as capacity expansion and technical transformation information are released in real time as events occur. Document structure follows listed company disclosure regulations, including consolidated financial statements and main business breakdown data. Special fields include coal-to-olefin and coal-to-natural gas production capacity, unit product energy consumption, raw material procurement costs. Corresponding units are mostly ten thousand tons per year, kilograms of standard coal per ton of product, ten thousand yuan, and similar units.

## Constraints on Citation and Traceability
Coal chemical financial report data sources are scattered and have significant format differences. Traceability processes must support linking to multiple original source documents to avoid information bias from single data sources. Fixed-cycle periodic reports and real-time temporary announcements exist simultaneously. Recall logic must support configurable time ranges, and prioritize matching the most recently disclosed announcement content. Special business fields are mixed with general financial fields. Traceability processes must retain original document field labels to avoid cross-field information confusion. Long document structures require support for slice correlation. Traceability links must target specific paragraphs in the original document, not entire pages, to improve information accuracy.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| ---- | ---- | ---- |
| `Recall count` | `Top 6-8 entries` | Coal chemical financial reports have many special fields. Too many recalled entries will introduce irrelevant information, while too few will fail to cover core business data |
| `Similarity threshold` | `0.75-0.85` | Coal chemical financial reports use highly specialized terminology. A threshold that is too low will introduce irrelevant general industry data, while a threshold that is too high may miss precise special field content |
| `Chunk size` | `800-1200 characters` | Financial reports contain long paragraphs of financial details and business descriptions. This length preserves field correlation and avoids splitting that disrupts business logic |
| `PARSE_FILE_TIMEOUT_SECONDS` | `300 seconds` | Single coal chemical annual report files have large file sizes and long parsing times. Sufficient time must be reserved for slicing and indexing |
| `Citation Fragment Keep Original Format` | `Enabled` | Coal chemical financial reports include standardized financial tables and unit labels. Retaining the original format ensures information readability during traceability |
| `Rerank result count` | `Top 3-4 entries` | Core financial report data is concentrated in a small number of core announcements. Rearranged results can prioritize displaying the most relevant traceability content |

## Three Common Mistakes
- Phenomenon: When calling the knowledge base question answering API, the `reference` field in the returned result is empty, and no citation details are included. Cause: The knowledge base's return citation information switch is not enabled, or the `with_reference` parameter is not included in the API call.
- Phenomenon: No original file preview link for citation fragments is displayed in the terminal reply. Cause: The knowledge base's sliced original file association function is not configured, or the node to obtain original file details is not added to the workflow, making it impossible to associate slices with original documents.
- Phenomenon: A red numeric error is thrown during the citation process, usually status code `400` or `500`. Cause: When using OneAPI to forward the model, the correct model context length parameter is not configured in FastGPT, causing the model to fail to process long-text traceability requests, or the knowledge base parsing timed out before indexing was completed.

## How to Verify Correct Configuration
- Submit a single test question related to financial reports. Check whether the `reference` field is included in the API returned result, and whether the field contains the original document's file name, paragraph position, and content fragment.
- Submit a question in the terminal test page. Confirm whether a clickable citation source link is displayed below the reply, and whether clicking the link jumps to the corresponding position in the original document.
- Upload a coal chemical annual report test file. Wait for parsing to complete, then check the knowledge base's slice list. Confirm that each slice is labeled with the corresponding original document and paragraph range.
- When using OneAPI to forward the model, verify model connectivity on the FastGPT model configuration page. Confirm that there are no errors, then submit a test question. Check whether the citation process returns normally.

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require specific analysis. It is recommended to test on your own samples before finalizing settings.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
