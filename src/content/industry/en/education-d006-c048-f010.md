---
title: Citations and Source Traceability for Sino-Foreign Education Establishment and Annual Reports: Track Progress and Check Statistics
slug: /en/industry/education-d006-c048-f010
page_type: 行业问题页
application_area: education
meta_title: Joint Education | Citations | Progress
meta_description: Joint Education: review citations for progress tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Sino-Foreign Education Establishment and Annual Reports: Track Progress and Check Statistics

## What this category's data looks like

Materials for the establishment and annual reports of Chinese-foreign cooperative education institutions mainly consist of the establishment application, cooperation agreement, and articles of association, along with approval receipts and annual report forms. The establishment application states the institution name, education level, program offerings, and proposed faculty; the cooperation agreement stipulates the rights and responsibilities of both parties, the method of contribution, and the term; the articles of association specify the governance structure, rules of procedure, and financial arrangements. When these three types of materials enter the knowledge base retrieval node, each plays a different role: the application provides basic institution information and application fields, the cooperation agreement provides the signatories, amounts, and dates, and the articles of association provide internal governance clauses and signature pages. Materials are updated in batches, each batch containing a version number and signing status, with field characteristics in five categories: name, quantity, date, signature, and receipt. At the annual report stage, establishment-period fields must be aligned with annual data, verifying whether the name, quantity, and date of the same record are consistent across different materials, whether versions are synchronized, and whether signatures and receipts are complete. The update cadence is weekly or monthly; after each update, retrieval is rerun to confirm that cited snippets can point back to the original paragraphs, providing a traceable basis for subsequent statistical verification.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original snippet and a source identifier, and the length may be 0. Even if no content is found, the output pipeline still completes. The "progress table and statistical scope description" is completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Establishment application | Whether fields such as institution name, education level, program offerings, and proposed faculty are consistent with the cooperation agreement and articles of association; whether dates and signature pages are complete | In the node, check the selected knowledge base and vector model, open the citation markers to compare against the original paragraphs of the application, and compare field by field the name, quantity, date, signature, and receipt |
| Cooperation agreement | Whether the signatories, method of contribution, amount, term, and date match the articles of association and application; whether versions are synchronized | Open the search parameter panel and check the values item by item, run a test query with no matching materials to confirm the citation array is empty while the pipeline continues, then point back to the original agreement to verify the fields |
| Articles of association | Whether the governance structure, rules of procedure, financial arrangements, signature pages, and receipts are consistent with the application and agreement; whether version numbers are synchronized | Check the selected collections and their vector models, verify whether the cited snippets in `responseData` (non-streaming module results returned with detailed output enabled) can point back to the original articles of association, record the array length, and separately inspect the `quoteMaxToken` budget |
| Annual report materials | Whether the name, quantity, and date of annual data and establishment-period fields are consistent; whether exceptions are stated with their scope in the header | Use one week's records to verify the totals and see whether the scope and exceptions are clearly stated; inspect the citation source identifiers in `quoteList` to confirm each citation can point back to the original paragraphs |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the application and the agreement. Cause: The two materials were entered separately without field-level comparison, and versions were not synchronized.
- Symptom: The signature page of the articles of association is missing or the receipt was not archived. Cause: During material collection, items were not verified one by one according to signing status, and missing signatures or receipts were not marked.
- Symptom: The answer has citation markers but the cited snippets do not match the original text. Cause: First check whether this round hit anything and which material was hit, then look at trimming, rather than directly attributing it to length trimming.

## How to verify the setup

Acceptance of this feature: ask a question with textual support and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials and confirm the array is empty while the pipeline completes.

Business test: use one week's records to verify the totals and see whether the scope and exceptions are clearly stated.

- In the node, check the selected knowledge bases and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and check the values item by item, confirm they are consistent with the values set in the knowledge base retrieval section; run a test query with no matching materials and see that the output is empty while the pipeline continues.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
