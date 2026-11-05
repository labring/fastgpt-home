---
title: Citations and Source Traceability for Teacher Qualification Exams and Certification: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c056-f010
page_type: 行业问题页
application_area: education
meta_title: Teacher Qualifications | Citations | Review
meta_description: Teacher Qualifications: review citations for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Teacher Qualification Exams and Certification: Trace Exceptions and Review Results

## What this category's data looks like

In the teacher qualification exam and certification scenario, the written and interview registration form, the Mandarin proficiency certificate, and the medical examination form each play a different role: the registration form records the exam level, subject, name, and ID number, and is the starting point for identity and exam information; the Mandarin proficiency certificate provides the grade, certificate number, and issue date, and is used to verify the qualification threshold; the medical examination form gives the medical examination conclusion, hospital seal, and date, and determines whether certification can proceed. The three materials are often updated by batch and by certification authority, and field names, date formats, and seal positions are not uniform. The same record may have mismatched names, quantities, or dates across two materials, with versions not synchronized or missing signature receipts. When the materials enter this feature, each is retrieved as an original document in the knowledge base, and the cited snippets are returned together with source identifiers, for subsequent use in comparing fields, writing ledgers, and generating reports.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text snippet and a source identifier, and the length can be 0. The exception list and review conclusions are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Written and interview registration form | Check whether the registration form is consistent with the Mandarin proficiency certificate and the medical examination form in name, ID number, and exam level and subject, and whether dates and signatures are complete | In the citation superscript, refer back to the original paragraph of the registration form and compare field by field; record the number of citations by the array length, and check the tokens of the cited text separately via `quoteMaxToken` |
| Mandarin proficiency certificate | Check whether the certificate number, grade, and issue date can correspond to the information filled in the registration form, and whether there is a version not synchronized or a missing receipt | Open the cited source document and compare the original certificate snippet with the source identifier; use `quoteList` to view the details returned by the node |
| Medical examination form | Check whether the medical examination conclusion, hospital seal, and examination date are complete, and whether the date chain with the registration form and Mandarin proficiency certificate connects | Open the citation superscript in the conversation and verify the original medical examination form; when there is no matching material, confirm that the array is empty and the chain runs through |
| Exception list and review conclusions | Each exception must be supported by an original record, and only after the reviewer signs can it be handed to the person in charge for handling | Use one exception record to trace back to the source material, and check whether the cited snippet and source identifier can refer back to the original text |

## Three common errors

- Symptom: there is no citation superscript in the answer, and the exception record cannot refer back to the original text. Cause: the citation output is not consumed by subsequent nodes, or the cited snippet and source identifier are not displayed with the answer.
- Symptom: the name and date of the same record do not match between the registration form and the Mandarin proficiency certificate. Cause: the versions of the two materials are not synchronized, or the field definitions are inconsistent at entry, and they were not updated by batch.
- Symptom: the medical examination form lacks a signature or receipt, yet the review conclusion is still advanced. Cause: the exception list did not check the seals of the original records one by one, and the reviewer handed it to the person in charge for handling without signing.

## How to verify the setup

Feature acceptance: ask a question with textual support, check whether the citation array and superscript can refer back to the original text, and record the array length and the tokens of the cited text; `quoteMaxToken` is only a content budget; then ask a question with no matching material, and confirm that the array is empty while the chain runs through.

Business test: create an exception record, see whether it can be traced back to the source material, and check whether the cited snippet and source identifier in `responseData` (non-streaming module results returned with detailed output enabled) correspond to the original text of the registration form, Mandarin proficiency certificate, or medical examination form.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- Run a trial with a question that has no matching material, see whether the output is empty while the chain continues, and check whether the citation superscript can refer back to the source document.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
