---
title: Citations and Source Traceability for Student Awards, Financial Aid and Hardship Assessment: Handle Questions and Collect Missing Information
slug: /en/industry/education-d003-c022-f010
page_type: 行业问题页
application_area: education
meta_title: Student Financial Aid | Citations | Intake
meta_description: Student Financial Aid: review citations for question intake. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Student Awards, Financial Aid and Hardship Assessment: Handle Questions and Collect Missing Information

## What this category's data looks like

This page focuses on student awards, grants, loans, and hardship determination materials, covering three categories: family economic hardship determination forms, scholarship and grant application forms, and loan receipts. The determination form carries household population, income, hardship level, and signature fields, and is the starting point for intake and missing-item follow-up; the application form carries the applied item, amount, academic year, and seal/signature, and is used to compare the name, quantity, and date of the same record; the loan receipt carries the disbursement date, amount, and receipt number, and is used to verify whether signatures or receipts are complete. The materials come from student submissions and returns from the handling stage, and are updated by academic year and batch. It is common for the same name, amount, and date to fail to match across two materials, or for versions to be out of sync, with missing signatures and receipts. When entering Q&A intake and missing-item follow-up, the three types of materials each serve as citation sources, used to point back to the original text when following up on missing items and transferring to the handler.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text snippet and a source identifier, and the length can be 0. The "intake record and items to be completed" is then handled by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Family economic hardship determination form | Check fields, dates, and signatures: whether household population, income, hardship level, and signature fields are complete, and whether the date falls within the academic year | Open the citation marker to point back to the original paragraph, verify signatures and dates; record the number of citations |
| Scholarship and grant application form | Check fields, dates, and signatures: whether the applied item, amount, academic year, and seal/signature are complete, and whether the name, quantity, and date of the same record can match the determination form | Compare item by item against the source document; when citations are empty, confirm the chain still runs, and check the citation array in `responseData` (non-streaming module results returned with detailed output enabled) |
| Loan receipt | Check fields, dates, and signatures: whether the disbursement date, amount, receipt number, and signature or receipt are complete, and whether they can match the amount and date on the application form | Verify the receipt number and signature; if the citation limit is involved, check the `quoteMaxToken` of the cited text, and record the array length separately |
| Knowledge base retrieval node | The associated knowledge base uses the same vector model; cited content is output as an array, the length can be 0, and an empty array is also normal | Check the selected collection and vector model in the node; run a test with a question that has no matching materials, and see that the output is empty while the chain continues |

## Three common errors

- Symptom: the name, amount, and date of the same record do not match between the determination form and the application form. Cause: the two materials were entered separately or versions are out of sync, field definitions are inconsistent, and the cited snippets each point back to different original texts.
- Symptom: the loan receipt lacks a signature or receipt number, and it still cannot be completed after follow-up. Cause: the materials were not fully collected at the submission stage, or the receipt version is out of sync, and there is no complete paragraph in the citation array to point back to.
- Symptom: the answer has content but the citation array is empty, or the cited snippets do not match the original text. Cause: no materials were hit in this round, or trimming occurred after the hit; an empty array is a normal output and does not mean retrieval failed.

## How to verify the setup

Acceptance for this feature: ask a question with original-text support, and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials, confirm the array is empty while the chain runs, and check `quoteList` within `responseData`.

Business test: ask a question missing key information, and see whether it follows up first before answering; the follow-up items must land on the fields, dates, and signatures of the determination form, application form, or loan receipt.

- Open the search parameter panel and check the values item by item, confirming they are consistent with the knowledge base retrieval section; record the number of citations, and do not compare the count with `quoteMaxToken` for equality.
- Run a test with a question that has no matching materials, confirm the output is empty while the chain continues; then open the citation markers and check against the source document whether each citation can point back to the original paragraph.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
