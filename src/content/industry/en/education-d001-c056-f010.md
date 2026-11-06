---
title: Citations and Source Traceability for Teacher Qualification Exams and Certification: Find Supporting Evidence
slug: /en/industry/education-d001-c056-f010
page_type: 行业问题页
application_area: education
meta_title: Teacher Qualifications | Citations | Evidence
meta_description: Teacher Qualifications: review citations for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Teacher Qualification Exams and Certification: Find Supporting Evidence

## What this category's data looks like

Teacher qualification examination and certification materials include written and interview registration forms, Mandarin proficiency certificates, medical examination forms, as well as certification application forms, ideological and moral character appraisal forms, etc. The registration form contains name, ID number, examination stage and subject, date, and signature; the Mandarin proficiency certificate contains grade, certificate number, and issue date; the medical examination form contains the medical examination conclusion, date, and hospital seal. Materials enter the knowledge base by certification batch, and the update cadence follows the announcement and correction notice for that round: the registration form is updated with registration review, the Mandarin proficiency certificate is valid long-term but the version needs to be verified, and the medical examination form has a validity period and must be issued within the specified time window. The three types of materials play different roles in basis query: the registration form is used to check examination eligibility and subjects, the Mandarin proficiency certificate is used to check grade and subject requirements, and the medical examination form is used to check the conclusion and validity period. Fields, dates, and signatures are the focus of comparison; the name, quantity, and date of the same record in two materials must match, and if a signature or receipt is missing, the basis is incomplete.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text snippet and source identifier, and the length can be 0. The "basis items that can be traced back to the original text" are completed next by subsequent AI nodes, code nodes, or manual work. Even if no content is retrieved, this output chain will still run through.

| Object | Check | Verification action |
| --- | --- | --- |
| Written and interview registration form | Fields, dates, and signatures must match the Mandarin proficiency certificate and medical examination form; the name, quantity, and date of the same record in two materials must be consistent | Check the name, ID number, examination subjects, signature, and date against the original text, record the number of cited items, and record the tokens of the cited text separately |
| Mandarin proficiency certificate | The grade, certificate number, and issue date must be consistent with the information recorded in the registration form and medical examination form, and the version must be currently valid | Open the citation marker to trace back to the original certificate text, check the grade and number, check whether the version is synchronized, and view the source identifier in `quoteList` |
| Medical examination form | The medical examination conclusion, date, and hospital seal must connect on the timeline with the registration form and Mandarin proficiency certificate; if a signature or receipt is missing, the basis is incomplete | Check the conclusion and date, confirm that the seal and receipt are complete, and use `responseData` (non-streaming module results returned with detailed output enabled) to check whether the length of the citation array is 0 |
| Knowledge base retrieval node | The associated knowledge base uses the same vector model, the number of cited content outputs matches the hit materials, and being empty is also normal | Check the selected collection and vector model, open the search parameter panel and check the values item by item, and confirm that `quoteMaxToken` is the citation content budget |

## Three common errors

- Symptom: the answer gives a conclusion but has no citation marker. Cause: the citation array is empty or the citations do not correspond to the original text; first check whether this round hit anything and which material was hit.
- Symptom: the date of the same record in the registration form and medical examination form does not match. Cause: the material versions are not synchronized, or the knowledge base was not updated after correction, causing the citation to point back to an old passage.
- Symptom: the Mandarin proficiency certificate is missing a signature or receipt. Cause: the scanned copy is incomplete, and the cited snippet does not match the original text; re-upload and verify the source identifier.

## How to verify the setup

Acceptance of this feature: ask a question with an original-text basis, and check whether the citation array and citation markers can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain still runs through.

Business test: ask a basis question across materials and see whether the answer provides a traceable source.

- Check whether the selected collection and vector model of the associated knowledge base are consistent, open the search parameter panel and check the values item by item.
- Run a trial with a question that has no matching materials, see whether the citation array is empty while the chain continues, and record the number of items and the tokens of the cited text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
