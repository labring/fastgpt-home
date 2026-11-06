---
title: Citations and Source Traceability for Corporate Compliance and Safety Training: Track Progress and Check Statistics
slug: /en/industry/education-d006-c041-f010
page_type: 行业问题页
application_area: education
meta_title: Compliance Training | Citations | Progress
meta_description: Compliance Training: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Corporate Compliance and Safety Training: Track Progress and Check Statistics

## What this category's data looks like

This page is for enterprise compliance and safety training scenarios. Materials include compliance training courseware, safety operating procedures, and exam records. Courseware carries policy clauses and training dates, procedures carry operating steps and version numbers, and exam records carry personnel, scores, signatures, and receipts. After these three types of materials enter the knowledge base retrieval node, each serves as a citable original source: courseware is used to verify training topics and training-hour standards, procedures are used to verify operating items and effective dates, and exam records are used to verify rosters, quantities, and signature status. In terms of update cadence, courseware is updated with policy revisions, procedures are reversioned with process changes, and exam records are archived by batch. Field characteristics center on names, quantities, dates, version numbers, signatures, and receipts. The same record may appear with inconsistent name spellings, headcounts, or dates across different materials, unsynchronized versions, or missing receipts, all of which need to be compared item by item in subsequent nodes.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text snippet and a source identifier, and the length can be 0. The "progress table and statistical standards explanation" is completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Compliance training courseware | Whether the training name, date, and training hours in the courseware are consistent with the batch name, date, and headcount in the exam records, and whether the signature column has a receipt | In the citation output, open the footnote markers one by one to trace back to the original text, compare the fields in the courseware and exam records, and register inconsistencies in the pending verification list |
| Safety operating procedures | Whether the procedure's operating items, effective date, and version number are synchronized with the version cited by the courseware, and whether signatures or receipts are complete | Check the version number and effective date in the cited snippets, confirm consistency with the currently active version, and separately mark items missing signatures or receipts |
| Exam records | Whether the number of records, personnel roster, and scores match the statistics in the progress table, and whether the standards are written in the header | Use one week of records to verify the totals, check the header standards and exception notes, record the number of citations according to the array length, and view the tokens of the cited text separately as `quoteMaxToken` |
| Cited content output | The number of returned items is consistent with the matched materials; empty is also normal, and the chain continues to run through | Run a test with a question that has no matching materials, see that the citation array in `responseData` (non-streaming module results returned with detailed output enabled) is empty while the chain continues, then open `quoteList` to compare against the source documents |

## Three common errors

- Phenomenon: The name, headcount, and date of the same training batch do not match between the courseware and the exam records. Cause: The two materials are maintained separately and are not aggregated under unified standards, so field conflicts are only discovered during comparison.
- Phenomenon: The procedure has been reversioned, but the courseware still cites the old version number, and the progress table is calculated according to the old version. Cause: The versions are not synchronized, the material update cadences are inconsistent, and the cited snippets point to old paragraphs.
- Phenomenon: Exam records are missing signatures or receipts, but the statistics are still counted according to the roster. Cause: Signatures and receipts are not included in the verification fields, and the standards do not state in the header how exceptions are handled.

## How to verify the setup

Acceptance for this feature: ask a question with original-text support and check whether the citation array and footnote markers can trace back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and record the correspondence between the number of citations and `quoteMaxToken`, `responseData`, and `quoteList`.

Business test: use one week of records to verify the totals, see whether the standards and exceptions are clearly stated, confirm that the number of records matches the statistics, and ensure the header states the statistical scope and exception handling.

- Open the citation footnote markers, compare them one by one against the source documents, and register items with inconsistencies in name, quantity, date, version number, signature, and receipt in the pending verification list.
- Run a test with a question that has no matching materials, confirm that the citation array is empty while the chain continues, then check whether the search parameters and the vector model of the associated knowledge base are consistent.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
