---
title: Citations and Source Traceability for Research Ethics Review: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c062-f010
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Citations | Access
meta_description: Research Ethics: review citations for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Ethics Review: Manage Authorized Access and External Services

## What this category's data looks like

In the research ethics review scenario, materials mainly consist of ethics review applications, informed consent form templates, and risk assessment forms. The three form a mutually corroborating chain around the same research project: the application carries the project name, research period, principal investigator, and signature; the informed consent form template carries the elements of subject notification, version date, and signature field; the risk assessment form carries the risk level, handling measures, assessment date, and approval signature. The materials originate from institutional ethics committee archives and project team submissions. The update cadence is triggered by protocol amendments, annual continuing review, and approval expiration. Common issues include versions not synchronized, dates and quantities not matching between the two materials, and missing signatures or acknowledgments. When entering the authorized access and external services function, the application is the primary record, while the informed consent form template and risk assessment form are attachment evidence, used to compare fields, write ledgers, and generate external reports; the external entry only presents content that matches the visitor's identity and visibility scope, and unauthorized content is not visible.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each containing the original text snippet and source identifier, and the length can be 0. "External-facing entry and authorization scope" is subsequently completed by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Whether the fields, dates, and signatures are consistent with the informed consent form template | Retrieve the original text snippet of the application and the original text snippet of the template, compare item by item the project name, research period, version date, and signature field, and record the number of citations and the `quoteMaxToken` budget |
| Informed consent form template | Whether the version date and signature acknowledgment are synchronized with the risk assessment form | Open the citation marker to trace back to the source document, verify the template version number, notification elements, and acknowledgment, and confirm there are no missing signatures |
| Risk assessment form | Whether the risk level, handling measures, and assessment date match the application | Access once with a restricted identity, check whether the visible scope matches the settings, and ensure unauthorized content is not visible |
| Citation content output | The number of returned items matches the hit materials; empty is also normal | Run a test with a question that has no matching materials, observe that the output is empty while the pipeline continues, and `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` are available for inspection |

## Three common errors

- Symptom: The name, quantity, and date of the same research project do not match between the two materials. Cause: After a protocol amendment, only one material was updated while the other still uses the old version, so the versions are not synchronized.
- Symptom: The informed consent form template lacks a signature or acknowledgment, while the risk assessment form has an approval signature. Cause: The submission and archived copies are not synchronized in circulation, and the signature step was skipped.
- Symptom: There is no citation marker in the answer, and the cited snippet does not match the original text. Cause: First check whether this round hit anything and which material was hit, then look at trimming, and do not directly attribute it to length trimming.

## How to verify the setup

Acceptance for this function: Ask a question with original text support, and check whether the citation array and markers can trace back to the original text; then ask a question with no matching materials, confirm the array is empty while the pipeline runs through, record the number of items by array length, and note that `quoteMaxToken` is only used as the content budget.

Business test: Access once with a restricted identity, check whether the visible scope matches the settings, ensure unauthorized content is not visible, and verify the authorization scope of the external entry.

- In the node, verify whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- In the conversation, open the citation markers, compare each citation against the source document to see whether it can trace back to the original paragraph, and record the number of citations and the `quoteMaxToken` budget.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
