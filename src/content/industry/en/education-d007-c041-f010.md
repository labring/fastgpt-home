---
title: Citations and Source Traceability for Corporate Compliance and Safety Training: Trace Exceptions and Review Results
slug: /en/industry/education-d007-c041-f010
page_type: 行业问题页
application_area: education
meta_title: Compliance Training | Citations | Review
meta_description: Compliance Training: review citations for exception review. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Corporate Compliance and Safety Training: Trace Exceptions and Review Results

## What this category's data looks like

This category's data looks like this: For exception tracing and manual review in enterprise compliance and safety training, materials fall into three categories: compliance training courseware, safety operating procedures, and exam records. Courseware contains the course name, clause number, effective date, and version number; procedures contain operating steps, risk points, revision date, and approver signature; exam records contain trainee name, employee ID, exam paper name, score, exam date, reviewer signature, and receipt. When the three categories of materials enter the knowledge base retrieval node, each participates in vector search as an independent source, and after a hit, the cited snippet points back to the original text. In terms of update cadence, courseware changes with regulatory revisions, procedures change with process changes, and exam records are archived by session. Field characteristics center on four items: name, quantity, date, and signature. When tracing an exception, first locate which material was hit, then compare the fields.

## Configuration and implementation checks

Configuration and implementation checks: This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing the original snippet and source identifier, and the length can be 0. The exception list and review conclusion are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Compliance training courseware | Whether the course name, clause number, effective date, and version number match the exam paper name and exam date in the exam records | Open the citation marker, compare against the original courseware paragraph, check the name, date, and version number; record the number of citations and the `quoteMaxToken` budget |
| Safety operating procedures | Whether the operating steps, risk points, revision date, approver signature, and receipt are complete | Point back to the original procedure text item by item, check the revision date and approver signature; mark as pending review when the signature or receipt is missing |
| Exam records | Whether the trainee name, employee ID, exam paper name, score, exam date, and reviewer signature are consistent with the courseware and procedures | Run a test with a question that has no matching material, and see whether the citation array is empty while the chain continues; then check whether the cited snippet matches the original text when there is a hit |
| Cited content output | The number of returned entries matches the materials hit, and being empty is also normal | View `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` in the conversation, and confirm that the citation array length corresponds to the source identifiers |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the courseware and the exam record. Cause: The two materials are maintained separately without field alignment, so only one of them is hit during tracing.
- Symptom: The procedure version is not synchronized, and the cited snippet points to old-version steps. Cause: The old version was not removed from the knowledge base, the search hit the old paragraph, and the reviewer did not check the version number.
- Symptom: The exam record lacks the reviewer signature or receipt, so the exception cannot be closed. Cause: The signature was missed during archiving, and although the citation array has entries, the fields are incomplete and manual signature supplementation is required.

## How to verify the setup

How to verify the setup: Acceptance for this feature: ask a question with original-text support, and check whether the citation array and citation markers can point back to the original text; then ask a question with no matching material, and confirm that the array is empty while the chain still runs through; at the same time, record the number of citations and the `quoteMaxToken` budget, and do not compare the two for equality.

Business test: create an exception record, see whether the source material can be traced, check the four items of name, quantity, date, and signature, and confirm that the exception is supported by the original record and, after the reviewer signs, is handed to the responsible person for handling.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- Run a test with a question that has no matching material, view `quoteList` within `responseData`, and confirm that the citation array is empty while the output chain continues to run through.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
