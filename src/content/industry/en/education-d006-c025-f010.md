---
title: Citations and Source Traceability for Graduate Education Process Management: Track Progress and Check Statistics
slug: /en/industry/education-d006-c025-f010
page_type: 行业问题页
application_area: education
meta_title: Graduate Education | Citations | Progress
meta_description: Graduate Education: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Graduate Education Process Management: Track Progress and Check Statistics

## What this category's data looks like

Graduate training process management involves materials such as training plans, proposal reports, and mid-term assessment forms. Progress records and statistical verification require that the number of records match the statistical counts, that the criteria be written into the table header, and that they enter weekly or monthly reports. Training plans provide course and credit milestones, proposal reports provide topic selection and time milestones, and mid-term assessment forms provide stage assessment conclusions and signatures. Materials are updated by semester or training stage, and fields include name, quantity, date, and signature. After entering the knowledge base retrieval node, each material is retrieved as a citation source, and the cited content array points back to the original paragraphs, for subsequent comparison of fields, ledger writing, and report generation.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs a cited content array, each entry containing the original text fragment and source identifier, and the length can be 0. The "progress table and statistical criteria description" is completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Training plan | Fields include course name, credit quantity, start and end dates, and supervisor signature; check whether they are consistent with the proposal report | Open the citation marker and verify `quoteList` against the original paragraphs in the source document |
| Proposal report | Fields include topic name, proposal date, and assessment panel signature; check whether the date matches the mid-term assessment form | Verify the number of citations in `responseData` (non-streaming module results returned with detailed output enabled), and record the array length separately |
| Mid-term assessment form | Fields include assessment conclusion, assessment date, and signature receipt; check whether the version is synchronized and whether signatures or receipts are missing | Verify the `quoteMaxToken` citation budget, and verify the tokens of the cited text |
| Progress record | Whether the name, quantity, and date of the same record are consistent in the training plan and the mid-term assessment form | Use one week of records to verify the totals, and check whether the criteria and exceptions are clearly stated |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the training plan and the mid-term assessment form. Cause: The two material versions are not synchronized, and the cited fragments do not point back to the original paragraphs.
- Phenomenon: The mid-term assessment form lacks a signature or receipt, but the statistical count is still included in the total. Cause: The criteria are not written into the table header, exceptions are not marked separately, and the signature column is not checked during verification.
- Phenomenon: The citation array is empty but the answer is still generated. Cause: An empty array is a normal output and does not mean retrieval failed; first check whether materials were hit in this round, then check trimming.

## How to verify the setup

Acceptance for this feature: ask a question with original-text evidence, and verify whether the citation array and markers can point back to the original text; then ask a question with no matching materials, confirm that the array is empty while the pipeline runs through, and verify `responseData`, `quoteList`, and `quoteMaxToken`.

Business test: use one week of records to verify the totals, and check whether the criteria and exceptions are clearly stated

- Open the search parameter panel and verify item by item, confirm that the associated knowledge base uses the same vector model, and record the number of citations separately
- Open the citation markers and compare them with the source document, verify whether the cited fragments are consistent with the original text, and verify the `quoteMaxToken` citation budget

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
