---
title: Citations and Source Traceability for College Admissions Health Examination Organization: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c053-f010
page_type: 行业问题页
application_area: education
meta_title: Admissions Health Exams | Citations | Checks
meta_description: Admissions Health Exams: review citations for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for College Admissions Health Examination Organization: Compare Documents and Locate Differences

## What this category's data looks like

This category's data involves three types of core materials: the physical examination form records each subject's examination results and physician signature for the candidate; the re-examination application records the re-examination items, application date, and approval signature; the restricted major notification records the restricted major name, notification date, and candidate receipt signature. These materials enter the knowledge base retrieval node in batches by admissions batch, and each batch of materials carries a version number and update date. When materials enter this feature, the physical examination form, re-examination application, and restricted major notification are each cited as independent sources; the citation output is only responsible for returning the original text snippet and source identifier, not for determining whether fields are consistent. Field characteristics include candidate name, physical examination item, examination result, date, physician signature, and receipt status. The name, quantity, and date of the same candidate across the three materials need to be checked field by field; when versions are not synchronized or the signed receipt is missing, the citation snippet may still be returned normally, and discrepancies need to be discovered by comparison in subsequent nodes.

## Configuration and implementation checks

The citation output of the knowledge base retrieval node only outputs an array of citation content, each item containing the original text snippet and source identifier, and the length can be 0; the discrepancy list must be handled subsequently by an AI node, code node, or manually. The citation content is output as an array, and the length can be 0; even if no content is found, the output chain will still run through.

| Object | Check | Verification action |
| --- | --- | --- |
| Physical examination form | Whether the candidate name, number of physical examination items, examination date, and physician signature are consistent with the ledger | Open the citation marker, check the name, item count, date, and signature in the original text snippet, and record the `quoteList` field |
| Re-examination application | Whether the re-examination item name, application date, approval signature, and receipt are consistent with the corresponding records in the physical examination form | Compare against the source document, check whether the re-examination items match the physical examination form item names, and record the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) |
| Restricted major notification | Whether the restricted major name, notification date, and candidate receipt signature are consistent with the ledger and physical examination conclusion | Check the chronological relationship between the notification date and the physical examination date, confirm that the receipt signature exists, and record the citation array length |
| Associated knowledge base | Whether the selected knowledge bases use the same vector model | In the node, check the selected collections and their vector models, and confirm that the search parameters are consistent with the values in the knowledge base retrieval section |

## Three common errors

- Symptom: The name or item count of the same candidate does not match between the physical examination form and the re-examination application. Cause: The two materials are entered in different stages, versions are not synchronized, and the citation snippets each return the original text, so discrepancies need to be discovered by subsequent comparison.
- Symptom: The restricted major notification lacks the candidate receipt signature or the notification date is missing. Cause: The signature page was not completed when the materials were archived, the citation output still returns the existing snippet, and missing items need manual checking of the original text to locate.
- Symptom: There is no citation marker in the answer, or the citation snippet does not match the original text. Cause: First check whether this round hit anything and which material was hit, then check `quoteMaxToken` trimming; an empty citation array does not equal retrieval failure.

## How to verify the setup

Feature acceptance: Ask a question with an original-text basis, and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and record `quoteList` within `responseData`.

Business test: Use one real record to find fields inconsistent with the ledger, check the name, quantity, date, signature, and receipt item by item, write the discrepancies into a discrepancy list for the reviewer to confirm and write back.

- Open the citation marker, check the original text snippet and source identifier one by one against the source document, and confirm that each citation can point back to the original text paragraph
- Run a trial with a question that has no matching materials, see that the output is empty while the chain continues, and separately record the citation array length and the `quoteMaxToken` budget

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
