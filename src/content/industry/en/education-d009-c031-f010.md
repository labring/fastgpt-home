---
title: Citations and Source Traceability for Modern Apprenticeships and Employer-Sponsored Classes: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c031-f010
page_type: 行业问题页
application_area: education
meta_title: Apprenticeships | Citations | Multilingual
meta_description: Apprenticeships: review citations for multilingual work. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Modern Apprenticeships and Employer-Sponsored Classes: Handle Multilingual Materials and Terminology

## What this category's data looks like

When materials for modern apprenticeship and order class management enter the multilingual materials and terminology processing function, each plays a different role. School-enterprise cooperation agreements provide the cooperation entities, term, positions, and signature fields, and serve as the basis for terminology sources and authorization boundaries; order class training plans give the courses, semesters, student numbers, and assessment criteria, and are the backbone of the unified terminology glossary and comparison drafts; master-apprentice records contain dates, work hours, number of apprentices, and signed receipts, and are the source documents for traceability and consistency checks. The three types of materials often run in parallel in Chinese-English or multilingual versions, and their update cadence advances by semester, batch, and agreement renewal, making it easy for the name, quantity, and date of the same record to mismatch across two materials, for versions to be out of sync, and for signatures or receipts to be missing. Field characteristics center on name, quantity, date, signature, and receipt. The citation sources and traceability function is responsible for outputting these material fragments as verbatim citations, for subsequent field comparison, ledger writing, and report generation.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing a verbatim fragment and a source identifier, and its length can be 0. The "unified terminology glossary and comparison draft" is then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| School-enterprise cooperation agreement | Whether the cooperation entities, term, positions, and signature fields are consistent with the order class training plan, and whether the name, quantity, and date of the same record match | Open the citation marker to point back to the original paragraph, check that the cited fragment in `responseData` (non-streaming module results returned with detailed output enabled) matches the original agreement text, and record the number of array entries |
| Order class training plan | Whether the courses, semesters, student numbers, and assessment criteria use the same terminology consistently throughout in the multilingual versions, and whether the translated names can point back to the original text | Check the cited fragments against the original plan text one by one, check the source identifier in `quoteList`, and sample three terms to check whether their wording is consistent throughout |
| Master-apprentice record | Whether the dates, work hours, number of apprentices, and signed receipts correspond to the agreement and training plan, and whether signatures or receipts are missing | Use the original apprentice record text to compare the cited fragments, check that `quoteMaxToken` is the citation content budget, and record the number of array entries separately without comparing it for equality |
| Multilingual comparison draft | Whether the same term is consistent across language versions, whether versions are in sync, and whether translated names can point back to the original text | Open the citation marker to compare against the source document, check that the citation array corresponds to the original paragraphs, and mark places where versions are out of sync for manual confirmation |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the agreement and the training plan. Cause: the multilingual versions are updated separately, terminology is not unified, and cited fragments are not checked one by one against the original text.
- Symptom: an apprentice record is missing a signature or receipt but is still cited as a valid source. Cause: when the material enters retrieval it is not filtered by signature field, and the citation array only reflects hits, not signing status.
- Symptom: cited fragments do not match the original text and this is directly attributed to length truncation. Cause: it is not first checked whether this round had a hit and which material was hit before looking at truncation; an empty array is itself a normal output.

## How to verify the setup

Acceptance for this function: ask a question that has support in the original text, check whether the citation array and markers can point back to the original text, and check the three identifiers `responseData`, `quoteList`, and `quoteMaxToken`; then ask a question with no matching material and confirm that the array is empty while the pipeline still runs through.

Business testing: sample three terms to check whether their wording is consistent throughout, check whether translated names can point back to the original text, and check the fields, dates, and signatures of the agreement, training plan, and apprentice records.

- In the node, check that the selected knowledge base uses the same vector model, open the search parameter panel to check the values item by item, and record the number of citation array entries.
- Run a trial with a question that has no matching material, see that the output is empty while the pipeline continues, then open the citation marker to compare against the source document and check that the citations correspond to the original text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
