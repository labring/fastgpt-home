---
title: Citations and Source Traceability for Sino-Foreign Education Establishment and Annual Reports: Find Supporting Evidence
slug: /en/industry/education-d001-c048-f010
page_type: 行业问题页
application_area: education
meta_title: Joint Education | Citations | Evidence
meta_description: Joint Education: review citations for evidence lookup. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Sino-Foreign Education Establishment and Annual Reports: Find Supporting Evidence

## What this category's data looks like

This category covers the establishment and annual reports of Sino-foreign cooperative education institutions. Materials include the establishment application, cooperation agreement, articles of association, and annual report filing and receipt. The establishment application states the institution name, education level, education scale, legal representative, and signatures and seals; the cooperation agreement states the names of the Chinese and foreign parties, contribution method, amount, signing date, and signature page; the articles of association state the governance structure, decision-making procedures, revision records, and effective date; the annual report collects fields such as enrollment, faculty, finance, and courses by academic year. After the materials enter the knowledge base retrieval node, each participates in vector search as an independent source, and hit snippets are returned with source identifiers, for subsequent nodes or manual comparison of fields, ledger writing, and report generation. The update rhythm is based on approval, agreement renewal, articles revision, and annual report submission as nodes; when versions are not synchronized, the name, amount, and date of the same record are prone to mismatch.

## Configuration and implementation checks

This link is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original snippet and source identifier, and the length can be 0. The "basis items that can be traced back to the original text" are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Establishment application | The fields include institution name, education level, education scale, legal representative, and signatures and seals; the date and signature page are complete, and they match the same record in the cooperation agreement and articles of association | Open the citation marker to trace back to the original paragraph of the application, and check the name, amount, date, and signature item by item |
| Cooperation agreement | The names of the Chinese and foreign parties, contribution method, amount, signing date, and signature page are consistent; the renewed version is the current version and does not conflict with the application and articles of association | Check the signing date and signature page against the source document, record the number of items in the citation array, and separately record the tokens budget `quoteMaxToken` for the cited text |
| Articles of association | The governance structure, decision-making procedures, revision records, and effective date are complete; the revised version is synchronized to the knowledge base and does not contradict the application and cooperation agreement | Check the revision records and effective date, and confirm that the cited snippets come from the current version |
| Annual report and receipt | The enrollment, faculty, finance, and course fields are consistent with the standards of the application, agreement, and articles of association; the submission receipt and signature page are complete | Check the receipt and signature page, and verify whether the source identifiers in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList` can trace back to the original text |

## Three common errors

- Phenomenon: The institution name and education scale amount of the same record do not match between the application and the cooperation agreement. Cause: The two materials were updated separately without field-level comparison, and the cited snippets each point to one original text.
- Phenomenon: After the articles of association are revised, the knowledge base still returns the old clauses. Cause: The versions are not synchronized, the new revision has not been entered into the knowledge base or replaced, and the citation source identifiers still point to the old document.
- Phenomenon: The cooperation agreement lacks a signature page or the annual report lacks a receipt, and the cited snippets cannot trace back to the complete original text. Cause: The scanned copy is missing pages or pages were omitted during upload, and the hit snippets fall in incomplete paragraphs.

## How to verify the setup

Acceptance of this feature: ask a question with an original-text basis, and check whether the citation array and markers can trace back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through.

Business test: ask a basis question across materials, and see whether the answer gives traceable sources.

- Run a trial with a question that has no matching materials, see that the citation array is empty while the output pipeline continues, and record the number of items in the array.
- Open the citation markers against the source document, check the source identifiers in `quoteList` within `responseData`, and when the citation limit is involved, check only the tokens of the cited text, recording the number of items in the array separately.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
