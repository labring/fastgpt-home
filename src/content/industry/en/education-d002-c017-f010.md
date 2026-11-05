---
title: Citations and Source Traceability for Undergraduate Program Establishment and Adjustment: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c017-f010
page_type: 行业问题页
application_area: education
meta_title: Undergraduate Programs | Citations | Checks
meta_description: Undergraduate Programs: review citations for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Undergraduate Program Establishment and Adjustment: Compare Documents and Locate Differences

## What this category's data looks like

This category's data looks like this: Undergraduate program setup and dynamic adjustment involves three types of materials: program setup application forms, talent training plans, and expert review opinions. The program setup application form carries the program name, code, length of schooling, degree-granting category, application date, and signature of the person in charge; the talent training plan carries the curriculum system, number of credits, number of weeks of practical components, revision date, and department seal; the expert review opinions carry the review conclusion, number of experts on the list, review date, and expert signatures. The three types of materials are updated synchronously within each round of application and adjustment cycle, and the names, quantities, and dates of the same record must be consistent across materials. When entering the knowledge base retrieval node, the three types of materials are each associated as independent knowledge bases or as document collections within the same knowledge base, and the node retrieves them using the same vector model and returns an array of cited content, each entry containing the original text fragment and source identifier, providing traceable original-text evidence for subsequent field comparison.

## Configuration and implementation checks

Configuration and implementation checks: This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text fragment and source identifier, and the length may be 0. The discrepancy list is then completed by a subsequent AI node, code node, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Program setup application form | The program name, program code, length of schooling, application date, and signature of the person in charge must be consistent item by item with the talent training plan and expert review opinions | Locate the original text fragment of the application form in the citation array, verify the name, quantity, date, and signature fields, and record inconsistent items |
| Talent training plan | The number of course credits, number of practical weeks, revision date, and department seal must be consistent with the corresponding records in the application form and review opinions | Use the citation source identifier to trace back to the original text paragraph, compare quantities and dates, and mark entries whose versions are not synchronized or whose signatures/seals are missing |
| Expert review opinions | The review conclusion, number of experts, review date, and expert signatures must be consistent with the same record in the application form and training plan | Check the number of experts on the list and the date in the cited fragment, and verify whether the signatures and receipts are complete |
| Cited content output | The number of returned entries is consistent with the matched materials; being empty is also normal, and the chain continues to run through | Run a test with a question that matches no materials, and observe whether the chain continues when the array length is 0; separately record the array entry count and the `quoteMaxToken` budget |

## Three common errors

- Symptom: The name or code of the same program does not match between two materials. Cause: Adjustments after application were not written back synchronously to the other material, so versions are not synchronized.
- Symptom: The number of experts on the list or the review date is inconsistent between two materials. Cause: After the review opinions were updated, they were not written back to the application form, and signatures or receipts are missing.
- Symptom: There is an answer but the citation array is empty, or the cited fragments do not match the original text. Cause: No materials were matched in this round, or the correspondence between citations and the original text was not verified, and this cannot be directly attributed to length truncation.

## How to verify the setup

How to verify the setup: For acceptance of this feature: ask a question that has original-text evidence, and check whether the citation array and footnote markers can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through. During verification, check the citation array length in `responseData` (non-streaming module results returned with detailed output enabled) and the original text fragments in `quoteList`; `quoteMaxToken` is only the citation content budget and should not be compared for equality with the array entry count.

Business test: Use a real record to find fields inconsistent with the ledger, compare the program name, quantities, dates, and signatures item by item, and submit the discrepancy items to the reviewer for confirmation and write-back.

- In the node, verify whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to verify the values item by item.
- In the conversation, open the citation footnote markers, check against the source documents whether each citation can trace back to the original text paragraph, and record the array entry count and the `quoteMaxToken` budget.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
