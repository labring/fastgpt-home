---
title: Citations and Source Traceability for Graduate Education Process Management: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c025-f010
page_type: 行业问题页
application_area: education
meta_title: Graduate Education | Citations | Intake
meta_description: Graduate Education: review citations for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Graduate Education Process Management: Handle Questions and Collect Missing Information

## What this category's data looks like

Graduate training process management centers on the training plan, thesis proposal report, and mid-term assessment form, and the three types of materials each play a role in Q&A acceptance. The training plan provides course and credit fields, the thesis proposal report provides topic selection, supervisor, and date fields, and the mid-term assessment form provides assessment conclusion, signature, and receipt fields. Materials come from department system exports, scanned copies, and online submissions, and the update rhythm advances with the semester, with concentrated changes during the proposal and mid-term stages. Field characteristics include name, quantity, date, signature, and version number. Acceptance questions often lack key information, so missing items must first be identified and then followed up on, and answers must be able to point back to the original text of the materials.

## Configuration and implementation checks

This link is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text snippet and a source identifier, and the length can be 0. "Acceptance records and completed question items" are then handled by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Training plan | Whether course names, credit quantities, start and end dates, and signature fields are complete | Check the original text snippets and source identifiers one by one in the citation array, and record missing fields |
| Thesis proposal report | Whether topic title, supervisor name, proposal date, signature, and receipt correspond | Compare against the source document to check whether the cited snippets point back to the original paragraphs, and mark inconsistent items |
| Mid-term assessment form | Whether the assessment conclusion, assessment date, signature, and version number are consistent with the training plan | Use `quoteList` to view citation details, confirm that the number of entries matches the hit materials, and record even an empty array |
| Citation content output | The number of returned entries matches the hit materials, and being empty also counts as normal | Run a test with a question that has no matching materials, see that the output is empty while the chain continues, and record the array length |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the training plan and the thesis proposal report. Cause: The two materials are submitted separately, the fields are not checked for consistency, and the cited snippets are independent of each other.
- Phenomenon: The version of the mid-term assessment form is not synchronized, and an old-version signature field is cited. Cause: After the material was updated, it was not re-ingested, retrieval hit the old snippet, and the source identifier points to a historical version.
- Phenomenon: The answer has citation superscripts but the cited snippets do not match the original text. Cause: First check whether this round hit anything and which material was hit, then look at `quoteMaxToken` trimming, and do not directly attribute it to length.

## How to verify the setup

Acceptance of this feature: Ask a question with original-text support, check whether the citation array and superscripts can point back to the original text, and record the array length and the `quoteMaxToken` budget, without comparing the two for equality.

Business test: Ask a question that lacks key information and see whether it follows up before answering; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and that `responseData` (non-streaming module results returned with detailed output enabled) returns normally.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- Run a test with a question that has no matching materials, see that the output is empty while the chain continues, and open the citation superscripts in the conversation to compare against the source document.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
