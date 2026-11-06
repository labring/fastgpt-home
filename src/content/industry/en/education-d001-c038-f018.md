---
title: Reranking and Hybrid Retrieval for Continuing Education Training Hour Recognition: Find Supporting Evidence
slug: /en/industry/education-d001-c038-f018
page_type: 行业问题页
application_area: education
meta_title: Continuing Education | Reranking | Evidence
meta_description: Continuing Education: review reranking for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Reranking and Hybrid Retrieval for Continuing Education Training Hour Recognition: Find Supporting Evidence

## What this category's data looks like

For the business basis query of continuing education credit hour recognition, materials usually include three types: course filing forms, study certificates, and credit hour recognition forms. Course filing forms record the course name, class hours, course start date, and institutional seal; study certificates record the learner's name, study period, completion status, and the issuing unit's receipt; credit hour recognition forms record the recognized credit hours, recognition date, handler's signature, and review comments. The three types of materials are updated at different cadences: filing forms are updated as courses are offered, study certificates are issued in batches, and recognition forms are summarized by recognition cycle, so the name, quantity, and date of the same record often appear with versions not yet synchronized. When materials enter this feature, filing forms and study certificates enter the retrieval candidates as basis sources, recognition forms participate in verification as the comparison baseline, the reranking model sorts the candidates, and citation trimming and answer generation produce basis entries that can be traced back to the original text accordingly.

## Configuration and implementation checks

This step is executed by the reranking model in the retrieval service, which outputs the sorted candidates and reranking scores. "Basis entries that can be traced back to the original text" are then completed by citation trimming and answer generation. Hybrid retrieval runs both the vector and full-text paths and merges the results; after merging, the scope is large and similarity filtering cannot be applied directly, so the reranking model is usually then used to sort and filter by reranking score.

| Object | Check | Verification action |
| --- | --- | --- |
| Course filing form | The course name, class hours, course start date, and institutional seal must match the study certificate and credit hour recognition form item by item, and the version must be current | Check whether the candidates from both paths hit the filing form fields at the same time, compare the order and scores before and after reranking, and check the two path switches of `searchMode` |
| Study certificate | The learner's name, study period, completion status, and the issuing unit's receipt must be complete, and the name and date of the same record must be consistent in the other material | Check the number of candidate entries and the scores, and check whether `usingReRank` is bound and used for sorting and filtering |
| Credit hour recognition form | The recognized credit hours, recognition date, handler's signature, and review comments must correspond to the filing form and study certificate; a missing signature or receipt is regarded as incomplete | Check the tokens and array entry count of the cited text, record them separately, and do not compare `quoteMaxToken` with the entry count for equality |
| Hybrid retrieval | Both the vector and full-text paths are enabled, and candidates come from both paths at the same time | Check the two path switches in the search parameters, and confirm the values of `similarity` and `limit` |

## Three common errors

- Symptom: the name or class hours of the same course do not match between two materials. Cause: the filing form and study certificate versions are not synchronized, their update cadences differ, and the old version remains among the candidates.
- Symptom: the recognition form lacks the handler's signature or the issuing unit's receipt. Cause: the material circulation step is not closed-loop, and the signature and receipt were not archived together with the record.
- Symptom: there are many candidates but the top few are irrelevant. Cause: the scope after merging is large and reranking scores were not used for filtering, or the results clearly lean toward keyword hits.

## How to verify the setup

Feature acceptance: compare the order and scores of the top three before and after enabling reranking, check the changes in the number of candidate entries and the scores, and confirm that `usingReRank` is bound and used for sorting and filtering.

Business test: ask a basis question that spans materials, see whether the answer gives traceable sources, and check that the tokens and array entry count of the cited text are recorded separately.

- Check the vector and full-text path switches in the search parameters, and confirm the values of `searchMode`, `similarity`, and `limit` and the candidate sources.
- Compare the order and scores before and after reranking, check the binding status of `usingReRank`, and trace back to the original text entries after filtering by reranking score.
