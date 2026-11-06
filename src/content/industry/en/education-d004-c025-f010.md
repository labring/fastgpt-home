---
title: Citations and Source Traceability for Graduate Education Process Management: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c025-f010
page_type: 行业问题页
application_area: education
meta_title: Graduate Education | Citations | Handover
meta_description: Graduate Education: review citations for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Graduate Education Process Management: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

In graduate training process management, three types of materials run through the entire process: the training plan, the proposal report, and the mid-term assessment form. The training plan is drafted jointly by the supervisor and the graduate student, and its fields include course credits, research direction, time nodes, and signatures of both parties; the proposal report includes the basis for topic selection, literature review, schedule, and review comments; the mid-term assessment form includes stage results, existing problems, follow-up plans, and assessment conclusions. When the materials enter the knowledge base retrieval node, each serves as a citable original source, responsible for providing the original text of fields as well as dates and signature positions, for subsequent comparison of whether the name, quantity, and date of the same record are consistent across the two materials, whether the versions are synchronized, and whether signatures or receipts are complete. The update rhythm changes as the training stages advance; revisions are concentrated around the proposal and mid-term nodes, and old versions remain in the knowledge base and must be distinguished by source identifiers.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length may be 0. The material drafts and handover records that can be issued are then completed by subsequent AI nodes, code nodes, or manual work. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality.

| Object | Check | Verification action |
| --- | --- | --- |
| Training plan | Fields include course credits, research direction, time nodes, and signatures of both parties; dates and signatures must be consistent with the proposal report | In the citation array, point back to the original paragraphs one by one, and check that fields are complete and responsible parties are clear |
| Proposal report | Fields include the basis for topic selection, literature review, schedule, and review comments; version and date must be synchronized with the mid-term assessment form | Open the citation markers and compare them against the source documents, and check whether the name, quantity, and date of the same record match |
| Mid-term assessment form | Fields include stage results, existing problems, follow-up plans, and assessment conclusions; signatures or receipts must be complete | Run a test with a question that has no matching materials, and see whether the citation array is empty while the chain still runs through |
| Citation content output | The number of returned items is consistent with the matched materials; being empty is also normal | View the citation array and source identifiers in `responseData` (non-streaming module results returned with detailed output enabled) and `quoteList`, and record the number of items |

## Three common errors

- Phenomenon: The name, quantity, and date of the same record do not match between the training plan and the proposal report. Cause: During drafting, each cited an old version and did not point back to the original text using the same source identifier.
- Phenomenon: The versions of the proposal report and the mid-term assessment form are not synchronized, and signatures or receipts are missing. Cause: During handover, the version and date were not checked, and the citation array did not cover the signature page.
- Phenomenon: There are no citation markers in the answer, or there is an answer but the citation array is empty. Cause: No materials were matched in this round, or the cited fragments do not match the original text; the match and source must be checked first.

## How to verify the setup

Acceptance of this feature: ask a question with original-text support, and check whether the citation array and markers can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the node, check the selected collections and their vector models, and confirm that the associated knowledge bases use the same vector model.
- Open the search parameter panel and check the values item by item, record the number of citations and `quoteMaxToken`, and do not compare the two for equality.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
