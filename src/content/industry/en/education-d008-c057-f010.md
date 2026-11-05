---
title: Citations and Source Traceability for National Key Research and Development Applications: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c057-f010
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Citations | Access
meta_description: National R&D Grants: review citations for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for National Key Research and Development Applications: Manage Authorized Access and External Services

## What this category's data looks like

This category's data covers three types of materials involved in National Key R&D Program project applications: the project application form, the budget application form, and the cooperation agreement. The project application form states the research content, assessment indicators, and participating units; the budget application form states the funding subjects, amounts, and calculation basis; the cooperation agreement states the task division, intellectual property ownership, and signing information. These three types of materials enter knowledge base retrieval during authorized access and external services, respectively serving as the basis for the main text, the basis for figures, and the basis for rights and responsibilities. Materials are updated on a rolling basis by application batch, and their field characteristics are the coexistence of names, quantities, dates, signatures, and receipts, with the same record often appearing repeatedly in two materials. The authorization scope is divided by visitor identity; when opened to parents or superiors, only content matching the visible scope is exposed, and content beyond authorization is not visible.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text fragment and source identifier, and the length can be 0. The "externally available entry points and authorization scope" are subsequently completed by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | The names, quantities, dates, and signatures are self-consistent within the application form and consistent with the corresponding records in the cooperation agreement | Retrieve the original paragraphs of the application form, compare the names, quantities, and dates item by item, check whether the signature page and receipt are complete, and record the number of citations and `responseData` (non-streaming module results returned with detailed output enabled) |
| Budget application form | The funding subjects, amounts, and calculation dates are self-consistent within the budget form and consistent with the project application form | Open the corresponding paragraphs of the budget form, verify the subject names, quantities, and dates, check the signatures and receipts, and record the tokens of the cited text separately, without comparing them to the number of array entries |
| Cooperation agreement | The task division, intellectual property ownership, and signing date are self-consistent within the agreement and correspond to the two application forms | Check the signature page and receipt of the agreement, compare the names, quantities, and dates of the same record in the two materials, check whether the versions are synchronized, and view `quoteList` if necessary |
| Associated knowledge base | The selected knowledge base uses the same vector model and is consistent with the retrieval settings | In the node, check the selected collections and their vector models, open the search parameter panel and verify each item, and confirm that `quoteMaxToken` is the content budget |

## Three common errors

- Symptom: The names, quantities, and dates of the same record do not match between the project application form and the cooperation agreement. Cause: The two materials were revised separately without cross-comparison, causing the field definitions to diverge.
- Symptom: The version of the budget application form is not synchronized, and the cited fragment points to an old version of the subject. Cause: The update batches were not unified, old and new versions coexist in the knowledge base, and retrieval hits the old paragraph.
- Symptom: The cooperation agreement lacks a signature or receipt, but the citation can still return the original text fragment. Cause: The signature page was not checked when the material was ingested, and the citation output only reflects the hit content without verifying signature completeness.

## How to verify the setup

Acceptance of this feature: ask a question with textual support and check whether the cited content array and citation markers can point back to the original paragraphs; then ask a question with no matching material and confirm that the array is empty while the output pipeline still runs through.

Business test: access once with a restricted identity and see whether the visible scope matches the settings, with content beyond authorization not visible.

- Open the citation markers in the conversation, compare them against the source documents, and verify item by item whether the cited fragments correspond to the original paragraphs.
- Run a test with a question that has no matching material, see that the output is empty while the pipeline continues, and separately record the number of array entries and the tokens of the cited text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
