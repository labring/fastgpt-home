---
title: Citation Sources and Traceability for Chemical Raw Materials Investment Research Knowledge Base Construction
slug: /en/industry/finance-d006-c032-f009
page_type: Industry scenario page
article_section: Research Knowledge Base Governance
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Chemical Raw Materials
meta_description: Data sources related to chemical raw materials include industry association public bulletins, annual reports of manufacturing enterprises, customs
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Chemical Raw Materials Investment Research Knowledge Base Construction

## What the Data for This Category Looks Like
Data sources related to chemical raw materials include industry association public bulletins, annual reports of manufacturing enterprises, customs import and export statistical documents, Material Safety Data Sheets (MSDS), and spot trading daily reports. Update frequencies vary: industry association data is updated quarterly, spot prices are updated daily, enterprise annual reports are updated annually, and MSDS documents are updated with national standard revisions.

Document structures mix structured parameter tables and long-text analysis paragraphs. Fields include unique CAS numbers, purity percentages, production capacity, unit prices, and more. Common units are tons/year, yuan/ton, and %.

## Constraints Imposed on the "Citation Sources and Traceability" Link
A high proportion of structured parameters requires precise matching of fields and units during traceability to avoid cross-category confusion. CAS numbers as unique identifiers can be used to quickly locate corresponding paragraphs, but the identifier must be displayed in traceability results to confirm parameter ownership.

Data sources with multiple update frequencies require traceability results to include document update times to avoid citing expired data. The mixed document structure of long text and structured content requires retaining field association relationships during segmentation, otherwise traceability cannot correspond to specific parameter sources.

## Configuration Settings
| Configuration Item | Recommended Value Range | Rationale |
| ---- | ---- | ---- |
| `Recall Count` | Top 8–12 entries | Chemical raw materials investment research documents mostly contain precise parameters. Too many recalls will introduce content from unrelated categories, while too few will fail to cover core investment research data |
| `Similarity Threshold` | 0.75–0.85 | Parameter descriptions for chemical raw materials are precise. A threshold that is too low will introduce documents from non-corresponding categories, while a threshold that is too high may miss valid traceability content |
| `Segment Length` | 600–1000 characters | Chemical raw material documents contain both structured table paragraphs and long-text analysis. This length can retain field association relationships while avoiding context breaks |
| `PARSE_FILE_TIMEOUT_SECONDS` | 120 seconds | Large chemical industry report documents take a long time to parse. This duration can cover the complete parsing process |
| `Citation Display Format` | Display document name + paragraph starting line number + CAS number | The core identifier for chemical raw materials is the CAS number. Combining it with the line number allows quick location of specific parameter content for traceability |
| `Reranked Return Count` | Top 5 entries | Only core traceability basis is required in investment research scenarios. Too many entries will interfere with reading and information verification |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require specific analysis, and testing should be conducted on respective samples before finalizing settings.

## Three Common Mistakes
- Phenomenon: The returned citation list only displays the document name, without marking specific paragraphs or CAS number identifiers. Cause: The `Citation Display Format` is not configured to include CAS numbers or line numbers, making it impossible to accurately locate the corresponding parameter source for chemical raw materials.
- Phenomenon: The knowledge base variable passed when calling the workflow does not take effect, and the knowledge base search node still uses the default configured knowledge base. Cause: The "Knowledge Base Source" of the knowledge base search node in the workflow is not correctly configured to use variable references, and the format of the variable transfer does not meet the interface requirements.
- Phenomenon: The order of the citation lists returned by the chat interface is inconsistent with the recall order, and some citations do not contain valid chemical raw material parameter information. Cause: The reranking function is enabled but the `Reranked Return Count` is not restricted, and recalled entries that do not match core fields are not filtered out.

## How to Confirm the Configuration Is Correct
- Upload a chemical raw material document containing CAS numbers and production capacity parameters, initiate an investment research query, and check whether the returned results include the document name, paragraph location, and CAS number identifiers.
- Call the workflow via API, pass the specified knowledge base ID as a variable, and verify whether the knowledge base search node calls the corresponding knowledge base instead of using the default configuration.
- Adjust the `Similarity Threshold` to 0.7 and 0.85, compare the differences in the returned citation lists, and confirm that the threshold configuration takes effect.
- View the document parsing log to confirm that the segmented content retains the association relationship of structured fields, and no field breaks occur.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
