---
title: Citations and Source Traceability for Sino-Foreign Education Establishment and Annual Reports: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c048-f010
page_type: 行业问题页
application_area: education
meta_title: Joint Education | Citations | Handover
meta_description: Joint Education: review citations for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Sino-Foreign Education Establishment and Annual Reports: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses the scenario of the establishment and annual reports of Chinese-Foreign cooperatively run educational institutions. The core materials include the establishment application, the cooperation agreement, the articles of association, as well as annual reports and handover records. The establishment application carries fields such as the educational level, majors, enrollment scale, and school address; the cooperation agreement stipulates each party's capital contribution, management structure, intellectual property, and dispute resolution, with a signature page and date attached; the articles of association specify the governance structure, rules of procedure, and financial system. Annual report materials are updated by academic year, citing the previous academic year's data and approval document numbers. When the materials enter the knowledge base retrieval node, each is cited as an independent source: the establishment application and the cooperation agreement are used to compare the consistency of names, quantities, dates, and signatures, while the articles of association are used to verify governance clauses and version numbers. If the name, quantity, or date of the same record does not match across the two materials, if the version is not synchronized, or if a signature or receipt is missing, all of this will be exposed during the drafting and handover stages.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text snippet and a source identifier, and the length can be 0. The issuable material drafts and handover records are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Establishment application | Fields are complete, and names, quantities, dates, and signature page are consistent | Check the application fields item by item against the corresponding records in the cooperation agreement and articles of association, and check signatures and dates; view the number of entries in the citation array in `responseData` (non-streaming module results returned with detailed output enabled) |
| Cooperation agreement | Party names, contribution quantities, and signing dates do not conflict with the articles of association | Open the citation marker to trace back to the original paragraph, and compare the names and quantities of the same record across the two materials; check the source identifier in `quoteList` |
| Articles of association | Governance clauses, version number, and effective date are synchronized | Check whether the version number and date are consistent with the citations in the application and annual report; the tokens of the cited text are recorded separately and are not compared for equality with the number of array entries |
| Annual report materials | Academic year data, approval document number, and previous version citations are traceable | Record the number of entries in the citation array, and separately check the tokens budget of the cited text; when a citation limit is involved, check the `quoteMaxToken` budget |

## Three common errors

- Symptom: The name, quantity, or date of the same record does not match between the application and the cooperation agreement. Cause: The two materials were drafted separately, without cross-comparison and citation traceback.
- Symptom: The version of the articles of association is not synchronized, and the annual report still cites clauses from the old version. Cause: The version number and effective date were not brought into the retrieval scope as the materials were updated.
- Symptom: The signature page or receipt is missing, and the handover record is incomplete. Cause: During responsibility handover, the signature and receipt fields were not checked, and missing items were not blocked.

## How to verify the setup

Acceptance of this feature: ask a question that has textual support, check whether the citation array and markers can trace back to the original text, and view the number of entries in `responseData`; then ask a question with no matching materials, and confirm that the array is empty while the pipeline still runs through, with the source identifier in `quoteList` being empty.

Business test: draft one document according to the template and complete one handover, and see whether missing items are blocked.

- In the node, check the selected knowledge base collections and their vector models, open the search parameter panel, and check the values item by item.
- Run a trial with a query that has no matching materials, and see whether the output is empty while the pipeline continues; record the number of entries in the citation array, separately check the tokens budget of the cited text, and when a citation limit is involved, check `quoteMaxToken`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
