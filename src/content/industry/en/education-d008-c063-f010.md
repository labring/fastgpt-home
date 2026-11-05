---
title: Citations and Source Traceability for Academic Misconduct Reports and Investigations: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c063-f010
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Citations | Access
meta_description: Research Misconduct: review citations for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Academic Misconduct Reports and Investigations: Manage Authorized Access and External Services

## What this category's data looks like

This page addresses the scenario of investigating and handling academic misconduct reports. The materials include three categories: report materials, investigation reports, and expert appraisal opinions. Report materials carry the original leads and submission times, investigation reports record the verification process and conclusions, and expert appraisal opinions provide professional judgments and signatures. When these three categories of materials enter the knowledge base retrieval node, each serves as a citable original source. The citation output is only responsible for pointing back to the fragment and the source identifier, and is not responsible for determining field consistency between materials. The material update rhythm follows the advancement of the investigation stage. Common fields include the name of the reported person, the name of the involved paper or project, quantity, date, signature, and receipt. If the name, quantity, or date of the same record do not match between two materials, if versions are not synchronized, or if signatures or receipts are missing, the correspondence between cited fragments and the original text becomes more complicated. Authorized access and external services require that visitor identity matches the visible scope, that unauthorized access remains invisible, and that when opening to parents or superiors, the visible boundary must first be confirmed.

## Configuration and implementation checks

The citation output of the knowledge base retrieval node outputs only an array of cited content, each item containing an original fragment and a source identifier. Its length can be 0. The externally accessible entry point and authorization scope must be handled subsequently by AI nodes, code nodes, or humans. The citation array is not a discrepancy list, ledger, report, or authorization scope. The number of items is the array length, and `quoteMaxToken` is the content budget. The two are not compared for equality.

| Object | Check | Verification action |
| --- | --- | --- |
| Report materials | Whether fields, dates, and signatures are consistent with the investigation report | Check the name of the reported person, the name of the involved paper, quantity, date, signature, and receipt; open the citation marker to point back to the original paragraph |
| Investigation report | Whether the name, quantity, and date of the same record match across different materials | Compare the corresponding fields in the report materials and expert appraisal opinions, confirm version synchronization, and record the citation array length and the `quoteMaxToken` value |
| Expert appraisal opinions | Whether signatures and receipts are complete and whether versions are synchronized | Check the signing date and receipt of the appraisal opinion, confirm that cited fragments can point back to the original text, and use `responseData` (non-streaming module results returned with detailed output enabled) to inspect the output structure |
| Authorized access entry point | Whether visitor identity matches the visible scope and whether unauthorized access remains invisible | Access once with a restricted identity, see whether the visible scope matches the setting, and confirm that external services only open the authorized scope |

## Three common errors

- Phenomenon: There is no citation marker in the answer. Cause: This round did not hit any material, or the citation output is an empty array, while the chain still runs through. First check the hit situation, then look at trimming.
- Phenomenon: The name, quantity, and date of the same record do not match between the report materials and the investigation report. Cause: Versions are not synchronized, or the same field standard was not used for verification during entry.
- Phenomenon: Cited fragments do not match the original text. Cause: First check whether this round hit anything and which material was hit, then look at `quoteMaxToken` trimming, and do not directly attribute it to length.

## How to verify the setup

Acceptance of this feature: Ask a question with an original-text basis, and check whether the citation array and citation markers can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business testing: Access once with a restricted identity, see whether the visible scope matches the setting, confirm that unauthorized access remains invisible, and when opening to parents or superiors, confirm that the entry point matches the authorization scope.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check item by item, confirm that the values are consistent with those set in the knowledge base retrieval section, and record the number of citation array items and the `quoteMaxToken` budget.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
