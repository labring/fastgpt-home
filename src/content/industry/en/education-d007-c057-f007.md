---
title: Conversation Records and Traceability for National Key Research and Development Applications: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c057-f007
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Chat Records | Review
meta_description: National R&D Grants: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for National Key Research and Development Applications: Trace Exceptions and Review Results

## What this category's data looks like

The category materials for National Key R&D Program project applications include the project application form, the budget application form, and the cooperation agreement. Their sources are the filings submitted by each applicant unit and the sealed copies of the consortium, and their update cadence follows the application milestones, with batch submission and revision. The project application form carries the research objectives, task breakdown, and assessment indicators; the budget application form carries the funding subjects, calculation basis, and annual allocation; the cooperation agreement carries the consortium division of labor, intellectual property, and signature and receipt confirmations. When these three types of materials enter the conversation logs and audit function, their respective roles are: the project application form provides task and indicator fields, the budget application form provides amount, quantity, and date fields, and the cooperation agreement provides signatory, signature, and receipt fields. Together, the three form the raw record pool for exception tracing.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), which outputs the session message list and the total record count, including role and citation information. The "exception list and review conclusion" is then completed by a human or an external system. When the interface pulls pages, it distinguishes the two role types of question and answer, and carries citation and elapsed-time fields.

| Object | Check | Verification action |
| --- | --- | --- |
| Application and session identifiers | Consistent with the actual application and the actual session | Check the source of the two identifiers in the request parameters, and check whether `chatId` and `value` correspond to the same session |
| Pagination parameters | Record count and total count match | Pull two consecutive pages and check the total record count and advance the offset by the number of records retrieved; after confirming response `code` of 200, check whether `dataId` is continuous |
| Project application form and budget application form | The name, quantity, and date of the same record do not match across the two materials | Sample one task name and budget quantity, and compare the date and signature field by field between the two materials |
| Cooperation agreement | Missing signature or receipt, version not synchronized | Check the signatory signature page and the receipt date, and compare whether the agreement version number and the application form version number are consistent |

## Three common errors

- Symptom: the name and quantity of the same task do not match across the two materials. Cause: the project application form and the budget application form are filed separately, versions are not synchronized, and a cross-check step is missing.
- Symptom: the cooperation agreement is missing a signature or a receipt date. Cause: the consortium's sealed copy is returned late, and the signature page and receipt were not treated as mandatory check fields at registration.
- Symptom: the interface returns empty but a session exists in the UI. Cause: the sources of the application and session identifiers are inconsistent, or only the first page was retrieved and the total record count was not fully paged through.

## How to verify the setup

This feature's acceptance: page through all records according to the total record count, sample one record to check the role, citation information, and time, and confirm that `_id`, `dataId` and `value` can locate the source record.

Business test: create one exception record, see whether it can be traced back to the source material, and compare the fields, dates, and signatures of the project application form, budget application form, and cooperation agreement.

- Pull pages by application and session dimension, check the total record count and response `code` of 200, and confirm that the question and answer roles appear alternately.
- Open a single record to check the citation and elapsed-time fields; the citation count is recorded by array length, and the citation content budget is checked separately for tokens.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
