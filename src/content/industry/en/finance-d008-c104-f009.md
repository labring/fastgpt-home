---
title: Citation Sources and Traceability for Glass Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c104-f009
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Glass Intelligent Due
meta_description: The data sources for glass intelligent due diligence reports mainly include batch factory inspection reports, supply chain traceability ledgers, and
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Glass Intelligent Due Diligence Reports

## What data looks like for this category
The data sources for glass intelligent due diligence reports mainly include batch factory inspection reports, supply chain traceability ledgers, and national building materials industry standard documents. Factory inspection reports are updated synchronously upon completion of each glass batch production. They include fields such as batch number, nominal thickness, light transmittance, and impact strength, with units of millimeters, percentage, and megapascals. The supply chain ledger records the circulation nodes of glass from the production plant to the project site. National building materials industry standard documents are updated every 1 to 2 years, and most are available in PDF or structured table formats.

## What constraints do these characteristics impose on the citation sources and traceability link
Glass products have unique batch identification. This requires the citation traceability link to bind to the inspection report and ledger of the corresponding batch. General keywords cannot complete matching.
Multi-field detection data uses fixed units. Recall must match both the field name and unit. Accurate source location fails otherwise.
Supply chain circulation has multiple nodes. Traceability must link documents from production, transportation, acceptance and other links. This adds complexity to the recall scope.
Industry standard documents update frequently. The traceability link must verify document versions to avoid citing outdated content.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
| ---- | ---- | ---- |
| `recall count` | `6–10 results` | Glass inspection reports and ledger documents have rich content, which needs to cover multi-link sources to avoid missing key traceability information |
| `similarity threshold` | `0.72–0.88` | Glass has many fields and strict unit requirements, which requires balancing recall accuracy and coverage to avoid mistakenly recalling documents from non-corresponding batches |
| `PARSE_FILE_TIMEOUT_SECONDS` | `240–360 seconds` | Most glass inspection reports are multi-page structured documents with long parsing time, so sufficient parsing time must be reserved |
| `chunk length` | `700–1300 characters` | Glass inspection data fields are compact. Too long chunks will lose field association information, while too short chunks will increase recall redundancy |
| `version verification switch` | `Enabled` | Glass industry standards are updated frequently, so it is necessary to verify the version number of cited documents to ensure that currently valid standards are used |
| `citation source field whitelist` | `batch number, detection parameters, circulation nodes` | Reduce redundant information in traceability display and focus on core traceability fields for glass due diligence |

> The parameter values provided on this page are common starting points for configuration setup. Actual values are affected by material form, data volume and business rules. Specific issues require specific analysis. It is recommended to test on relevant samples before finalizing settings.

## Three common configuration mistakes
- Symptom: Citation source links displayed in the interface cannot be downloaded, returning a 404 error. Cause: Local file storage path or cloud storage permission is not configured. Structured files of glass inspection reports are not correctly synchronized to an accessible directory.
- Symptom: Some fields are missing from the citation source list when parsing multi-page glass inspection reports in version 4.8.22. Cause: The structured parsing plugin in this version has compatibility issues with multi-page table field extraction. Upgrade the parsing plugin version to resolve the issue.
- Symptom: Recall results include glass inspection reports from non-corresponding batches. Cause: Similarity threshold is set too low, or batch number is not bound as a recall filter condition. This leads to mistakenly recalling documents from other batches.

## How to confirm the configuration is set correctly
- Upload a single batch of glass inspection reports and the corresponding supply chain ledger. Trigger due diligence question answering, and check if returned citation sources include documents and circulation node information for the corresponding batch.
- Call the API interface for obtaining citation sources. Check if returned fields include preset core glass traceability fields, with no missing or redundant content.
- Simulate an industry standard version update. Upload new and old version standard documents, and verify if the traceability link automatically filters old version documents and only displays currently valid versions.
- Adjust the similarity threshold. Observe the batch matching accuracy of recall results, and confirm it meets business requirements for traceability accuracy.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
