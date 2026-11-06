---
title: Knowledge Base Retrieval for Research Ethics Review: Track Progress and Check Statistics
slug: /en/industry/education-d006-c062-f015
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Retrieval | Progress
meta_description: Research Ethics: review retrieval for progress tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Knowledge Base Retrieval for Research Ethics Review: Track Progress and Check Statistics

## What this category's data looks like

In the research ethics review scenario, knowledge base retrieval and recall deal with three core types of materials: ethics review applications, informed consent form templates, and risk assessment forms. An ethics review application records the project name, acceptance number, review type, and submission date, and its signature section contains the researcher and the review committee member; an informed consent form template contains the version number, revision date, informed consent elements, and signature receipt; a risk assessment form records the risk level, assessment date, mitigation measures, and review signature. Materials are updated in batches, versions change frequently, and field naming differs across templates. After entering the retrieval function, the three types of materials serve as candidate chunk sources, each contributing semantic and full-text recall results, which after merging, re-ranking, and truncation form the cited content, for subsequent nodes or humans to generate the progress table and statistical scope description.

## Configuration and implementation checks

This step is performed by the knowledge base retrieval service (retrieval node and search test), which outputs candidate chunks and similarity scores (after mode, merging, re-ranking, filtering, and upper-limit truncation). The "progress table and statistical scope description" is then completed by subsequent nodes or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | The four items of name, quantity, date, and signature are consistent between the application and the summary record | Switch `searchMode` to use semantic, full-text, and hybrid recall respectively, and check whether the project name, acceptance number, submission date, and signature section in the candidate chunks are consistent with the original |
| Informed consent form template | The version number, revision date, and signature receipt are synchronized between the template and the review record | Retrieve the template version with synonymous questions, view the candidate scores and counts, confirm that the version number and revision date are not mismatched, and that the signature receipt field exists |
| Risk assessment form | The risk level, assessment date, and review signature correspond between the assessment form and the statistical scope | Compare the order of the top few candidates before and after enabling and disabling re-ranking, and check whether the risk level, assessment date, and review signature fields are complete |
| Cited content | After truncation, key chunks of the original text are still retained, and the count and budget are recorded separately | View the count and content completeness of the returned citations; when the citation upper limit is involved, check the tokens of the cited text, record the array count separately, and do not compare the two as equal |

## Three common errors

- Symptom: For the same project, the name, quantity, and date do not match between the application and the summary record. Cause: The two materials are maintained separately, and fields were not checked against the same scope.
- Symptom: The informed consent form template version number and revision date are not synchronized in the review record. Cause: After the template was updated, the old version was still recalled, and the version was not synchronized.
- Symptom: The risk assessment form lacks a review signature or receipt. Cause: The signature confirmation was not completed at the submission step, and the field was empty when the material entered retrieval.

## How to verify the setup

Acceptance of this feature: test once each with synonymously rewritten questions, compare candidates and scores, then enable and disable re-ranking to see the ordering of the top few; switch `searchMode` to observe candidate changes, check the impact of `similarity` and `limit` on candidate counts and scores, and confirm the ordering changes after `usingReRank` is enabled.

Business test: reconcile totals using one week of records, and see whether the scope and exceptions are clearly written; check whether the record count and statistical count match, and whether the scope is written into the table header.

- In the knowledge base search test, switch `searchMode` and use semantic, full-text, and hybrid recall on the same question respectively, recording candidate counts and scores.
- Compare the order of the top few candidates before and after enabling and disabling `usingReRank`, and check the tokens of the cited text after `similarity` filtering and `limit` truncation, recording the array count separately.
