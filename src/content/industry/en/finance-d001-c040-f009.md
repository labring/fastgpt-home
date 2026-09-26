---
title: Citation Sources and Provenance for Beneficial Owner KYC
slug: /en/industry/finance-d001-c040-f009
page_type: Industry scenario page
article_section: KYC and AML Document Verification
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Provenance for Beneficial Owner KYC
meta_description: Beneficial owner KYC data primarily comes from equity registration information of administrative industry and commerce departments, regulatory
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Provenance for Beneficial Owner KYC

## What This Category of Data Looks Like
Beneficial owner KYC data primarily comes from equity registration information of administrative industry and commerce departments, regulatory verification materials submitted by financial institutions, and third-party equity penetration service documents.
Updates are synced in real time with industrial and commercial changes. Regulatory materials are updated quarterly.
Most documents use structured formats. Core fields include beneficial owner name, ID type and number, shareholding ratio, control relationship type, and affiliated enterprise name. Some documents include link information for equity hierarchy traceability.

## Constraints on Citation Sources and Provenance
The multi-source nature of beneficial owner data requires associating unique identifiers across different data sources during provenance, to avoid duplicate citation of the same entity information submitted by different organizations.
The high proportion of structured fields requires precise matching of field content during provenance, rather than relying on fuzzy matching of full text fragments, to ensure cited information fully corresponds to the verification target.
Differences in update schedules require carrying data update timestamps during provenance, to ensure cited information is the latest valid version.
Complex control relationship links require associating information for both beneficial owners and affiliated enterprises during provenance. Citing only a single entry fails to fully present the verification basis.

## Configuration Recommendations

| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `ragRecallTopK` | Top 3-5 entries | Beneficial owner data has precise structured fields. Excessive recall introduces irrelevant equity penetration entries, reducing provenance accuracy |
| `similarityThreshold` | 0.75-0.85 | Beneficial owner data has high structurality, with strict field matching requirements. A threshold that is too low introduces non-target entries |
| `contextWindowSize` | 800-1200 characters | The core field length of individual beneficial owner verification documents is concentrated. An overly long window mixes redundant information from affiliated enterprises |
| `sourceDisplayField` | `["document_source", "update_time", "shareholding_ratio"]` | Provenance requires clear data source type, update time, and shareholding ratio to meet regulatory verification traceability requirements |
| `enableSource` | Enabled | Ensure citation provenance information is returned during API calls or knowledge base question answering |
| `apiSourceReturnFields` | `["ultimate_beneficial_owner", "control_enterprise", "update_time"]` | Only return necessary provenance fields to reduce transmission overhead, while ensuring complete provenance information |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material format, data volume, and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Configuration Mistakes
- Phenomenon: After configuring `ragRecallTopK` to `10000`, the returned provenance entries include a large number of non-target affiliated enterprise information. Reason: Beneficial owner data has precise structured fields. An excessively high recall count introduces redundant entries unrelated to the core verification target, resulting in confusion during provenance.
- Phenomenon: After calling the API to obtain corpus, the AI response does not display citation sources. Reason: The `sourceDisplayField` parameter is not configured to specify the provenance fields to display, or the `enableSource` switch is not enabled.
- Phenomenon: Setting `similarityThreshold` to `0.4` fails to recall target beneficial owner entries. Reason: Beneficial owner data has strict field matching requirements. A threshold that is too low introduces a large number of irrelevant industrial and commercial registration entries, making it impossible to hit accurately matched verification data.

## How to Verify Proper Configuration
- Initiate a test call, check if the returned results include the fields specified by `sourceDisplayField`, to confirm that provenance information is displayed normally.
- Adjust `similarityThreshold` to the calibrated range, verify that the recalled results only include entries related to the target beneficial owner.
- Check the `update_time` field of the returned provenance entries, confirm that the cited information is the latest valid version.
- Review the running logs, confirm that the actual number of returned entries for `ragRecallTopK` matches the expected configuration.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
