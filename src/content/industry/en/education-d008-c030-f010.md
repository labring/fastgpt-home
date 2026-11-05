---
title: Citations and Source Traceability for Vocational School Student Internships: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c030-f010
page_type: 行业问题页
application_area: education
meta_title: Student Internships | Citations | Access
meta_description: Student Internships: review citations for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Vocational School Student Internships: Manage Authorized Access and External Services

## What this category's data looks like

In the vocational school student internship management scenario, materials include internship agreements, internship plans, internship logs, as well as external materials such as parent notification letters and superior filing forms. The internship agreement contains the unit name, position, start and end dates, and signatures and seals; the internship plan contains the batch, number of people, weekly schedule, and supervising teacher's signature; the internship log contains the date, position, tasks, and signatures of the student and the mentor. When these materials enter the knowledge base retrieval node, each participates in citation output as an independent source: the agreement provides the authorization basis, the plan provides the batch and personnel scope, and the log provides the process record. For external services, the visible scope for parents or superiors is jointly defined by the fields in these materials. In terms of update cadence, agreements are updated as batches are signed, plans are adjusted by semester, and logs are submitted weekly, so versions easily fall out of sync. Field characteristics are concentrated in four items: name, quantity, date, and signature. The same record often appears in two materials with inconsistent name spellings, mismatched number of people or dates, or missing signatures or receipts.

## Configuration and implementation checks

The citation output of the knowledge base retrieval node only outputs an array of cited content, each entry containing the original text fragment and source identifier; the length can be 0, and the externally available entry point and authorization scope must be handled subsequently by AI nodes, code nodes, or manual work. Even if no content is found, the output chain still completes. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality.

| Object | Check | Verification action |
| --- | --- | --- |
| Internship agreement | Whether the unit name, position, start and end dates, and signatures and seals are consistent with the internship plan | In the node, check the selected knowledge base collection and vector model; open the citation marker to trace back to the original agreement paragraph, and compare signatures and dates |
| Internship plan | Whether the batch, number of people, weekly schedule, and supervising teacher's signature match the internship log | Run a test with a question that has no matching materials, and see whether the citation array is empty while the chain continues; then check the names, quantities, and dates in the plan and log |
| Internship log | Whether the date, position, tasks, and signatures of the student and mentor are synchronized with the plan's weekly schedule | Check whether the number of entries in the cited content array matches the hit materials; verify whether the cited fragments in `responseData` (non-streaming module results returned with detailed output enabled) can trace back to the original log text |
| External materials | Whether the visible scope for parents or superiors matches the authorization basis, and unauthorized content is not visible | Access once with a restricted identity and see whether the visible scope matches the setting; check whether the search parameter values are consistent with the knowledge base retrieval section |

## Three common errors

- Symptom: The same student's name spelling or number of people does not match between the agreement and the plan. Cause: The two materials are entered separately, no field comparison is performed, and versions are not synchronized.
- Symptom: The internship log dates are misaligned with the plan's weekly schedule, and the cited fragments do not match the original text. Cause: Logs are submitted weekly while the plan is adjusted by semester, and intermediate versions are not written back.
- Symptom: There is no citation marker in the answer, or the citation array is empty. Cause: No materials were hit in this round; an empty array is a normal output and does not mean retrieval failed.

## How to verify the setup

Acceptance for this feature: ask a question with an original-text basis, and check whether the cited content array and citation markers can trace back to the original paragraphs; then ask a question with no matching materials, confirm that the array is empty while the chain completes, and record the array length and the `quoteMaxToken` budget values separately.

Business test: access once with a restricted identity, see whether the visible scope matches the setting, and confirm that unauthorized content is not visible.

- Open the search parameter panel and check the values item by item, confirm they are consistent with the settings in the knowledge base retrieval section, and inspect the cited fragments and source identifiers in `quoteList`.
- Compare the agreement, plan, and log item by item for name, quantity, date, and signature. When inconsistencies are found, first check the materials hit in this round, then look at trimming, and do not directly attribute it to length trimming.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
