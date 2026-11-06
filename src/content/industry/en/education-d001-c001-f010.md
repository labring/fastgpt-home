---
title: Citations and Source Traceability for Daily Kindergarten Care Management: Find Supporting Evidence
slug: /en/industry/education-d001-c001-f010
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Care | Citations | Evidence
meta_description: Kindergarten Care: review citations for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Daily Kindergarten Care Management: Find Supporting Evidence

## What this category's data looks like

This category involves three types of materials: the daily life schedule, morning and afternoon check records, and child health observation records. The daily life schedule comes from the kindergarten's childcare and education department and is updated per semester; its fields include time period, activity name, responsible person, and transition links. The morning and afternoon check records are filled in by class teachers and health care personnel and are generated daily; their fields include child's name, body temperature, throat and hand observations, date, and signature. The child health observation records are filled in by childcare workers during the kindergarten day and are recorded per instance; their fields include observation time, description of performance, handling method, and receipt. When the three types of materials enter this feature, the daily life schedule provides the basis for time periods and activities, the morning and afternoon check records provide the basis for the day's health screening, and the child health observation records provide the basis for continuous individual observation. In terms of update rhythm, the schedule is per semester, the morning and afternoon checks are daily, and the observation records are per instance; version and signature status need to stay synchronized with the materials.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. The "basis items that can be traced back to the original text" are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Daily life schedule | Fields include time period, activity name, and responsible person; the date is within the semester range; the version must be the current one; the signature column is complete | In the node, check the selected collection and its vector model, open the citation marker to compare against the source document, and compare the time periods and activity names item by item |
| Morning and afternoon check records | Fields include child's name, body temperature, throat and hand observations; the date is the current day; signature and receipt are not missing | Run a trial with a question that has no matching materials, and see whether the output is empty while the chain continues; then compare the name, body temperature, and date against the source document |
| Child health observation records | Fields include observation time, description of performance, and handling method; the date can be matched to the same day's time period in the schedule; receipts are complete | Open the search parameter panel and check item by item, record the number of items in the array, and check the tokens of the cited text separately, without comparing them for equality with the number of items |
| Cited content output | The number of returned items is consistent with the matched materials, and being empty is also normal; each citation can be traced back to the original paragraph | Open the citation marker in the conversation and compare against the source document; view the cited fragments and source identifiers in `quoteList` within `responseData` (non-streaming module results returned with detailed output enabled) |

## Three common errors

- Symptom: The activity name, quantity, and date of the same record do not match between the schedule and the observation records. Cause: The two materials are maintained separately and are not aligned by the same date and time period; although the cited fragments can be traced back, they point to different versions.
- Symptom: The version of the morning and afternoon check records is not synchronized, and the old version is still hit by retrieval. Cause: After the material was updated, the document in the knowledge base was not replaced, so the citation output returns the old fragment, which is inconsistent with the current signed version.
- Symptom: The observation records lack a signature or receipt, and the cited fragments cannot be mapped to the responsible person. Cause: The filling step was not completed, and the signature column was not checked when the material entered the knowledge base, so the basis items cannot be traced back to the complete original text.

## How to verify the setup

This feature's acceptance: ask a question that has an original-text basis, and check whether the citation array and marker can be traced back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through. View the cited fragments and source identifiers in `quoteList` within `responseData`, record the number of items in the array, and check the tokens of the cited text separately, without comparing them for equality with the number of items.

Business test: ask a basis question that spans materials, and see whether the answer gives a traceable source.

- Open the search parameter panel and check item by item, confirm that the values are consistent with those set in the knowledge base retrieval section, and record the number of items in the array.
- Open the citation marker in the conversation, compare against the source document, and check whether each citation can be traced back to the original paragraph and the current version.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
