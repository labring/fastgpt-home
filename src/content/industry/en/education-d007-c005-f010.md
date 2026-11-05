---
title: Citations and Source Traceability for Kindergarten Safety and Emergency Drills: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c005-f010
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Safety | Citations | Review
meta_description: Kindergarten Safety: review citations for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten Safety and Emergency Drills: Trace Exceptions and Review Results

## What this category's data looks like

Materials for exception tracing and manual review of kindergarten safety protection and emergency drills come from hazard ledgers, drill plans and sign-in sheets, access control and school bus inspection records, rectification receipts, and responsible-person signature pages. Four types of fields—hazard items and rectification deadlines, drill headcount and sign-in, access control and school bus inspection items, and responsible-person signatures—enter the knowledge base retrieval node and each plays a different role: the hazard ledger provides hazard descriptions and deadline basis, the drill plan and sign-in sheet provide headcount and process comparison, the access control and school bus inspection records provide the inspection item list, and the rectification receipt and signature page provide closed-loop evidence. Materials are updated weekly, drill records are archived by session, and access control and school bus inspections are summarized daily. The field characteristics are short text plus dates and signatures, suitable for chunk retrieval and pointing back to the original paragraphs.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text fragment and a source identifier, and the length can be 0. The exception list and review conclusions are completed afterward by subsequent AI nodes, code nodes, or manual work; the citation array itself is not a discrepancy list or ledger.

| Object | Check | Verification action |
| --- | --- | --- |
| Hazard ledger | Whether hazard items and rectification deadlines appear in pairs, and whether the deadlines can be traced back to the original text | Open the citation superscript, compare the hazard description and deadline fields, and check whether the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) matches the hit materials |
| Drill plan and sign-in sheet | Whether the drill headcount and sign-in headcount are consistent, and whether the process matches the plan | Compare the plan steps and sign-in records in the cited fragments one by one, and check whether the source identifier in `quoteList` can point back to the corresponding document |
| Access control and school bus inspection records | Whether inspection items are missing and whether responsible-person signatures are complete | Check the cited fragments item by item against the inspection item list, and check that `quoteMaxToken` is the citation content budget, with the array length recorded separately |
| Rectification receipt and signature page | Whether the hazard is closed-loop and whether the signer matches the responsible person | Compare the receipt date and signature page, and confirm that the cited fragments can point back to the source materials |

## Three common errors

- Phenomenon: the hazard ledger has records but the rectification receipt is missing, so the exception cannot be closed-loop. Cause: during review, only the hazard description was checked, and the rectification deadline and receipt signature page were not included together in the citation comparison.
- Phenomenon: the drill sign-in headcount does not match the headcount preset in the plan, and the record does not align with the plan. Cause: the cited fragments only took the sign-in sheet and did not also take the plan text, resulting in the headcount field lacking a comparison source.
- Phenomenon: access control and school bus inspection items are missing, and the signature column is blank. Cause: the retrieval hit materials were incomplete, the citation array length was less than the inspection item list, and the reviewer did not point back to the original text item by item.

## How to verify the setup

This feature acceptance: ask a question with original-text basis, and check whether the citation array and superscript can point back to the original paragraphs; then ask a question with no matching materials, and confirm that the array is empty while the pipeline still runs through.

Business test: create an exception record, see whether it can be traced to the source materials, and locate the hazard item, deadline, and signature fields in the cited fragments.

- Open the citation superscript, compare it item by item against the source documents, and check whether the number of citations in `responseData` matches the hit materials; when it is empty, confirm that the pipeline still runs through.
- Open the search parameter panel, check item by item whether the associated knowledge bases use the same vector model, and check that the source identifier in `quoteList` corresponds to the original paragraphs.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
