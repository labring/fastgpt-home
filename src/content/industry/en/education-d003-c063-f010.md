---
title: Citations and Source Traceability for Academic Misconduct Reports and Investigations: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c063-f010
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Citations | Intake
meta_description: Research Misconduct: review citations for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Academic Misconduct Reports and Investigations: Handle Questions and Collect Missing Information

## What this category's data looks like

This page addresses the scenario of investigating and handling academic misconduct reports; the materials include report materials, investigation reports, and expert appraisal opinions. Report materials provide the original leads and demands, investigation reports present the verification process and conclusions, and expert appraisal opinions give professional judgments. In Q&A acceptance and missing-item follow-up questions, the three types of materials each play their own source role: report materials are used to confirm whether the scope of acceptance and the key facts are complete, investigation reports are used to check the handling process and the basis for conclusions, and expert appraisal opinions are used to support citation traceability for professional conclusions. The material update pace advances with the investigation stages, and the field characteristics are concentrated in names, quantities, dates, signatures, and receipts. The same record may show inconsistencies in names, quantities, or dates across different materials, versions may be out of sync, or signatures and receipts may be missing. Citation sources and traceability require that each citation can point back to the original passage, making it easier to subsequently compare fields, write ledgers, and generate reports.

## Configuration and implementation checks

This part is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation contents, each containing an original text snippet and a source identifier, and the length can be 0. The "acceptance record and completed question items" are then completed by subsequent AI nodes, code nodes, or manual work. Even if no content is found, the output chain will still run through.

| Object | Check | Verification action |
| --- | --- | --- |
| Report materials | Whether the name, quantity, date, and receipt fields are consistent with the investigation report, and whether signatures are complete | Open the citation markers in the conversation and check the name, quantity, date, and signatures against the source document; record the number of citations, i.e. the array length, and when the citation limit is involved, check the tokens of the citation text, recording `quoteMaxToken` separately |
| Investigation report | Whether the version is in sync, and whether the basis for the conclusion can point back to the original passage | Open the search parameter panel and check item by item; run a test with a question that has no matching materials and see that the output is empty while the chain continues, which can be checked in `quoteList` within `responseData` (non-streaming module results returned with detailed output enabled) |
| Expert appraisal opinions | Whether the expert signature and date are complete, and whether the appraisal opinions correspond to the conclusions of the investigation report | Check the selected collections and their vector models in the node; point back to the original text citation by citation and confirm that the cited snippets match the original text |
| Citation content output | The number of returned items is consistent with the matched materials, and being empty is also normal | Run a test with a question that has no matching materials and see that the output is empty while the chain continues; record the number of citations separately and do not compare it for equality with `quoteMaxToken` |

## Three common errors

- Symptom: there are no citation markers in the answer. Cause: the citation array is empty or no materials were matched; first check whether this round matched anything and which material was matched, then check trimming.
- Symptom: the name, quantity, and date of the same record do not match between the report materials and the investigation report. Cause: the version is out of sync or the entry is inconsistent; compare field by field and ask follow-up questions for missing items.
- Symptom: missing signature or receipt. Cause: the material circulation step has not been completed; mark the missing item in the acceptance record and ask follow-up questions, then forward it to the handler.

## How to verify the setup

Acceptance of this feature: ask a question with an original-text basis and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials and confirm that the array is empty while the chain runs through, that `quoteList` within `responseData` can be checked, and that the number of citations is not compared for equality with `quoteMaxToken`.

Business test: ask a question that lacks key information and see whether it asks follow-up questions first before answering.

- Check the selected knowledge base collections and their vector models in the node, and confirm that knowledge bases using the same vector model are selected.
- Open the search parameter panel and check item by item, then run a test with a no-match question to confirm that the output is empty while the chain continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
