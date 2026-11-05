---
title: Citations and Source Traceability for Continuing Education Training Hour Recognition: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c038-f010
page_type: 行业问题页
application_area: education
meta_title: Continuing Education | Citations | Access
meta_description: Continuing Education: review citations for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Continuing Education Training Hour Recognition: Manage Authorized Access and External Services

## What this category's data looks like

Continuing education credit hour recognition materials usually include three types: course filing forms, study certificates, and credit hour recognition forms. Course filing forms record the course name, course number, filing date, and handler signature; study certificates record the learner's name, course name, completion date, and issuing unit seal; credit hour recognition forms record the number of recognized credit hours, recognition date, and review signature. When these three types of materials enter the knowledge base retrieval node, each plays a different role: course filing forms are used to verify whether the course has been filed, study certificates are used to verify whether the learning activity occurred, and credit hour recognition forms are used to verify the number of credit hours and the review conclusion. The material update cadence is synchronized with recognition batches. A common field characteristic is that the course name and completion date for the same record may be inconsistent between the course filing form and the study certificate, and the number of credit hours and recognition date may be inconsistent between the credit hour recognition form and the study certificate. When versions are not synchronized or signatures or receipts are missing, comparison cannot be completed.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text snippet and source identifier, and the length may be 0. The externally available entry point and authorization scope are completed by subsequent AI nodes, code nodes, or manual work. The citation array is only responsible for bringing out the matched original text snippets and source identifiers; it is not responsible for comparing fields, writing ledgers, or generating reports.

| Object | Check | Verification action |
| --- | --- | --- |
| Course filing form | Whether the course name, course number, filing date, and handler signature are complete and consistent with the study certificate | Locate the course filing form snippet in the cited content array, check the course name, number, date, and signature fields, and record the source identifier |
| Study certificate | Whether the learner's name, course name, completion date, and issuing unit seal are consistent with the course filing form and credit hour recognition form | Open the citation marker pointing back to the original study certificate, and compare the name, course name, completion date, and seal item by item |
| Credit hour recognition form | Whether the number of recognized credit hours, recognition date, and review signature are consistent with the study certificate | Check the number of credit hours, recognition date, and review signature in the cited snippet, and check whether signatures or receipts are missing |
| Cited content output | The number of returned items is consistent with the matched materials; being empty is also normal | Run a trial query with no matching materials and see whether the citation array is empty while the pipeline continues; record the array length and separately check the `quoteMaxToken` budget; view the return structure in the `quoteList` of `responseData` (non-streaming module results returned with detailed output enabled) |

## Three common errors

- Symptom: The name and completion date of the same course do not match between the course filing form and the study certificate. Cause: The two materials are filled in at different stages, versions are not synchronized, or the entry standards are inconsistent.
- Symptom: The number of recognized credit hours in the credit hour recognition form is inconsistent with the number of credit hours on the study certificate. Cause: The recognition form was generated based on an old version of the study certificate, and the number and date were not rechecked after the update.
- Symptom: The materials lack a handler signature or receipt, and the cited snippet cannot support the recognition conclusion. Cause: The signature step was not completed or the receipt was not archived, and the retrieved original text snippet itself has incomplete fields.

## How to verify the setup

Acceptance for this feature: ask a question with original text support, check whether the cited content array and citation markers can point back to the original paragraphs of the course filing form, study certificate, or credit hour recognition form, and confirm in the `quoteList` of `responseData` that the number of citations and the `quoteMaxToken` budget are recorded separately; then ask a question with no matching materials and confirm that the citation array is empty while the output pipeline still runs through.

Business test: access once with a restricted identity, and see whether the visible scope matches the setting and unauthorized content is not visible.

- In the knowledge base retrieval node, check whether the selected collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- In the conversation, open the citation markers and check against the source documents whether each citation can point back to the original text; record the citation array length and the `quoteMaxToken` budget, and do not perform an equality comparison.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
