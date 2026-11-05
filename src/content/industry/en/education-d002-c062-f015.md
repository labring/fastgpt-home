---
title: Knowledge Base Retrieval for Research Ethics Review: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c062-f015
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Retrieval | Checks
meta_description: Research Ethics: review retrieval for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Research Ethics Review: Compare Documents and Locate Differences

## What this category's data looks like

This page addresses material verification and discrepancy localization in research ethics review, covering three types of materials: ethics review applications, informed consent form templates, and risk assessment forms. Ethics review applications usually come from institutional review systems or form exports, and include project name, number of subjects, review date, researcher signature, and version number; informed consent form templates come from document libraries or template centers, and include template name, applicable project, version, signature field, and receipt field; risk assessment forms come from assessment tools or attachments, and include risk level, assessment date, and assessor signature. The three types of materials update at different rhythms: applications update continuously with the review process, templates are revised with regulations and institutional requirements, and assessment forms are supplemented as project phases progress. When entering knowledge base retrieval and recall, applications and templates serve as candidate sources for semantic and full-text recall, while assessment forms serve as supplementary evidence fragments, jointly supporting the comparison of names, quantities, dates, and signatures for the same record, and locating items whose versions are out of sync or missing.

## Configuration and implementation checks

This step is performed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The discrepancy list is completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Whether the project name, number of subjects, review date, researcher signature, and version number are consistent with the ledger | In the knowledge base search test, search once each using the project name in the application and the ledger field, switch `searchMode` to semantic, full-text, and hybrid, record the number of candidates and scores, and check whether the name, quantity, date, and signature are consistent |
| Informed consent form template | Whether the template name, applicable project, version number, signature field, and receipt field correspond to the application | Search separately using the template name and version number, compare the ranking of the top few results before and after enabling `usingReRank`, check whether the candidate fragments include the signature field and receipt field, and mark fragments whose versions are out of sync or missing signature/receipt |
| Risk assessment form | Whether the risk level, assessment date, and assessor signature are consistent with the application and ledger | Search using the risk level and assessment date, adjust `similarity` to observe candidate changes, check whether the assessment date and signature match the application record, and record fields that do not match |
| Ledger record | Whether the name, quantity, and date of the same record are consistent across the application, template, and assessment form | Using one record in the ledger as the baseline, search the three types of materials separately, record the number of candidates and scores for each field, and list inconsistent fields in the discrepancy list |

## Three common errors

- Symptom: The project name, number of subjects, or review date of the same record do not match between the application and the template. Cause: The two materials are maintained by different nodes, update at different rhythms, and no field-level comparison was performed.
- Symptom: The template version is out of sync; the application references an old version while the template has already been revised. Cause: The version number was not written back when the template was revised, old fragments are hit during retrieval, and version verification actions are missing.
- Symptom: The informed consent form template lacks a signature field, or the risk assessment form lacks the assessor signature and receipt. Cause: Attachment upload is incomplete, retrieval only returns existing fragments, and missing items are not marked.

## How to verify the setup

This feature's acceptance: test once each with synonym-rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the ranking of the top few results; record the number of candidates and scores, and check the impact of `similarity`, `limit`, `searchMode`, and `usingReRank` on the results.

Business test: use one real record to find fields inconsistent with the ledger, compare name, quantity, date, signature, and version number item by item, list mismatched fields in the discrepancy list, and submit to the reviewer for confirmation and write-back.

- In the knowledge base search test, retrieve the same record using different phrasings, switch `searchMode` and toggle `usingReRank`, record the number of candidates and scores, and check the name, quantity, date, and signature fields.
- Filter candidates by `similarity`, control the number of returned results by `limit`, separately record the length of the reference array and the reference text tokens, organize inconsistent fields into a discrepancy list, and write them back to the ledger.
