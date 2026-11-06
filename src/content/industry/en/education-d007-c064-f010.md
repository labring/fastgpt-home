---
title: Citations and Source Traceability for University Laboratory Safety Classification: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c064-f010
page_type: 行业问题页
application_area: education
meta_title: Lab Safety Categories | Citations | Review
meta_description: Lab Safety Categories: review citations for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for University Laboratory Safety Classification: Trace Exceptions and Review Results

## What this category's data looks like

This page addresses the scenario of safety grading and classification of university laboratories. The materials include three types: laboratory grading and classification tables, hazard source lists, and safety responsibility statements. The grading and classification table records the laboratory name, room number, hazard level, grading date, and responsible person's signature, and is the primary basis for exception determination and review; the hazard source list registers the names, quantities, storage locations, and update dates of chemicals, gas cylinders, equipment, etc., and is used to check whether the name, quantity, and date of the same record are consistent across the two materials; the safety responsibility statement sets out the responsibility level, signing date, and receipt, and is used to confirm whether the reviewer has a basis for signing. In terms of update cadence, the grading and classification table changes with laboratory adjustments or annual re-evaluation, the hazard source list changes frequently with procurement, requisition, and scrapping, and the responsibility statement is signed as personnel positions change. After the three types of materials enter knowledge base retrieval, each is cited in the form of original text fragments, for tracing back to the source when subsequently comparing fields, writing ledgers, and generating reports.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text fragment and a source identifier, and the length may be 0. The exception list and review conclusions are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Laboratory grading and classification table | Check whether the laboratory name, room number, hazard level, grading date, and responsible person's signature are complete and consistent with the hazard source list | Locate the original text fragment of this table in the citation array, compare field by field with the hazard source list and safety responsibility statement, and record differences in name, quantity, and date |
| Hazard source list | Check whether the hazard source name, quantity, storage location, update date, and signature receipt correspond to the grading and classification table | Retrieve the cited fragment to check the name, quantity, and date of the same record in the two materials, and check whether the versions are synchronized and whether any signatures are missing |
| Safety responsibility statement | Check whether the responsibility level, signing date, and receipt cover the laboratory and the reviewer | Confirm the signer and date against the cited source identifier, and record those missing a receipt in the exception list pending review |
| Knowledge base retrieval node citation output | Check whether the number of entries in the citation array matches the hit materials, and whether each entry in `responseData` (non-streaming module results returned with detailed output enabled) contains an original text fragment and a source identifier | Use `quoteList` to view the citation details, confirm that the array length corresponds one-to-one with the original text paragraphs; an empty array is also a normal output |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the grading and classification table and the hazard source list. Cause: the two materials are maintained by different positions, their update cadences are not synchronized, and no field-level comparison was performed.
- Symptom: the hazard source list has been revised, but the cited fragment still points to the old version. Cause: the versions are not synchronized, the old document has not been removed or marked invalid, and retrieval hits the old material.
- Symptom: the review conclusion lacks a signature or receipt. Cause: the responsibility statement does not cover the laboratory, or the reviewer has not signed the material, so the cited fragment cannot provide a basis for signing.

## How to verify the setup

Acceptance of this feature: ask a question that has an original text basis, and check whether the number of entries in the citation array and the superscripts can point back to the original text paragraphs; then ask a question with no matching material, and confirm that the array is empty while the pipeline runs through and `responseData` is still returned normally.

Business test: create an exception record, see whether the source material can be traced, and check whether the cited fragment is consistent with the original text.

- Turn on citation superscripts, check against the source document whether each citation can point back to the original text paragraph, record the number of entries in the array, and check the tokens of the cited text separately, without comparing them for equality with `quoteMaxToken`.
- Run a trial with a question that has no matching material, confirm that the citation array is empty while the output pipeline continues, and then check item by item that the search parameters are consistent with the values in the knowledge base retrieval section.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
