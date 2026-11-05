---
title: Citations and Source Traceability for Continuing Education Training Hour Recognition: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c038-f010
page_type: 行业问题页
application_area: education
meta_title: Continuing Education | Citations | Intake
meta_description: Continuing Education: review citations for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Continuing Education Training Hour Recognition: Handle Questions and Collect Missing Information

## What this category's data looks like

This category's data involves three types of materials: course filing forms, study certificates, and credit hour recognition forms. The course filing form records the course name, course number, number of credit hours, filing date, and handler's signature, and is the starting point of the credit hour source; the study certificate records the learner's name, course name, study start and end dates, completed credit hours, and the issuing unit's seal, and is the evidence of the learning activity; the credit hour recognition form records the recognized credit hours, recognition date, reviewer, and re-review signature, and is the endpoint of the recognition conclusion. When these three types of materials enter the knowledge base retrieval node, each participates in citation output as an independent source: the filing form is used to check whether the course is compliant, the study certificate is used to check the learning facts, and the recognition form is used to check the recognition result. Materials are updated by batch; when a new version overwrites an old version, the receipt and signature pages must be synchronized, and the fields are mainly of four types: name, quantity, date, and signature.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each item containing the original text fragment and source identifier, and the length may be 0. "Intake records and completed question items" are then handled by subsequent AI nodes, code nodes, or manual work. Even if no content is found, the output chain still runs through.

| Object | Check | Verification action |
| --- | --- | --- |
| Course filing form | Whether the course name, course number, number of credit hours, filing date, and handler's signature are complete and consistent with the study certificate | In the node, check the selected collections and their vector models, and compare the name, quantity, and date of the filing form and study certificate field by field |
| Study certificate | Whether the learner's name, course name, study start and end dates, completed credit hours, and issuing unit's seal are complete | Open the citation markers against the source document, check whether each citation can point back to the original paragraph, and record the array length and the `quoteMaxToken` budget |
| Credit hour recognition form | Whether the recognized credit hours, recognition date, reviewer, and re-review signature are complete, and whether they match the quantity and date in the study certificate | Run a test with a question that has no matching materials, see whether the output is empty while the chain continues, then check the citation items in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` |
| Citation content output | The number of returned items is consistent with the matched materials; being empty is also normal | Open the search parameter panel and check the values item by item, confirm that the array item count is recorded separately and is not compared for equality with `quoteMaxToken` |

## Three common errors

- Symptom: the name or number of credit hours for the same course does not match between the filing form and the study certificate. Cause: the two materials are filled in by different steps, and no cross-check of fields was performed.
- Symptom: the date on the recognition form is earlier than the completion date on the study certificate. Cause: versions were not synchronized, and the old recognition form is still in the knowledge base participating in retrieval.
- Symptom: the study certificate lacks the issuing unit's seal or the recognition form lacks the re-review signature. Cause: pages were missed during material scanning, and the receipt was not archived with the batch.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support, and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and record the array length and the `quoteMaxToken` budget, without comparing the two for equality.

Business test: ask a question missing key information, and see whether it first follows up before answering.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the citation markers against the source document, check item by item whether the citation fragments correspond to the original paragraphs, and record the number of array items.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
