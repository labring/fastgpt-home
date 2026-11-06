---
title: Citations and Source Traceability for Initial Review of Academic Journal Submissions: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c066-f010
page_type: 行业问题页
application_area: education
meta_title: Journal Submissions | Citations | Checks
meta_description: Journal Submissions: review citations for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Initial Review of Academic Journal Submissions: Compare Documents and Locate Differences

## What this category's data looks like

At the initial review stage of academic journal submissions, materials include three types: the submitted manuscript, the author information form, and the plagiarism check report. The manuscript carries the main text and references, the author information form carries authorship, affiliation, order, and contact details, and the plagiarism check report carries the similarity rate and comparison sources. When these three types of materials enter the knowledge base retrieval node, each is indexed as an independent source: manuscript paragraphs are used to verify main text wording and citation labels, the author information form is used to verify names, order, affiliation, and dates, and the plagiarism check report is used to verify the similarity rate range and comparison database sources. The material update rhythm has three tiers: supplementary submission after submission, re-upload after revision, and finalization before final review, and version numbers and signed receipts are often out of sync. Field characteristics center on four categories: names, quantities, dates, and signatures. The same author's name may be written differently in two materials, the number of references marked in the manuscript may not match the number of comparison entries listed in the plagiarism check report, and the receipt date and the signing date on the author information form may span versions.

## Configuration and implementation checks

The citation output of the knowledge base retrieval node outputs only an array of cited content, each item containing the original text snippet and source identifier, and the length may be 0. The discrepancy list must be produced subsequently by an AI node, code node, or manual work. This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text snippet and source identifier, and the length may be 0.

| Object | Check | Verification action |
| --- | --- | --- |
| Submitted manuscript | Main text paragraphs, reference entries, citation labels, and receipt date are internally consistent within the manuscript | Open the citation superscript to trace back to the original text paragraph, and record the source identifier and snippet position of each citation in `responseData` (non-streaming module results returned with detailed output enabled) |
| Author information form | Name spelling, author order, affiliation name, and signing date are consistent with the manuscript authorship | Compare the author information form field by field with the manuscript authorship section, write discrepant fields into the discrepancy list, and mark the source identifier |
| Plagiarism check report | Similarity rate range, comparison database source, and report date correspond to the manuscript version number | Verify the report date and manuscript version number, and check whether the comparison entries cited in `quoteList` match the number of references in the manuscript |
| Cited content output | The number of returned items is consistent with the matched materials; empty is also normal | Run a test with a question that has no matching materials, and see whether the array is empty while the chain continues; record the array item count separately, and do not compare it for equality with `quoteMaxToken` |

## Three common errors

- Symptom: the same author's name is written inconsistently in the manuscript and the author information form. Cause: when the author information form was supplementarily submitted, the manuscript authorship section was not synchronized, and the versions were not synchronized, causing the names to mismatch.
- Symptom: the number of references marked in the manuscript does not match the number of comparison entries listed in the plagiarism check report. Cause: the plagiarism check report was generated based on an old version, and the quantity field was not updated along with the manuscript.
- Symptom: the author information form lacks a signing date or receipt, and the manuscript receipt date and the date in the form span versions. Cause: the signature page was not collected during the supplementary submission step, and the date field continued to use the previous version.

## How to verify the setup

Feature acceptance: ask a question with textual support, check whether the citation array and superscripts can trace back to the original text paragraph, and confirm that each citation in `responseData` can trace back to the source document; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: use a real record to find fields inconsistent with the ledger, verify item by item the names, quantities, dates, and signatures in the submitted manuscript, author information form, and plagiarism check report, write the discrepant fields into the discrepancy list for the reviewer to confirm and write back.

- Open the search parameter panel and verify item by item, confirm that the associated knowledge base uses the same vector model, and record `quoteMaxToken` as the cited content budget; record the array item count separately
- Open the citation superscripts in the conversation, verify against the source documents whether each cited snippet corresponds to the original text paragraph, and check the source identifier in `quoteList`

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
