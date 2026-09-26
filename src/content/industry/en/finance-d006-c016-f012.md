---
title: Model Access and Configuration for Photovoltaic Investment Research Knowledge Base Construction
slug: /en/industry/finance-d006-c016-f012
page_type: Industry scenario page
article_section: Research Knowledge Base Governance
is_part_of: FastGPT Tech Center
meta_title: Model Access and Configuration for Photovoltaic Investment
meta_description: Photovoltaic investment research data primarily comes from public industry research reports, listed companies' periodic financial reports, third-party
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Model Access and Configuration for Photovoltaic Investment Research Knowledge Base Construction

## What the data for this category looks like
Photovoltaic investment research data primarily comes from public industry research reports, listed companies' periodic financial reports, third-party monitoring platforms for industrial chains, and public meteorological and grid operation data. Data update frequencies are divided into multiple tiers: industrial chain price and installation forecast data are updated daily or weekly, while financial reports and in-depth research reports are updated quarterly or monthly. Documents include structured tables (with fields such as installed capacity in GW, module cost in yuan per watt, etc.), long-form text analysis, original policy documents, and some documents contain multi-page linked industrial chain map data.

## What constraints do these characteristics impose on model access and configuration
Daily updated industrial chain data requires models to prioritize recalling the latest documents from the past 7 days, so the recall time range parameter must be configured. For multi-page linked industrial chain map documents, adjust the segment length parameter to avoid splitting cross-page associated content, and configure reranking rules to preserve the map's association logic. For structured fields with clear units, set a similarity threshold to filter redundant data without units, preventing the model from generating incorrect unit conversion results. For long-form in-depth research reports, adjust the maximum context parameter to support long document parsing, ensuring complete loading of core analysis content.

## How to set configurations
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `maxContext` | `8000–16000 characters` | Photovoltaic in-depth research reports often contain multi-page industrial chain data and long tables. This range can fully load the core content of a single document. |
| `Max knowledge base citations` | `Top 6–8 entries` | Photovoltaic industry data is scattered across multiple upstream and downstream documents. 6-8 entries can cover core industrial chain association information and avoid redundant recall. |
| `maxResponseTokens` | `3000–4000 characters` | Investment research replies need to include data comparisons and logical deductions. This range can support complete output of analysis content. |
| `Recall similarity threshold` | `0.72–0.80` | Photovoltaic industry terminology is highly professional. This threshold can filter low-relevance general documents and retain accurate industrial data. |
| `Custom Request URL` | `Match the model service provider's official interface documentation` | Some locally deployed or industry-specific models require access via a custom address. Configuration must strictly follow interface specifications. |
| `Channel Model Proxy Address` | `Configure only when network access restrictions exist` | When the deployment environment cannot directly access the model service provider's interface, forward requests via the proxy address. Must be used in conjunction with the custom request address. |

> The parameter values provided on this page are common recommended starting points for configuration setup. Actual values are influenced by document format, data volume, and business rules. Specific situations require individual analysis, and testing on local samples is recommended before finalizing settings.

## Three common configuration mistakes
- When testing a workflow, the AI reply will always include fixed prompt text at the end. This occurs when the default system prompt is not disabled in the model configuration. FastGPT v4.9.7 and later versions include this prompt content by default.
- After configuring a custom request address and proxy address, model calls fail with a 403 status code. This happens when the scope of action for the two address types is confused. The custom request address is the target address of the model interface, while the proxy address is the intermediate node for request forwarding, and the configuration logic for the two does not align.
- Unit errors appear in recalled photovoltaic data. This is caused by not configuring a reasonable recall similarity threshold, or splitting structured table fields with units via the document segment parameter, which prevents the model from recognizing the association between units and data values.

## How to confirm the configuration is complete
- Initiate a test query for a single photovoltaic in-depth research report, verify that the context loaded by the model includes complete tables and core analysis content, confirming that the context configuration adapts to the document length.
- Trigger a query related to industrial chain prices, verify that the update time of recalled documents matches the target data's update rhythm, confirming that the recall rule configuration is reasonable.
- View model call logs, verify that the request address and proxy address configuration complies with the service provider's interface specifications, confirming that the network request link is normal.
- Generate multiple investment research analysis replies, verify that no fixed prompt text appears at the end of the replies, confirming that the default system prompt has been disabled.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
