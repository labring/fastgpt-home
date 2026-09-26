---
title: Form and Interaction for Traditional Chinese Medicine Yield Rates
slug: /en/industry/finance-d007-c006-f014
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Form and Interaction for Traditional Chinese Medicine Yield
meta_description: Professional industry market aggregation APIs provide TCM yield-related market data. Full data updates run at fixed times after each trading day
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Form and Interaction for Traditional Chinese Medicine Yield Rates

This page covers use cases for the traditional Chinese medicine (TCM) industry, focused on daily yield and market report broadcasts, within the form and interaction capability area.

## What the market data for this category looks like

Professional industry market aggregation APIs provide TCM yield-related market data. Full data updates run at fixed times after each trading day closes. Data is stored in structured format, with these fields: TCM variety ID, common variety name, daily settlement price, daily yield change value, associated sector code, update timestamp. Settlement price units vary by variety, including yuan per kilogram, yuan per box, yuan per tablet, and others. Yield change values are raw numbers without percentage notation. Each data entry corresponds to daily market information for one TCM variety, with no extra redundant fields.

## Constraints on form and interaction workflows

Structured multi-field TCM market data requires form components to support filtering rules configured via variety ID and associated sector code, to avoid loading irrelevant data. Different varieties have different settlement price units, so the interaction interface needs unit matching validation to prevent unit confusion during display or calculation. Fixed update rhythm requires scheduled trigger parameters in the interaction to align with the data source update time, to avoid pulling old data before updates complete. The numeric yield change value has no percentage notation, so the judge must adapt to the range judgment logic for raw values, and cannot directly use percentage thresholds for condition configuration. Multi-variety bulk data scenarios require form components to support batch selection of target varieties, and provide pagination controls to adapt to large numbers of entries.

## Configuration Settings

| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `globalVarBindType` | "Structured Knowledge Base" | TCM yield data uses structured fields, compatible with the structured retrieval mode of knowledge bases |
| `filterMaxItems` | "Top 20 items" | Each TCM market data entry has a large volume, limiting the number of items to avoid interface lag |
| `judgeNumberThreshold` | Calibrated via actual testing | The baseline range of TCM yield change values varies widely by variety, with no unified fixed threshold |
| `singleChatPromptTrigger` | "First conversation trigger" | Daily report broadcasts only need to load configuration at session start, to avoid repeated pop-up prompts that disrupt experience |
| `dataUpdateCheckInterval` | `3600 seconds` | TCM market data sources typically complete updates within one hour after each trading day closes, aligning with the update rhythm |
| `varConditionEnable` | "Enabled" | Filter conditions need to be configured based on variety ID and yield change value, to support multi-variety filtering needs |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require case-by-case analysis, and it is recommended to test on your own samples before finalizing settings.

## Three Common Configuration Mistakes

- Issue: After configuring `globalVarBindType` as "Structured Knowledge Base", the judge interface cannot load variable field options. Cause: `varConditionEnable` is not enabled, so the global variable condition configuration entry is not activated.
- Issue: Custom prompt text pops up multiple times in a single conversation. Cause: `singleChatPromptTrigger` is not set to "First conversation trigger", so the prompt logic triggers on every interaction.
- Issue: Pulled TCM market data is outdated. Cause: `dataUpdateCheckInterval` is not configured, or its value is smaller than the data source update interval, so the broadcast process triggers before new data is detected.

## How to Confirm Successful Configuration

- Access the global variable configuration interface, confirm that the binding type is set to "Structured Knowledge Base", `varConditionEnable` is enabled, and check if the judge interface can load variable fields.
- Initiate two or more test conversations, confirm that the custom prompt text is only displayed in the first session, with no repeated pop-ups in subsequent interactions.
- View the data pull record, confirm that the pulled timestamp matches the data source update rhythm, and verify the rationality of the update check interval configuration.
- Trigger a retrieval operation, confirm that the number of returned entries meets the display requirements of the business scenario, with no excessive redundant data loaded.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
