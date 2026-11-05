---
title: Knowledge Base Retrieval for Training Provider Admissions and Inquiry Follow-Up: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c043-f015
page_type: 行业问题页
application_area: education
meta_title: Training Admissions | Retrieval | Multilingual
meta_description: Training Admissions: review retrieval for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Training Provider Admissions and Inquiry Follow-Up: Handle Multilingual Materials and Terminology

## What this category's data looks like

Enrollment consultation conversion for training institutions involves three types of materials: program brochures, consultation records, and trial class schedules, which often contain multilingual parallel text and mixed terminology. Program brochures provide course names, class types, dates, and signature fields; consultation records carry the inquirer's intent, language preference, and receipt status; trial class schedules record trial times, teachers, and sign-ins. The fields of these three types of materials intersect, and the name, quantity, and date of the same record need to be aligned across two materials. Materials are updated in batches; when versions are not synchronized, old drafts can still be retrieved, and entries missing signatures or receipts will enter the candidate set. The terminology glossary and parallel drafts need to ensure that the same term is consistent throughout the entire text and that translated names can refer back to the source text. During retrieval, materials are matched by semantic, full-text, or hybrid mode, and candidate snippets and similarity scores are provided for subsequent nodes or manual compilation into externally published drafts.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate snippets and similarity scores (after mode selection, merging, reranking, filtering, and upper-limit trimming). Unifying the terminology glossary and parallel drafts is then completed by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Program brochure | Whether multilingual terminology, dates, and signature fields are aligned with consultation records | In the search test, switch `searchMode` to semantic, full-text, or hybrid, view candidate snippets and similarity scores, and check whether the terminology in the brochure is consistent with the names, quantities, and dates in the consultation records |
| Consultation record | Whether the name, quantity, and date of the same record match across the two materials, and whether receipts are complete | Test once each with synonymous questions, compare the number of candidates and scores, check whether the translated term names in the record can refer back to the source text, and confirm whether signature or receipt fields appear |
| Trial class schedule | Whether the trial date, teacher, and sign-in are synchronized with the versions of the brochure and consultation records | Turn `usingReRank` on and off to compare the ordering of the top few results, combine with `similarity` to observe whether candidates contain trial schedule and brochure cross-fields, and record the number of cited items (array length) and cited text tokens |
| Knowledge base retrieval service | Whether candidate snippets come from different recall channels and have been merged, reranked, filtered, and trimmed by upper limit | In the search test, check whether the returned candidates include both semantic and full-text results, adjust `limit` to observe changes in the number of candidates, and verify whether the cited text retains key snippets from the source text |

## Three common errors

- Symptom: The dates of the same consultation record do not match between the brochure and the trial class schedule. Cause: The versions of the two materials are not synchronized, old drafts are still recalled, and candidates are not filtered by the latest version.
- Symptom: The translated term names are written differently in the parallel draft and the consultation record. Cause: The terminology glossary is not unified, retrieval candidates are returned by similarity, and there is a lack of consistency checking across the entire text.
- Symptom: The trial class schedule is missing signatures or receipts. Cause: The material fields are incomplete, candidate snippets are still recalled, and subsequent nodes do not filter by receipt status.

## How to verify the setup

Acceptance for this feature: test once each with synonymously rewritten questions, compare candidates and scores, then turn reranking on and off to see the ordering of the top few results; at the same time, switch `searchMode` to observe differences between semantic and full-text candidates, adjust `limit` to record the number of candidates, and compare ordering before and after enabling `usingReRank`.

Business test: sample three terms to check whether their spelling is consistent throughout the entire text, verify whether translated names can refer back to the source text, and confirm whether the names, quantities, dates, and signature receipts in the program brochure, consultation records, and trial class schedules are aligned.

- In the knowledge base search test, retrieve the same term using semantic, full-text, and hybrid modes respectively, record the number of candidates and similarity scores, and compare the snippets returned by the three modes.
- Turn reranking on and off to compare the order of the top few candidates; adjust the citation upper limit, record the number of cited items (array length) and cited text tokens separately, and do not compare the two as equal.
