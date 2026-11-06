---
title: Citations and Source Traceability for Vocational School Student Internships: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c030-f010
page_type: 行业问题页
application_area: education
meta_title: Student Internships | Citations | Versions
meta_description: Student Internships: review citations for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Vocational School Student Internships: Maintain Document Versions and Changes

## What this category's data looks like

Vocational school student internship management materials revolve around three categories: internship agreements, internship plans, and internship logs. Internship agreements carry the three-party rights and responsibilities, position name, start and end dates, and signatures and seals; internship plans carry the batch, number of positions, rotation arrangements, and supervising teachers; internship logs carry daily or weekly records, dates, signatures, and receipts. When these three categories of materials enter the knowledge base retrieval node, each serves as a quotable original text passage, taking on the role of source identification and fragment traceback. In terms of update cadence, agreements change with batch or position adjustments, plans change with teaching arrangement adjustments, and logs are continuously added by period. Field characteristics are concentrated in four categories: name, quantity, date, and signature. The same record across materials often shows situations such as inconsistent name spellings, different quantity calibers, dates differing by one day, and missing signatures or receipts. The version ledger and change records need, after these fragments are cited, to be compared field by field by subsequent steps, with version numbers and change reasons registered, before deciding whether to update the knowledge base or external documents.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text fragment and a source identifier, and the length can be 0. Even if no content is found, the output chain still runs through. The version ledger and change records are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Internship agreement | Fields, dates, and signatures: whether the position name, start and end dates, and three-party signatures and seals are complete, and whether they match the batch and number of positions in the internship plan | Locate the original agreement passage in the cited fragments, open the citation marker to compare against the source document, and check the name, quantity, date, and signature item by item; record the number of citations in `responseData` (non-streaming module results returned with detailed output enabled), and check the tokens of the cited text separately against the `quoteMaxToken` budget |
| Internship plan | Fields, dates, and signatures: whether the batch, number of positions, rotation arrangements, supervising teacher, and dates are consistent with the agreement, and whether signatures or receipts are missing | Search using the same batch number, check whether the matched plan fragments and agreement fragments are consistent in name, quantity, and date, and record the source identifier in `quoteList` |
| Internship log | Fields, dates, and signatures: whether the log date, recorder, supervising teacher signature, and receipt are complete, and whether they correspond to the rotation arrangements in the plan | Search log fragments by date range, check the date and signature fields of each citation, and record missing items |
| Cited content output | The number of returned entries is consistent with the matched materials, and being empty is also normal; each citation can point back to the original text passage | Run a test with a question that has no matching materials, and see whether the output is empty while the chain continues; then ask a question with original text support, and check the citation array and citation markers |

## Three common errors

- Phenomenon: the position name, quantity, and date of the same internship record do not match between the agreement and the plan. Cause: the two materials were updated separately, without field comparison and version registration.
- Phenomenon: an old version of the agreement is still cited, while a new version has been published but the citation has not been synchronized. Cause: the version was not synchronized, and the citation source still points to the old passage.
- Phenomenon: the log lacks a supervising teacher signature or receipt, but the cited fragment appears complete. Cause: the signature page was not ingested into the knowledge base along with the body text, and the citation only covers the body passage.

## How to verify the setup

Acceptance of this feature: ask a question with original text support, check whether the citation array and citation markers can point back to the original text, and check the number of entries in `responseData` and the source identifier in `quoteList`; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: change one piece of content and see whether the version number and citations are updated in sync.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check item by item, confirming that the values are consistent with those set in the knowledge base retrieval section.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
