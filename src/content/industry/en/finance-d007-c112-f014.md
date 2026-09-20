---
title: Form and Interaction for White Goods Yield Rates
slug: /en/industry/finance-d007-c112-f014
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Form and Interaction for White Goods Yield Rates
meta_description: Data sources include public monitoring datasets from home appliance industry associations, official operating data disclosed by brands, and real-time
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Form and Interaction for White Goods Yield Rates

## What the Data for This Category Looks Like
Data sources include public monitoring datasets from home appliance industry associations, official operating data disclosed by brands, and real-time sales snapshots from mainstream e-commerce platforms.
Update frequencies vary by data type: offline retail data updates weekly, online channel sales data updates daily, and monthly operating data disclosed by brands updates monthly.
Documents use a standardized structured table format, with the following fields: product code, brand name, product model, terminal guide price, actual transaction price, and monthly shipment volume.
Field units follow these rules: price fields use RMB yuan, shipment and sales volume fields use units, and time dimension fields use natural days, weeks, or months.

## Constraints on Form and Interaction Workflows
Data sources with different update frequencies require forms to support flexible switching of time dimension options. This supports the generation of weekly, monthly, or daily yield rate daily reports.
Structured data with multiple fields requires forms to automatically match field units. This prevents format errors caused by manual unit input.
Rich product models and brand categories require form dropdown menus to support keyword search. This enables quick location of target white goods categories.
Data from multiple sources needs clear data source labels in interactions. This prevents confusion from different channel statistical standards.
Fixed format requirements for structured fields require form inputs to strictly match field types. For example, shipment volume only accepts positive integer values.

## Configuration Settings
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `knowledgeSearch` | Dynamically pass a knowledge base ID array | Adapt to recall needs for different data sources, support switching associated industry knowledge bases by white goods category, and meet the multi-source data integration requirements of yield rate daily reports |
| `recallTopK` | Top 8 entries | Balance recall accuracy and content length, adapt to the information recall volume of multiple categories and fields in white goods, and avoid overly long single-round output content |
| `similarityThreshold` | 0.75–0.85 | Filter low-relevance search results, ensure that recalled home appliance data matches the yield rate query topic, and improve the accuracy of daily reports |
| `formFieldUnitAutoMatch` | Enabled | Automatically match preset field units, avoid input format errors, and comply with field unit specifications for white goods data |
| `maxContext` | 1200 characters | Control the context length of single-round interaction, avoid exceeding the model's processing limit due to excessive field information, and ensure smooth interaction |
| `formKeywordSearch` | Enabled | Support keyword search by product code and model, adapt to the rich product classification of white goods, and improve form filling efficiency |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require specific analysis, and it is recommended to test on your own samples before finalizing.

## Three Common Misconfigurations
- Symptom: Knowledge base search node returns empty results, and the referenced document list has no content. Cause: The dynamically passed knowledge base ID does not follow the string array format required by FastGPT, causing the node to fail to recognize the associated knowledge base.
- Symptom: Price fields show empty values after form submission. Cause: The `formFieldUnitAutoMatch` configuration is not enabled, and the price value entered by the user includes the RMB unit, resulting in failure of structured field parsing.
- Symptom: An `unmarshal_resp` error code is returned when voice input triggers text conversion. Cause: No maximum duration limit is set for voice input, and an overly long audio stream exceeds the interface's parsing limit.

## How to Verify Successful Configuration
- Submit a test form, select any white goods category, and verify that the returned result includes the structured data fields corresponding to the category.
- Manually enter a price value with a unit to submit the form, and confirm that the field parses normally and displays correct content.
- Adjust the dynamically passed knowledge base ID parameter, and verify that search results update in response to parameter changes.
- Trigger voice input and record an audio clip of a duration suitable for the business scenario, and confirm that text conversion completes without errors and the content matches the input.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
