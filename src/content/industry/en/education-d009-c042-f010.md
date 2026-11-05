---
title: Citations and Source Traceability for Corporate Sales and Product Training: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c042-f010
page_type: 行业问题页
application_area: education
meta_title: Sales Training | Citations | Multilingual
meta_description: Sales Training: review citations for multilingual work. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Corporate Sales and Product Training: Handle Multilingual Materials and Terminology

## What this category's data looks like

This page addresses the enterprise sales product training scenario, where materials include product manuals, sales terminology, and channel training schedules. Product manuals carry functional parameters and operating steps, sales terminology carries expression standards and objection handling, and channel training schedules carry time, sessions, and responsible persons. When these three types of materials enter the knowledge base retrieval node, each serves as a citable original source, and the citation content array returns original text fragments and source identifiers according to the matched materials. In terms of update cadence, product manuals iterate with versions, sales terminology follows sales terminology reviews, and channel training schedules adjust with scheduling. In terms of field characteristics, manuals focus on model, parameters, and version number; sales terminology focuses on sales terminology number, applicable scenario, and update date; schedules focus on course name, start date, instructor, and signature or acknowledgment. Multilingual materials and terminology handling require the same terminology to be consistent throughout and translated names to be traceable back to the original text; therefore, citation sources and traceability become the prerequisite basis for comparing fields, writing ledgers, and generating reports.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs a citation content array, each entry containing an original text fragment and a source identifier, and the length may be 0. The unified terminology glossary and comparison draft are completed subsequently by AI nodes, code nodes, or manual work. Citation content is output as an array, and the length may be 0; even if no content is found, the output chain still completes.

| Object | Check | Verification action |
| --- | --- | --- |
| Product manual | Fields: model, parameters, version number, update date; the name, quantity, and date of the same record must match across multilingual versions | In the node, verify the selected collections and their vector models; turn on citation markers, compare against the source documents, and confirm that each citation can be traced back to the original paragraph |
| Sales terminology | Fields: sales terminology number, applicable scenario, update date; the name, quantity, and date of the same sales terminology must match across the two materials | Open the search parameter panel and verify item by item; run a test with a question that has no matching materials, observe that the output is empty while the chain continues, and record the array length |
| Channel training schedule | Fields: course name, start date, instructor, signature or acknowledgment; unsynchronized versions or missing signatures or acknowledgments must be exposed | Open citation markers in the conversation and compare against the source documents; record the tokens of the citation text and the number of array entries separately, and treat `quoteMaxToken` only as a content budget |
| Citation content output | The number of returned entries matches the matched materials, and being empty is also normal; `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` are used to review the hits in the current round | Run a test with a question that has no matching materials, observe that the output is empty while the chain continues; then ask a question with original text support and verify the citation array and markers |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the product manual and the sales terminology. Cause: The two materials are updated separately, no field-level comparison is performed, and citation sources are not traced back to the original text one by one.
- Symptom: The channel training schedule version is not synchronized, and the old and new versions are retrieved at the same time. Cause: The knowledge base is not isolated by version, and the citation array returns multiple fragments from different versions at the same time.
- Symptom: The schedule is missing a signature or acknowledgment, which is discovered only after publication. Cause: The citation content covers only body fragments, the signature and acknowledgment fields are not checked separately, and the ledger is not compared against the original text.

## How to verify the setup

Acceptance for this feature: ask a question with original text support and verify whether the citation array and markers can be traced back to the original text; then ask a question with no matching materials and confirm that the array is empty while the chain completes.

Business test: sample three terms to check whether their spelling is consistent throughout, and verify that translated names can be traced back to the original text; the number of citations is the array length, `quoteMaxToken` is the citation content budget, and the two are not compared for equality.

- In the node, verify the selected collections and their vector models, and confirm that the associated knowledge bases use the same vector model; open the search parameter panel and verify the values item by item.
- Open citation markers, compare against the source documents, and confirm that each citation can be traced back to the original paragraph; run a test with a question that has no matching materials, and observe that the output is empty while the chain continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
