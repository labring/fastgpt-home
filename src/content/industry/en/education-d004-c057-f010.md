---
title: Citations and Source Traceability for National Key Research and Development Applications: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c057-f010
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Citations | Handover
meta_description: National R&D Grants: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for National Key Research and Development Applications: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

The drafting of materials and responsibility handover for National Key R&D Program project applications involves three types of materials: the project application, the budget application, and the cooperation agreement. The project application is responsible for stating the research objectives, task decomposition, and assessment indicators; the budget application is responsible for stating the funding categories, calculation basis, and annual disbursement; the cooperation agreement is responsible for stating the division of labor among participating units, intellectual property, and signed receipts. The three types of materials are each drafted separately at the drafting stage, and after entering the handover stage, they corroborate one another. Field characteristics are concentrated in names, quantities, dates, signatures, and versions: the same equipment is a quantity in the budget application and a contribution method in the cooperation agreement; the same milestone date is a start and end time in the application and a disbursement year in the budget. The update rhythm follows the application window and internal countersigning, and each round of revision produces a new version, while old versions must be retained. When the materials enter the knowledge base retrieval node, each serves as a citable source document, providing original text snippets and source identifiers for field comparison.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text snippet and a source identifier, and the length may be 0. The "issuable material drafts and handover records" are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application | Names, quantities, dates, and signatures must be consistent with the budget application and cooperation agreement | In the node, check the selected collection and vector model, use `responseData` (non-streaming module results returned with detailed output enabled) to view the citation array, and trace each item back to the original paragraph |
| Budget application | Funding categories, calculation basis, and disbursement years must match the project application and cooperation agreement | Open the search parameter panel and check item by item; when the citation limit is involved, check the tokens of the cited text, and record the array length separately |
| Cooperation agreement | Participating units, division of labor, intellectual property, and signed receipts must be complete and version-synchronized | Run a test with a query that has no matching materials, see that the array is empty while the chain continues, then check the source identifiers in `quoteList` |
| Handover record | Responsible person, version number, and date remain consistent before and after handover | Draft one according to the template and complete one handover, see whether missing items are blocked, and record the number of citations by array length |

## Three common errors

- Phenomenon: The name and quantity of the same equipment do not match between the budget application and the cooperation agreement. Cause: The two materials were drafted separately and were not checked by tracing back to the same source snippet.
- Phenomenon: The project application has been revised to a new version, but the cooperation agreement still cites the old date. Cause: The versions were not synchronized, and during handover the comparison was not made item by item according to citation sources.
- Phenomenon: The cooperation agreement lacks a signature or receipt, but the handover record shows it has been signed for. Cause: Receipt was checked only against ledger fields, without tracing back to the signature page and receipt in the original text.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support, and check whether the citation array and superscripts can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain still runs through.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the node, check the selected collection and its vector model, and use `responseData` to view the citation array length and source identifiers.
- Open the search parameter panel and check item by item; when the citation limit is involved, check the tokens of the cited text, record the array length separately, and use `quoteList` to trace back to the original paragraph.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
