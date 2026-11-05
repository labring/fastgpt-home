---
title: Citations and Source Traceability for Vocational Training Subsidy Applications: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c037-f010
page_type: 行业问题页
application_area: education
meta_title: Training Subsidies | Citations | Review
meta_description: Training Subsidies: review citations for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Vocational Training Subsidy Applications: Trace Exceptions and Review Results

## What this category's data looks like

This category's data involves three core types of materials: training class filing, attendance records, and completion assessment forms. Class filing records the institution, occupation type, class start date, student roster, and approval signature, and is the starting point for subsidy eligibility; attendance records record student attendance by day, including name, date, sign-in handwriting or electronic receipt; completion assessment forms state the assessment subjects, scores, assessor signature, and institution seal. At the time of application, the three types of materials together form a chain of evidence, and after entering the knowledge base retrieval node, each serves as a citable original text passage. The update rhythm of materials is affected by class batches, supplementary sign-ins, and supplementary assessment entries. The same student information may change successively across different materials. Field characteristics are mainly names, quantities, dates, and signatures, and version differences and missing items are the focus of tracing.

## Configuration and implementation checks

The citation output of the knowledge base retrieval node outputs only an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. The exception list and review conclusions must be handled next by subsequent AI nodes, code nodes, or manual work. The cited content is output as an array, and the length can be 0; even if no content is found, the output chain will still run through.

| Object | Check | Verification action |
| --- | --- | --- |
| Training class filing | Whether the institution name, occupation type, class start date, student roster, and approval signature are complete, and whether the date connects with the start date of the attendance records | In the node, check the selected collection and its vector model; open the citation marker and compare it against the original filing passage |
| Attendance records | Whether the daily sign-in name, date, handwriting, or electronic receipt is consistent with the filed student roster, and whether missing sign-in dates are marked | Run a test with a question that has no matching materials, and see whether the output is empty while the chain continues; check the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) |
| Completion assessment form | Whether the assessment subjects, scores, assessor signature, and institution seal are complete, and whether the name matches in all three places: filing, attendance, and assessment | Open the search parameter panel and check item by item; check whether the cited fragment in `quoteList` can point back to the original assessment form text |
| Cited content output | The number of returned items is consistent with the matched materials, and being empty is also normal; the tokens of the cited text are recorded separately, and the number of items is not compared for equality | Open the citation marker in the conversation and compare it against the source document; check whether `quoteMaxToken` is the budget for cited content |

## Three common errors

- Phenomenon: The same student name is written differently in the class filing and attendance records, and the quantities do not match. Cause: At entry, it was not unified according to the ID name, and after supplementary sign-in, the filed roster was not updated synchronously.
- Phenomenon: The date of the completion assessment form is earlier than the last day of the attendance records, and the versions are not synchronized. Cause: The assessment form draft was produced first, and after attendance was supplemented, the assessment form date was not revised back.
- Phenomenon: The class filing lacks an approval signature, and the attendance records lack receipts. Cause: The signature step was skipped during material circulation, and scanned copies were not added to the knowledge base.

## How to verify the setup

Acceptance of this feature: ask a question with original text support, and check whether the citation array and citation marker can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain still runs through.

Business test: create an exception record and see whether it can be traced back to the source material.

- Open the search parameter panel and check item by item, confirming that the values are consistent with those set in the knowledge base retrieval section.
- Open the citation marker in the conversation and compare it against the source document, confirming that each citation can point back to the original text passage.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
