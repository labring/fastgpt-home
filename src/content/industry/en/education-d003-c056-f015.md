---
title: Knowledge Base Retrieval for Teacher Qualification Exams and Certification: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c056-f015
page_type: 行业问题页
application_area: education
meta_title: Teacher Qualifications | Retrieval | Intake
meta_description: Teacher Qualifications: review retrieval for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Teacher Qualification Exams and Certification: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the teacher qualification examination and certification scenario. Materials include written and interview registration forms, Mandarin proficiency certificates, medical examination forms, as well as acceptance records, receipts, and signature pages. The source is the acceptance window and handler circulation of the certification agency, and the update cadence is synchronized with registration batches, medical examination conclusions, and Mandarin test results. Field characteristics center on name, ID number, examination subjects, educational background, Mandarin proficiency level, medical examination conclusion, date, and signature. When materials enter the knowledge base retrieval and recall function, the registration form handles identity and registration information verification, the Mandarin proficiency certificate handles level and number verification, and the medical examination form handles conclusion and date verification; acceptance records and receipts are used to confirm whether missing items have been completed. Together, the three support missing-item identification and follow-up questions. Retrieval results serve only as candidate fragments and similarity scores; the business output is completed by subsequent nodes or manually.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after mode, merge, rerank, filter, and limit trimming). Acceptance records and the completed question items are then handled by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Written and interview registration form | Whether name, ID number, examination subjects, educational background, date, and signature are consistent with the acceptance records | In the search test, retrieve with synonymous questions, switch `searchMode` to compare candidate counts and scores, and verify the registration form fields and signature page |
| Mandarin proficiency certificate | Whether the certificate number, level, test date, and issue date are consistent with those filled in the registration form | Compare the top few rankings before and after enabling `usingReRank`, verify the certificate number and level fields, and record candidate counts and scores |
| Medical examination form | Whether the medical examination conclusion, examination date, hospital seal, and receipt are complete | Adjust `similarity` and `limit` to observe candidate trimming, verify the medical examination conclusion and date, and confirm whether the receipt appears with the materials |
| Acceptance records and completed question items | Whether missing items are identified and followed up, and whether answers are based on materials | Test with questions missing key information to see whether follow-up occurs before answering, and verify whether answer citations fall within registration form, certificate, or medical examination form fragments |

## Three common errors

- Phenomenon: The name, quantity, or date of the same record does not match between the registration form and the acceptance record. Cause: The two materials were entered at different times, and field-level comparison and receipt confirmation were not performed.
- Phenomenon: The Mandarin proficiency certificate version is not synchronized, and the old level is still recalled. Cause: The knowledge base update cadence is inconsistent with the material issuance cadence, and reranking by date was not performed.
- Phenomenon: The medical examination form lacks a signature or receipt, but the answer still gives a conclusion. Cause: Missing-item identification did not follow up first, and retrieval directly returned candidate fragments.

## How to verify the setup

This function acceptance: Test once each with synonymously rewritten questions, compare candidate counts and scores, then toggle rerank on and off to observe the top few rankings; verify the impact of `searchMode`, `usingReRank`, `similarity`, and `limit` on candidates, record citation counts separately, and calculate cited text tokens separately.

Business test: Ask a question missing key information to see whether follow-up occurs before answering.

- In the knowledge base search test, switch retrieval modes, record candidate counts and scores, and verify whether the registration form, Mandarin proficiency certificate, and medical examination form fields are consistent with the acceptance records.
- For questions missing key information, trigger follow-up first, then verify whether answer citations come from material fragments, confirming that missing items are identified and forwarded to the handler.
