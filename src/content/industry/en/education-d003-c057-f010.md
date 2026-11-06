---
title: Citations and Source Traceability for National Key Research and Development Applications: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c057-f010
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Citations | Intake
meta_description: National R&D Grants: review citations for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for National Key Research and Development Applications: Handle Questions and Collect Missing Information

## What this category's data looks like

In the National Key R&D Program project application scenario, the materials mainly consist of the project application form, the budget application form, and the cooperation agreement, with signature pages, receipts, and version records attached. The project application form carries the research objectives, task breakdown, and assessment indicators; the budget application form carries the funding categories, calculation basis, and annual disbursement; the cooperation agreement carries the participating units, division of labor, intellectual property, and signatures. The fields of the three types of materials intersect: unit name, project number, start and end dates, funding amount, and signature of the person in charge. In terms of update cadence, the application form is often revised by guideline batch, the budget form is resubmitted as categories are adjusted, and the agreement is re-versioned as participants change. When the materials enter the Q&A acceptance and missing-item follow-up feature, each serves as a retrievable original-text source, providing a back-reference basis for cited snippets, so that missing-item identification can land on specific paragraphs rather than asking vague follow-up questions.

## Configuration and implementation checks

This link is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original-text snippet and a source identifier, and the length can be 0. The "accepted records and items to be completed" are then handled by subsequent AI nodes, code nodes, or humans. Even if no content is retrieved, the output chain still runs through.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | When compared with the budget application form and the cooperation agreement, whether the unit name, project number, start and end dates, and funding amount of the same record are consistent, and whether the signatures and receipts are complete | In the node, check the selected collection and its vector model; turn on the citation superscript, back-reference each citation to the original-text paragraph in the project application form, and record the number of entries and the source identifier |
| Budget application form | When compared with the project application form and the cooperation agreement, whether the funding categories, annual amounts, calculation basis, and dates match, and whether the versions are in sync | Run a test with a question that has no matching material, and see that the output is empty while the chain continues; check `quoteMaxToken` as the content budget, and record the number of array entries separately, without comparing it for equality |
| Cooperation agreement | When compared with the project application form and the budget application form, whether the participating unit names, division of labor, intellectual property clauses, and signature dates are consistent, and whether missing signatures or receipts are identified | Open the search parameter panel and check item by item, confirming that the values are consistent with the knowledge base retrieval section; check the citation array length in `responseData` (non-streaming module results returned with detailed output enabled) and the hit materials in `quoteList` |

## Three common errors

- Symptom: there is no citation superscript in the answer. Cause: the citation array is empty or no material was hit, and the chain still runs through; first check whether this round hit anything and which material was hit, then look at trimming.
- Symptom: the name, quantity, or date of the same record does not match between two materials. Cause: the versions are not in sync, the project application form and the budget application form were revised separately, and no field-level comparison was done.
- Symptom: the cited snippet does not match the original text. Cause: do not directly attribute it to length trimming; first check the hit material and the source identifier, then see whether the `quoteMaxToken` budget affects the text truncation.

## How to verify the setup

Feature acceptance: ask a question that has an original-text basis, and check whether the citation array and superscript can back-reference the original text; then ask a question with no matching material, confirm that the array is empty while the chain runs through, and record the number of array entries and the `quoteMaxToken` budget values separately.

Business test: raise a question that is missing key information, and see whether it first asks a follow-up question before answering, and whether the follow-up items land on specific fields of the project application form, the budget application form, and the cooperation agreement.

- In the conversation, turn on the citation superscript, back-reference each entry to the original-text paragraph against the source document, record the number of citation array entries and the source identifier, and confirm that the chain still continues when the array is empty.
- Open the search parameter panel and check item by item, confirming that the values are consistent with the knowledge base retrieval section; run a test with a question that has no matching material, and check the array length in `responseData` and the hit materials in `quoteList`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
