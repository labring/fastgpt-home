---
title: Citations and Source Traceability for Graduate Employment Contracts and Destination Statistics: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c027-f010
page_type: 行业问题页
application_area: education
meta_title: Graduate Destinations | Citations | Versions
meta_description: Graduate Destinations: review citations for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Graduate Employment Contracts and Destination Statistics: Maintain Document Versions and Changes

## What this category's data looks like

The core materials for university employment signing and graduation destination statistics are employment agreements, graduation destination registration forms, and employer certificates. The employment agreement carries the signing parties, position, and seals; the graduation destination registration form records the destination category, employer name, and date; the employer certificate supplements the hiring intent and receipt. These three types of materials often come from departments, career centers, and employers, and their update cadence changes with signing batches, supplementary entries, and re-signings. Field characteristics center on names, quantities, dates, and signatures: the employer name, number of hires, and signing date for the same record may not match between the agreement and the registration form; when versions are not synchronized, the old version is still referenced; missing signatures or receipts make the materials incomplete. When the materials enter the citation output of the knowledge base retrieval node, each serves as a traceable original text snippet for subsequent field comparison, ledger writing, and report generation.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text snippet and a source identifier, and the length can be 0. The "version ledger and change records" are completed afterward by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Employment agreement | The signing parties, position, date, and signature fields must be consistent with the registration form, and the version number must be the current version | Retrieve the original text snippet of the agreement, check the employer name, number of hires, signing date, and seals, and note the version number |
| Graduation destination registration form | The destination category, employer name, quantity, and date must match the agreement, and the old version must be traceable | Compare field by field between the registration form and the agreement for the same record, and mark inconsistencies and version differences |
| Employer certificate | The hiring intent, receipt, and signature must be complete, and the citation must point back to the original paragraph | Open the citation superscript to compare against the source document, and check whether the receipt and signature are missing |
| Citation content output | The number of returned items must match the materials hit; being empty is also normal; `quoteMaxToken` only constrains the citation text budget | Run a test with a question that matches no materials, and see that the citation array is empty while the chain continues, and record the item count separately |

## Three common errors

- Symptom: the employer name, quantity, or date for the same record does not match between the agreement and the registration form. Cause: the two materials are entered separately, field comparison is not performed for the same record, and one snippet is taken from each when citing.
- Symptom: old-version materials are still cited, and the cited snippet is inconsistent with the current version. Cause: versions are not synchronized, the knowledge base has not replaced or marked the current version, and retrieval hits the old snippet.
- Symptom: the employer certificate lacks a signature or receipt, but the citation is still output. Cause: material completeness was not verified before ingestion, and the citation output only returns snippets based on hits.

## How to verify the setup

Acceptance for this feature: ask a question with source-text support, and check whether the citation array and superscripts can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and record the item count and the `quoteMaxToken` budget separately.

Business test: change one piece of content and see whether the version number and citations are updated in sync.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- In the conversation, open the citation superscripts, compare each citation against the source document to check whether it can point back to the original paragraph, and use `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` to inspect the return structure.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
