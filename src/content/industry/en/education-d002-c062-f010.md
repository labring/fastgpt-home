---
title: Citations and Source Traceability for Research Ethics Review: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c062-f010
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Citations | Checks
meta_description: Research Ethics: review citations for document checks. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Ethics Review: Compare Documents and Locate Differences

## What this category's data looks like

In the research ethics review scenario, materials are usually divided into three categories: ethics review applications, informed consent form templates, and risk assessment forms. They come from researchers, ethics secretaries, and institutional review systems, are updated according to project milestones, and multiple versions often coexist for the same project. Field characteristics are concentrated in project name, number of subjects, signing date, version number, and signature fields. After entering the knowledge base retrieval node, the three materials each serve as citable original text sources: the application provides the review object and scope, the informed consent form template provides the notification and signing fields, and the risk assessment form provides the risk level and handling fields. During retrieval, they are recalled by knowledge base collections using the same vector model, and cited snippets point back to their respective paragraphs, making it easy to subsequently compare whether names, quantities, dates, and signatures are consistent.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text snippet and a source identifier, and the length can be 0. The "discrepancy list" is then completed by a subsequent AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Check whether the project name, number of subjects, signing date, and signature fields are consistent with the ledger | Open the citation marker to point back to the original application paragraph, transcribe field by field, and compare with the ledger |
| Informed consent form template | Check whether the template version number, notification date, and signed receipt are the same version as the application | Open the citation marker in the conversation and compare the version and signature fields of the template source document |
| Risk assessment form | Check whether the risk level, handling date, and signature are the same version as the application and template | Use `quoteList` to expand the cited source and check whether the risk fields and dates are consistent across materials |
| Knowledge base retrieval node | Check whether the selected collections use the same vector model and whether the number of citations matches the hit materials | Run a test with a question that has no matching materials, see whether the array is empty while the chain continues, and record `responseData` (non-streaming module results returned with detailed output enabled) |

## Three common errors

- Symptom: the same number of subjects does not match between the application and the informed consent form template. Cause: the two materials were updated separately, versions were not synchronized, and after retrieval hits, the original text was not traced back field by field.
- Symptom: the risk assessment form lacks a signature or receipt, but the cited snippet is still treated as valid evidence. Cause: the check only looked at whether the snippet was hit, without tracing back to the signature field and receipt field.
- Symptom: the answer has content but the citation array is empty. Cause: treating an empty array as a retrieval failure, when it is actually normal output; the materials hit in the current round must be checked first before judging.

## How to verify the setup

Acceptance for this feature: ask a question with original text support and check whether the citation array and citation markers can point back to the original text; then ask a question with no matching materials and confirm that the array is empty while the chain still runs through.

Business test: use a real record to find a field inconsistent with the ledger, hand it to the reviewer for confirmation, and write it back.

- Open the citation markers one by one, transcribe the original text snippets and source identifiers into the discrepancy list, and label the four field types: name, quantity, date, and signature.
- Check the tokens of the cited text against the `quoteMaxToken` budget, record the number of array items separately, and do not make an equality comparison.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
