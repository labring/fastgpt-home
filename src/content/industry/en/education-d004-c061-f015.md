---
title: Knowledge Base Retrieval for Research Outcome Registration and Intellectual Property: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c061-f015
page_type: 行业问题页
application_area: education
meta_title: Research IP | Retrieval | Handover
meta_description: Research IP: review retrieval for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Research Outcome Registration and Intellectual Property: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

Research achievement registration and intellectual property management involves three types of materials: achievement registration forms, patent disclosure documents, and software copyright materials. Achievement registration forms come from research groups and research management departments, and are updated as achievements are produced and accepted; their fields include achievement name, completers, date, classification level, and signature. Patent disclosure documents come from inventors and are updated as technical solutions are adjusted; their fields include technical problem, solution, embodiments, and drawings. Software copyright materials come from the development team and are updated with version releases; their fields include software name, version number, development completion date, and ownership. When these three types of materials enter knowledge base retrieval and recall, they serve respectively as sources of candidate chunks: achievement registration forms provide achievement name and date fields, patent disclosure documents provide technical solution and inventor fields, and software copyright materials provide version and ownership fields, for subsequent nodes or manual drafting of signable material drafts and handover records to check name, quantity, date, and signature.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after pattern, merge, re-rank, filter, and limit trimming). The signable material drafts and handover records are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Achievement registration form | Name, completers, date, classification level, and signature are complete, and consistent with the same record in the patent disclosure document and software copyright materials | In the knowledge base search test, search by achievement name, switch `searchMode` to compare candidate chunks and similarity scores, and check the date and signature fields |
| Patent disclosure document | Technical problem, solution, embodiments, drawings, and inventor signature are complete, and the name and quantity match the achievement registration form | Search by technical keywords, compare the ranking of the top few results before and after enabling `usingReRank`, and check whether the candidate chunks cover the solution and embodiments |
| Software copyright materials | Software name, version number, development completion date, and ownership are complete, and the version and date are synchronized with other materials | Search by software name and version number, adjust `limit` to observe changes in the number of candidates, and check whether the version and date fields are consistent |
| Handover record | Responsible person is clear, version and date are consistent, and receipt and signature are complete | Search by handover form number, check whether the candidate chunks contain the responsible person and receipt fields, and record the number of candidates and scores |

## Three common errors

- Phenomenon: The name, quantity, and date of the same achievement do not match between the registration form and the disclosure document. Cause: The two materials are updated separately, and the fields were not checked against the same version.
- Phenomenon: The version number of the software copyright materials is inconsistent with the date in the registration form. Cause: The versions are not synchronized, the update cadence differs, and retrieval candidates each take a different version.
- Phenomenon: The handover record lacks a signature or receipt, and the next step cannot sign off. Cause: The fields were not validated against the template during drafting, and the retrieval candidates did not cover the signature item.

## How to verify the setup

Acceptance of this feature: test once each with synonym-rewritten questions, compare candidates and scores, then toggle re-ranking on and off to observe the ranking of the top few results; record the number of candidates and scores, and when a citation limit is involved, check the tokens of the cited text, recording the array count separately.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the knowledge base search test, switch `searchMode` and search the same achievement name using semantic, full-text, and hybrid modes respectively, comparing candidate chunks and similarity scores.
- Enable and disable `usingReRank` to compare the order of the top few candidates; adjust `limit` to observe the number of candidates, and check the cited text tokens and array count.
