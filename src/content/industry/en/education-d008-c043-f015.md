---
title: Knowledge Base Retrieval for Training Provider Admissions and Inquiry Follow-Up: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c043-f015
page_type: 行业问题页
application_area: education
meta_title: Training Admissions | Retrieval | Access
meta_description: Training Admissions: review retrieval for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Training Provider Admissions and Inquiry Follow-Up: Manage Authorized Access and External Services

## What this category's data looks like

This category's data includes three types of materials for enrollment consultation conversion at training institutions: enrollment brochures, consultation records, and trial class schedules. Enrollment brochures contain course names, class types, class hours, start dates, signature fields, and acknowledgments; consultation records contain parent titles, intended courses, consultation dates, and follow-up staff signatures; trial class schedules contain trial class times, instructors, quotas, and confirmation acknowledgments. Materials are updated by enrollment season, and brochure versions and consultation records are often out of sync; the same course's name, quantity, and date in the two materials are prone to mismatch. When entering the knowledge base retrieval and recall function, brochures serve as the primary source for semantic recall, consultation records serve as a supplement for full-text recall, and trial class schedules serve as candidates for hybrid retrieval. After merging, reranking, filtering, and upper-limit trimming, the three form candidate chunks and similarity scores for subsequent nodes or manual generation of external entry points and authorization scopes.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after mode, merging, reranking, filtering, and upper-limit trimming). The external entry points and authorization scopes are then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment brochure | Course name, class type, class hours, start date, signature, and acknowledgment are complete, and consistent with the consultation records | In the search test, test once each with synonymous questions, switch `searchMode` to compare candidates and scores, and record the number of candidates |
| Consultation records | Parent title, intended course, consultation date, follow-up staff signature are in sync with the brochure version | Access once with a restricted identity, and check whether the visible scope contains only authorized chunks and no unauthorized content appears |
| Trial class schedule | Trial class time, instructor, quota, and confirmation acknowledgment are consistent with the brochure date | Turn `usingReRank` on and off and observe the top few rankings each time, and record the number of candidates under `similarity` and `limit` |
| Knowledge base retrieval service | Candidate chunks come from multi-path merging of semantic and full-text results, after reranking, similarity filtering, and citation upper-limit trimming | Check whether the returned candidates contain both semantic and full-text results, record the array length separately, and check the tokens budget of the cited text |

## Three common errors

- Symptom: the same course's name, quantity, and date in the brochure and consultation records do not match. Cause: the brochure version was not synchronized, and the consultation records still use fields from the old version.
- Symptom: the trial class schedule lacks a signature or acknowledgment, and the parent identity and visible scope cannot be matched. Cause: the signature field was not completed when the materials were archived, and the authorization basis is missing.
- Symptom: the same question cannot be recalled when rephrased, or there are many candidates but the ones ranked first are all irrelevant. Cause: the retrieval mode does not match the material form, reranking is not enabled, or similarity filtering is too strict.

## How to verify the setup

This function's acceptance: test once each with synonymously rewritten questions, compare candidates and `similarity` scores, then toggle `usingReRank` on and off to observe the top few rankings, record the number of candidates and the cited text tokens, record the array length separately, and do not compare `quoteMaxToken`.

Business test: access once with a restricted identity, check whether the visible scope matches the setting, and unauthorized content is not visible.

- In the knowledge base search test, switch `searchMode` and compare the candidates and scores of the semantic, full-text, and hybrid modes.
- Check whether the returned candidates contain both semantic and full-text results, and check whether the array length under `limit` and the cited text tokens are recorded separately.
