---
title: Citations and Source Traceability for Continuing Education Training Hour Recognition: Coordinate Operations and Application Handover
slug: /en/industry/education-d010-c038-f010
page_type: 行业问题页
application_area: education
meta_title: Continuing Education | Citations | Operations
meta_description: Continuing Education: review citations for operational handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Continuing Education Training Hour Recognition: Coordinate Operations and Application Handover

## What this category's data looks like

Recognition materials for continuing education credit hours usually include a course filing form, a study certificate, and a credit-hour recognition form. The course filing form is submitted by the training institution and contains the course name, number of credit hours, course start date, and the institution's seal; the study certificate is issued by the teaching party and contains the learner's name, course name, study start and end dates, and the teaching party's signature; the credit-hour recognition form is filled out by the employer or the competent authority and contains the recognized number of credit hours, recognition date, and the handling person's signature. When these three types of materials enter the knowledge base retrieval node, each plays a different role: the course filing form is used to check whether the course has been filed and the credit-hour basis, the study certificate is used to check the actual study records and dates, and the credit-hour recognition form is used to check the final recognition result and approval. The material update cadence usually changes with training batches and recognition cycles, and the field characteristics are concentrated in names, quantities, dates, and signature receipts. The name, quantity, and date of the same record in the three materials may not match; when versions are not synchronized or signature receipts are missing, gaps will appear on the handover form.

## Configuration and implementation checks

This link is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. The handover-ready deployment status and operation records are completed next by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Course filing form | Whether the course name, number of credit hours, course start date, and institution seal are consistent with the study certificate | In the citation array, point back to the original paragraphs one by one, and verify the name, quantity, date, and signature fields |
| Study certificate | Whether the learner's name, course name, study start and end dates, and teaching party signature are consistent with the credit-hour recognition form | Open the citation superscript to compare against the source document, and check whether the name, quantity, and date of the same record match in the two materials |
| Credit-hour recognition form | Whether the recognized number of credit hours, recognition date, and handling person's signature are complete, and whether the version is synchronized | Verify item by item according to the handover form to see which record is missing; record the number of citations separately, and control the tokens of the cited text with `quoteMaxToken` |
| Cited content output | The number of returned items is consistent with the matched materials; being empty is also normal, and the chain continues to run through | Run a test with a question that has no matching materials, and see that the output is empty while the chain continues; check the cited fragments and source identifiers in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` |

## Three common errors

- Symptom: The course name and number of credit hours of the same record do not match between the course filing form and the study certificate. Cause: The two materials are filled out at different stages, were not checked against a unified field basis, and only the totals were checked during handover rather than the details.
- Symptom: The credit-hour recognition form lacks the handling person's signature or receipt. Cause: The recognition process was not completed before entering handover, the signature step was skipped, and the deployment status and operation records cannot be closed.
- Symptom: The cited fragments do not match the original text, and there is no citation superscript in the answer. Cause: First check whether this round hit anything and which material was hit, then look at trimming; an empty citation array does not mean retrieval failed, an empty array is a normal output.

## How to verify the setup

Acceptance of this feature: ask a question with an original-text basis, and check whether the citation array and superscripts can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality; if a citation upper limit is involved, check the tokens of the cited text, and record the array item count separately.

Business test: verify item by item according to the handover form to see which record is missing. Against the course filing form, study certificate, and credit-hour recognition form, check whether the version, connections, and task records are consistent, and whether the signatures and receipts are complete.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and verify item by item, confirming that the values are consistent with those set in the knowledge base retrieval section; run a test with a question that has no matching materials, and see that the output is empty while the chain continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
