---
title: Citations and Source Traceability for New Employee Onboarding and Training: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c040-f010
page_type: 行业问题页
application_area: education
meta_title: Employee Onboarding | Citations | Operations
meta_description: Employee Onboarding: review citations for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for New Employee Onboarding and Training: Coordinate Operations and Application Handover

## What this category's data looks like

For the deployment, operations, and application handover of enterprise new employee onboarding training, the materials are mainly onboarding training plans, course sign-in sheets, and job descriptions; when handing over to operations or the next shift, they must be checked item by item against the handover form. The onboarding training plan gives the course name, date, and version; when it enters knowledge base retrieval, it serves as a citation source, and when answering about deployment status and operation records, it points back to that plan paragraph; the course sign-in sheet records personnel, session, and signature, and is used to compare whether the name, quantity, and date of the same record match across the two materials; the job description states responsibilities, fields, and receipt requirements, and is used to verify missing signatures or receipts. The update rhythm follows batches: plan version changes, sign-in sheet supplementary signatures, and job description revisions are each ingested separately, and cited content is output as an array, whose length can be 0. The roles of the three types of materials in the feature are: the plan provides the basis for version and date, the sign-in sheet provides the basis for signatures and receipts, and the job description provides the basis for fields and responsibilities. When the three are inconsistent, first check which material the citation hit, then look at trimming.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. "Handover-ready deployment status and operation records" are completed afterward by subsequent AI nodes, code nodes, or humans. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality.

| Object | Check | Verification action |
| --- | --- | --- |
| Onboarding training plan | Fields include course name, date, and version, and are compared item by item with the sign-in sheet for consistency | In the node, check the selected knowledge base and vector model, and open the citation marker to point back to the original plan paragraph |
| Course sign-in sheet | The three columns of personnel, session, and signature are complete, and the name, quantity, and date of the same record match across the two materials | Run a test with a question that has no matching material, see that the output is empty while the chain continues, then check signatures and receipts item by item |
| Job description | Responsibilities, fields, and receipt requirements are complete, and the version is synchronized with the plan | Open the search parameter panel and check item by item, confirming that the cited fragments in `responseData` (non-streaming module results returned with detailed output enabled) match the original text |
| Cited content output | The number of returned items matches the materials hit, and being empty is also normal | Record the array length, check the tokens of the cited text separately, and check whether the source identifier in `quoteList` can point back to the original text |

## Three common errors

- Symptom: there is no citation marker in the answer. Cause: this round did not hit any material, or the cited fragment does not match the original text. First check which material was hit, then look at trimming, and do not directly attribute it to length trimming.
- Symptom: the name, quantity, and date of the same record do not match between the onboarding training plan and the course sign-in sheet. Cause: the version is not synchronized or the entry batch is different; it must be checked item by item against the handover form and then point back to the original text.
- Symptom: there is an answer but the citation array is empty. Cause: an empty array is a normal output and does not equal retrieval failure; confirm that the question has no matching material, then check the `quoteMaxToken` budget and the array item count separately and record them separately.

## How to verify the setup

Feature acceptance: ask a question with original-text support, check whether the citation array and citation marker can point back to the original text, and confirm that the source identifiers in `quoteList` within `responseData` are consistent; then ask a question with no matching material, and confirm that the array is empty while the chain runs through.

Business test: check once item by item against the handover form, see which record item is missing, and whether the version, connection, and task record are consistent; if a signature or receipt is missing, return it for supplementary entry.

- In the node, check the selected knowledge bases and their vector models, and open the search parameter panel to check the values item by item.
- Record the citation array length, check the tokens of the cited text separately, and compare the cited fragments against the source documents to check correspondence with the original text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
