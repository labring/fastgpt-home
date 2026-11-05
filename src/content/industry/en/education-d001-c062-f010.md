---
title: Citations and Source Traceability for Research Ethics Review: Find Supporting Evidence
slug: /en/industry/education-d001-c062-f010
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Citations | Evidence
meta_description: Research Ethics: review citations for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Ethics Review: Find Supporting Evidence

## What this category's data looks like

In the research ethics review scenario, the category materials include ethics review applications, informed consent form templates, and risk assessment forms, which together constitute the original sources of the business basis. An ethics review application usually contains the project name, review category, submission date, researcher signature, and ethics committee receipt; an informed consent form template contains the version number, effective date, subject signature field, and version change record; a risk assessment form contains risk items, levels, assessment date, and assessor signature. These materials enter the knowledge base retrieval node in document form, and each has a different role: the application is the primary basis, the template is the reference basis for the consent process, and the risk assessment form is the supporting basis for risk judgment. In terms of update rhythm, the version number and effective date often change with revisions, while signatures and receipts are completed during circulation. The field characteristics are that the name, quantity, and date of the same record need to be aligned item by item across multiple materials, and unsynchronized versions or missing signatures and receipts are common sources of inconsistency.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. The "basis items that can be traced back to the original text" are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Whether the fields, dates, and signatures match the original text | Open the citation marker in the conversation and check the project name, submission date, and researcher signature against the original application |
| Informed consent form template | Whether the version number, effective date, and signature field are consistent with the original text | Use the citation marker to trace back to the original template, check the version number and effective date, and then see whether the signature field is complete |
| Risk assessment form | Whether the risk items, levels, assessment date, and assessor signature can be traced back | Open the citations one by one and check the risk items and assessment date against the original assessment form |
| Knowledge base retrieval node | The number of items in the cited content array matches the hit materials, and `quoteMaxToken` only constrains the citation text budget | Use `responseData` (non-streaming module results returned with detailed output enabled) to view the length of the citation array, and use `quoteList` to check the source identifier of each citation |

## Three common errors

- Phenomenon: The name and date of the same record do not match between the application and the template. Cause: The two materials were revised separately, and no cross-material field comparison was performed.
- Phenomenon: The cited fragment does not match the original text. Cause: First check which material was hit in this round, then see whether truncation occurred.
- Phenomenon: The template is missing a signature or receipt. Cause: The version was not synchronized, and after the old version circulated, the signature field and receipt were not completed.

## How to verify the setup

Acceptance of this feature: Ask a question that has an original-text basis, and check whether the citation array and markers can trace back to the original text; then ask a question with no matching material, and confirm that the array is empty while the pipeline still runs.

Business test: Ask a basis question that spans materials, and see whether the answer provides a traceable source.

- Open the search parameter panel, check the values item by item against the knowledge base retrieval section, and confirm that the selected collection is a knowledge base with the same vector model.
- Run a test with a question that has no matching material, see that the citation array is empty while the output pipeline continues, then record the array length and the `quoteMaxToken` budget and check them separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
