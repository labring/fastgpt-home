---
title: Citations and Source Traceability for Academic Misconduct Reports and Investigations: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c063-f010
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Citations | Multilingual
meta_description: Research Misconduct: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Academic Misconduct Reports and Investigations: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page addresses the scenario of investigating and disposing of academic misconduct reports. The materials include three categories: report materials, investigation reports, and expert appraisal opinions. Report materials record the reported conduct, time, and the literature involved; investigation reports record the investigation process, conclusions, and disposition recommendations; expert appraisal opinions record the appraisal methods, judgments, and signatures. The three categories of materials are often submitted in multiple languages, and the translated names of the same term in different language versions must be able to refer back to the original text. After the materials enter the knowledge base retrieval node, they participate in retrieval as citation sources, outputting an array of cited content for subsequent field comparison, ledger writing, and report generation. In terms of update cadence, materials are ingested into the knowledge base in batches according to the investigation stage, and versions must stay in sync with investigation progress. Field characteristics center on four items: name, quantity, date, and signature. During cross-material verification, it is easy for the name, quantity, or date of the same record to mismatch between two materials, or for versions to be out of sync, or for signatures or receipts to be missing.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text snippet and a source identifier, and the length can be 0. The unified terminology glossary and comparison draft are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Report materials | The name, quantity, date, and signature must be consistent with the corresponding records in the investigation report, and the translated names must be able to refer back to the original text | In the citation array, verify item by item the original text snippets and source identifiers in `responseData` (non-streaming module results returned with detailed output enabled), and compare the name, quantity, and date fields |
| Investigation report | The fields, dates, and signatures of the investigation process, conclusions, and disposition recommendations must be consistent with the corresponding records in the expert appraisal opinions | Open the citation superscript to compare against the source document, and check whether the paragraphs in `quoteList` correspond item by item with the report fields |
| Expert appraisal opinions | The fields, dates, and signatures of the appraisal methods, judgments, and signatures must be consistent with the corresponding records in the report materials | Use the same term to search across multilingual versions, check whether the translated names can refer back to the original text paragraphs, and record the number of array entries |
| Unified terminology glossary and comparison draft | The same term is consistent throughout the entire text, and the translated names can refer back to the original text | Sample three terms to check whether their usage is consistent throughout the entire text, and verify and record the tokens budget of the cited text and the number of array entries separately |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the report materials and the investigation report. Cause: The versions of the two materials are not in sync, and the cited snippets do not refer back to the same original text paragraph.
- Phenomenon: The expert appraisal opinions lack a signature or receipt, yet the investigation report still cites their conclusions. Cause: The signature field was not verified when the materials were ingested into the knowledge base, and the citation array did not expose the missing item.
- Phenomenon: The cited snippets do not match the original text. Cause: Attributing it first to length truncation, without checking whether this round hit anything and which material was hit, before looking at truncation.

## How to verify the setup

Acceptance of this feature: ask a question that has a basis in the original text, and check whether the citation array and superscripts can refer back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline still runs through.

Business testing: sample three terms to check whether their usage is consistent throughout the entire text, and verify and record the tokens budget of the cited text and the number of array entries separately.

- In the node, verify the selected collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and verify item by item, confirming that the values are consistent with those set in the knowledge base retrieval section.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
