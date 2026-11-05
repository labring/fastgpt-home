---
title: Knowledge Base Retrieval for Enrollment Changes and Graduation Eligibility: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c021-f015
page_type: 行业问题页
application_area: education
meta_title: Graduation Eligibility | Retrieval | Versions
meta_description: Graduation Eligibility: review retrieval for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Enrollment Changes and Graduation Eligibility: Maintain Document Versions and Changes

## What this category's data looks like

Student status changes and graduation qualification review involve three types of materials: leave/resumption applications, major transfer applications, and graduation review checklists. Fields include name, student ID, change type, effective date, signature, and receipt. Materials come from academic affairs system exports, departmental submissions, and paper scans. The update cadence follows semester batches and review milestones, with old versions retained in archive directories. When materials enter knowledge base retrieval and recall, leave/resumption applications serve as change basis fragments, major transfer applications as qualification change fragments, and graduation review checklists as conclusion verification fragments. Each plays the role of candidate source, for subsequent nodes or manual assembly of version ledgers and change records.

## Configuration and implementation checks

This step is performed by the knowledge base retrieval service (retrieval node and search testing), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and limit trimming). The version ledger and change records are completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Leave/resumption application | Whether fields, dates, and signatures are consistent with the current version | In search testing, retrieve with synonymous questions, switch `searchMode`, check the number of candidates and scores, and confirm that signature and receipt fields are complete |
| Major transfer application | Whether the name, quantity, and date of the same record match across the two materials | Compare the order of the top few results before and after enabling `usingReRank`, and check whether candidates under the `similarity` threshold cover both old and new versions |
| Graduation review checklist | Current version is unique, old versions are traceable, and references are synchronized | Check the number of references and reference text tokens; `limit` only controls the number of items and does not change the reference budget |
| Version ledger and change records | Whether the version number and references are updated synchronously after changing one piece of content | After changing one field, rerun retrieval and compare whether candidates and scores point to the new version |

## Three common errors

- Symptom: The name and date for the same student do not match between the leave/resumption application and the graduation review checklist. Cause: The two materials are not associated by the same version number, and retrieval hits fragments from different batches.
- Symptom: A major transfer application has been updated, but the old version is still recalled. Cause: The version is not synchronized, the old version fragment has not been removed, and candidates and scores do not distinguish current from archived.
- Symptom: A leave/resumption application lacks a signature or receipt, but the review checklist shows it as completed. Cause: Signature and receipt fields are not included in retrieval filtering, and candidate fragments are incomplete.

## How to verify the setup

Acceptance for this feature: Test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the ordering of the top few results; check the number of candidates and scores under `similarity`, `searchMode`, and `usingReRank`.

Business testing: Change one piece of content and see whether the version number and references are updated synchronously.

- In search testing, run one synonymous question each for the leave/resumption application, major transfer application, and graduation review checklist, and record the number of candidates and scores.
- After changing one field, rerun retrieval, verify whether the version number and references are synchronized, and check whether signature and receipt fields are returned with the candidates.
