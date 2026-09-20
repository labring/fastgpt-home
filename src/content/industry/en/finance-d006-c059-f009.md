---
title: Citation Source and Traceability for Industrial Metals Investment Research Knowledge Base Construction
slug: /en/industry/finance-d006-c059-f009
page_type: Industry scenario page
article_section: Research Knowledge Base Governance
is_part_of: FastGPT Tech Center
meta_title: Citation Source and Traceability for Industrial Metals
meta_description: Industrial metal-related data mainly comes from domestic sources including the Shanghai Futures Exchange and Shanghai Nonferrous Metals Network, as
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Source and Traceability for Industrial Metals Investment Research Knowledge Base Construction

## What Data for This Category Looks Like
Industrial metal-related data mainly comes from domestic sources including the Shanghai Futures Exchange and Shanghai Nonferrous Metals Network, as well as international sources including the London Metal Exchange, industry associations, and public reports from mining enterprises. Spot market data is updated daily, futures market data is pushed in real time, industry supply and demand reports are released weekly, monthly or quarterly, and corporate financial reports are updated quarterly.
Single price document fields include trading variety, delivery month, latest transaction price, price change range, trading volume, and open interest. Common units are yuan/ton, ten thousand tons, and lots. Industry supply and demand document fields include monthly output, import volume, apparent consumption, and ending inventory. Units are uniformly ten thousand tons or yuan/ton.

## What Constraints Do These Characteristics Impose on the Citation Source and Traceability Link
The high timeliness of industrial metal data requires that precise release timestamps be retained for traceability information, otherwise investment research conclusions cannot be verified. Data of the same category from multiple sources may have mixed units and different release times, so source institutions and unified units must be clearly marked during traceability to avoid citation ambiguity. Long supply and demand reports require precise positioning to specific paragraphs to avoid introducing irrelevant content. Real-time market data has a high update frequency, so minor time deviations must be allowed to avoid losing valid citations due to system time differences.

## Configuration Settings
| Configuration Item | Recommended Approach | Rationale |
| --- | --- | --- |
| `similarity_top_k` | Top 10-15 results | Industrial metal structured data has clear fields; too many recall results will introduce irrelevant data, while too few will fail to cover core investment research dimensions |
| `rerank_top_n` | Top 5 results | The correlation of industrial metal data varies significantly; retaining the top 5 after reranking balances accuracy and traceability loading efficiency |
| `context_window` | 8000-12000 characters | Industrial metal supply and demand reports are relatively long, so a sufficient window is required to accommodate complete citation paragraphs and full traceability information |
| `source_display_mode` | "Source institution + release timestamp + corresponding field" | Clearly mark data source, release time and specific fields to meet verification needs in investment research scenarios |
| `timestamp_match_threshold` | ±1 hour | Industrial metal real-time market data has a high update frequency; allowing a timestamp deviation within 1 hour avoids losing valid citations due to minor time differences |
| `unit_auto_fill` | Enabled | Industrial metal scenarios have mixed use of ton and ten thousand tons; automatic unit completion avoids citation ambiguity |

> The parameter values provided on this page are common recommendations used as a starting point for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require specific analysis, and it is recommended to test on your own samples before finalizing.

## Three Common Misconfigurations
- Phenomenon: Only the first retrieval node in the workflow returns traceability information, and subsequent nodes have no knowledge base citation content. Cause: The corresponding knowledge base global variable is not bound to subsequent retrieval nodes, or the variable mapping rules are not configured correctly, resulting in parameters not being assigned correctly.
- Phenomenon: A red error indicator appears next to the cited content. Cause: A reasonable timestamp matching threshold is not set, and the deviation between the release time of the cited data and the current system time exceeds the allowed range, triggering traceability verification failure.
- Phenomenon: The retrieval node cannot call the configured global `datasetid` variable. Cause: The global variable is not mapped to the knowledge base ID configuration item of the retrieval node during the parameter binding step of the workflow, resulting in the variable not being loaded correctly.

## How to Verify Correct Configuration
- Initiate a single query related to industrial metal market data, check whether the returned results include clear source institutions, release time and corresponding field information.
- Import industrial metal documents with multi-unit markings, and check whether the cited content is automatically completed with unified units after triggering retrieval.
- Test a workflow containing multiple retrieval nodes, confirm that each node can return the corresponding traceability information and knowledge base citation content.
- Adjust the timestamp matching threshold, verify whether cited data outside the deviation range is processed correctly.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
