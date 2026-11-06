---
title: Citations and Source Traceability for Research Ethics Review: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c062-f010
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Citations | Handover
meta_description: Research Ethics: review citations for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Ethics Review: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

In the research ethics review scenario, ethics review applications, informed consent form templates, and risk assessment forms are three core types of materials, each carrying different fields: the application contains the study name, principal investigator, review category, and date; the informed consent form template contains the study name, participant rights, signature block, and version number; the risk assessment form contains the risk level, handling measures, assessor, and signature. The three types of materials often use the same study record as the source document, and the name, quantity, and date need to be consistent across materials. When the materials enter the knowledge base retrieval node, they serve as the retrieved original source, and the node returns an array of cited content according to the search parameters, for subsequent field comparison, ledger writing, and report generation. The update cadence advances with the review stages, the version number and signing date change in sync, and the citation relationships among materials need to be traceable.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text snippet and source identifier, and the length can be 0. The "issuable material drafts and handover records" are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | The study name, principal investigator, review category, date, and signature fields are complete | In the node, check the selected knowledge base collections and vector model, and compare the application fields item by item against the source documents |
| Informed consent form template | Participant rights, signature block, version number, and date are consistent | Open the citation markers, compare the template fields against the source documents, and record the number of citations and the `quoteMaxToken` budget |
| Risk assessment form | Risk level, handling measures, assessor, and signature receipt are complete | Run a test with a question that has no matching materials, see that the output is empty while the chain continues, then check `responseData` (non-streaming module results returned with detailed output enabled) when there is a match |
| Handover record | Responsible person, version, date, and receipt status are traceable | Draft one according to the template and complete one handover, check whether missing items are blocked, and record `quoteList` |

## Three common errors

- Symptom: The same study name is written differently in the application and the informed consent form. Cause: The two materials were drafted in different steps, and the fields were not compared against the same source document.
- Symptom: The version number of the risk assessment form does not match the application date. Cause: The version was not updated in sync, and the old version of the material is still retrieved and cited.
- Symptom: The handover record lacks a signature or receipt. Cause: The receipt step was not filled in, the responsible person field is empty, and the chain still passes.

## How to verify the setup

Acceptance for this feature: ask a question with source support, and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain continues.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the node, check the selected knowledge base collections and their vector models, and confirm they use the same vector model.
- Open the search parameter panel and check the values item by item, record the number of citations and the `quoteMaxToken` budget, and do not compare the two for equality.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
