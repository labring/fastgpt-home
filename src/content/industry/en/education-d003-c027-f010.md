---
title: Citations and Source Traceability for Graduate Employment Contracts and Destination Statistics: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c027-f010
page_type: 行业问题页
application_area: education
meta_title: Graduate Destinations | Citations | Intake
meta_description: Graduate Destinations: review citations for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Graduate Employment Contracts and Destination Statistics: Handle Questions and Collect Missing Information

## What this category's data looks like

Materials for university employment signing and graduation destination statistics consist of three types: employment agreements, graduation destination registration forms, and employer certificates. The employment agreement carries the signing entity, position name, signing date, and signatures and seals of both parties; the graduation destination registration form carries the destination category, employer name, Unified Social Credit Code, reporting date, and personal confirmation; the employer certificate carries the hiring intention, position, salary basis, employer contact, date of issuance, and a sealed receipt. The three types of materials are usually updated in batches, with different rhythms during recruiting season and dispatch season, and there are differences in field naming, date formats, and signature positions. When the materials enter the Q&A intake and missing-item follow-up function, the employment agreement and employer certificate are used to cross-check names, quantities, and dates, the graduation destination registration form is used to check the destination category and registration status, and materials missing signatures or receipts are identified as pending items.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text snippet and a source identifier, and the length may be 0. "Accepted records and completed follow-up items" are then handled by subsequent AI nodes, code nodes, or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Employment agreement | Check whether the signing entity name, position name, signing date, and signatures and seals of both parties are complete | Open the citation marker to point back to the original paragraph of the agreement, and compare the name, date, and signature positions item by item |
| Graduation destination registration form | Check the destination category, employer name, Unified Social Credit Code, reporting date, and personal confirmation | Open the citation marker in the conversation, and check the fields and date formats against the original text of the registration form |
| Employer certificate | Check whether the hiring intention, position, date of issuance, employer seal, and receipt are complete | Run a test with a question that matches no materials, and see that the citation array is empty while the chain continues |
| Cited content output | The number of returned entries matches the materials hit, and being empty is also normal | Record the array length and `quoteMaxToken` and check them separately; do not compare them for equality |

## Three common errors

- Symptom: For the same record, the employer name and number of positions do not match between the employment agreement and the graduation destination registration form. Cause: The two materials are entered separately, versions are not synchronized, and field definitions are inconsistent.
- Symptom: The cited snippet does not match the original text, and there is no citation marker in the answer. Cause: First check whether this round hit anything and which material was hit, then look at trimming; do not directly attribute it to length trimming.
- Symptom: An employer certificate missing a signature or receipt is still accepted as a complete material. Cause: The missing item was not identified and followed up on, the material version was not synchronized, and the signature and receipt fields were not included in the check.

## How to verify the setup

Acceptance for this function: ask a question with original-text support, and check whether the citation array and markers can point back to the original text; then ask a question that matches no materials, and confirm that the array is empty while the chain still runs. Check the number of citations and the `quoteList` field in `responseData` (non-streaming module results returned with detailed output enabled); the number is the array length, and `quoteMaxToken` is the content budget; do not compare the two for equality.

Business test: ask a question missing key information, and see whether it follows up first before answering.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check each item, confirming that the values are consistent with those set in the knowledge base retrieval section.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
