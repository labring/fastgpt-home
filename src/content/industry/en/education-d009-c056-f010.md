---
title: Citations and Source Traceability for Teacher Qualification Exams and Certification: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c056-f010
page_type: 行业问题页
application_area: education
meta_title: Teacher Qualifications | Citations | Multilingual
meta_description: Teacher Qualifications: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Teacher Qualification Exams and Certification: Handle Multilingual Materials and Terminology

## What this category's data looks like

This category's data covers written and interview registration forms, Mandarin proficiency certificates, medical examination forms, and other materials, containing fields such as name, ID number, exam subjects, test date, certificate number, signature, and receipt. Materials are submitted by different institutions in different batches, and the update cadence advances with the registration, testing, medical examination, and certification stages. During multilingual materials and terminology processing, the registration form provides registration information, the Mandarin proficiency certificate provides the grade and number, and the medical examination form provides the conclusion and seal. After entering the knowledge base retrieval node, the three are retrieved as cited sources, and the cited snippets point back to the original text, to be used for subsequent comparison of the unified terminology glossary and the parallel draft.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original snippet and a source identifier, and the length can be 0. The "unified terminology glossary and parallel draft" is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Written and interview registration form | Whether the name, quantity, date, and signature are consistent with the Mandarin proficiency certificate and the medical examination form | Check the registration form fields against the corresponding items in the other two materials, and record any inconsistencies |
| Mandarin proficiency certificate | Whether the certificate number, test date, and grade wording are consistent throughout and can point back to the original text | Open the source document in the citation superscript, and compare the certificate fields one by one |
| Medical examination form | Whether the medical examination conclusion, date, signature, and receipt are complete and consistent with the registration form | Check the signature and receipt, and verify the date against the registration form record |
| Cited content array | The number of entries matches the hit materials; being empty is also normal | Run a test with a question that matches no materials, and see whether the output is empty while the flow continues |

## Three common errors

- Symptom: the name and date of the same record do not match between the registration form and the medical examination form. Cause: the two materials are filled in at different stages, and no unified terminology glossary and parallel draft were made.
- Symptom: the Mandarin proficiency certificate number is written differently in the parallel draft and in the original citation. Cause: versions are not synchronized, and the old citation was not updated along with the materials.
- Symptom: the medical examination form lacks a signature or receipt, yet the cited snippet is still used. Cause: the material flow is not closed-loop, and the seal fields are not verified after a retrieval hit.

## How to verify the setup

Acceptance for this feature: ask a question that has a basis in the original text, and check whether the citation array and superscripts can point back to the original text; then ask a question that matches no materials, and confirm that the array is empty while the flow completes. Record the number of citations, i.e. the array length; `quoteMaxToken` is the citation content budget, and the two are not compared for equality; when the citation limit is involved, check the tokens of the cited text, and record the array entry count separately.

Business test: sample three terms and check whether their wording is consistent throughout, and verify whether the translated names can point back to the original text.

- In the node, check the selected knowledge base collections and their vector models, and open the search parameter panel to verify the values item by item.
- In the conversation, open the citation superscript, compare it against the source document, and check whether the cited snippets in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` correspond to the original paragraphs.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
