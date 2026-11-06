---
title: Knowledge Base Retrieval for Vocational College Program Registration: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c028-f015
page_type: 行业问题页
application_area: education
meta_title: Vocational Programs | Retrieval | Checks
meta_description: Vocational Programs: review retrieval for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Vocational College Program Registration: Compare Documents and Locate Differences

## What this category's data looks like

Vocational college program setup filing materials usually include three types of sources: program setup filing forms, talent demand justification, and faculty and equipment lists. They are updated centrally by the academic affairs or planning department by academic year or application batch, and fields cover program name, enrollment number, justification date, signatures, and receipts. The filing form serves as the primary record and, after entering the knowledge base, acts as the comparison baseline; talent demand justification and faculty and equipment lists serve as supporting materials, providing the basis for demand and the basis for conditions respectively. The material forms are mainly a mix of scanned copies, tables, and explanatory text. The name, quantity, and date of the same record in different materials often differ because versions are not synchronized or supplementary entries were made, and missing signatures or receipts also affect material completeness. After these materials enter the knowledge base retrieval service, each is recalled as candidate fragments for subsequent nodes or manual discrepancy localization.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The "discrepancy list" is then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Program setup filing form | Whether the program name, enrollment number, filing date, and signature receipt are consistent with the ledger | In the search test, use the program name as the query, switch `searchMode`, and compare the number of candidates and scores across semantic, full-text, and hybrid modes |
| Talent demand justification | Whether the justification date, demand quantity, and signature are consistent with the corresponding fields in the filing form | Query with the same program name and year combination, and compare the order of the top few candidates before and after enabling `usingReRank` |
| Faculty and equipment list | Whether the equipment quantity, faculty headcount, and date are consistent with the filing form and justification materials | Use the equipment name or faculty headcount as the query, and observe whether candidates retain key field fragments after `similarity` filtering |
| Retrieval returned candidates | The number of candidates and scores can be recorded; cited text tokens are checked separately | Record the length of the returned array, and observe whether the cited content is complete after trimming according to `limit` |

## Three common errors

- Symptom: the name or quantity of the same program does not match between two materials. Cause: versions are not synchronized, and the old filing form was not updated along with the justification materials.
- Symptom: the filing form lacks a signature or receipt. Cause: pages were missed during scanning or the signature page was not archived together during supplementary entry.
- Symptom: the same question cannot be recalled when phrased differently. Cause: the query terms are inconsistent with the wording in the materials, and the retrieval mode was not matched to the material form.

## How to verify the setup

This feature acceptance: test once each with synonym-rewritten questions, compare the number of candidates and scores, then toggle rerank to inspect the order of the top few results, and verify the effects of `searchMode`, `usingReRank`, `similarity`, and `limit`.

Business test: use one real record to find fields inconsistent with the ledger, record the program name, quantity, or date discrepancies, submit them to the reviewer for confirmation, and write them back.

- In the search test, retrieve the same program name using semantic, full-text, and hybrid modes respectively, and record the differences in the number of candidates and scores.
- Compare the order of the top few candidates before and after enabling rerank, and confirm whether the fragments most relevant to the filing form fields are ranked first.
