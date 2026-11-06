---
title: Citations and Source Traceability for Research Project Task Agreement Signing: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c058-f010
page_type: 行业问题页
application_area: education
meta_title: Research Agreements | Citations | Versions
meta_description: Research Agreements: review citations for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Project Task Agreement Signing: Maintain Document Versions and Changes

## What this category's data looks like

During the signing stage of scientific research project task books, materials usually include the project task book, the subject task breakdown table, and the budget book. The task book defines the research objectives, assessment indicators, and start and end dates; the breakdown table assigns tasks to subjects, responsible persons, and delivery milestones; the budget book gives subject amounts, calculation bases, and matching sources. These three types of materials are repeatedly revised during the signing stage, and their fields are dense: project and subject names, numbers, undertaking units, responsible persons, task start and end dates, indicator values, budget subjects, signatures, and receipts. Sources are mostly internal unit templates, exports from higher-level application systems, and email attachments; the update rhythm is high-frequency before finalization, and after signing it follows change orders. When the materials enter the citation output of the knowledge base retrieval node, each serves as a retrievable original-text source, providing a basis for subsequent comparison of names, quantities, dates, and signatures, and does not directly generate a ledger.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each item containing an original-text snippet and a source identifier, and the length may be 0. The version ledger and change records are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Project task book | Check the research objectives, assessment indicators, start and end dates, and signature fields, and confirm that the names, quantities, and dates are consistent with the same record in the breakdown table and budget book | In the conversation, open the citation marker to point back to the original paragraph of the task book, record the number of citations in this round, i.e. the array length, and separately record the `quoteMaxToken` budget of the citation text |
| Subject task breakdown table | Check the subject names, responsible persons, delivery milestones, and corresponding entries in the task book; dates and quantities must not be inconsistent in two places | Run a test with a question pointing to the breakdown table, check whether the returned snippet can point back to the original text, and verify the correspondence between citations and source identifiers in `responseData` (non-streaming module results returned with detailed output enabled) |
| Budget book | Check the budget subjects, amounts, calculation bases, and matching sources; signatures and receipts are complete; and the standards are consistent with the task book and breakdown table | Open the search parameter panel and check the values item by item, confirm they are consistent with the settings in the knowledge base retrieval section, and then point back item by item against the original text of the budget book |
| Associated knowledge base | The selected knowledge base is one with the same vector model, covering the three types of materials: task book, breakdown table, and budget book | In the node, check the selected collections and their vector models, and view `quoteList` to confirm which material the hit came from |

## Three common errors

- Phenomenon: the name, quantity, or date of the same subject does not match in two materials. Cause: the task book and breakdown table were modified separately and not synchronized according to the change order, and the citation snippets each point to an old text.
- Phenomenon: versions are not synchronized, the current version is not unique, and the old version cannot be traced. Cause: after signing, changes only landed in a single material, the knowledge base was not updated, and citations still point to the old paragraph.
- Phenomenon: signatures or receipts are missing, and the ledger cannot be closed. Cause: finalized drafts and signed copies are stored together, the retrieval hit is an unsigned draft, and the citation source identifiers do not distinguish them.

## How to verify the setup

Acceptance of this feature: first ask a question with original-text support, and check whether the citation array and markers can point back to the original paragraph; then ask a question with no matching material, confirm that the array is empty while the output pipeline still runs, and record the array length and the `quoteMaxToken` budget, without comparing the two for equality.

Business test: change one piece of content, and see whether the version number and citations are updated synchronously, whether the old version is still traceable, and whether the number of citations changes with the hit materials.

- Run a test with a question that has no matching material, see that the output is empty while the pipeline continues, and record the array length for this round.
- In the conversation, open the citation markers, point back item by item against the source documents, and verify that the search parameters are consistent with the values in the knowledge base retrieval section.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
