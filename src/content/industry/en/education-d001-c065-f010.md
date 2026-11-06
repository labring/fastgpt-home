---
title: Citations and Source Traceability for Laboratory Hazardous Chemical Purchasing and Records: Find Supporting Evidence
slug: /en/industry/education-d001-c065-f010
page_type: 行业问题页
application_area: education
meta_title: Lab Chemicals | Citations | Evidence
meta_description: Lab Chemicals: review citations for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Laboratory Hazardous Chemical Purchasing and Records: Find Supporting Evidence

## What this category's data looks like

For the laboratory hazardous chemical procurement and ledger category, materials include procurement application forms, requisition registration forms, inventory ledgers, supplier receipts, and safety data sheets. The procurement application form records the product name, specification, quantity, application date, and approval signature; the requisition registration form records the requisitioner, requisition date, quantity, and purpose signature; the inventory ledger records inbound, outbound, and balance on a rolling basis by date, with a custodian signature attached. When materials enter the knowledge base retrieval node, each is vectorized as an independent source, and after a retrieval hit, it is returned as a cited snippet with a source identifier for subsequent field comparison, date and signature verification, and generation of basis entries. In terms of update cadence, the ledger is updated on a rolling basis with inbound and outbound movements, while application forms and registration forms are archived by batch, with the current effective version prevailing and old versions retained for reference. Field characteristics are concentrated in four categories: name, quantity, date, and signature, and cross-material consistency is the focus of verification.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text snippet and source identifier, and the length may be 0. Even if no content is found, the output chain still completes, and the basis entries that can be traced back to the original text are completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Procurement application form | Hazardous chemical procurement application fields: whether the product name, specification, quantity, application date, and approval signature are complete and consistent with the current version | In the retrieval results, open the citation marker, compare it with the original application form, verify the name, quantity, date, and signature, and record the source identifier in `quoteList` |
| Requisition registration form | Requisition registration fields: whether the requisitioner, requisition date, quantity, purpose, and signature correspond one by one with the inventory ledger | Ask a cross-material question using the same product name, open the citation marker to compare the name, quantity, and date in the requisition registration form and inventory ledger, and confirm that the cited snippet can be traced back to the original paragraph |
| Inventory ledger | Inventory ledger fields: whether inbound, outbound, balance, date, and custodian signature are consistent with the application form and registration form | Verify whether the number of entries in the citation array matches the hit materials, record the array length separately, and check whether the citation text budget corresponding to `quoteMaxToken` covers the required snippets |
| Supplier receipt | Receipt fields: whether the arrival date, quantity, and receipt signature match the procurement application form and inventory ledger | Open the citation marker to compare it with the original receipt, confirm that the version is the current effective one, and record missing signatures or receipts as materials pending supplementation |

## Three common errors

- Phenomenon: The name or quantity of the same product does not match between the application form and the ledger. Cause: The two materials use different entry standards or were not archived under the same batch, and fields were not compared one by one after retrieval hits.
- Phenomenon: The cited snippet is inconsistent with the current version. Cause: Old-version materials are still in the knowledge base and are not marked with a version, the retrieval hits the old version, and the current effective version is not verified.
- Phenomenon: The requisition registration lacks a signature or receipt. Cause: Material archiving is incomplete; although the citation array returns snippets, it cannot trace back to the complete signature field, requiring manual supplementary verification.

## How to verify the setup

Acceptance of this feature: ask a question with an original-text basis and check whether the citation array and citation markers can trace back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain completes, and check the number of citations and source identifiers in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList`.

Business test: ask a cross-material basis question, see whether the answer provides a traceable source, and verify whether the cited snippet is consistent with the original paragraph.

- Open the search parameter panel and check the values item by item, confirm that the associated knowledge base uses the same vector model, and run a trial with a no-match question to see that the output is empty while the chain continues.
- In the conversation, open the citation markers, compare the source documents to verify the name, quantity, date, and signature, record the citation array length, and separately check the tokens of the citation text corresponding to `quoteMaxToken`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
