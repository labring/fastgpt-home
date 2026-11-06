---
title: Citations and Source Traceability for Research Ethics Review: Track Progress and Check Statistics
slug: /en/industry/education-d006-c062-f010
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Citations | Progress
meta_description: Research Ethics: review citations for progress tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Ethics Review: Track Progress and Check Statistics

## What this category's data looks like

In the research ethics review scenario, three types of materials—ethics review applications, informed consent form templates, and risk assessment forms—jointly enter the citation output of the knowledge base retrieval node. The ethics review application carries the project name, acceptance number, review date, and signature field; the informed consent form template carries the version number, signing date, subject information, and receipt; the risk assessment form carries the risk level, assessment date, and assessor signature. The materials are archived in batches by the institutional review board office, and the update cadence keeps pace with review progress and template revisions. Field characteristics are concentrated in four categories: name, quantity, date, and signature. The three play different roles in the function: the application is the primary record source, the template is the baseline for version comparison, and the assessment form is the basis for the risk criteria. The citation output is only responsible for providing the original text snippet and source identifier; the progress table and statistical criteria description are completed by subsequent nodes or manually based on this by comparing fields, writing ledgers, and generating reports.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each entry containing the original text snippet and source identifier, and the length may be 0. The "progress table and statistical criteria description" is then completed by subsequent AI nodes, code nodes, or manually.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Whether the name, acceptance number, review date, and signature field are complete, and whether the project name matches that in the informed consent form template | Open the citation marker to trace back to the original application text, verify the fields item by item, record the number of array entries, and separately record the `quoteMaxToken` budget |
| Informed consent form template | Whether the version number, signing date, subject information, and receipt are synchronized, and whether the name and date in the same record correspond | Check the version and signature against the source document, use `quoteList` to view the citation snippet, and confirm it matches the original paragraph |
| Risk assessment form | Whether the risk level, assessment date, and assessor signature are clearly written, and whether the quantity matches the application record | Open the citation marker in the conversation, compare the quantity and date of the assessment form and the application, and use `responseData` (non-streaming module results returned with detailed output enabled) only for viewing the chain return |
| Citation content output | The number of returned entries matches the materials hit; being empty is also normal, and the output chain continues to work | Run a test with a question that has no matching materials, and see that the array is empty while the chain continues |

## Three common errors

- Symptom: The project name, quantity, and date of the same record do not match between the ethics review application and the informed consent form template. Cause: The two materials are archived separately, field comparison is not performed by the same acceptance number, and the versions are not synchronized.
- Symptom: The risk assessment form lacks the assessor signature or receipt, but it is still counted in the total during statistics. Cause: Signatures and receipts are not included in the verification items, the criteria are not written in the header, and exceptions are not separately marked.
- Symptom: There is no citation marker in the answer, or the citation snippet does not match the original text. Cause: Without first checking whether this round hit anything and which material was hit, the issue is directly attributed to length truncation.

## How to verify the setup

Acceptance for this feature: Ask a question with original text support, check whether the citation array and marker can trace back to the original text, and confirm that the snippet in `quoteList` matches the source document; then ask a question with no matching materials, and confirm that the array is empty while the chain works.

Business test: Use one week of records to verify the totals, see whether the criteria and exceptions are clearly written, and confirm that the number of records matches the statistical count and that the criteria are written in the header.

- In the node, verify the selected knowledge base collections and their vector models, and confirm that the selected knowledge bases use the same vector model.
- Open the search parameter panel and verify the values item by item, confirming that they are consistent with the values set in the knowledge base retrieval section.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
