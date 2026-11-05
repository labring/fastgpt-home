---
title: Citations and Source Traceability for Adult College Entrance Applications and Admissions: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c055-f010
page_type: 行业问题页
application_area: education
meta_title: Adult Admissions | Citations | Intake
meta_description: Adult Admissions: review citations for question intake. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Adult College Entrance Applications and Admissions: Handle Questions and Collect Missing Information

## What this category's data looks like

This category's data covers three types of materials: registration forms, care bonus-point materials, and admission rosters. The registration form records the candidate's basic information, application level, and preferences, with fields including name, ID number, application subject category, signature, and acceptance date; the care bonus-point materials include the bonus item, certificate number, issuing unit, date of issuance, and review signature; the admission roster includes the admission batch, major, planned number, and admission date. The three types of materials are updated by year and batch: registration forms are submitted on a rolling basis during the registration period, bonus-point materials are supplemented at the qualification review checkpoint, and admission rosters are archived after admission ends. When the materials enter the Q&A intake and missing-item follow-up function, the registration form provides traceability for identity and application information, the bonus-point materials provide traceability for qualification basis, and the admission roster provides traceability for results and batches; the three serve as field comparison source documents for one another.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text snippet and a source identifier, and the length may be 0. The intake record and the completed follow-up questions are then handled by subsequent AI nodes, code nodes, or humans.

| Object | Check | Verification action |
| --- | --- | --- |
| Adult college entrance exam registration form | Whether the registration form fields, dates, and signature match the bonus-point materials and admission roster | Check the name, ID number, application subject category, acceptance date, and signature, open the citation superscript to point back to the original paragraph of the registration form, and record the number of citations and the `quoteMaxToken` budget |
| Care bonus-point materials | Whether the bonus item, certificate number, issuing unit, date of issuance, and review signature are complete | Compare the bonus item name, quantity, and date against the registration form and admission roster, check the signature and receipt, see whether the citation array is empty, and confirm the chain works end to end |
| Admission roster | Whether the admission batch, major, planned number, and admission date are consistent with the registration form | Compare the name, quantity, and date item by item, check whether the versions are in sync, use `responseData` (non-streaming module results returned with detailed output enabled) to view the citation array length, and use `quoteList` to expand a single citation source |
| Knowledge base retrieval node | Whether the associated knowledge base uses the same vector model, and whether the search parameters are consistent with the knowledge base retrieval section | Open the search parameters panel and check item by item, run a trial with a question that has no matching materials, and confirm the citation array is empty while the output chain continues |

## Three common errors

- Symptom: the same candidate's name is written differently in the registration form and the admission roster. Cause: the two materials are entered at different stages, lacking unified field comparison and verification that points back to the original text.
- Symptom: the date of issuance of the bonus-point materials is later than the registration acceptance date. Cause: versions are not in sync, supplementary materials are not written back to the registration form, and the cited snippet does not match the original text.
- Symptom: the registration form lacks the candidate's signature or the bonus-point materials lack the review receipt. Cause: the signature fields were not checked item by item when the materials were archived, and although the citation array is non-empty, the basis is incomplete.

## How to verify the setup

This function's acceptance: ask a question that has an original-text basis and check whether the citation array and superscripts can point back to the original text; then ask a question with no matching materials and confirm the array is empty while the chain works end to end.

Business test: raise a question that lacks key information and see whether it asks a follow-up question before answering.

- Open the conversation citation superscripts, check against the source documents whether each citation can point back to the original paragraph, and record the number of citations and the `quoteMaxToken` budget; the two are not compared for equality.
- Run a trial with a question that has no matching materials, confirm the citation array is empty while the output chain continues, then use `quoteList` within `responseData` to view the array length and a single source.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
