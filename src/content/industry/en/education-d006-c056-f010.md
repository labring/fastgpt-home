---
title: Citations and Source Traceability for Teacher Qualification Exams and Certification: Track Progress and Check Statistics
slug: /en/industry/education-d006-c056-f010
page_type: 行业问题页
application_area: education
meta_title: Teacher Qualifications | Citations | Progress
meta_description: Teacher Qualifications: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Teacher Qualification Exams and Certification: Track Progress and Check Statistics

## What this category's data looks like

This category's data looks like this: Teacher qualification exams and certification involve written and interview registration forms, Mandarin proficiency certificates, medical examination forms, and other materials. Progress records and statistical verification depend on the fields, dates, and signatures in these materials. The registration form provides the subjects applied for, test area, payment, and confirmation information; the Mandarin proficiency certificate provides the level, certificate number, and issue date; the medical examination form provides the medical examination conclusion, hospital, and physician signature. Materials enter by batch, and the update rhythm is usually synchronized with registration, review, medical examination, and certification public announcement, with supplementary submissions and corrections. When entering the knowledge base retrieval node, these materials serve as cited sources for traceability and field comparison; the cited content array only carries the original text fragments and source identifiers, and does not undertake difference judgment.

## Configuration and implementation checks

Configuration and implementation checks: This step is executed by the citation output of the knowledge base retrieval node, outputting a cited content array, each entry containing an original text fragment and a source identifier, and the length may be 0. The progress table and statistical scope explanation are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Written and interview registration form | Whether the fields, dates, and signatures are consistent with the statistical scope, including subjects, test area, payment, and confirmation dates | Retrieve the cited fragments, compare field by field against the header scope, record exceptions, and mark the source identifiers |
| Mandarin proficiency certificate | Whether the level, certificate number, and issue date correspond to the name and ID number on the registration form | Locate the certificate fragment in the citation array, verify the name and date, and list missing signatures or receipts separately |
| Medical examination form | Whether the medical examination conclusion, hospital, and physician signature are complete, and whether the date falls within the valid interval | Use the cited fragments to point back to the original paragraphs, verify signatures and dates, and register items whose versions are not synchronized |
| Citation output and search parameters | Whether the number of citations matches the hit materials; empty is also normal; `quoteMaxToken` and search parameter values must be checked item by item | Run a test with a no-match question, observe that the array in `responseData` (non-streaming module results returned with detailed output enabled) is empty while the chain continues, then open `quoteList` to verify the sources |

## Three common errors

- Phenomenon: The name, quantity, or date of the same record does not match between the registration form and the Mandarin proficiency certificate. Cause: Materials are entered in batches, versions are not synchronized, and verification is not performed against a unified scope.
- Phenomenon: The medical examination form lacks a signature or receipt, but it is still counted in the total during statistics. Cause: Signatures and receipts are not used as conditions for entry, and exceptions are not clearly stated in the header.
- Phenomenon: There are no citation superscripts in the answer, or the cited fragments do not match the original text. Cause: First check whether this round hit and which materials were hit, then look at trimming, and do not directly attribute it to length trimming.

## How to verify the setup

How to verify the setup: Acceptance for this feature: ask a question with original-text support, and verify whether the citation array and superscripts can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain still runs through.

Business test: Use one week of records to verify the total, see whether the scope and exceptions are clearly stated, and check that the number of records matches the statistical count.

- Open the search parameter panel and verify item by item, and confirm that the associated knowledge base uses the same vector model; record the number of citations and the `quoteMaxToken` budget, and do not compare the two for equality.
- Open the citation superscripts in the conversation, and against the source documents verify whether each citation can point back to the original paragraph; for the empty-array scenario, confirm that the chain continues, and register exceptions and items whose versions are not synchronized.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
