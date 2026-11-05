---
title: Knowledge Base Retrieval for National Key Research and Development Applications: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c057-f015
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Retrieval | Access
meta_description: National R&D Grants: review retrieval for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for National Key Research and Development Applications: Manage Authorized Access and External Services

## What this category's data looks like

National Key R&D Program project application materials include the project application form, the budget application form, and the cooperation agreement. The project application form is the main body, the budget application form is the funding basis, and the cooperation agreement is the basis for the rights and responsibilities of the participating parties. When the three enter the authorized access and external services function, the project application form serves as the main index for the external entry point and authorization scope, while the budget application form and cooperation agreement serve as attachments and supporting evidence. Field characteristics are concentrated in names, quantities, dates, and signature fields: project name, task name, participating unit name, funding amount, start and end dates, signatures, and receipts. The update rhythm advances with application milestones, and versions easily fall out of sync when budgets are adjusted and agreements are supplemented. Knowledge base retrieval and recall are used to recall the corresponding fragments from the three materials and provide candidates, for subsequent nodes or manual generation of the external entry point and authorization scope.

## Configuration and implementation checks

The knowledge base retrieval service (retrieval node and search test) only outputs candidate fragments and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming); the external entry point and authorization scope must be handled by subsequent nodes or manually. One retrieval consists of question optimization, semantic/full-text/hybrid recall, multi-route merging, rerank secondary sorting, similarity filtering, and citation upper-limit trimming, and only then is the cited content handed to the model.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | The main index for the external entry point and authorization scope; the project name, task name, participating unit name, start and end dates, and signature fields must match the budget application form and cooperation agreement item by item | In the knowledge base search test, switch `searchMode` to semantic, full-text, and hybrid, compare candidate fragments and similarity scores, and check the project name and date fields |
| Budget application form | The funding amount, quantity, and date basis must match the project application form, and signatures and receipts must not be missing | Check the name, quantity, and date of the same record in the two materials; record the number of candidates and scores, and when the citation upper limit is involved, check the tokens of the cited text and record the array count separately |
| Cooperation agreement | The participating party names, rights and responsibilities, and dates must be synchronized with the project application form and budget application form, and the version and signature receipts must be complete | Compare the top few rankings before and after enabling `usingReRank`, and check whether the names and dates in the cooperation agreement and project application form match |
| Restricted identity access | The visitor identity matches the visible scope, and unauthorized access is not visible | Access once with a restricted identity and see whether the visible scope matches the setting; test once each with synonymous rewritten questions and compare candidates and scores |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the project application form and the budget application form. Cause: the two materials were modified separately without cross-checking, and the field basis was not unified.
- Symptom: the cooperation agreement version is not synchronized, and signatures or receipts are missing. Cause: the supplementary signing process is disconnected from the material update rhythm, and the old version remains in the knowledge base.
- Symptom: the same question cannot be recalled when phrased differently, and although there are many candidates, the ones ranked at the front are all irrelevant. Cause: `searchMode` does not match the material form, and `usingReRank` was not enabled for secondary sorting.

## How to verify the setup

Acceptance for this function: test once each with synonymous rewritten questions, compare candidate fragments and similarity scores, then toggle `usingReRank` on and off to see the top few rankings; record the number of candidates and scores, and when the citation upper limit is involved, check the tokens of the cited text and record the array count separately.

Business test: access once with a restricted identity and see whether the visible scope matches the setting; unauthorized access is not visible, and the visitor identity matches the visible scope.

- In the knowledge base search test, switch `searchMode`, compare the candidate fragments and similarity scores of the semantic, full-text, and hybrid modes, and check the names, quantities, and dates of the project application form and budget application form.
- Compare the top few rankings before and after enabling `usingReRank`, check the signatures and receipts of the cooperation agreement and project application form, and confirm version synchronization.
