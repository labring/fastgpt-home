---
title: Citations and Source Traceability for Modern Apprenticeships and Employer-Sponsored Classes: Track Progress and Check Statistics
slug: /en/industry/education-d006-c031-f010
page_type: 行业问题页
application_area: education
meta_title: Apprenticeships | Citations | Progress
meta_description: Apprenticeships: review citations for progress tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Modern Apprenticeships and Employer-Sponsored Classes: Track Progress and Check Statistics

## What this category's data looks like

This category's data looks like this: Modern apprenticeship and order class management involves three core types of materials: school-enterprise cooperation agreements, order class training plans, and master apprenticeship records. School-enterprise cooperation agreements are signed jointly by the school and the enterprise, including the cooperation period, job direction, and the rights and responsibilities of both parties; the fields are mainly names, quantities, dates, and signatures. Order class training plans are prepared by the teaching management department, including course modules, rotation arrangements, and assessment methods; the fields include version numbers and approval signatures. Master apprenticeship records are filled in weekly by enterprise masters, including trainee names, positions, work hours, task items, and master signatures. The three types of materials play different roles in progress records and statistical verification: cooperation agreements and training plans provide the basis for definitions, while apprenticeship records provide the original entries. Materials are updated successively with agreement renewals, plan revisions, and weekly apprenticeship entries, and version and signature statuses need to be synchronized.

## Configuration and implementation checks

Configuration and implementation checks: The citation output of the knowledge base retrieval node outputs only an array of cited content, each item containing the original text fragment and source identifier; the length may be 0. The progress table and statistical definition notes must be handled subsequently by AI nodes, code nodes, or manual work. Even if no content is retrieved, the output chain will still run through.

| Object | Check | Verification action |
| --- | --- | --- |
| School-enterprise cooperation agreement | Check whether the names and dates of the cooperation period, job direction, and rights and responsibilities of both parties are consistent with the order class training plan, and whether signatures and receipts are complete | In the node, check the selected collections and their vector models, open the citation markers to compare against the original agreement paragraphs, and compare names, quantities, dates, and signatures item by item |
| Order class training plan | Check whether the version numbers and approval signatures of course modules, rotation arrangements, and assessment methods match the weekly entries in the master apprenticeship records | Run a trial with a question that has no matching materials, see whether the output is empty while the chain continues, then open the search parameter panel and check the values item by item |
| Master apprenticeship record | Check whether trainee names, positions, work hours, task items, and master signatures are consistent with the training plan definitions, and whether dates and quantities can be traced back to the original text | In the conversation, open the citation markers, compare against the source documents, record the number of citations and the tokens of the cited text, and record the array length separately |

## Three common errors

- Symptom: The same trainee name or work hours do not match in wording and quantity across two materials. Cause: The cooperation agreement and training plan are maintained separately, no field-level comparison has been done, and cited fragments and the original text have not been traced back item by item.
- Symptom: The training plan has been revised, but the apprenticeship records still cite the old version. Cause: The version was not synchronized, the retrieved hit is old material, and although the output chain runs through, the citations are disconnected from the current definitions.
- Symptom: Apprenticeship records lack a master signature or receipt, but the statistical totals are still counted. Cause: Exceptions are not clearly stated in the table header, an empty citation array is mistakenly judged as retrieval failure, and it is not checked whether materials were hit in the current round.

## How to verify the setup

How to verify the setup: For this feature's acceptance, ask a question with original-text support, check whether the citation array and markers can be traced back to the original text, record the number of citations, i.e. the array length, and separately record the tokens of the cited text; `quoteMaxToken` is only a content budget and is not used for comparing equal item counts. Then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and that empty citation fields in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` are also normal.

Business test: Use one week of records to verify the totals, see whether the definitions and exceptions are clearly stated, whether the table header specifies the statistical definitions and exception notes, and whether the recorded counts and statistical counts match.

- Open the search parameter panel and check the values item by item, confirm they are consistent with the values set in the knowledge base retrieval section, and check the selected collections and their vector models.
- In the conversation, open the citation markers, compare against the source documents and trace back to the original paragraphs item by item, record the number of citations and the tokens of the cited text, and record the array length separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
