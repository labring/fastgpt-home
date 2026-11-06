---
title: Citations and Source Traceability for Grade Entry and Credit Recognition: Handle Multilingual Materials and Terminology
slug: /en/industry/education-d009-c020-f010
page_type: 行业问题页
application_area: education
meta_title: Grades and Credits | Citations | Multilingual
meta_description: Grades and Credits: review citations for multilingual work. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Grade Entry and Credit Recognition: Handle Multilingual Materials and Terminology

## What this category's data looks like

In the grade entry and credit recognition scenario, materials include transcripts, deferred examination applications, supplementary examination arrangements, and multilingual course names and terminology glossaries. A transcript carries the course name, credits, grade, instructor signature, and date; a deferred examination application records the reason for deferral, the original examination date, and the approval signature; a supplementary examination arrangement gives the supplementary examination time, location, invigilation, and receipt. During multilingual materials and terminology handling, these materials enter the knowledge base retrieval node, each serving as a traceable original-text source, and are used to compile the unified terminology glossary and the comparative draft. The update cadence follows the semester as the cycle; deferred and supplementary examination arrangements are updated on a rolling basis along with approval progress, and transcripts are archived after entry is completed. Field characteristics center on course names, credit counts, examination dates, signatures, and receipts; across multilingual versions, the same record's name, quantity, or date is prone to mismatch, versions are not synchronized, and signatures or receipts are missing.

## Configuration and implementation checks

The citation output of the knowledge base retrieval node outputs only an array of cited content, each item containing an original-text fragment and a source identifier; the length may be 0, and the unified terminology glossary and comparative draft must be continued by subsequent AI nodes, code nodes, or manual work. Even if no content is found, this output chain still runs through; the number of citations is the array length, and `quoteMaxToken` is the citation content budget.

| Object | Check | Verification action |
| --- | --- | --- |
| Transcript | Whether the course name, credits, grade, instructor signature, and date are complete, and whether the multilingual versions can trace back to the original text | Open the citation corner mark, check field by field against the source document, and record the number of citation array items and the `quoteMaxToken` budget |
| Deferred examination application | Whether the reason for deferral, original examination date, approval signature, and receipt are consistent with the transcript record | View `responseData` (non-streaming module results returned with detailed output enabled) in the node output, and compare the name, quantity, and date in the two materials |
| Supplementary examination arrangement | Whether the supplementary examination time, location, invigilation, and receipt connect with the deferred examination application, and whether the versions are synchronized | Use `quoteList` to expand the cited fragment, and check whether the source identifier corresponds to the original-text paragraph |
| Unified terminology glossary and comparative draft | Whether the same term is written consistently throughout the whole text, and whether the translated name can trace back to the original text | Sample three terms and check their writing throughout the whole text, confirming that each citation can trace back to the original-text paragraph |

## Three common errors

- Phenomenon: The name, credit count, or examination date of the same course does not match between two materials. Cause: Multilingual materials are entered separately, without terminology unification and version synchronization.
- Phenomenon: The time, location, or receipt information of the deferred examination application and the supplementary examination arrangement is inconsistent. Cause: Materials were not updated synchronously after approval, and the old version is still hit by retrieval.
- Phenomenon: The transcript lacks the instructor signature, and the deferred examination application lacks the approval receipt. Cause: Signatures and receipts were not archived together with the materials, and the cited fragment cannot trace back to the complete original text.

## How to verify the setup

Acceptance of this feature: Ask a question with original-text support, and check whether the citation array and corner mark can trace back to the original text; then ask a question with no matching material, confirm that the array is empty while the chain runs through, and record the number of citations and the `quoteMaxToken` budget.

Business testing: Sample three terms and check whether their writing is consistent throughout the whole text, confirming that the same term is consistent throughout the whole text and that the translated name can trace back to the original text.

- In the node, check the selected knowledge base collections and their vector models, open the search parameter panel, and check the values item by item.
- Run a trial with a question that has no matching material, observe that the output is empty while the chain continues, then open the citation corner mark and compare it against the source document.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
