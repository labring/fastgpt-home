---
title: Citations and Source Traceability for Academic Misconduct Reports and Investigations: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c063-f010
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Citations | Handover
meta_description: Research Misconduct: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Academic Misconduct Reports and Investigations: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

The drafting of materials and handover of responsibility in the academic misconduct report investigation and handling category involves three types of texts: report materials, investigation reports, and expert appraisal opinions, all of which carry fields, dates, and signatures. Report materials record the source of leads, the reported matters, and preliminary evidence; investigation reports carry the verification process, determination conclusions, and handling recommendations; expert appraisal opinions provide professional judgments and their basis. When materials enter the knowledge base retrieval node, each is cited as an independent source for subsequent steps to compare fields. The update rhythm advances with the investigation stages; each node of acceptance, verification, determination, and delivery may add or replace versions, so the name, quantity, and date of the same record must remain consistent between the two types of materials, versions must be synchronized, and signatures and receipts are indispensable. Citation sources and traceability require that each citation can point back to the original paragraph, facilitating item-by-item verification when drafting signable drafts and handover records.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation contents, each containing an original text fragment and a source identifier, and the length can be 0. Even if no content is found, the output chain will still run through. The signable material drafts and handover records are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Report materials | Fields are complete, dates and signatures are verifiable, and source identifiers can point back to the original paragraph | Open the citation superscript to compare against the source document, and verify item by item the source of leads, the reported matters, and preliminary evidence; record the array length, and view the tokens of the citation text separately as `quoteMaxToken` |
| Investigation report | The fields of verification process, determination conclusions, and handling recommendations are complete, and the version and date are consistent with the report materials | Compare the name, quantity, and date of the same record in both places; check whether signatures and receipts are complete; use `quoteList` to see which material was hit |
| Expert appraisal opinion | Professional judgments and their basis are traceable, and signatures and issue dates are clear | Open the citation superscript in the conversation and compare against the source document to confirm that the cited fragment matches the original text; when the array in `responseData` (non-streaming module results returned with detailed output enabled) is empty, treat it as normal output |
| Handover record | The responsible person is clear, the version and date are consistent, and the receipt can be signed for | Draft one according to the template and complete one handover to see whether missing items are blocked; check whether the selected knowledge base uses the same vector model |

## Three common errors

- Phenomenon: The name, quantity, or date of the same record does not match between the report materials and the investigation report. Cause: The two were drafted separately, fields were not compared against the same version, and item-by-item verification was lacking before handover.
- Phenomenon: The investigation report has been updated, but the expert appraisal opinion still cites the old version, and the versions are not synchronized. Cause: The update rhythms are not synchronized, and the next step was not notified when the version was replaced.
- Phenomenon: The materials lack signatures or receipts and cannot be handed over to the next step for signing. Cause: Drafting and handover are separated, and the signing step did not fill in the signature and receipt information.

## How to verify the setup

Acceptance of this feature: Ask a question with an original text basis, and check whether the citation array and superscript can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: Draft one according to the template and complete one handover to see whether missing items are blocked.

- Open the search parameter panel and verify item by item, confirming that the values are consistent with those set in the knowledge base retrieval section; check whether the selected collections and their vector models are the same.
- Run a test with a question that has no matching materials, and see that the output is empty while the chain continues; then open the citation superscript and compare against the source document to confirm that each citation can point back to the original paragraph.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
