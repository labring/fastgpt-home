---
title: Citations and Source Traceability for Modern Apprenticeships and Employer-Sponsored Classes: Find Supporting Evidence
slug: /en/industry/education-d001-c031-f010
page_type: 行业问题页
application_area: education
meta_title: Apprenticeships | Citations | Evidence
meta_description: Apprenticeships: review citations for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Modern Apprenticeships and Employer-Sponsored Classes: Find Supporting Evidence

## What this category's data looks like

This page addresses modern apprenticeship and order class management scenarios; material types include school-enterprise cooperation agreements, order class training plans, and master-apprentice mentoring records. School-enterprise cooperation agreements usually contain the cooperation start and end dates, positions and headcount, and signatures and seals of both parties; training plans contain course arrangements, rotation plans, assessment methods, and version numbers; mentoring records contain the names of masters and apprentices, mentoring periods, signatures, and acknowledgments. The material update cadence is revision by academic year or by batch, and agreements and plans may belong to different version cycles. When entering the knowledge base retrieval node, school-enterprise cooperation agreements provide the cooperation basis and responsibility boundaries, order class training plans provide training arrangements and version clues, and master-apprentice mentoring records provide process traces and signed acknowledgments. The three types of materials jointly support business basis queries, and answers need to point back to the original passages so they can be used to reply to parents or be written into plans.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original passage and a source identifier, and the length may be 0. Even if no content is found, the output chain still runs through. "Basis items that can point back to the original text" are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| School-enterprise cooperation agreement | Whether the cooperation start and end dates, positions and headcount, and signatures and seals of both parties are complete, and whether the names and quantities can match the training plan | Open the source document in the citation marker, verify the agreement fields, dates, and signatures item by item, and record the number of citations and the `quoteMaxToken` budget |
| Order class training plan | Whether the version is current, whether the courses and rotation arrangements are consistent with the agreement, and whether the assessment methods and dates can point back to the original text | Compare the plan version number with the agreement date, open the citation source to compare the original passage, and use `responseData` (non-streaming module results returned with detailed output enabled) to view the returned structure |
| Master-apprentice mentoring record | Whether the names of masters and apprentices, mentoring periods, signatures, and acknowledgments are complete, and whether the names and quantities of the same record are consistent with the plan | Point back to the original mentoring record text in the conversation citation marker, verify the signatures and acknowledgments, and use `quoteList` to expand the citation details |
| Knowledge base retrieval node | Whether the associated knowledge base uses the same vector model, whether the number of citation outputs matches the hit materials, and whether the chain still runs through when empty | Verify the selected knowledge base and vector model, run a trial with a question that has no matching materials, and confirm that the array is empty while the chain continues |

## Three common errors

- Symptom: The names, quantities, and dates of the same mentoring record do not match between the agreement and the training plan. Cause: The two materials belong to different revision batches, and no field-level comparison or unified naming was performed.
- Symptom: The training plan version was not synchronized, and the answer cited the old version's course arrangements. Cause: The old version was not removed from the knowledge base, retrieval hit the old version, and the current version was not verified.
- Symptom: The mentoring record lacks signatures or acknowledgments, and the cited passage cannot prove that the process was completed. Cause: The signature page was not completed when the materials were archived, and retrieval only returned the body passage.

## How to verify the setup

This feature's acceptance: ask a question with original-text basis and check whether the citation array and citation markers can point back to the original text; then ask a question with no matching materials and confirm that the array is empty while the chain runs through. Record the number of citations, i.e. the array length; `quoteMaxToken` is only the citation content budget, and the two are not compared for equality.

Business test: ask a cross-material basis question, see whether the answer gives traceable sources, and verify whether the names, quantities, dates, and signatures of the agreement, plan, and mentoring record are consistent.

- Open the citation marker, verify the original passage and source identifier item by item against the source document, and record the array length; when the citation limit is involved, check only the tokens of the cited text, and record the number of citations separately.
- Run a trial with a question that has no matching materials, confirm that the citation array is empty while the output chain continues, and check the citation structure in `quoteList` within `responseData`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
