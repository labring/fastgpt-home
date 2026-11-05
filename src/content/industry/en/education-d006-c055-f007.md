---
title: Conversation Records and Traceability for Adult College Entrance Applications and Admissions: Track Progress and Check Statistics
slug: /en/industry/education-d006-c055-f007
page_type: 行业问题页
application_area: education
meta_title: Adult Admissions | Chat Records | Progress
meta_description: Adult Admissions: review chat records for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Adult College Entrance Applications and Admissions: Track Progress and Check Statistics

## What this category's data looks like

Adult college entrance examination registration and admission management involves three types of materials: registration forms, care bonus point materials, and admission rosters. Registration forms record the candidate's basic information and application preferences, care bonus point materials record bonus point items and review conclusions, and admission rosters determine the final admission result and major. The three types of materials are updated intensively by registration season, and are checked on a rolling basis during the admission stage. Field characteristics include name, ID number, application level, bonus point value, admitted major, date, and signature field. When the materials enter the conversation logs and auditing function, registration forms and admission rosters serve as sources of progress records, while care bonus point materials serve as sources of exception explanations for statistical criteria, each taking on the roles of verification baseline and discrepancy explanation.

## Configuration and implementation checks

| Object | Check | Verification action |
| --- | --- | --- |
| Item | Judgment | Verification Action |
| Registration Form | Name, ID number, application level, and date signature are complete, consistent with the admission roster | Pull the session records by `chatId`, and check the registration form fields against the corresponding items in the roster |
| Preferential Bonus Point Materials | Bonus point item, score value, review conclusion, and date signature are traceable | Locate the bonus point entry in the records, and verify the referenced information and signed receipt |
| Admission Roster | Admission major, level, date, and signature match the registration form | Use `dataId` to locate a single record, and compare the roster with the registration form |

## Three common errors

- Symptom: the same candidate's name or date does not match between the registration form and the admission roster. Cause: the two materials are registered separately, and versions are not synchronized.
- Symptom: care bonus point materials lack a signature or receipt, making them unconfirmable during statistics. Cause: the signature document was not collected during the material circulation process.
- Symptom: the total record count returned by the interface is inconsistent with the number of sessions in the interface. Cause: the total record count is the number of messages, which is not the same unit as the number of sessions.

## How to verify the setup

This feature's acceptance: paginate through all records by the total record count total, response `code` of 200, and sample one record to verify role, reference information, and time.

Business test: use one week of records to verify the total, and check whether the criteria and exceptions are clearly stated.

- Pull two consecutive pages and compare the offset and total record count to confirm that the number of records matches the total.
- Open one record and verify the role field, reference, and elapsed time field to confirm that message roles correspond to the original conversation.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
