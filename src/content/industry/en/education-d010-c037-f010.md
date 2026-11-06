---
title: Citations and Source Traceability for Vocational Training Subsidy Applications: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c037-f010
page_type: 行业问题页
application_area: education
meta_title: Training Subsidies | Citations | Operations
meta_description: Training Subsidies: review citations for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Vocational Training Subsidy Applications: Coordinate Operations and Application Handover

## What this category's data looks like

Vocational training subsidy claim materials include three types: class opening filing forms, attendance records, and completion assessment forms. Fields include institution name, class batch number, trainee name, ID number, date, signature, and receipt. The class opening filing form defines the training entity and course; attendance records accumulate daily attendance; the completion assessment form provides scores and conclusions. Materials come from declaration system exports and scanned copies, archived by class batch, and updates follow supplementary entries, corrections, and reviews. When entering the knowledge base retrieval node, the three types of materials each serve as citable original text passages; the cited content array provides fragments and source identifiers based on hits, for subsequent nodes to compare fields, write ledgers, and generate reports.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs a cited content array, each entry containing an original text fragment and a source identifier, and the length can be 0. The handover-ready deployment status and operation records are completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Class opening filing form | Whether the institution name, class batch number, course name, class opening date, signature, and receipt are complete, and whether the same fields can match those in the attendance records and completion assessment form | Open the citation marker to refer back to the original text, and verify fields, dates, and signatures item by item; record the array length and source identifiers, and check whether `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` bring out the corresponding fragments |
| Attendance records | Whether trainee name, ID number, attendance date, and signature are complete day by day, and whether they are consistent with the class batch number in the filing form and the number of people in the completion assessment form | Search using the same class batch number, and compare names, quantities, and dates in the two materials; separately note entries missing signatures or receipts |
| Completion assessment form | Whether the assessment date, score, conclusion, signature, and receipt are complete, and whether they correspond to the attendance days in the attendance records and the course in the filing form | Open the citation marker in the conversation to compare against the source document; mark item by item any inconsistencies in names, quantities, and dates for the same record across the two materials |
| Cited content output | The number of returned entries is consistent with the materials hit; being empty is also normal, and the output chain continues to run through | Run a test with a question that has no matching materials, and see whether the array is empty while the chain continues; record the number of citations by array length, and treat `quoteMaxToken` only as a content budget, without comparing the two for equality |

## Three common errors

- Phenomenon: The same trainee's name or ID number is written differently in the two materials. Cause: Entry was not unified according to the filing form, and corrections were not synchronized to the other material.
- Phenomenon: The attendance days in the attendance records do not match the days filled in the completion assessment form. Cause: After supplementary entry or review, only one copy was changed, versions were not synchronized, and dates and quantities became misaligned.
- Phenomenon: The filing form or assessment form lacks signatures or receipts. Cause: Scanned copies missed pages or item-by-item verification was not performed during handover, making it impossible to refer fields and dates back to the original text.

## How to verify the setup

This feature acceptance: ask a question with original text support, check whether the citation array and markers can refer back to the original text, and see whether `quoteList` within `responseData` bring out fragments; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business testing: verify item by item once according to the handover sheet, see which record is missing, and align the three: version, connection, and task records.

- In the node, check the selected knowledge base collections and their vector models, open the search parameter panel, and verify the values item by item.
- Run a test with a question that has no matching materials, record the array length and the `quoteMaxToken` budget, and register them separately without mixing comparisons.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
