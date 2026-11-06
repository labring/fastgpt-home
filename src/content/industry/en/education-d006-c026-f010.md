---
title: Citations and Source Traceability for Degree Awards and Certificate Information Reporting: Track Progress and Check Statistics
slug: /en/industry/education-d006-c026-f010
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Citations | Progress
meta_description: Degree Certificates: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Degree Awards and Certificate Information Reporting: Track Progress and Check Statistics

## What this category's data looks like

This page addresses the scenario of progress records and statistical verification in degree conferral and certificate information reporting. The core materials are three types: degree application forms, thesis review forms, and defense resolutions. The degree application form carries basic fields such as the applicant's identity, discipline and major, and degree category, and is the starting point for the number of records and statistical criteria in the progress table; the thesis review form provides the review conclusion, review date, and reviewer signature, and is used to check whether the name and quantity of the same record in the review stage match the application form; the defense resolution records the defense date, resolution conclusion, and defense committee signatures, and is the basis for determining the conferral result and receipt status. The three types of materials are updated with batch reporting, usually summarized weekly or monthly, and their field characteristics center on name, student ID, major, date, conclusion, signature, and receipt number. After the materials enter the knowledge base retrieval node, each is cited in the form of an original text snippet, providing a traceable source for subsequent field comparison, ledger writing, and report generation.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text snippet and a source identifier, and the length may be 0. The "progress table and statistical criteria description" is completed subsequently by an AI node, a code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | Whether the fields, dates, and signatures are consistent with the statistical criteria header | Check name, student ID, major, degree category, application date, and signature column item by item, and confirm that the number of records for the same record in the progress table corresponds to the number of application form entries |
| Thesis review form | Whether the review conclusion, review date, and reviewer signature match the application form record | Compare the review conclusion and date for the same applicant, check whether the names, quantities, and dates in the two materials are consistent, and separately flag any missing signature or receipt |
| Defense resolution | Whether the defense date, resolution conclusion, and defense committee signatures are complete | Check the resolution conclusion and defense date, confirm that records whose versions have not been synchronized are flagged, and check whether the receipt number is consistent with the reporting list |
| Cited content array | The number of returned items is consistent with the materials hit; being empty is also normal | Run a test with a question that has no matching materials, and see that the output is empty while the chain continues; record the number of citations separately, `quoteMaxToken` only checks the tokens of the cited text, and `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` are used to review the original return |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the degree application form and the thesis review form. Cause: The two were filled in at different times, the versions were not synchronized, and the discrepancy was not flagged in the progress table.
- Symptom: The defense resolution lacks a signature or receipt, but the statistical total is still counted as reported. Cause: The signature column and receipt number were not included in the verification fields, and exceptional cases were not clearly stated in the criteria description.
- Symptom: The cited snippet does not match the original text, and the footnote cannot trace back. Cause: Failure to first check whether this round hit anything and which material was hit, directly attributing it to length truncation.

## How to verify the setup

Acceptance for this feature: ask a question with an original-text basis, and check whether the citation array and footnote can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: use one week of records to verify the total, and see whether the criteria and exceptions are clearly stated.

- Turn on citation footnotes, trace back to the original paragraphs against the source documents item by item, and confirm that the citations correspond to the original text.
- Open the search parameter panel and check item by item, confirming that the values are consistent with those set in the knowledge base retrieval section.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
