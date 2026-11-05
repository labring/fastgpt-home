---
title: Citations and Source Traceability for School Moral Education and Class Teacher Work: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c014-f010
page_type: 行业问题页
application_area: education
meta_title: Pastoral Education | Citations | Intake
meta_description: Pastoral Education: review citations for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Moral Education and Class Teacher Work: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the scenarios of school moral education and homeroom teacher work; the materials include themed class meeting plans, student comprehensive quality records, and home visit records. A themed class meeting plan usually contains activity objectives, procedures, time and location, and the homeroom teacher's signature; a student comprehensive quality record contains evaluation dimensions, grades, dates, and the teacher's signature; a home visit record contains the home visit subject, time, location, key points of communication, the parent receipt, and both parties' signatures. When these materials enter the knowledge base retrieval node, each plays a different role: the class meeting plan is used to answer questions about activity organization and procedural basis, the comprehensive quality record is used to answer questions about student evaluation and growth basis, and the home visit record is used to answer questions about home-school communication and receipt basis. The update rhythm is mostly weekly or monthly submission within the semester, with summary archiving at the end of the semester, and the version is based on the unified template of the school or grade. Field characteristics are concentrated in names, quantities, dates, and signature receipts. The same record in different materials is prone to situations such as inconsistent name spelling, mismatched headcounts or counts, contradictory dates, unsynchronized versions, and missing signatures or receipts. In the acceptance and follow-up process, missing items need to be identified first and then followed up.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. The acceptance record and the completed follow-up items are then handled by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Themed class meeting plan | Whether the activity objectives, procedures, time and location, and homeroom teacher's signature are complete, and whether the same activity name and date are consistent in the plan and the record | Open the citation superscript to compare against the original paragraph, check the signature field and date field; use `quoteList` to view the hit materials and record the number of array items |
| Student comprehensive quality record | Whether the evaluation dimensions, grades, dates, and teacher's signature are complete, and whether the same student's name, quantities, and dates match across the two materials | Open the citation superscript in the conversation and refer back to the original text item by item; use `responseData` (non-streaming module results returned with detailed output enabled) to view the citation array and confirm that the number of items matches the hit materials |
| Home visit record | Whether the home visit subject, time, location, key points of communication, parent receipt, and signatures are complete, and whether the version is synchronized with the current template | Compare against the source document to verify the receipt and signature; run a test with a question that has no matching materials and see that the output is empty while the chain continues |
| Knowledge base retrieval node | Whether the selected knowledge bases belong to the same vector model, and whether the search parameter values are consistent with the knowledge base retrieval section | Open the search parameter panel and check each item; confirm that `quoteMaxToken` is the citation content budget, and record the number of array items separately |

## Three common errors

- Symptom: The same activity's name, quantities, and dates do not match across the two materials. Cause: The materials were filled in separately by different personnel according to their own templates, without unified field comparison and version synchronization.
- Symptom: The home visit record is missing the parent receipt or the homeroom teacher's signature. Cause: The submission step did not list signatures and receipts as required fields, and verification was not done one by one during archiving.
- Symptom: There is no citation superscript in the answer, or the cited fragment does not match the original text. Cause: First check whether this round hit anything and which material was hit, then look at the citation content budget, and do not directly attribute it to length truncation.

## How to verify the setup

This feature's acceptance: ask a question with original-text support and check whether the citation array and superscript can refer back to the original text; then ask a question with no matching materials and confirm that the array is empty while the chain runs through.

Business test: ask a question missing key information and see whether it follows up first before answering.

- In the node, check the selected knowledge base collections and their vector models, and open the search parameter panel to check each value item by item.
- Run a test with a question that has no matching materials and see that the output is empty while the chain continues; open the citation superscript in the conversation and compare against the source document to check `quoteList` and `responseData`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
