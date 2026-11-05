---
title: Citations and Source Traceability for Vocational School Student Internships: Find Supporting Evidence
slug: /en/industry/education-d001-c030-f010
page_type: 行业问题页
application_area: education
meta_title: Student Internships | Citations | Evidence
meta_description: Student Internships: review citations for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Vocational School Student Internships: Find Supporting Evidence

## What this category's data looks like

Vocational school student internship management materials cover three types: internship agreements, internship plans, and internship logs. Agreements state the unit, position, term, remuneration, and signatures and seals; plans state the batch, rotation, mentoring, and date arrangements; logs record the position, tasks, duration, and signature on a daily basis. When these three types of materials enter the knowledge base retrieval node, each is cited as an independent source: agreements are used to verify the entity and term, plans are used to verify the batch and rotation, and logs are used to verify on-duty records and receipts. Materials are often updated by semester or batch, versions easily coexist with old drafts, the name, quantity, and date of the same record may not match across the three materials, and missing signatures or receipts may also occur.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length may be 0. "Basis items that can be traced back to the original text" are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Internship agreement | Fields include unit, position, term, remuneration, and signature; dates and signatures must match the plan and log | In the citation array, open the footnote markers one by one, trace back to the original agreement paragraphs, and check whether the fields and signatures are complete |
| Internship plan | Fields include batch, rotation, mentoring, and dates; must be consistent with the agreement term and log dates | Against the cited source identifiers, check whether the names, quantities, and dates in the plan match the other two materials |
| Internship log | Fields include position, tasks, duration, and signature receipt; dates must fall within the plan batch | Use `quoteList` to expand the cited fragments, check the log dates and signature receipts, and record the number of array items |
| Cited content output | The number of returned items matches the materials hit; being empty is also normal | Run a test with a question that matches no materials, and see whether the array is empty while the chain continues; when limits are involved, check `quoteMaxToken` and `responseData` (non-streaming module results returned with detailed output enabled), and record the item count separately |

## Three common errors

- Symptom: the position name and internship duration for the same student do not match between the agreement and the log. Cause: the two materials were entered separately and were not checked against the same field definitions.
- Symptom: the plan has been updated, but the log is still filled in according to the old batch dates. Cause: versions were not synchronized, and the old draft and new draft coexist in the knowledge base.
- Symptom: the log lacks a signature or receipt, and the agreement lacks a sealed page. Cause: signatures and receipts were not verified page by page when the materials were archived.

## How to verify the setup

Acceptance for this feature: ask a question that has a basis in the original text, and check whether the citation array and footnote markers can trace back to the original text; then ask a question that matches no materials, confirm that the array is empty while the chain runs through, and record `quoteList` within `responseData`.

Business test: ask a cross-material basis question, and see whether the answer gives a traceable source.

- In the node, check whether the selected knowledge base collections and their vector models are consistent.
- Open the search parameter panel and check the values item by item; when limits are involved, check the tokens of the cited text, and record the number of array items separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
