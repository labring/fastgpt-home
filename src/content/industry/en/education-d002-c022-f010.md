---
title: Citations and Source Traceability for Student Awards, Financial Aid and Hardship Assessment: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c022-f010
page_type: 行业问题页
application_area: education
meta_title: Student Financial Aid | Citations | Checks
meta_description: Student Financial Aid: review citations for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Student Awards, Financial Aid and Hardship Assessment: Compare Documents and Locate Differences

## What this category's data looks like

Student awards, grants, loans, and financial hardship determination involve three types of materials: the family financial hardship determination form, the scholarship/grant application form, and the loan receipt. The determination form is filled out by the student with family population, income, and hardship level, and is signed by the class review and the department; the application form contains the applied item, amount, and award history, and requires the signature of the student and the counselor; the loan receipt is issued by the handling bank and contains the contract number, disbursement date, and amount. The three types of materials come from different sources and have different update rhythms: the determination form is submitted centrally by academic year, the application form rolls with batches, and the receipt is supplemented according to the disbursement arrival time. The field characteristics are name, student ID, amount, date, signature, and receipt number. If the name, quantity, or date of the same record does not match across two materials, the version is not synchronized, or a signature or receipt is missing, the discrepancy must be located during verification.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length can be 0. The "discrepancy list" is then completed by a subsequent AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Family financial hardship determination form | Compare name, student ID, hardship level, date, and signature with the scholarship/grant application form, and locate discrepancies to specific fields | In the cited content array, refer back to the original paragraphs one by one, check whether the name, quantity, and date in the determination form and application form are consistent, and record the discrepant fields |
| Scholarship/grant application form | Compare amount, date, and signature with the loan receipt, and check whether the version is synchronized | Open the citation superscript to compare against the source document, check the application amount against the receipt amount and the application date against the disbursement date, and mark missing signature items |
| Loan receipt | Compare contract number, disbursement date, and amount with the determination form and application form, and confirm whether the receipt is complete | Run a trial with one real record, check whether the number of items in the citation array matches the hit materials, and the `quoteList` field in `responseData` (non-streaming module results returned with detailed output enabled) can assist in locating the source |
| Knowledge base retrieval node | The associated knowledge base uses the same vector model, the cited content is output as an array, and the length can be 0 | Check the selected collection and vector model, run a trial with a question that has no matching materials, confirm that the array is empty while the pipeline runs through, `quoteMaxToken` is the cited content budget, and the number of array items is recorded separately |

## Three common errors

- Symptom: The name or student ID of the same student does not match between the determination form and the application form. Cause: The two materials are entered in different stages, no cross-form field comparison is done, and the cited fragments do not refer back to the original text.
- Symptom: The application amount is inconsistent with the loan receipt amount and date. Cause: The version is not synchronized, the old application form is still hit in the knowledge base, and the citation source is not marked with a version.
- Symptom: The materials are missing a signature or receipt, and there is no citation superscript in the answer. Cause: The scanned copy is not stored in the knowledge base or retrieval does not hit, the empty citation array is misjudged as retrieval failure, while an empty array is actually normal output.

## How to verify the setup

Acceptance of this feature: ask a question with original text evidence, and check whether the citation array and superscript can refer back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through.

Business test: use one real record to find fields inconsistent with the ledger, record the discrepancy list, submit it to the reviewer for confirmation, and write it back.

- Check whether the associated knowledge base uses the same vector model, and check that the search parameters are consistent with the values in the knowledge base retrieval section.
- Run a trial with one real record, compare the cited fragments with the original text, confirm that `quoteMaxToken` is the content budget, and record the number of array items separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
