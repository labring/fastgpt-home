---
title: Citations and Source Traceability for Off-Campus Training Registration and Compliance: Find Supporting Evidence
slug: /en/industry/education-d001-c045-f010
page_type: 行业问题页
application_area: education
meta_title: Training Compliance | Citations | Evidence
meta_description: Training Compliance: review citations for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Off-Campus Training Registration and Compliance: Find Supporting Evidence

## What this category's data looks like

In the off-campus training compliance filing and penalty response scenario, the materials entering the knowledge base retrieval node are mainly of three types: the school operating license and its copy, course filing materials (including course name, class hours, instructors, filing date, and signature field), and fee disclosure materials (including fee items, standards, disclosure date, and receipt). These materials are usually updated by semester or by rectification milestone, and the same record flows among the license, filing form, and disclosure sheet. The school operating license provides the basis for the entity's qualifications and permitted scope; the course filing materials provide the basis for the course name, quantity, date, and signature fields; the fee disclosure provides the basis for the fee items, amounts, disclosure date, and receipt fields. After the three types of materials enter the retrieval node, each participates in vector search as an independent source, and upon a hit is returned as a citation array containing the original text snippet and source identifier, for subsequent field comparison, ledger writing, or answer generation.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text snippet and source identifier, and the length may be 0. The "basis entries that can be traced back to the original text" are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| School operating license | Fields include permitted scope, validity period, issuance date, and signature, and the version is current | In the node, check the selected knowledge base collection and vector model, open the citation marker, and compare it against the original license paragraph |
| Course filing materials | Course name, number of class hours, filing date, instructors, and signature field match the original text | Run a trial with a cross-material question and see whether the returned citation snippet can be traced back to the corresponding row in the filing form, and record the array length |
| Fee disclosure materials | Fee items, standards, disclosure date, and receipt fields are consistent with the original text, and the version does not mix in an old disclosure | Check that the search parameters are consistent with the values in the knowledge base retrieval section, and check whether the cited text is complete under the `quoteMaxToken` budget |
| Citation content output | The number of returned entries matches the materials hit, and being empty is also normal | Run a trial with a question that has no matching materials, see that the output is empty while the chain continues, and check the `quoteList` field in `responseData` (non-streaming module results returned with detailed output enabled) |

## Three common errors

- Symptom: The name, quantity, and date of the same course do not match across two filing materials. Cause: The materials are entered separately and no cross-material field comparison is performed, so the citation snippet only traces back to a single original text.
- Symptom: The fee disclosure citation points to an old version and is inconsistent with the current disclosure. Cause: The old version in the knowledge base was not synchronized and removed, so retrieval hits the old snippet and the version marker is missing.
- Symptom: The filing materials lack a signature or receipt, but the citation snippet is still treated as valid basis. Cause: Retrieval only matches by semantics and does not distinguish complete from missing fields in the citation output.

## How to verify the setup

Acceptance for this feature: ask a question with an original-text basis and check whether the citation array and marker can be traced back to the original text; then ask a question with no matching materials and confirm that the array is empty while the chain still runs through.

Business test: ask a cross-material basis question and see whether the answer provides a traceable source.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check each item, keep them consistent with the values set in the knowledge base retrieval section, and record the number of citations and the `quoteMaxToken` budget.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
