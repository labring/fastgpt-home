---
title: Citations and Source Traceability for Graduate Employment Contracts and Destination Statistics: Track Progress and Check Statistics
slug: /en/industry/education-d006-c027-f010
page_type: 行业问题页
application_area: education
meta_title: Graduate Destinations | Citations | Progress
meta_description: Graduate Destinations: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Graduate Employment Contracts and Destination Statistics: Track Progress and Check Statistics

## What this category's data looks like

For progress records and statistical verification of university employment signing and graduation destination statistics, the materials come from three types: employment agreements, graduation destination registration forms, and employer certificates. The employment agreement carries the signing entity, position, and seal date; the graduation destination registration form carries the destination category, employer name, and registration time; the employer certificate carries the fact of hiring, the receipt of the acceptance letter, and the handler's signature. When these three types of materials enter the knowledge base retrieval node, each serves as a citable original source, to be returned as citation snippets after retrieval hits, and does not assume the responsibility of ledger aggregation. The update rhythm is weekly collection and monthly review: records added or changed within a week first enter the progress table, and at month-end the totals are checked against the statistical scope description, with the scope written in the table header and exceptions listed separately. Field characteristics center on four items: name, quantity, date, and signature; the same record must remain correspondable across materials.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation contents, each containing an original text snippet and a source identifier, and the length may be 0. The "progress table and statistical scope description" is completed subsequently by an AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Employment agreement | Whether the signing entity, position name, signing date, and seal are consistent with the registration form | Retrieve the original agreement snippet and source identifier, compare name, date, and signature item by item, and separately mark missing seals or receipts |
| Graduation destination registration form | Whether the destination category, employer name, and registration time correspond to the agreement or certificate | Check the same record in the registration form fields against the agreement and certificate; when names and quantities do not match, record as an exception |
| Employer certificate | Whether the fact of hiring, acceptance receipt, and handler signature are complete | Retrieve the original certificate, verify the receipt and signature; for versions not synchronized, use the latest registration time as the standard and keep a trace |
| Progress table and statistical scope description | Whether the number of records matches the statistical count, and whether the scope is written in the table header | Check totals weekly, check whether exceptions are clearly written, record the number of citations by array length, and treat `quoteMaxToken` only as the citation text budget |

## Three common errors

- Symptom: The same record has inconsistent names, quantities, or dates in the agreement and registration form. Cause: The two materials were entered separately, without field comparison for the same record.
- Symptom: Material versions are not synchronized, and old receipts coexist with new registrations. Cause: The update rhythm was not unified, and the latest registration time was not used as the standard during collection.
- Symptom: Missing signatures or receipts still enter the totals. Cause: The check only looked at whether fields were filled in, without treating signatures and receipts as independent judgment items.

## How to verify the setup

Acceptance for this feature: ask a question with original-text evidence, and check whether the citation array and superscripts can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline still runs. Open the citation superscripts against the source documents; in `responseData` (non-streaming module results returned with detailed output enabled), the number of citations is recorded separately by array length, and is not compared for equality with the citation text budget of `quoteMaxToken`.

Business test: use one week of records to check the totals, and see whether the scope and exceptions are clearly written.

- In the node, check the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Run a test with a question that has no matching materials, see that the output is empty while the pipeline continues, then check item by item that the search parameters are consistent with the values in the knowledge base retrieval section.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
