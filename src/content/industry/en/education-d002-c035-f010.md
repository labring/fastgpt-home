---
title: Citations and Source Traceability for Enterprise Employee Skills Assessment: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c035-f010
page_type: 行业问题页
application_area: education
meta_title: Employee Skills | Citations | Checks
meta_description: Employee Skills: review citations for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Enterprise Employee Skills Assessment: Compare Documents and Locate Differences

## What this category's data looks like

In the enterprise independent skilled talent evaluation scenario, materials usually come from three categories: enterprise evaluation filing forms, evaluation specifications, and candidate rosters. The filing form records the evaluation occupation, level, batch, evaluation method, and filing date, and includes the unit seal and handler signature; the evaluation specification states the assessment modules, weights, passing scores, and scoring rules, and often carries a version number and release/revision dates; the roster lists candidate names, ID numbers, declared levels, job types, payment and qualification status, and includes the reviewer signature and receipt. The three types of materials have different update rhythms: the roster is updated on a rolling basis with registration and qualification review, the filing form may be supplemented with changes after being submitted once per batch, and the evaluation specification is re-versioned when institutional adjustments occur. When entering the knowledge base retrieval node, they each serve as citable original text sources and are ingested using the same vector model; after a retrieval hit, they are returned as citation snippets with source identifiers for subsequent comparison of fields, dates, and signatures.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each containing an original text snippet and a source identifier, and the length can be 0. Even if no content is found, the output chain still runs through, and the discrepancy list must be continued by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Enterprise evaluation filing form | Fields, dates, and signatures: whether the occupation name, level, batch, evaluation method, filing date, unit seal, and handler signature match the roster and evaluation specification | Open the citation marker to point back to the original snippet of the filing form, compare item by item with the corresponding fields in the roster and evaluation specification, and record discrepancies in names, quantities, and dates |
| Evaluation specification | Fields, dates, and signatures: whether the assessment modules, weights, passing scores, version number, release and revision dates, and approval signature are consistent with the filing form and roster | Open the citation marker in the conversation, verify the specification version number against the filing form batch date, and mark versions that are not synchronized |
| Candidate roster | Fields, dates, and signatures: whether the name, ID number, declared level, job type, payment and qualification status, reviewer signature, and receipt are consistent with the filing form and evaluation specification | Run a trial with one real record, verify the number of citation array entries and the hit materials, compare the roster and ledger fields, and record missing signatures or receipt items |
| Citation content output | Citation content is output as an array, and the length can be 0; the number of entries is consistent with the hit materials, and being empty is also normal | Run a trial with a question that has no matching materials, and see that the output is empty while the chain continues; when the citation limit is involved, verify the tokens of the citation text, record the number of array entries separately, and do not compare it for equality with `quoteMaxToken` |

## Three common errors

- Symptom: the same candidate name or ID number does not match between the roster and the filing form. Cause: information changes after registration were not written back to the filing form, or the two materials were entered separately by different handlers.
- Symptom: the version number of the evaluation specification is inconsistent with the filing form batch date. Cause: after the system was re-versioned, the old specification is still in the knowledge base, retrieval hits the old snippet, and the version is not synchronized.
- Symptom: the roster lacks the reviewer signature or receipt. Cause: the qualification review step was not completed, the materials were ingested first, and the citation snippet can be hit but the signature field is empty.

## How to verify the setup

Acceptance of this feature: ask a question with original text support, and verify whether the citation array and citation markers can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through; also verify that the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) is consistent with the hit materials, and when the citation limit is involved, verify the tokens of the citation text, record the number of array entries separately, and do not compare it for equality with `quoteMaxToken`.

Business test: use one real record to find fields inconsistent with the ledger, record discrepancies in names, quantities, and dates, submit them to the reviewer for confirmation, and write them back.

- In the node, verify the selected collections and their vector models, and confirm that the associated knowledge bases use the same vector model.
- Open the search parameter panel and verify the values item by item, keep them consistent with those set in the knowledge base retrieval section, and verify the citation source identifiers in `quoteList`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
