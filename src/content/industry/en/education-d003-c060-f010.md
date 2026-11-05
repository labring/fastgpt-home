---
title: Citations and Source Traceability for Research Project Annual Progress and Acceptance: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c060-f010
page_type: 行业问题页
application_area: education
meta_title: Research Progress | Citations | Intake
meta_description: Research Progress: review citations for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Project Annual Progress and Acceptance: Handle Questions and Collect Missing Information

## What this category's data looks like

Annual progress and acceptance of research projects involve three types of materials: annual progress reports, mid-term review materials, and acceptance reports. Annual progress reports are submitted by cycle and record phase tasks, indicators, and budget execution; mid-term review materials focus on milestone results and problem statements; acceptance reports summarize all indicators, dates, and signatures at project closure. When these three types of materials enter the Q&A intake and missing-item follow-up function, each plays a distinct field-source role: annual progress reports provide the task and indicator baseline within the cycle, mid-term review materials provide milestone comparisons and deviation statements, and acceptance reports provide the final conclusions and approval basis. The materials update at different rhythms, so the name, quantity, and date of the same record often fail to match between two materials, versions are not synchronized, or signature receipts are missing. Missing items must first be identified and then followed up on, and answers must be based on the materials.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and a source identifier, and the length may be 0. "Accepted records and supplemented question items" are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Annual progress report | Whether fields, dates, and signatures are complete, and whether the name, quantity, and date are consistent with the mid-term review materials | Open the citation superscript in the conversation, compare it against the original paragraphs of the annual progress report, and verify the fields and signatures; record the number of array items and separately inspect the `quoteMaxToken` budget |
| Mid-term review materials | Whether the milestone results and deviation statements match the annual progress report, and whether the versions are synchronized | Open the search parameter panel to verify the values, use `responseData` (non-streaming module results returned with detailed output enabled) to inspect the citation array and source identifiers, and trace each item back to the original paragraphs |
| Acceptance report | Whether the final indicators, dates, and signatures are complete, whether receipts are missing, and whether they are consistent with the mid-term review materials | In `quoteList`, verify that the cited fragments correspond to the original text, confirm that missing items are identified and followed up on, and then forward them to the responsible person for handling |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the annual progress report and the mid-term review materials. Cause: The two materials are updated separately, without field comparison and version synchronization.
- Symptom: The acceptance report lacks signatures or receipts, but the answer still gives a conclusion. Cause: Missing items were not identified and followed up on, and the answer was given directly based on incomplete materials.
- Symptom: There is no citation superscript in the answer, or the cited fragments do not match the original text. Cause: Failure to first verify whether this round had a hit and which material was hit, and directly attributing it to length truncation.

## How to verify the setup

Acceptance of this function: ask a question with an original-text basis, and verify whether the citation array and superscripts can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline still runs through.

Business test: submit a question missing key information and see whether it follows up first before answering.

- In the node, verify whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- Run a test with a question that has no matching materials, and see whether the citation array is empty while the pipeline continues; when there is an answer, open the citation superscript to compare it against the source document.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
