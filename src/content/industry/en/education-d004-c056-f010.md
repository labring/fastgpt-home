---
title: Citations and Source Traceability for Teacher Qualification Exams and Certification: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c056-f010
page_type: 行业问题页
application_area: education
meta_title: Teacher Qualifications | Citations | Handover
meta_description: Teacher Qualifications: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Teacher Qualification Exams and Certification: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This category's data looks like this: Teacher qualification examination and certification involve three core types of materials: written and interview registration forms, Mandarin proficiency certificates, and medical examination forms. The registration form contains identity information, examination subjects, examination district, and signature fields; the Mandarin proficiency certificate contains grade, test date, certificate number, and issuing institution; the medical examination form contains examination items, conclusion, physician signature, and hospital seal. The three types of materials play different roles in material drafting and handover of responsibility: the registration form is the source of examination eligibility and subject information, while the Mandarin proficiency certificate and medical examination form are required attachments in the certification stage. Field characteristics center on name, ID number, test or medical examination date, signature, and receipt. The update rhythm rolls with examination batches and certification announcements. The same record often appears in multiple materials, and names, quantities, and dates are prone to inconsistency. Unsynchronized versions and missing signatures or receipts are the main bottlenecks in the handover stage. After materials enter the knowledge base retrieval node, they are retrieved and traced as cited sources, supporting subsequent drafting and handover comparison.

## Configuration and implementation checks

Configuration and implementation checks: This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. The "signable material drafts and handover records" are completed subsequently by AI nodes, code nodes, or manual work. Even if no content is found, the output chain still runs through.

| Object | Check | Verification action |
| --- | --- | --- |
| Written and interview registration form | Fields are complete: name, ID number, examination subjects, examination district, and signature fields correspond item by item; dates and versions are consistent | Check field by field against the registration form template, inspect whether signatures and receipts are complete, and record version and date |
| Mandarin proficiency certificate | Grade, test date, certificate number, and issuing institution are consistent with certification requirements; names and dates match across the two materials | Open the citation marker to point back to the original text, verify the certificate number and test date, and check whether signatures or receipts are missing |
| Medical examination form | Medical examination items, conclusion, physician signature, and hospital seal are complete; dates and versions are synchronized | Compare the medical examination conclusion and signature against the template, and verify whether names and dates are consistent with the registration form and Mandarin proficiency certificate |
| Knowledge base retrieval node | The associated knowledge base uses the same vector model; cited content is output as an array, and the length can be 0 | Verify the selected collection and vector model, run a trial with a question that has no matching materials, and see that the output is empty while the chain continues; record `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList`, record the number of citations separately, and use `quoteMaxToken` only as the content budget |

## Three common errors

- Phenomenon: The same name or date does not match between the registration form and the medical examination form. Cause: During material drafting, entries were not filled back according to the same record, and field-level comparison was missing before handover.
- Phenomenon: The Mandarin proficiency certificate number or test date is inconsistent with the certification materials. Cause: Versions were not synchronized, old citations continued to be used, and traceability did not point back to the original text.
- Phenomenon: The handover record lacks a signature or receipt, and the next step cannot sign for acceptance. Cause: Responsibility handover did not specify the responsible person, and missing template items were not blocked.

## How to verify the setup

Acceptance of this function: ask a question with original-text support and check whether the citation array and citation markers can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and record `quoteList` within `responseData`.

Business test: draft one copy according to the template and complete one handover to see whether missing items are blocked.

- Open the citation markers and verify item by item against the source document whether the cited fragments are consistent with the original paragraphs.
- Run a trial with a question that has no matching materials, confirm that the citation array is empty while the output chain continues; record the number of citations separately, and use `quoteMaxToken` only to check the tokens of the cited text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
