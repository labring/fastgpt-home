---
title: Citations and Source Traceability for Enterprise Employee Skills Assessment: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c035-f010
page_type: 行业问题页
application_area: education
meta_title: Employee Skills | Citations | Handover
meta_description: Employee Skills: review citations for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Enterprise Employee Skills Assessment: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This category's data involves three core types of materials: the enterprise evaluation filing form, the evaluation specification, and the candidate roster. The filing form carries the evaluation entity, occupational direction, and filing date, and is the starting point of the material chain; the evaluation specification defines the assessment method, scoring rules, and division of responsibilities, and is the basis for judgment; the roster records candidate identity, declared level, and batch, and is the ledger of headcount and name list. When the three types of materials enter the knowledge base retrieval step, each is cited as an independent source, and the cited snippets retain the original paragraph and source identifier, facilitating subsequent field comparison. In terms of update cadence, the filing form is synchronized with filing changes, the evaluation specification is re-versioned with institutional revisions, and the roster is generated on a rolling basis by batch. After the materials enter this feature, the filing form provides the entity and date baseline, the evaluation specification provides the rules and signature basis, and the roster provides the personnel count and name list scope; together the three support field verification of issuable material drafts and handover records.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original snippet and source identifier, and the length can be 0. Even if no content is found, the output chain still completes. The issuable material drafts and handover records are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Enterprise evaluation filing form | Whether the filing entity, occupational direction, filing date, and signature field are consistent with the evaluation specification | Retrieve the original snippet of the filing form, verify the entity name, occupational direction, filing date, and signature field, and record the number of citations and source identifiers |
| Evaluation specification | Whether the assessment method, scoring rules, division of responsibilities, and version date are consistent with the filing form and roster scope | Retrieve the original snippet of the evaluation specification, verify the version number, effective date, and responsible positions, and confirm that the cited snippet can be traced back to the original paragraph |
| Candidate roster | Whether candidate names, declared levels, batches, and headcount match the records in the filing form and evaluation specification | Retrieve the original snippet of the roster, verify names, levels, batches, and headcount, record the cited array length separately, and do not compare the number of entries with `quoteMaxToken` for equality |
| Knowledge base retrieval node | Whether the associated knowledge base uses the same vector model, and whether the cited content output is returned as an array and its length can be 0 | In the node, verify the selected collection and vector model, open the search parameter panel and check each item, run a trial with a question that has no matching materials to confirm the output is empty while the chain continues, and check the citation markers in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` |

## Three common errors

- Symptom: the same candidate's name, declared level, or batch does not match across two materials. Cause: the roster and filing form are maintained separately and are not synchronized under a unified scope, causing field scope divergence.
- Symptom: the evaluation specification has been re-versioned, but the filing form and handover record still cite the old version date. Cause: the version was not synchronized, the effective date and version number were not verified during material drafting, and the responsibility handover lacks a version consistency check.
- Symptom: the filing form or handover record lacks a signature or receipt, and the next step cannot sign off. Cause: the signature field and receipt field were not included in the field completeness determination, and the responsible person and date were not checked item by item during handover.

## How to verify the setup

Feature acceptance: ask a question with an original-text basis, check whether the cited content array and citation markers can be traced back to the original paragraph, and confirm that each citation contains the original snippet and source identifier; then ask a question with no matching materials, confirm the array is empty while the chain completes, and separately record the number of citations, do not compare the number of entries with `quoteMaxToken` for equality, and when the citation limit is involved, check the tokens of the cited text.

Business test: draft one document according to the template and complete one handover, and see whether missing items are blocked.

- In the knowledge base retrieval node, verify whether the selected knowledge base uses the same vector model, open the search parameter panel and check each value item by item, and run a trial with a question that has no matching materials to confirm the cited content output is empty while the chain continues.
- In the conversation, open the citation markers, compare against the source documents to verify whether each citation can be traced back to the original paragraph, check the citation records in `quoteList` within `responseData`, record the cited array length separately, and do not compare the number of entries with `quoteMaxToken` for equality.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
