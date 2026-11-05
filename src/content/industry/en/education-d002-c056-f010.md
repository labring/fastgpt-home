---
title: Citations and Source Traceability for Teacher Qualification Exams and Certification: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c056-f010
page_type: 行业问题页
application_area: education
meta_title: Teacher Qualifications | Citations | Checks
meta_description: Teacher Qualifications: review citations for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Teacher Qualification Exams and Certification: Compare Documents and Locate Differences

## What this category's data looks like

Teacher qualification exams and certification involve three types of materials: written and interview registration forms, Mandarin proficiency certificates, and medical examination forms. Each plays a different role: the registration form records the exam level, subjects, identity information, and exam date, serving as the starting point of the qualification chain; the Mandarin proficiency certificate carries the grade, certificate number, and test date, often serving as a prerequisite for certification; the medical examination form includes the examination conclusion, hospital opinion, and signature date, determining whether the certification can be submitted. Material sources are scattered: registration forms mostly come from exam registration system exports, Mandarin proficiency certificates come from testing institutions, and medical examination forms come from designated hospitals. Update rhythms vary: registration information changes with each exam session, Mandarin proficiency certificates are valid long-term but may be reissued or renewed, and medical examination forms have a short validity period and must be reissued according to the certification batch. Field characteristics center on names, quantities, dates, and signatures: in the same record across the two types of materials, the exact characters of the name, ID number, number of subjects, date nodes, and whether signatures and receipts are complete are all key verification points. After materials enter the knowledge base retrieval node, each is recalled as a citable original text fragment for subsequent comparison.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length can be 0. The "discrepancy list" is completed subsequently by an AI node, code node, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Written and interview registration form | Whether the name, quantity, date, and signature are consistent with the ledger | Locate the original registration form fragment in the citation array, verify item by item the exact characters of the name, number of registered subjects, exam date, and signature field, and record inconsistent fields |
| Mandarin proficiency certificate | Whether the grade, certificate number, and test date are consistent with the ledger | Open the citation marker to point back to the original certificate text, verify the grade, number, test date, and issuing institution, and mark positions where the version is not synchronized or fields do not match |
| Medical examination form | Whether the examination conclusion, hospital opinion, signature, and receipt are complete | Compare against the original medical examination form fragment, verify the conclusion, date, signature, and receipt, and list missing items separately for the reviewer |
| Citation content output | The number of returned items is consistent with the matched materials; being empty is also normal | Run a test with a question that matches no materials, check that the array length is 0 while the chain continues; then verify that `quoteMaxToken` only constrains the citation text budget, and record the number of items separately |

## Three common errors

- Phenomenon: In the same record, the exact characters of the name or the ID number do not match between the registration form and the Mandarin proficiency certificate. Cause: the two materials are entered by different institutions without unified verification.
- Phenomenon: The medical examination form version is not synchronized, and an old batch conclusion is used as the basis for the current batch. Cause: material update rhythms differ, and the date and batch were not checked during citation.
- Phenomenon: The cited fragment does not match the original text, or the answer has no citation marker. Cause: first check whether this round matched anything and which material was matched, then look at trimming, rather than directly attributing it to length trimming.

## How to verify the setup

Acceptance for this feature: ask a question with original text support, and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and verify the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) and the source identifier in `quoteList`.

Business test: use a real record to find fields inconsistent with the ledger, submit the discrepancy list to the reviewer for confirmation, and write it back.

- Verify item by item whether the selected knowledge bases use the same vector model, and open the search parameter panel to check the values
- Open citation markers in the conversation, and compare each citation against the source document to check whether it can point back to the original paragraph

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
