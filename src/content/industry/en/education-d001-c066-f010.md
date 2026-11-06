---
title: Citations and Source Traceability for Initial Review of Academic Journal Submissions: Find Supporting Evidence
slug: /en/industry/education-d001-c066-f010
page_type: 行业问题页
application_area: education
meta_title: Journal Submissions | Citations | Evidence
meta_description: Journal Submissions: review citations for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Initial Review of Academic Journal Submissions: Find Supporting Evidence

## What this category's data looks like

In the initial review stage of academic journal submissions, the materials include the submitted manuscript, the author information form, and the plagiarism check report. The manuscript carries the main text and references, the author information form carries the authorship, affiliation, contact information, and signature, and the plagiarism check report carries the detection date, duplication rate, and receipt. When these three enter the knowledge base retrieval node, each serves as a citable source material, jointly supporting the production of basis entries. In terms of update rhythm, the manuscript is replaced with revised versions, the author information form is supplemented with signatures as the confirmation process proceeds, and the plagiarism check report is reissued with each detection batch. Therefore, the names, quantities, and dates of the same record in two materials are prone to mismatch, and unsynchronized versions and missing signatures or receipts are also common. After the materials enter this function, the manuscript is the main source of cited snippets, the author information form is used to verify the authorship and affiliation fields, and the plagiarism check report is used to verify the detection conclusion and date. Together, the three form the basis for basis entries that can be traced back to the original text.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each containing an original text snippet and a source identifier, and the length can be 0. Even if no content is found, the output chain still runs through. The "basis entries that can be traced back to the original text" are completed subsequently by AI nodes, code nodes, or manual work, and are used to compare fields, write ledgers, or generate reports.

| Object | Check | Verification action |
| --- | --- | --- |
| Submitted manuscript | The main text and reference paragraphs of the manuscript must be traceable item by item, and the version must be the current revised draft | Open the citation superscript in the conversation, and check the original text snippets and source identifiers in `responseData` (non-streaming module results returned with detailed output enabled) against the source document |
| Author information form | The authorship, affiliation, date, and signature fields must be consistent with the manuscript; missing signature or receipt means inconsistency | Compare the names, quantities, and dates in the author information form and the manuscript item by item, and check the source identifiers in `quoteList` |
| Plagiarism check report | The detection date and duplication rate conclusion must be the current version, and the report receipt must be complete | Open the search parameter panel and check item by item, confirm that the selected collection and vector model are consistent, and check the `quoteMaxToken` budget |
| Associated knowledge base | The selected knowledge base is one with the same vector model, and the selected collection and vector model are consistent | Check the selected collection and their vector models in the node, and confirm that the cited content is output as an array and the length can be 0 |

## Three common errors

- Phenomenon: The names, quantities, and dates of the same record in the manuscript and the author information form do not match. Cause: The two materials are updated separately, and no field-level comparison has been made.
- Phenomenon: The detection date of the plagiarism check report is not synchronized with the revised version of the manuscript. Cause: The report was issued according to an old batch and was not reissued with the current manuscript.
- Phenomenon: The author information form lacks a signature or receipt, and the cited snippets do not match the original text. Cause: The confirmation process has not been completed, and the citation does not trace back to the original text paragraph.

## How to verify the setup

Acceptance of this function: Ask a question with an original text basis, and check whether the citation array and superscript can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: Ask a basis question across materials, and see whether the answer gives a traceable source.

- Open the citation superscript, check against the source document whether each citation can trace back to the original text paragraph, and record the number of array entries.
- Try running with a question that has no matching materials, see that the output is empty while the chain continues, and confirm that the number of citations and the `quoteMaxToken` budget are recorded separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
