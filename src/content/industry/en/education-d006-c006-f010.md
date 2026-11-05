---
title: Citations and Source Traceability for Kindergarten Operations and Quality Self-Assessment: Track Progress and Check Statistics
slug: /en/industry/education-d006-c006-f010
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Quality | Citations | Progress
meta_description: Kindergarten Quality: review citations for progress tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Kindergarten Operations and Quality Self-Assessment: Track Progress and Check Statistics

## What this category's data looks like

This category's data typically consists of three main documents: the self-assessment report, the problem list, and the rectification plan. Fields cover five dimensions: operating conditions, safety and hygiene, care and education, faculty and staff, and internal management. Each item includes name, quantity, date, responsible person, signature, and receipt. The self-assessment report provides conclusions and overall data, the problem list enumerates items to be rectified one by one, and the rectification plan gives measures, deadlines, and acceptance personnel. Materials are updated with process records weekly and aggregated statistically monthly; when weekly or monthly reports cite them, version synchronization must be maintained. After entering the knowledge base retrieval node, the three documents are cited as original text fragments in the associated knowledge base, each serving the roles of conclusion basis, problem traceability, and measure comparison; the cited content array is only responsible for pointing back to the original text, while field comparison, ledgers, and reports are completed by subsequent steps.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs a cited content array, each entry containing an original text fragment and a source identifier, and the length may be 0. The "progress table and statistical scope description" is completed subsequently by an AI node, code node, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Self-assessment report | The name, quantity, date, and signature must correspond item by item with the problem list and rectification plan, and the scope must be written in the header | Open the citation marker to point back to the original text paragraph, check whether the number of records in the report matches the number of entries in the problem list, and check whether signatures and receipts are complete |
| Problem list | The name, quantity, and date of the same record in the three documents must be consistent; when versions are not synchronized, the latest signed version prevails | Compare the measures, deadlines, and responsible persons in the problem list and rectification plan item by item, check dates and version numbers, and confirm that items missing signatures have been supplemented |
| Rectification plan | The measures, deadlines, and acceptance personnel correspond to the conclusions of the self-assessment report, and exceptional circumstances are noted in the header | Use one week's records to check the totals, see whether the scope and exceptions are clearly stated, and check whether receipts and signatures are updated in sync with the version |
| Cited content output | The number of returned entries matches the hit materials; being empty is also normal; the hit fragments can be checked in `quoteList` within `responseData` (non-streaming module results returned with detailed output enabled) | Run a test with a question that matches no materials and see whether the output is empty while the chain continues; then ask a question with original text support and check whether the array length and citation markers can point back to the original text |

## Three common errors

- Symptom: The name and quantity of the same record do not match between the self-assessment report and the problem list. Cause: The two documents were entered separately, and fields and dates were not checked against a unified scope.
- Symptom: The rectification plan has been updated, but the self-assessment report still cites old-version data. Cause: Versions were not synchronized, and signatures and receipts were not updated along with the revision.
- Symptom: Cited fragments do not match the original text, or there are no citation markers in the answer. Cause: First check whether this round hit anything and which material was hit, then look at `quoteMaxToken` trimming, and do not directly attribute it to length.

## How to verify the setup

Acceptance of this feature: ask a question with original text support, check whether the citation array and markers can point back to the original text, and record the array length; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: use one week's records to check the totals, see whether the scope and exceptions are clearly stated, and compare the fields, dates, and signatures of the self-assessment report, problem list, and rectification plan.

- In the node, check whether the selected knowledge base uses the same vector model, open the search parameter panel and check the values item by item, and confirm that `quoteMaxToken` only constrains the citation text budget.
- In the conversation, open the citation markers, point back to the original text paragraphs item by item against the source documents, record the array length, and separately check the hit fragments in `quoteList` within `responseData`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
