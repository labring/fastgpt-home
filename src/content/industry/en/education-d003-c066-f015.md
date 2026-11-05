---
title: Knowledge Base Retrieval for Initial Review of Academic Journal Submissions: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c066-f015
page_type: 行业问题页
application_area: education
meta_title: Journal Submissions | Retrieval | Intake
meta_description: Journal Submissions: review retrieval for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Initial Review of Academic Journal Submissions: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the preliminary review scenario for academic journal submissions, and the materials are the submitted manuscript, the author information form, and the plagiarism check report. The manuscript carries the title, author bylines, affiliations, abstract, body, and references; the author information form carries author names, order, affiliations, contact details, contribution statements, and signatures; the plagiarism check report carries the detection date, duplication rate range, comparison sources, and receipt number. Materials enter by submission batch, a version consolidation is completed once before preliminary review, and it is updated once more after corrections. The field characteristic is that the same record appears repeatedly across multiple materials, and names, quantities, dates, and signatures must be aligned item by item. When entering question-and-answer intake and missing-item follow-up, the manuscript is used to determine the research topic and section assignment, the author information form is used to determine byline completeness and receipt, and the plagiarism check report is used to determine detection status and version consistency; together, the three support missing-item identification and follow-up questions.

## Configuration and implementation checks

This step is executed by the knowledge base retrieval service (retrieval node and search test), outputting candidate chunks and similarity scores (after mode, merge, rerank, filter, and limit truncation). Intake records and the completed follow-up questions are then handled by subsequent nodes or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Submitted manuscript | Check whether the title, author byline order, affiliations, abstract, and references are complete, and whether the date and version are consistent with the author information form | In the retrieval node, switch `searchMode` to compare semantic and full-text candidates, and record the number of candidates and scores |
| Author information form | Check whether author names, order, affiliations, contact details, contribution statements, and signature receipt are complete, and whether the names and quantities of the same record align with the manuscript | Test once each with synonymous questions, see whether the candidates cover the signature and receipt fields, and record the scores |
| Plagiarism check report | Check whether the detection date, comparison sources, receipt number, and version are synchronized, and whether the duplication rate range corresponds to the manuscript version | Test once each with rerank enabled and disabled, compare the ordering of the top few results, and use `similarity` to filter low-relevance candidates |
| Retrieval parameters | Check whether the key original chunks are still retained after citation limit truncation, and record the array count and citation text tokens separately | Adjust `limit` to observe changes in the number of candidates, and compare the ordering before and after toggling `usingReRank` |

## Three common errors

- Symptom: the same author's name or affiliation is written inconsistently between the manuscript and the author information form. Cause: the two materials were entered separately and their versions were not synchronized, so they must be aligned item by item by record before follow-up.
- Symptom: the plagiarism check report date does not match the manuscript version, and the receipt number is missing. Cause: corrected materials were not returned or the signature step was omitted, so the version and receipt must be checked first before intake.
- Symptom: rephrasing the question fails to recall the key passages, and although there are many candidates, the ones ranked first are irrelevant. Cause: the retrieval mode does not match the material form, and rerank and similarity filtering were not combined as needed.

## How to verify the setup

Acceptance for this feature: test once each with synonymously rewritten questions, compare the number of candidates and the `similarity` scores, then toggle `usingReRank` to see changes in the ordering of the top few results, and record the candidate differences under `limit` and `searchMode`.

Business test: ask a question that is missing key information, and see whether it asks a follow-up before answering, and whether the follow-up items fall on missing items in the manuscript, author information form, and plagiarism check report.

- In the knowledge base search test, fix the question, switch `searchMode` and `usingReRank`, and record the number of candidates, scores, and ranking positions one by one.
- Align names, quantities, dates, and signatures field by field across the three materials: the manuscript, the author information form, and the plagiarism check report; write missing items into the completion questions and forward them to the handler.
