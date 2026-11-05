---
title: Reranking and Hybrid Retrieval for Research Outcome Registration and Intellectual Property: Find Supporting Evidence
slug: /en/industry/education-d001-c061-f018
page_type: 行业问题页
application_area: education
meta_title: Research IP | Reranking | Evidence
meta_description: Research IP: review reranking for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Reranking and Hybrid Retrieval for Research Outcome Registration and Intellectual Property: Find Supporting Evidence

## What this category's data looks like

Research achievement registration and intellectual property management involves three types of materials: achievement registration forms, patent disclosure documents, and software copyright materials. Achievement registration forms record the achievement name, completers, registration date, and unit seal; patent disclosure documents record the technical solution, inventors, filing date, and inventor signature; software copyright materials record the software name, version number, copyright owner, development completion date, and seal receipt. The three types of materials come from different sources and have different update rhythms: achievement registration forms are updated with achievement acceptance, patent disclosure documents are updated with the application process, and software copyright materials are updated with registration or changes. When materials enter this feature, achievement registration forms serve as the source of registration facts, patent disclosure documents serve as the source of technical solutions and application information, and software copyright materials serve as the source of versions and rights ownership; together, the three support cross-material basis queries and back-references.

## Configuration and implementation checks

This step is performed by the rerank model in the retrieval service, which outputs the sorted candidates and rerank scores. The basis entries that can be back-referenced to the original text are then completed by citation trimming and answer generation. Hybrid retrieval runs both the vector and full-text paths simultaneously and merges the results; after merging, the scope is large and similarity filtering cannot be applied directly, so the rerank model is usually then used to sort and filter by rerank score.

| Object | Check | Verification action |
| --- | --- | --- |
| Achievement registration form | Fields include achievement name, completers, registration date, and unit seal, and must be compared item by item with patent disclosure documents and software copyright materials | Check whether the name, quantity, and date are consistent, check whether the seal and receipt are complete, and confirm that the version is current |
| Patent disclosure document | Fields include technical solution, inventors, filing date, and inventor signature, and must be cross-checked with achievement registration forms and software copyright materials | Compare the name and date of the same record in the two materials, check whether the signature is missing, and confirm that the version has been synchronized |
| Software copyright materials | Fields include software name, version number, copyright owner, development completion date, and seal receipt, and must be aligned with achievement registration forms and patent disclosure documents | Check the version number and development completion date, check whether the seal receipt is missing, and confirm that the material is the current version |
| Rerank model | Already bound and used for sorting and filtering; `usingReRank` and `searchMode` are checked in the search parameters | Compare the number of candidates and the rerank scores before and after reranking, and check whether the top few are relevant to the basis question |

## Three common errors

- Symptom: the name or number of completers of the same achievement does not match between the achievement registration form and the patent disclosure document. Cause: the two materials are entered in different stages, and cross-material field comparison and unification have not been done.
- Symptom: the version number of the software copyright materials is inconsistent with the record in the achievement registration form. Cause: the version is not synchronized, and different update rhythms lead to deviations in determining the current version.
- Symptom: the patent disclosure document lacks an inventor signature or the software copyright materials lack a seal receipt. Cause: the completeness of signatures and receipts is not verified during material circulation.

## How to verify the setup

Feature acceptance: turn reranking on and off to compare the order of the top three and the rerank scores, check the number of candidates and score changes, and confirm that `usingReRank` and `searchMode` are enabled and that `similarity` and `limit` are set as needed.

Business test: ask a cross-material basis question, see whether the answer gives a back-referenceable source, and check and record the tokens and array count of the cited text separately.

- Check the vector and full-text path switches in the search parameters, confirm that candidates come from both paths, and compare the sorting and scores before and after reranking.
- Compare the name, quantity, date, signature, and receipt of the achievement registration form, patent disclosure document, and software copyright materials item by item, and confirm that the version is current.
