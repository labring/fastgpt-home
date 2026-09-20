---
title: Multi-turn Conversation and Prompting for Plastics and Rubber Financial Report Analysis
slug: /en/industry/finance-d014-c050-f005
page_type: Industry scenario page
article_section: Financial Statement Analysis and Reporting
is_part_of: FastGPT Tech Center
meta_title: Multi-turn Conversation and Prompting for Plastics and
meta_description: Plastics and rubber financial report data mainly comes from public annual reports of listed plastic and chemical enterprises, monthly statistical
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Multi-turn Conversation and Prompting for Plastics and Rubber Financial Report Analysis

## What the data for this category looks like
Plastics and rubber financial report data mainly comes from public annual reports of listed plastic and chemical enterprises, monthly statistical briefings from industry associations, and customs import and export declaration data. Annual reports update full prior-year data by April each year. Quarterly reports update within 1 month after the end of each quarter. Industry monthly data is published the following month.
Each document includes enterprise operation data tables, upstream and downstream industrial chain correlation data, and cost breakdown details. Core fields include product output, raw material procurement volume, production cost per ton, and import and export quantity. The corresponding units are thousand tons, ten thousand tons, yuan/ton, and ton respectively.

## What constraints these characteristics impose on multi-turn conversation and prompting
Data sources are scattered and have different update cycles. Multi-turn conversations require users to specify the data time range and data source type during the first query, to prevent calling expired or mismatched data.
Document structures are complex and field units vary. Prompts must include built-in category field mapping and unit conversion rules, to avoid unit confusion or field matching errors during conversations.
Single financial report documents are lengthy. The multi-turn conversation context window must have a reasonable threshold, to prevent redundant data from interfering with model output. The number of recalled associated data entries must also be limited, to avoid exceeding the model's processing limits.

## How to set the configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `maxContext` | `8000–12000 characters` | The core data section of a single plastics and rubber financial report is approximately 6000 characters. Multi-turn conversations need to retain 3 rounds of context, so this range covers core data and interaction content |
| `recall_top_k` | `Top 6–8 entries` | There are many data fields in plastics and rubber financial reports. This range balances recall accuracy and context length by recalling enough relevant data while avoiding redundancy |
| `prompt_template` | Fixed inclusion of "Please clearly specify the data time range and affiliated category (such as PE, styrene-butadiene rubber), and uniformly use thousand tons and yuan/ton as output units" | This category has many sub-categories and diverse field units. This rule unifies interaction logic and output format |
| `UPLOAD_FILE_MAX_SIZE` | `200 MB` | A single annual financial report PDF is approximately 150 MB. This value covers the upload requirements for complete financial report documents |
| `conversation_history_limit` | `First 5 rounds` | The redundancy of context increases after 5 rounds in multi-turn financial report analysis. This setting reduces the model's processing load |
| `PARSE_FILE_TIMEOUT_SECONDS` | `300 seconds` | Parsing large financial report documents takes a long time. This value avoids mid-parsing timeouts |

> The parameter values provided on this page are all common recommended starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing.

## Three common mistakes
- Phenomenon: When calling the `get_conversation_list` interface, setting the `offset` parameter results in a returned number of data entries that does not match expectations. Cause: The starting counting rule of the `offset` parameter for this interface is not clarified, and the `limit` parameter is not used to fix the number of returned entries.
- Phenomenon: The `question` and `answer` fields returned in the conversation history cannot be matched one-to-one. Cause: The `sort_by=create_time` parameter is not specified in the interface request, so the returned data is not sorted by interaction time.
- Phenomenon: The model cannot accurately obtain the content of each round of user questions during multi-turn conversations, or modified global variables do not take effect. Cause: The `conversation_history_limit` configuration is not set to retain enough conversation rounds, or the `update_global_variable` node is not configured to synchronize variables, and the prompt does not explicitly reference variables within the current conversation and historical questions.

## How to confirm the configuration is correct
- Initiate a single-round test query, specify quarterly data for a certain plastic category, and check whether the field units in the model output conform to the preset rules.
- Call the `get_conversation_list` interface, pass `offset=0` and `limit=5`, and check whether the number of returned conversations matches the parameters.
- Modify the global variable in the conversation, then initiate a new query, and check whether the model uses the updated variable value.
- Upload a single plastics and rubber financial report PDF, and check the matching degree between the parsed fields and the original document fields.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
