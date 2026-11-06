---
title: Citations and Source Traceability for Corporate Compliance and Safety Training: Find Supporting Evidence
slug: /en/industry/education-d001-c041-f010
page_type: 行业问题页
application_area: education
meta_title: Compliance Training | Citations | Evidence
meta_description: Compliance Training: review citations for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Corporate Compliance and Safety Training: Find Supporting Evidence

## What this category's data looks like

This page addresses enterprise compliance and security training scenarios. The materials include three categories: compliance training courseware, security operating procedures, and exam records. Courseware carries regulatory clauses and internal policy items, and when it enters the knowledge base it serves as a source of clause basis; procedures carry operating steps and prohibitions, and when they enter they serve as a source of conduct basis; exam records carry personnel, date, score, and signature receipt fields, and when they enter they serve as a source of execution traces. The three material categories have different update rhythms: courseware is re-versioned as regulations are revised, procedures are re-versioned as processes change, and exam records are added in batches. In terms of field characteristics, the name, quantity, and date of the same record often fail to match across two materials; when versions are not synchronized, old procedures are still hit by retrieval; exam records missing signatures or receipts cannot serve as valid basis. After the materials enter the knowledge base retrieval node, each is returned in the form of a cited content array, for subsequent nodes to compare fields, write ledgers, and generate reports.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs a cited content array, each entry containing the original text fragment and a source identifier, and the length can be 0. "Basis entries that can be traced back to the original text" are completed afterward by subsequent AI nodes, code nodes, or humans. An empty citation array is a normal output, and the output chain still runs through.

| Object | Check | Verification action |
| --- | --- | --- |
| Compliance training courseware | The clause names, publication dates, and current version numbers in the courseware match the original text | Open the citation superscript to trace back to the courseware paragraph, verify the clause names and version dates, and record the array entry count and the `quoteMaxToken` budget values separately |
| Security operating procedures | The step numbers, prohibitions, and signature receipt fields in the procedures match the original text | Check the step numbers and signature fields against the source document, confirm that the hit is the current version, and that old-version files have been taken down |
| Exam records | The names, dates, scores, and receipt statuses in the records match the original text | Compare the names and dates of the same record across the two materials, and check whether entries missing signatures or receipts are being treated as basis |
| Cited content output | The number of returned entries is consistent with the hit materials; empty also counts as normal | Run a trial with a question that matches no materials, see that the array in `responseData` (non-streaming module results returned with detailed output enabled) is empty while the chain continues, then open `quoteList` to check the hit materials |

## Three common errors

- Symptom: the name and date of the same exam record fail to match across two materials. Cause: different entry batches and no field comparison, so the cited fragments each trace back to different original texts.
- Symptom: an old-version security operating procedure is still hit by retrieval and used as basis. Cause: versions are not synchronized; after the new procedure is stored, the old file has not been taken down, and the citation source identifier points to the old paragraph.
- Symptom: exam records missing signatures or receipts still appear in the citation array. Cause: receipt fields are not included in ingestion validation, and citations only look at the original text fragment without checking signature status.

## How to verify the setup

Acceptance of this feature: ask a question that has an original-text basis, check whether the citation array and superscripts can trace back to the original text, and record the array entry count and the `quoteMaxToken` budget; then ask a question that matches no materials, confirm that the array is empty while the chain runs through, and that `quoteList` within `responseData` are queryable.

Business test: ask a basis question that spans materials, see whether the answer gives traceable sources, and check that the sources point to materials of the current version with complete fields and signature receipts.

- In the node, check the selected knowledge base collections and their vector models, open the search parameter panel, and verify the values item by item to be consistent with the knowledge base retrieval section.
- Open the conversation citation superscripts, check against the source documents whether each citation can trace back to the original text paragraph, and separately record the citation array entry count and the `quoteMaxToken` budget.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
