---
title: Multi-turn Dialogue and Prompt Engineering for Optical Module Yield Rates
slug: /en/industry/finance-d007-c018-f005
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Multi-turn Dialogue and Prompt Engineering for Optical
meta_description: Data sources for optical module yield rate-related data cover secondary market quotes for optical module segment products, supply chain shipment and
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Multi-turn Dialogue and Prompt Engineering for Optical Module Yield Rates

## What the data for this category looks like
Data sources for optical module yield rate-related data cover secondary market quotes for optical module segment products, supply chain shipment and unit price monitoring information. Update schedule: secondary market closing prices and fluctuations are synced daily after market close. Supply chain data is updated weekly. Each data entry includes fields such as product model, ex-factory unit price, quarterly shipment volume, daily trading closing price, and valuation multiple. Unit specifications: ex-factory unit price is RMB per piece, shipment volume is ten thousand pieces, closing price is RMB, and valuation multiple is times.

## What constraints do these characteristics impose on multi-turn dialogue and prompt engineering
The different update frequencies of optical module data require clear differentiation between real-time quotes and weekly supply chain data call logic in multi-turn dialogue. Prompts must preset trigger conditions and call scopes for both data types. The structure where multiple fields have dedicated units requires prompts to force the model to attach corresponding units when returning results, to avoid unit confusion across product categories. The detailed product model filtering requirement means multi-turn dialogue must support passing context for additional product model screening. Prompts must include automatic extraction rules for product model parameters, to carry over screening conditions from the previous conversation. The large number of fields per data entry requires prompts to limit the model to only call user-specified fields, to avoid returning irrelevant information.

## How to set the configurations
| Configuration Item | Recommended Value | Rationale |
|---|---|---|
| `maxContext` | `8000–12000 characters` | Optical module multi-turn dialogue needs to retain key screening context such as product model and time range, to avoid losing core parameters |
| `recallTopK` | `Top 6–8 entries` | Optical module has many segment models. Too many recalled entries will cause context redundancy, too few will fail to cover target data |
| `chunkSize` | `1000–1500 characters` | Matches the length of single optical module data entries, to avoid splitting key field combinations or reducing retrieval accuracy |
| `knowledgeBaseUpdateCycle` | Configure dual cycles based on data source type | Matches the update rhythm of optical module real-time quotes (daily) and supply chain data (weekly) |
| `referenceCheck` | Enabled | Force the model to verify whether reply content comes from the retrieved knowledge base, to avoid ungrounded generated content |
| `maxTokenPerReply` | `2000 tokens` | Ensure complete return of multi-field optical module data, without exceeding the context limit of a single reply |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Mistakes
- Phenomenon: After adjusting the `recallTopK` or `maxContext` parameters, the model reply does not reference retrieved knowledge base content. Cause: The prompt does not explicitly require the model to prioritize retrieved content, or the `referenceCheck` parameter is not enabled to verify the source of citations.
- Phenomenon: After the user adds optical module model filtering in a multi-turn dialogue, the model still returns data for other models. Cause: The `maxContext` parameter is set too small, causing the model to lose the previous round's screening context, or the prompt does not retain context transfer rules.
- Phenomenon: After uploading an image containing optical module industry data, the conversation interface fails to display the image content. Cause: The `imageParseEnabled` configuration item is not enabled, or the uploaded image format does not match the types supported by the platform.

## How to Confirm Correct Configuration
- Initiate a multi-turn dialogue that includes optical module model and time range, check whether the model reply includes the user-specified fields and their corresponding units.
- Call the prompt templates for real-time quotes and weekly supply chain data separately, check whether the data update rhythm in the model's reply matches the cycle of the corresponding data source.
- Adjust the number of recalled entries parameter, check whether the number of content entries in the model's reply changes correspondingly with the parameter adjustment.
- Upload an image document containing optical module industry data, check whether the conversation interface displays the image content normally.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
