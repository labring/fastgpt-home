---
title: Sharing and Embedding of Solid Waste Treatment Yield Rates
slug: /en/industry/finance-d007-c046-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding of Solid Waste Treatment Yield Rates
meta_description: Solid waste treatment yield rate and market data is sourced from publicly available solid waste disposal market transaction data published by
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding of Solid Waste Treatment Yield Rates

## What this category’s data looks like
Solid waste treatment yield rate and market data is sourced from publicly available solid waste disposal market transaction data published by provincial ecological environment authorities, and aggregated public operation ledgers from licensed operating enterprises.
Data updates occur once per month, covering disposal business accounting results for the full current month.
Each data document includes fields such as project unique identifier, disposal material classification, accounting cycle, unit disposal service fee, unit operation cost, and unit net income.
All fee-related fields use yuan/ton as their unit. Net income-related fields use yuan/ton·accounting cycle as their unit.
No percentage-based indicators are included. Business revenue is presented using only absolute values.

## What constraints do these characteristics impose on sharing and embedding
The monthly update frequency of solid waste treatment yield rate data requires embedded components to support scheduled refreshes or user-initiated manual updates. This prevents display of outdated accounting results.
Data fields rely entirely on absolute values with unified units. Complete unit labels must be retained during embedding to avoid numerical ambiguity in business scenarios.
The variety of material classifications requires embedded components to support configuration options for filtering data by disposal type. This supports display needs for different segmented solid waste treatment scenarios.
The data traceability attribute requires the embedding function to include a display entry for the data source. This meets compliance display requirements.

## How to set configurations
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `share_enable` | `true` | Enables the sharing function to support embedding scenarios, and meets the need of publishing yield rate data externally |
| `share_anonymous_enable` | `true` | Most solid waste treatment data is publicly available and compliant industry data. No user login is required to view it, which matches the use case of login-free sharing |
| `share_refresh_interval` | `2592000 seconds` | Matches the monthly data update rhythm. This value is the number of seconds in 30 days, ensuring the update cycle of embedded content aligns with the data source |
| `share_show_source` | `true` | Meets data compliance display requirements, matches the traceability attribute of the data source, and allows viewers to clearly identify the data source channel |
| `share_filter_config` | `{"material_category": ["all"]}` | Adapts to scenarios with multiple material classifications for solid waste treatment. Displays all category data by default, and supports subsequent custom filter configuration |
| `share_iframe_domain_whitelist` | `["https://your-domain.com"]` | Restricts valid domains for iframe embedding, prevents unauthorized sites from embedding data, and improves content security |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- Issue: When accessing mini programs via iframe embedding code, a domain verification failure prompt appears, and content fails to load normally. Cause: The valid domain of the mini program was not configured in `share_iframe_domain_whitelist`, only the web-side domain was added, leading to failed cross-domain verification.
- Issue: Historical conversation records cannot be viewed on the login-free sharing page, but historical records can be queried in backend logs. Cause: In version 4.9.1, the `share_allow_history` configuration item was not enabled. Login-free scenarios do not load historical record caching by default, so the page cannot display past interactive content.
- Issue: After inserting login-free window code into a VUE project, the page fails to load the corresponding content, and cross-domain errors appear in the console. Cause: The sharing domain of FastGPT was not added to the project's cross-domain whitelist, or the `share_iframe_domain_whitelist` parameter was not configured correctly, leading to the browser blocking the cross-domain request.

## How to confirm successful configuration
- Visit the configured sharing link, check that the displayed fields include complete unit labels and match the field structure of the data source.
- Embed the iframe code on a site in the configured whitelist domain, verify that the page loads solid waste treatment yield rate data normally with no error prompts.
- Embed the iframe code on a test site not in the whitelist domain, verify that the page fails to load normally or displays a compliance prompt, confirming that the whitelist configuration is effective.
- After enabling login-free mode, access the sharing link, check that no login pop-up appears, and that data content can be viewed normally.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
