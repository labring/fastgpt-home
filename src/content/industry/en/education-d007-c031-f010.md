---
title: Citations and Source Traceability for Modern Apprenticeships and Employer-Sponsored Classes: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c031-f010
page_type: 行业问题页
application_area: education
meta_title: Apprenticeships | Citations | Review
meta_description: Apprenticeships: review citations for exception review. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Modern Apprenticeships and Employer-Sponsored Classes: Trace Exceptions and Review Results

## What this category's data looks like

Modern apprenticeship and order class management involves three types of materials: school-enterprise cooperation agreements, order class training plans, and master-apprentice records. School-enterprise cooperation agreements include the cooperation period, number of positions, signatures of both parties, and dates; order class training plans include course modules, credit hours, assessment methods, and version numbers; master-apprentice records include mentoring masters, apprentice lists, mentoring cycles, stage evaluations, and receipts. When these three types of materials enter the knowledge base retrieval node, each participates in hits as a citation source: agreements provide the basis for authorization and duration, training plans provide teaching and assessment fields, and apprenticeship records provide process and signature fields. Materials are updated by semester or batch; agreements change versions upon renewal, plans change versions with teaching adjustments, and apprenticeship records are supplemented weekly or monthly. The field characteristic is that the same record appears repeatedly in agreements, plans, and records, and names, quantities, dates, and signature statuses need cross-comparison.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each containing the original text snippet and source identifier, and the length can be 0. The "exception list and review conclusions" are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| School-enterprise cooperation agreement | Whether the cooperation period, number of positions, signatures of both parties, and dates are consistent with the order class training plan | In the citation superscript, refer back to the original paragraph of the agreement, and check the period, quantity, signature, and date fields |
| Order class training plan | Whether the course modules, credit hours, assessment methods, and version number correspond to the master-apprentice records | Open the search parameter panel to check the values, and compare the plan version item by item with the stage evaluations in the records |
| Master-apprentice record | Whether the mentoring master, apprentice list, mentoring cycle, stage evaluations, and receipts are complete | Run a trial with a question that has no matching materials, see that the citation array is empty while the chain continues, and then check the record receipts |

## Three common errors

- Symptom: The names, quantities, and dates of the same record in the agreement and training plan do not match. Cause: The two materials were entered separately, and no field-level cross-comparison was performed.
- Symptom: The training plan has changed versions, but the apprenticeship records still reference the old version's courses and credit hours. Cause: The versions were not synchronized, and the update rhythms are inconsistent.
- Symptom: The apprenticeship records lack signatures or receipts, and the review conclusion cannot be written. Cause: Process material supplementation is delayed, and the signature step is not closed-loop.

## How to verify the setup

Acceptance for this feature: ask a question with original text evidence, and check whether the citation array and superscripts can refer back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and check the number of citations in `quoteList` within `responseData` (non-streaming module results returned with detailed output enabled).

Business test: create an exception record, see whether the source material can be traced, and check `quoteMaxToken` as the citation content budget, with the array length recorded separately.

- In the node, check the selected collections and their vector models, and confirm that the associated knowledge bases use the same vector model.
- Open the search parameter panel and check item by item, confirming that the values are consistent with those set in the knowledge base retrieval section.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
