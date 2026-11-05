---
title: Citations and Source Traceability for Enterprise Employee Skills Assessment: Track Progress and Check Statistics
slug: /en/industry/education-d006-c035-f010
page_type: 行业问题页
application_area: education
meta_title: Employee Skills | Citations | Progress
meta_description: Employee Skills: review citations for progress tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Enterprise Employee Skills Assessment: Track Progress and Check Statistics

## What this category's data looks like

Enterprise independent skill talent evaluation involves three types of materials: the evaluation filing form, the evaluation specification, and the candidate roster. The evaluation filing form records the evaluation entity, occupation, level, and filing date, and is the starting point for the legality of the evaluation activity; the evaluation specification stipulates the assessment method, scoring standards, and passing line, and is the original basis for the statistical criteria; the candidate roster lists each person's name, ID number, applied occupation level, and signed confirmation, and is the direct source of the record count. When these three types of materials enter the knowledge base retrieval node, each plays a different role: the filing form is used to verify the evaluation batch and scope, the specification is used to verify the statistical criteria and exception clauses, and the roster is used to verify each record and signed receipt. The update rhythm of materials usually advances by batch: the filing form and specification are finalized when the batch starts, the roster is locked after the registration deadline, and weekly or monthly reports are summarized weekly or monthly. In terms of field characteristics, name, quantity, date, and signature are the four key fields. The same record must remain consistent across the three materials. Version synchronization and complete receipts determine whether the statistics are traceable.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. The "progress table and statistical criteria description" is completed afterward by a subsequent AI node, code node, or manually. Even if no content is found, the output chain still runs through.

| Object | Check | Verification action |
| --- | --- | --- |
| Evaluation filing form | Whether the fields, dates, and signatures are consistent with the batch information in the evaluation specification | In the node, check the selected collections and their vector models; open the search parameter panel and check each item; use `responseData` (non-streaming module results returned with detailed output enabled) to view the number of items and source identifiers in the citation array |
| Evaluation specification | Whether the statistical criteria, exception clauses, and passing line match the filing form and roster | In the conversation, open the citation superscript and compare against the source document; check the tokens of the cited text, and record the array item count separately; `quoteMaxToken` is only the citation content budget |
| Candidate roster | Whether the name, quantity, and date of the same record are consistent across the three materials, and whether signatures or receipts are complete | Run a test with a question that has no matching materials, and see that the output is empty while the chain continues; use `quoteList` to check whether the original text fragment of each citation can point back to the paragraph |
| Progress table and statistical criteria description | Whether the record count and statistical count match, and whether the criteria are written in the header | Use one week of records to verify the total, and see whether the criteria and exceptions are clearly stated; the number of citations is the array length, `quoteMaxToken` is the citation content budget, and the two are not compared for equality |

## Three common errors

- Phenomenon: The name, quantity, or date of the same record does not match between the filing form and the roster. Cause: The two materials were entered separately, no cross-check was done, and the versions were not synchronized.
- Phenomenon: The cited fragment does not match the original text, and the superscript is missing. Cause: Without first checking whether this round had a hit and which material was hit, the issue was directly attributed to length truncation.
- Phenomenon: The roster lacks signatures or receipts, but the statistical total is still adopted. Cause: The criteria and exceptions were not written in the header, and the signature column was not checked item by item during verification.

## How to verify the setup

Acceptance for this feature: ask a question with original-text support, and check whether the citation array and superscript can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: use one week of records to verify the total, and see whether the criteria and exceptions are clearly stated.

- In the node, check the selected collections and their vector models, open the search parameter panel, and check each value item by item.
- Run a test with a question that has no matching materials, see that the output is empty while the chain continues, and record the array item count.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
