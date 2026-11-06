---
title: Citations and Source Traceability for Research Outcome Registration and Intellectual Property: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c061-f010
page_type: 行业问题页
application_area: education
meta_title: Research IP | Citations | Intake
meta_description: Research IP: review citations for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Outcome Registration and Intellectual Property: Handle Questions and Collect Missing Information

## What this category's data looks like

Research achievement registration and intellectual property management involves three types of materials: achievement registration forms, patent disclosure documents, and software copyright materials. The achievement registration form records the achievement name, completers, date, and signature, and is the primary basis for registration intake; the patent disclosure document carries the technical solution, inventors, filing date, and seal, and is used to verify ownership and novelty clues; the software copyright materials include source code, specifications, version number, and receipt acknowledgment, and are used to verify the version and ownership of rights. When these three types of materials enter the Q&A intake and missing-item follow-up function, each participates in retrieval as an independent knowledge base source: the achievement registration form provides registration fields, the patent disclosure document provides technical disclosure fields, and the software copyright materials provide version and receipt fields. Materials are updated in batches, and the same record may appear in two materials successively, so names, quantities, dates, and signature statuses need to be compared item by item. The field characteristics are multiple sources, multiple versions, and some fields missing; missing items are exposed by the retrieval results and then handed off to subsequent nodes to follow up and complete.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text snippet and a source identifier, and the length can be 0. The "intake records and items to be completed" are then handled by subsequent AI nodes, code nodes, or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Achievement registration form | Whether the name, completers, date, and signature fields are complete, and whether the name, quantity, and date of the same record match those in the patent disclosure document | Open the citation marker to point back to the original paragraph in the achievement registration form and compare field by field; record the number of citations and source identifiers, and check the citation array in `responseData` (non-streaming module results returned with detailed output enabled) |
| Patent disclosure document | Whether the technical solution, inventors, filing date, and seal match the corresponding record in the achievement registration form, and whether the version is synchronized | Expand the cited snippet in the conversation and check the seal and date against the original disclosure document; use `quoteList` to view the hit material and confirm that citations correspond one-to-one with the original paragraphs |
| Software copyright materials | Whether the source code version number, specification date, and receipt acknowledgment are complete, and whether the name and quantity match the same record in the registration form | Open the citation marker to check the version number and receipt; run a test with a question that has no matching material to confirm that the citation array is empty while the chain continues |
| Cited content output | The number of returned entries is consistent with the hit materials, and being empty is also a normal output | Record the array length and the `quoteMaxToken` budget separately, and do not compare the two for equality; verify that the cited text tokens and the number of entries are each independent |

## Three common errors

- Symptom: the name or date of the same achievement does not match between the registration form and the disclosure document. Cause: the two materials were entered in different batches, and the fields entered retrieval without cross-checking.
- Symptom: the version number of the software copyright materials is inconsistent with the specification date. Cause: after a version update, only some files were replaced, the old version was not taken down in sync, and retrieval hits were mixed.
- Symptom: the disclosure document or receipt lacks a signature, but the intake record still shows the materials are complete. Cause: the signature and receipt fields were not included in the scope of missing-item identification, and the follow-up step did not cover that field.

## How to verify the setup

This function's acceptance: ask a question with original-text support and check whether the citation array and markers can point back to the original text; then ask a question with no matching material and confirm that the array is empty while the chain runs through.

Business test: ask a question missing key information and see whether it follows up before answering.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- Run a test with a question that has no matching material, record the citation array length and the `quoteMaxToken` budget, and confirm that the chain continues when the array is empty.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
