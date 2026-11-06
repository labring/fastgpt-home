---
title: Conversation Records and Traceability for College Admissions and Application Placement: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c052-f007
page_type: 行业问题页
application_area: education
meta_title: College Admissions | Chat Records | Review
meta_description: College Admissions: review chat records for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for College Admissions and Application Placement: Trace Exceptions and Review Results

## What this category's data looks like

Admission and enrollment file placement materials of regular higher education institutions include enrollment plans, file placement rules, and admission rosters, divided into volumes by batch and subject category, with fields such as institution code, major code, planned number, file placement number, admission number, file placement date, and approval signature. Enrollment plans come from documents issued by provincial enrollment agencies, file placement rules come from the admission work notice of the current year, and admission rosters come from exports of university admission systems. After these three types of materials enter the conversation logs and auditing function, each plays a different role: enrollment plans and file placement rules serve as the basis for exception determination, admission rosters serve as the original records being traced, and the session message list only provides operational traces and citation sources, and does not replace business ledgers. The update rhythm is: plans are issued before batch admission, rules are synchronized during admission, and rosters are archived after admission, with dates and signatures rolling forward with the batch.

## Configuration and implementation checks

This step is executed by the conversation record interface (by application and session dimension), outputting the session message list and the total number of records, including role and citation information. The exception list and review conclusions are then completed manually or by an external system; the interface only retrieves conversation evidence and does not write to business ledgers.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment plan | The planned number is consistent with the institution code and major code in the plan volume and the attachment to the file placement rules, and the date and approval signature are complete | Retrieve the plan volume and rule attachment by batch, compare institution code, major code, planned number, file placement date, and signature column item by item, and check the conversation source corresponding to `chatId` |
| File placement rules | The file placement ratio, tie-breaking ranking, and withdrawal conditions are consistent in the main text of the rules and the remarks of the admission roster, and the version number and effective date are synchronized | Retrieve the main text of the rules and the roster remarks, compare the file placement ratio, ranking rules, effective date, and version number, check the text tokens of the entry referenced by `dataId`, and record the array length separately |
| Admission roster | The admission number, withdrawal number, and planned number match in quantity between the roster and the plan volume, and signatures and receipts are not missing | Check the admission number, withdrawal number, and planned number item by item by institution code, inspect the signature column and receipt number, and check the citation and elapsed-time information in the `value` field |
| Exception record | Exception entries are supported by original records, the reviewer's signature is complete, and the source materials can be traced | Trace back from the exception list to the session message list, locate the role and citation information, and compare the names, quantities, and dates of the three materials: enrollment plan, file placement rules, and admission roster |

## Three common errors

- Phenomenon: The planned number for the same institution code does not match between the plan volume and the admission roster. Cause: After batch adjustment, the plan volume was not updated synchronously, the roster was exported according to the adjusted quantity, and the versions of the two materials were not synchronized.
- Phenomenon: The file placement date differs by one day between the rule attachment and the roster remarks. Cause: During admission, rule revisions were not written back to the attachment, the roster recorded the actual file placement date, and the date fields were not aligned.
- Phenomenon: Exception list entries lack the reviewer's signature or receipt number. Cause: The registration step only exported the session message list, did not supplement signatures and receipts as required by business rules, and the total number of records was not checked against the business ledger.

## How to verify the setup

This function's acceptance: page through using the total number of records total to retrieve all records, and when the status code is 200, sample one record to check the role, citation information, and time, and verify the three fields `_id`, `dataId` and `value`.

Business test: create an exception record and see whether the source materials can be traced, comparing the names, quantities, and dates of the enrollment plan, file placement rules, and admission roster.

- Pull two pages in succession and compare total with the offset to confirm that the number of records matches the total, and check whether the role field matches the original conversation between question and answer.
- Open a single record to check the citation and elapsed-time fields, confirm that the number of cited entries and the cited text tokens are recorded separately, and do not compare `quoteMaxToken` with the array length for equality.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
