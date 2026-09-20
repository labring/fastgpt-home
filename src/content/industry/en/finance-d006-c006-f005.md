---
title: Multi-turn Dialogue and Prompt Engineering for TCM Investment Research Knowledge Base Construction
slug: /en/industry/finance-d006-c006-f005
page_type: Industry scenario page
article_section: Research Knowledge Base Governance
is_part_of: FastGPT Tech Center
meta_title: Multi-turn Dialogue and Prompt Engineering for TCM
meta_description: Core sources of TCM investment research data include the Pharmacopoeia of the People's Republic of China, National Medical Products Administration
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Multi-turn Dialogue and Prompt Engineering for TCM Investment Research Knowledge Base Construction

## Data Profile of This Category
Core sources of TCM investment research data include the Pharmacopoeia of the People's Republic of China, National Medical Products Administration approval documents, Chinese herbal pieces processing specifications, published clinical trial literature for marketed TCM products, and traditional Chinese medicine material market monitoring data.
Update frequency follows these rules: core pharmacopoeia standards are revised every 5 years, industry monitoring data is updated monthly, and clinical trial literature is released in real time as research progresses.
Document structure covers: single product nature, flavor, meridian tropism; functions and indications; dosage and administration; processing methods; compound compatibility plans; and industrial end planting, processing, and sales data.
Fields include fixed terminology and clear units: for example, dosage is measured in grams, and medical insurance classification is identified by category codes.

## Constraints for Multi-turn Dialogue and Prompt Engineering
TCM investment research data has fixed professional terminology and clear units. Multi-turn dialogue must maintain consistent terminology, and avoid arbitrary rewriting of professional vocabulary. Data from different sources must be used in distinct scenarios. For example, clinical trial data and industrial data must have clear boundaries during dialogue.
Multi-turn follow-up questions often involve continuous associations of dosage adjustments and compound compatibility. Sufficient context must be retained to link multi-field information. Additionally, new editions of the pharmacopoeia must be synchronized regularly to prevent use of outdated terminology or industry standards in dialogue.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `maxContext` | `12000–15000 characters` | Single TCM investment research documents have relatively long length, and multi-turn dialogue needs to retain sufficient context to link multi-field information such as nature, flavor, and dosage |
| `prompt_template` | `Please answer questions based on the provided TCM investment research knowledge base content, follow the terminology specifications of the Pharmacopoeia of the People's Republic of China, distinguish between clinical application and industrial data, and maintain unit consistency` | TCM data has strict requirements for terminology and units, and the scope and rules of responses must be clearly defined |
| `rerank_top_k` | `Top 6–8 results` | TCM investment research data includes multi-dimensional fields, and re-ranking can prioritize recall of multi-field matching results with the highest relevance |
| `similarity_threshold` | `0.72–0.78` | TCM terminology has near-synonym associations. A threshold that is too low will introduce irrelevant content, while a threshold that is too high will miss relevant documents |
| `chat_history_max_turns` | `8–10 turns` | TCM investment research multi-turn dialogue often involves continuous follow-up questions about compound compatibility and dosage adjustments. Excessive turns will lead to redundant context |
| `file_upload_max_size` | `500 MB` | TCM industrial data includes batch planting and processing reports, and single file volume is usually large |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material format, data volume, and business rules. Specific issues require targeted analysis, and it is recommended to test on your own samples before finalizing the configuration.

## Three Common Configuration Errors
- Issue: Dialogue responses include external reference content not present in the knowledge base, or use incorrect terminology that does not comply with the Pharmacopoeia of the People's Republic of China. Cause: The `prompt_template` does not explicitly limit responses to only use knowledge base documents, and context recall filtering rules are not enabled.
- Issue: The conversation opening does not display preset quick question buttons, and clicking preset questions fails to directly trigger the dialogue flow. Cause: The `chat_opening_quick_buttons` parameter is not configured correctly, or the custom conversation opening setting is not enabled.
- Issue: Uploading TCM industrial report files via the dialogue API fails, and a `413` status code is returned. Cause: The `file_upload_max_size` configuration value is smaller than the actual file size of the uploaded content, or API file upload permissions are not enabled.

## How to Confirm Proper Configuration
- Initiate continuous multi-turn follow-up questions related to nature, flavor, meridian tropism, and dosage compatibility, and verify that response content only uses TCM data from the knowledge base with no external irrelevant information.
- Check the conversation opening area to confirm that preset quick question options are present, and that clicking an option directly triggers the response flow for the corresponding question.
- Upload a file matching the typical volume of TCM investment research documents, and verify that the system can parse the file normally and link the file content in dialogue.
- Exit the current session and re-enter, and verify that historical conversation records load normally without requiring reinitialization of the dialogue context.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
