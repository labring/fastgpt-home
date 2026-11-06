---
title: Citations and Source Traceability for Vocational School Student Internships: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c030-f010
page_type: 行业问题页
application_area: education
meta_title: Student Internships | Citations | Multilingual
meta_description: Student Internships: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Vocational School Student Internships: Handle Multilingual Materials and Terminology

## What this category's data looks like

Vocational school student internship management involves three types of materials: internship agreements, internship plans, and internship logs. Fields include student name, position name, internship start and end dates, mentor signature, and unit receipt. In the multilingual materials and terminology processing scenario, the three types of materials play different roles when entering the knowledge base retrieval node: internship agreements provide original text fragments of rights, responsibilities, and signature fields; internship plans provide terminology context for positions, cycles, and rotation arrangements; internship logs provide citation sources for daily records and mentor confirmations. In terms of update cadence, agreements are archived after batch signing, plans are adjusted by semester or training program, and logs are submitted daily or weekly, so the versions of the three are prone to misalignment. The unified terminology table and comparison draft need to extract the writing of the same term from the citation fragments of these materials and retain source identifiers so as to refer back to the original paragraphs.

## Configuration and implementation checks

The citation output of the knowledge base retrieval node only outputs an array of citation contents, each containing an original text fragment and a source identifier; the length can be 0. The unified terminology table and comparison draft must be continued by subsequent AI nodes, code nodes, or manual work. Even if no content is found, the output pipeline still runs through.

| Object | Check | Verification action |
| --- | --- | --- |
| Internship agreement | Whether the same student's name, position name, and internship start and end dates are consistent between the agreement and the log, and whether the signature and unit receipt are complete | Open the citation marker in the retrieval results, check the fields and dates against the original paragraph of the agreement, and record the source identifier in `quoteList` |
| Internship plan | Whether the position name and rotation cycle in the plan match the quantities and dates in the agreement and log, and whether the versions are synchronized | Use the same term to retrieve the agreement and the plan separately, compare the writing and dates in the citation fragments, and check the hit materials in `responseData` (non-streaming module results returned with detailed output enabled) |
| Internship log | Whether the daily records and mentor signature in the log are consistent with the names, quantities, and dates in the plan and agreement, and whether the receipt is missing | Extract three terms, check whether the writing is consistent throughout the whole text, and record the number of citation array entries and the `quoteMaxToken` budget separately |
| Unified terminology table and comparison draft | Whether the same term is consistent throughout the whole text, whether the translated name can refer back to the original text, and whether the citation fragments correspond to the original paragraphs | Open the citation marker in the conversation, refer back to the source document item by item, and confirm that the pipeline still runs through when the array is empty |

## Three common errors

- Symptom: The same student's name, position name, and dates do not match between the agreement and the log. Cause: The two materials were entered separately, and the original paragraphs were not checked by referring back with the same terminology table.
- Symptom: The internship plan has been adjusted, but the agreement and log still use the old position name and cycle. Cause: The versions are not synchronized, and the citation fragments come from materials of different batches.
- Symptom: The log lacks a mentor signature or unit receipt, and the citation array is empty. Cause: The materials were not entered into the knowledge base or were not hit; an empty array is a normal output and does not mean retrieval failed.

## How to verify the setup

Acceptance of this feature: Ask a terminology question with original text evidence, check whether the citation array and markers can refer back to the original paragraphs, and record the number of array entries; then ask a question with no matching materials, confirm that the array is empty while the pipeline runs through, and note that `quoteMaxToken` is only a content budget and is not compared for equality with the number of entries.

Business testing: Extract three terms to check whether the writing is consistent throughout the whole text, verify whether the translated names can refer back to the original text, and confirm that the names, quantities, dates, and signature and receipt fields in the agreement, plan, and log are aligned.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- Run a trial with a question that has no matching materials, and see that the output is empty while the pipeline continues; then open the citation marker and check `quoteList` and `responseData` against the source document.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
