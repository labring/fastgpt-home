---
title: Citations and Source Traceability for Continuing Education Training Hour Recognition: Track Progress and Check Statistics
slug: /en/industry/education-d006-c038-f010
page_type: 行业问题页
application_area: education
meta_title: Continuing Education | Citations | Progress
meta_description: Continuing Education: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Continuing Education Training Hour Recognition: Track Progress and Check Statistics

## What this category's data looks like

The data for this category looks like this: Continuing education credit recognition involves three types of materials: course filing forms, study certificates, and credit recognition forms. The course filing form provides the course name, filing number, planned credit hours, and course start date, and is the starting point for progress records; the study certificate is issued by the teaching institution and states the actual study period, completed credit hours, and the handler's signature, and is used to verify whether a single study session was completed; the credit recognition form summarizes each record within the period, including recognized credit hours, recognition date, and review signature, and is the endpoint of the statistical scope. Materials are collected weekly or monthly, and the fields are mainly name, quantity, date, and signature. When entering this function, the three types of materials are retrieved as knowledge base sources, and the cited snippets are used to refer back to the original text. The progress table and statistical scope description are completed by subsequent nodes or manually based on the citations by comparing fields, writing ledgers, and generating reports.

## Configuration and implementation checks

Configuration and implementation checks: This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text snippet and source identifier, and the length can be 0. The progress table and statistical scope description are then completed by subsequent AI nodes, code nodes, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Course filing form | Whether the course name, filing number, planned credit hours, course start date, and filing signature are complete, and whether the course name and date match those in the study certificate | Open the citation marker to refer back to the original text of the filing form, compare name, quantity, date, and signature item by item, and register inconsistencies for verification |
| Study certificate | Whether the actual study period, completed credit hours, handler's signature, and receipt are complete, and whether the name and quantity of the same record are consistent with the recognition form | Locate the study certificate paragraph in the cited snippet, verify the credit hours and date, and check whether the signature or receipt is missing |
| Credit recognition form | Whether the total recognized credit hours equal the sum of the individual records, whether the statistical scope is stated in the header, and whether exceptions are noted | Use one week's records to verify the total, check the header scope and exception notes, and confirm that the number of records matches the statistical count |
| Cited content output | Whether the number of returned items matches the materials hit; an empty result is also normal, and the output chain continues to work | Run a test with a question that has no matching materials to see whether the array is empty while the chain continues; also use a question with original text support to verify the citation marker refers back, and record the array item count and the tokens of the cited text separately. `quoteMaxToken` is only a content budget and is not compared for equality with the item count |

## Three common errors

- Symptom: The course name, credit hour quantity, and course start date of the same record do not match between the course filing form and the study certificate. Cause: The two materials are filled in by different steps, and fields were not compared item by item during collection.
- Symptom: The credit recognition form has been updated, but the study certificate is still the old version, and the versions are not synchronized. Cause: The materials are updated at different paces, and there is a lack of traceback verification based on the recognition form.
- Symptom: The study certificate lacks the handler's signature or receipt, but the recognition form has already included it in the total. Cause: Signatures and receipts are not used as preconditions for recognition, and the statistical scope does not state exception handling in the header.

## How to verify the setup

Acceptance for this function: ask a question with original text support, and verify whether the citation array and citation markers can refer back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain works. You can view `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` to help locate cited snippets. Record the array item count separately; `quoteMaxToken` is only a content budget.

Business test: use one week's records to verify the total, and check whether the scope and exceptions are clearly stated.

- In the node, verify whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- Open the citation markers in the conversation, check against the source documents whether each citation can refer back to the original paragraph, and register inconsistencies in name, quantity, date, and signature for verification.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
