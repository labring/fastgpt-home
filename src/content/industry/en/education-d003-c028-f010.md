---
title: Citations and Source Traceability for Vocational College Program Registration: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c028-f010
page_type: 行业问题页
application_area: education
meta_title: Vocational Programs | Citations | Intake
meta_description: Vocational Programs: review citations for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Vocational College Program Registration: Handle Questions and Collect Missing Information

## What this category's data looks like

Vocational college program setup filing materials usually consist of three parts: the program setup filing form, the talent demand justification, and the faculty and equipment list. The filing form carries fields such as program name, code, program length, and enrollment plan; the talent demand justification carries the industry research date, number of positions, and signatures and seals; the faculty and equipment list carries the number of teachers, title structure, equipment names, and number of units. When the materials enter this feature, the filing form, the justification, and the list are each retrieved as independent sources, and the citation output is only responsible for returning the matched original text fragments together with source identifiers; it is not responsible for judging whether fields are consistent. Common field characteristics include the same record's name, quantity, and date not matching across different materials, versions not being synchronized, and missing signatures or receipts. In terms of update cadence, the filing form is updated with the application batch, while the justification and list are updated with on-campus review milestones; during retrieval, sources need to be checked against batch and date.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length may be 0. The "acceptance record and items to be completed" is then handled by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Program setup filing form | Whether fields, dates, and signatures are consistent with the justification and list | Compare the program name, code, program length, date, and signature fields in the filing form item by item against the corresponding records in the talent demand justification and the faculty and equipment list |
| Talent demand justification | Whether the industry research date, number of positions, and signatures or receipts are complete | Open the citation marker to trace back to the original paragraph, check whether the number of positions in the justification matches the enrollment plan in the filing form, and check whether signatures and receipts are missing |
| Faculty and equipment list | Whether the number of teachers, title structure, and number of equipment units are consistent with the filing form | Check the number of teachers and equipment units in the list, and check whether the same record's name, quantity, and date do not match across the two materials and whether versions are synchronized |
| Cited content output | The number of returned items is consistent with the matched materials; being empty is also normal | Run a test with a question that has no matching materials, and see whether the output is empty while the pipeline continues; record the array length, and check the tokens of the cited text separately against the `quoteMaxToken` budget without making an equality comparison |

## Three common errors

- Phenomenon: the same record's name and quantity do not match between the filing form and the faculty and equipment list. Cause: the two materials are maintained by different personnel, versions are not synchronized during updates, and after retrieval hits, the cited fragments each point back to the original text.
- Phenomenon: the talent demand justification lacks signatures or receipts, and the date in the filing form is inconsistent with the date in the justification. Cause: on-campus review milestones occur in different orders, and fields and dates were not checked by batch when the materials entered the knowledge base.
- Phenomenon: the answer has content but the citation array is empty, or the cited fragments do not match the original text. Cause: no materials were matched in this round, or the matched materials do not match the question; an empty citation array does not mean retrieval failed.

## How to verify the setup

Feature acceptance: ask a question with original-text support, and check whether the citation array and markers can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through. Open `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` to view the number of citations and source identifiers; the number of citations is the array length, and `quoteMaxToken` is the citation content budget, and the two are not compared for equality.

Business test: submit a question missing key information and see whether it first asks a follow-up before answering. For example, provide only the program name without the batch and date, and observe whether it first completes the missing items before entering retrieval, and finally generates an acceptance record and the items to be completed.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- In the conversation, open the citation markers, check against the source documents whether each citation can trace back to the original paragraph, and record the array length and the tokens budget of the cited text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
