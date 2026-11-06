---
title: Knowledge Base Retrieval for Initial Review of Academic Journal Submissions: Track Progress and Check Statistics
slug: /en/industry/education-d006-c066-f015
page_type: 行业问题页
application_area: education
meta_title: Journal Submissions | Retrieval | Progress
meta_description: Journal Submissions: review retrieval for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Initial Review of Academic Journal Submissions: Track Progress and Check Statistics

## What this category's data looks like

The materials for progress records and statistical verification of preliminary review of academic journal submissions include submitted manuscripts, author information forms, and plagiarism check reports. The sources are exports from the editorial system and manual registration forms, and the update cadence is weekly aggregation and monthly verification. When submitted manuscripts enter knowledge base retrieval and recall, they serve as candidate sources for the main text and bibliographic fragments; the author information forms serve to verify fields such as author names, affiliations, authorship order, and contact information; the plagiarism check reports serve to compare the duplication rate, detection date, and receipt signature. The three types of materials are consolidated in weekly or monthly reports into a progress table and a statement of statistical criteria, and the table header must specify the statistical criteria and exceptional cases. Field characteristics center on manuscript number, title, author, receipt date, preliminary review status, plagiarism check conclusion, and signature column. The names, quantities, and dates of the same record in two materials often need to be compared item by item.

## Configuration and implementation checks

This step is performed by the knowledge base retrieval service (retrieval node and search test), outputting candidate fragments and similarity scores (after pattern, merge, rerank, filter, and upper-limit trimming). The progress table and statement of statistical criteria are completed by subsequent nodes or manually. Candidates and cited content are not statistical tables, business documents, or authorization results; they serve only as the basis for subsequent organization.

| Object | Check | Verification action |
| --- | --- | --- |
| Submitted manuscript | The manuscript number, title, receipt date, and preliminary review status must be consistent item by item with the author information form and plagiarism check report, and signatures or receipts must be complete | In the knowledge base search test, use synonymous questions to retrieve the manuscript number and title, record the number of candidates and scores, and verify the date and status fields |
| Author information form | Author names, affiliations, authorship order, and contact information must match the manuscript bibliography, and versions must be synchronized | Switch `searchMode` to semantic, full-text, or hybrid, compare whether candidates contain both author fields and manuscript fields, and verify quantities and names |
| Plagiarism check report | The duplication rate, detection date, report number, and receipt signature must correspond to the manuscript record, and signatures or receipts must not be missing | Enable or disable rerank, compare the ordering of the top few results, verify the tokens and array count of the cited text, and record them separately |
| Progress table and statement of statistical criteria | The number of records and statistical counts must match, the criteria must be written in the table header, and exceptional cases must be listed separately | Use one week of records to verify the totals, check whether the key fragments retained after `similarity` filtering support the statement of criteria, and use `limit` only for recording the number of items |

## Three common errors

- Phenomenon: the title or receipt date of the same manuscript does not match between the two materials. Cause: versions are not synchronized, the registration form and the export table are updated separately, and there is no unified verification time point.
- Phenomenon: the quantity or authorship order in the author information form and the plagiarism check report is inconsistent. Cause: missing signatures or receipts, changes not backfilled, and different naming conventions in the two materials.
- Phenomenon: there are many candidates but the top-ranked ones are irrelevant, and the answer lacks key paragraphs. Cause: the retrieval mode does not match the material form, rerank is not enabled, or similarity filtering is too broad.

## How to verify the setup

Feature acceptance: test once each with synonymously rewritten questions, compare candidates and scores, then toggle rerank on and off to observe the ordering of the top few results; switch `searchMode` and adjust `similarity` and `limit`, record the number of candidates and scores, verify the tokens of the cited text, and record the array count separately.

Business test: use one week of records to verify the totals, check whether the criteria and exceptions are clearly written, whether the number of records and statistical counts match, and whether the table header specifies the statistical criteria.

- In the knowledge base search test, retrieve the same manuscript number once with each of different phrasings, record the number of candidates and scores, verify hits and associations, and when sources do not match, check hits first rather than changing the criteria first.
- Export the progress table weekly, compare the numbers, dates, and signatures of submitted manuscripts, author information forms, and plagiarism check reports item by item, write exceptional cases into the table header explanation, and then proceed to the weekly or monthly report.
