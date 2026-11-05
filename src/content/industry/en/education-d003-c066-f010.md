---
title: Citations and Source Traceability for Initial Review of Academic Journal Submissions: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c066-f010
page_type: 行业问题页
application_area: education
meta_title: Journal Submissions | Citations | Intake
meta_description: Journal Submissions: review citations for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Initial Review of Academic Journal Submissions: Handle Questions and Collect Missing Information

## What this category's data looks like

The acceptance materials for the initial review of academic journal submissions usually consist of three types: the submitted manuscript, the author information form, and the plagiarism check report. The manuscript provides the title, author byline, affiliation, abstract, main text, and references, and is the main content body for Q&A acceptance; the author information form carries the author names, ordering, affiliations, contact details, and signature fields, and is used to verify consistency of authorship; the plagiarism check report gives the detection date, duplication rate range, and the receipt from the detection institution, and is used to determine whether the threshold for sending out for review is met. The dates, numbers, signatures, and versions of the three types of materials need to correspond to one another; mismatches between the names, quantities, and dates of the same record in the manuscript and the information form, unsynchronized versions, and missing signatures or receipts are all common inconsistencies in the initial review. When the materials enter the Q&A acceptance and missing-item follow-up query function, the manuscript and the plagiarism check report mainly serve as retrievable source documents, while the author information form serves as the basis for field comparison and receipt verification; the retrieval results return to the acceptance step in the form of cited snippets, for subsequent nodes or humans to write the ledger and generate follow-up items to be completed.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original text snippet and a source identifier, and the length can be 0. The "acceptance record and follow-up items to be completed" is then completed by a subsequent AI node, code node, or human.

| Object | Check | Verification action |
| --- | --- | --- |
| Submitted manuscript | The title, author byline, affiliation, abstract, references, and receipt date are internally consistent within the manuscript, and the corresponding fields in the author information form can be traced back to the original paragraphs | Open the citation superscripts to compare against the original manuscript text, record the matched snippets and source identifiers, and check whether the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) matches the matched materials |
| Author information form | Author names, ordering, affiliations, contact details, and signature fields are complete; compare item by item with the manuscript byline; if a signature or receipt is missing, list it as an item to be completed | Compare the manuscript and the information form field by field, and check whether the cited snippets in `quoteList` can be traced back to the signature field and the receipt location |
| Plagiarism check report | The detection date, duplication rate range, and detection institution receipt correspond to the manuscript title, and the version is synchronized with the current manuscript; if the dates do not match, follow up with a query | Check the report date against the manuscript receipt date, confirm that the cited snippets come from the current version of the report, and record the number of entries separately according to the array length |
| Knowledge base retrieval node | The associated knowledge base uses the same vector model, the search parameters are consistent with the values in the knowledge base retrieval section, and the cited content is output as an array whose length can be 0 | Run a trial with a query that has no matching materials, see that the output is empty while the pipeline continues to run through, and then check the value of `quoteMaxToken` as the budget for cited content |

## Three common errors

- Symptom: there are no citation superscripts in the answer, and the source cannot be traced back. Cause: first check whether there was a hit in this round and which material was hit, then look at trimming, and do not directly attribute it to length trimming.
- Symptom: the same author name or manuscript quantity does not match between the manuscript and the author information form. Cause: the versions of the two materials are not synchronized, or the entry was not compared field by field according to the same record.
- Symptom: the plagiarism check report date is inconsistent with the manuscript receipt date, or the signature and receipt are missing. Cause: the ledger was not updated after the materials were supplemented, and the receipt was not archived in sync with the version.

## How to verify the setup

Acceptance of this function: ask a question that has textual support, and check whether the citation array and superscripts can be traced back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through. The number of citations is the array length, and `quoteMaxToken` is the budget for cited content; the two are not compared for equality; when the citation upper limit is involved, check the tokens of the cited text, and record the number of array entries separately.

Business test: submit a query that is missing key information, and see whether it first asks a follow-up question before answering.

- Open the search parameter panel and check each item, confirm that the associated knowledge base uses the same vector model, and run a trial with a query that has no matching materials, recording that the output is empty while the pipeline continues.
- Open the citation superscripts in the conversation, compare each citation against the source document to check whether it can be traced back to the original paragraph, and record the matched snippets and source identifiers in the acceptance record.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
