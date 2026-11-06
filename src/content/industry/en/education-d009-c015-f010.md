---
title: Citations and Source Traceability for School Mental Health Screening and Referrals: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c015-f010
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Citations | Multilingual
meta_description: Student Mental Health: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Mental Health Screening and Referrals: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page addresses the primary and secondary school mental health screening and referral scenario, and the materials include three types: screening plans, interview records, and referral forms. A screening plan carries scale fields, screening date, and the signature of the responsible person; an interview record carries the student's pseudonym, interview time, risk level, and the interviewer's signature; a referral form carries the reason for referral, the receiving unit, the receipt, and the signatures of both parties. When these three types of materials enter the knowledge base retrieval node, each participates in vector search as an independent source, and after a hit, cited snippets and source identifiers are returned by paragraph. Terminology handling focuses on unifying translated names in multilingual materials, requiring that the same term be consistent throughout and that the translated name can point back to the original text. In terms of update cadence, screening plans are adjusted with the semester, while interview records and referral forms are generated with individual cases; versions need to be synchronized to avoid mismatches in names, quantities, and dates for the same record across two materials.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text snippet and a source identifier, and the length may be 0. The "unified terminology glossary and comparison draft" is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | Fields include the scale name, screening date, and signature of the responsible person; the translated name of the same term must be consistent with the comparison draft and able to point back to the original text | Open the citation markers one by one in the citation array, and verify the fields and signature against the original paragraph of the plan |
| Interview record | Fields include the student's pseudonym, interview time, risk level, and interviewer's signature; the name and date of the same record must not conflict with the referral form | Use the same pseudonym to search in the citation array, and check whether the dates and quantities in the interview record and referral form match |
| Referral form | Fields include the reason for referral, receiving unit, receipt, and signatures of both parties; the version must be synchronized with the screening plan | Verify the reason for referral and receipt in the cited snippet, and confirm that the version number is consistent with the screening plan |
| Cited content output | The number of returned items is consistent with the materials hit, and being empty is also normal; `quoteMaxToken` is the cited content budget, and the item count is recorded separately | Run a test with a question that matches no materials, and check whether the array in `responseData` (non-streaming module results returned with detailed output enabled) is empty while the pipeline continues |

## Three common errors

- Symptom: the name and date of the same student do not match between the interview record and the referral form. Cause: the two materials are updated separately, versions are not synchronized, and the cited snippets come from paragraphs of different versions.
- Symptom: the referral form lacks a receipt or signature, but the citation array still returns snippets. Cause: signature fields were not validated when the materials were ingested into the knowledge base, and the original text snippets are output directly after a retrieval hit.
- Symptom: cited snippets do not match the original text and are misjudged as length truncation. Cause: first check whether there was a hit in this round and which material was hit, then look at `quoteMaxToken` truncation, and do not directly attribute it to length.

## How to verify the setup

This feature's acceptance: ask a terminology question with an original-text basis, check whether the citation array and citation markers can point back to the original paragraph, and record the array length and the `quoteMaxToken` budget; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through.

Business testing: sample three terms and check whether their spelling is consistent throughout, verify whether the translated names can point back to the original text, and compare the fields, dates, and signatures of the interview records and referral forms.

- Open the citation markers, compare them one by one against the source documents, and verify whether the original text snippets and source identifiers in `quoteList` are consistent.
- Run a test with a question that matches no materials, confirm that the citation array in `responseData` is empty and the pipeline continues, and record the number of array items and the value of `quoteMaxToken`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
