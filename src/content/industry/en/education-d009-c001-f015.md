---
title: Knowledge Base Retrieval for Daily Kindergarten Care Management: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c001-f015
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Care | Retrieval | Multilingual
meta_description: Kindergarten Care: review retrieval for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Daily Kindergarten Care Management: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page addresses multilingual materials and terminology handling in daily life management for kindergarten childcare. Material sources include daily life schedules, morning and afternoon check records, child health observation records, as well as the unified terminology glossary and comparison drafts used for external publication. The update cadence follows the institution's daily records and publication versions, and field characteristics center on dates, child names, record names, quantities, signatures, and receipts. When entering the knowledge base retrieval and recall function, the daily life schedule takes on the role of verifying the timeline and activity names, the morning and afternoon check records take on the role of verifying health status and check item terminology, the child health observation records take on the role of verifying observation descriptions and handling terminology, and the unified terminology glossary and comparison drafts serve as the baseline material for translated names referring back to the source text. The three types of records and the terminology glossary need to be cross-checked against each other on fields, dates, and signatures; common inconsistencies include the same record's name, quantity, or date not matching across two materials, versions not being synchronized, and missing signatures or receipts.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The "unified terminology glossary and comparison drafts" is then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Daily life schedule | Fields, dates, and signatures must be cross-checked item by item against the morning and afternoon check records and child health observation records, and the same activity name must be written consistently throughout | In the knowledge base search test, test once each with synonymous question sentences, record the number of candidates and scores, and check whether the activity names, dates, and signature columns in the returned references match the source text |
| Morning and afternoon check records | Record names, check item quantities, dates, and signatures must match the daily life schedule and child health observation records | Switch `searchMode` to semantic, full-text, and hybrid, and compare candidate snippets; turn `usingReRank` on and off to see changes in the ranking of the top few results |
| Child health observation records | Translated names for observation descriptions and handling terminology can refer back to the source text, and dates, quantities, and signatures are not missing | Check the number of returned references and content completeness, record the array length separately, and check whether the tokens of the reference text retain key snippets under the constraints of `limit` and `similarity` |
| Unified terminology glossary and comparison drafts | The same term is consistent throughout, translated names can refer back to the source text, and versions are synchronized with signatures and receipts | Sample three terms to check whether their written form is consistent throughout, and check whether the terms, dates, and receipts in the comparison drafts correspond to the three types of records |

## Three common errors

- Symptom: The same morning and afternoon check record's name, quantity, or date does not match across two materials. Cause: Material versions are not synchronized, and retrieval candidates do not cover the latest records.
- Symptom: The daily life schedule and health observation records are missing signatures or receipts. Cause: Fields were not cross-checked item by item before publication, and key columns were omitted after reference snippet trimming.
- Symptom: The same term is written inconsistently throughout, and the translated name cannot refer back to the source text. Cause: The terminology glossary and comparison drafts were not updated with the records, and the sources of retrieved recall snippets are mixed.

## How to verify the setup

This function's acceptance: test once each with synonym-rewritten question sentences, compare candidates and scores, then turn rerank on and off to see the ranking of the top few results; check the number of returned candidates and scores under `searchMode`, `usingReRank`, `similarity`, and `limit`, and record the number of references separately by array length.

Business test: sample three terms to check whether their written form is consistent throughout, check that translated names can refer back to the source text, and check whether the fields, dates, and signatures of the daily life schedule, morning and afternoon check records, and child health observation records correspond.

- In the knowledge base search test, switch retrieval modes, compare candidate snippets and similarity scores, and confirm that after multi-path merging both semantic and full-text results are included.
- Turn rerank on and off, compare the ranking of the top few results; check the tokens and array length of the reference text after similarity filtering and reference limit trimming, and confirm that key snippets are retained.
