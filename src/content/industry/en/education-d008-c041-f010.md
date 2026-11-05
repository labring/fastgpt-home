---
title: Citations and Source Traceability for Corporate Compliance and Safety Training: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c041-f010
page_type: 行业问题页
application_area: education
meta_title: Compliance Training | Citations | Access
meta_description: Compliance Training: review citations for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Corporate Compliance and Safety Training: Manage Authorized Access and External Services

## What this category's data looks like

This page addresses the enterprise compliance and security training scenario. Materials include three categories: compliance training courseware, security operating procedures, and exam records. Courseware is typically updated by year or by regulatory version, and contains chapter numbers, effective dates, and revision notes; operating procedures contain equipment names, operating steps, risk control points, and responsible-person signature fields; exam records contain candidate names, departments, exam paper versions, scores, and receipt signatures. When these three categories of materials enter the knowledge base retrieval node, each is vectorized as an independent source. Courseware and procedures provide the original clause text, while exam records provide personnel and date fields, which are used for subsequent comparison of whether the names, quantities, and dates of the same record are consistent across different materials, as well as whether versions are synchronized and whether signatures or receipts are missing.

## Configuration and implementation checks

This part is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each item containing an original text fragment and a source identifier, and the length can be 0. The externally available entry point and authorization scope are subsequently completed by AI nodes, code nodes, or manual work. The citation content is output as an array, and the length can be 0; even if no content is found, the output chain will still run through.

| Object | Check | Verification action |
| --- | --- | --- |
| Compliance training courseware | The courseware name, effective date, revision version, and signature field must be consistent with the exam records and procedures | Check the courseware chapter numbers and effective date, open the citation marker to trace back to the original paragraph, and check whether the revision notes are synchronized |
| Security operating procedures | The equipment name, number of operating steps, risk control points, and responsible-person signature must correspond to the courseware | Open the citation marker in the conversation to compare against the source document, and check the equipment name, number of steps, and signature field item by item |
| Exam records | The candidate name, department, exam paper version, score, and receipt signature must correspond to the courseware version date | Access once with a restricted identity, see whether the visible scope matches the setting, and check the exam paper version against the courseware effective date |
| Citation content output | The number of returned items is consistent with the matched materials; being empty is also normal | Run a test with a question that matches no materials, see that the output is empty while the chain continues, and record the array length and the `quoteMaxToken` budget |

## Three common errors

- Symptom: The names, quantities, and dates of the same exam record do not match between the courseware and the procedures. Cause: The two materials' versions are not synchronized, and the citation fragments each trace back to different revision versions.
- Symptom: There is no citation marker in the answer; there is an answer but the citation array is empty. Cause: The question did not match any materials, or the citation output chain was mistakenly judged as a retrieval failure.
- Symptom: The citation fragments do not match the original text, and signatures or receipts are missing. Cause: First check whether this round matched anything and which material was matched, then look at `quoteMaxToken` trimming.

## How to verify the setup

This feature's acceptance: ask a question with original-text support, and check whether the citation array and citation markers can trace back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and record the array length and the `quoteMaxToken` budget; do not compare the two for equality.

Business test: access once with a restricted identity, see whether the visible scope matches the setting, that unauthorized content is not visible, and check the citation source identifier of the `quoteList` field in `responseData` (non-streaming module results returned with detailed output enabled).

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- Run a test with a question that matches no materials, see that the output is empty while the chain continues, and record the number of citations and the `quoteMaxToken` budget.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
