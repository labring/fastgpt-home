---
title: Citations and Source Traceability for Undergraduate Curriculum Planning: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c018-f010
page_type: 行业问题页
application_area: education
meta_title: Program Revision | Citations | Access
meta_description: Program Revision: review citations for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Undergraduate Curriculum Planning: Manage Authorized Access and External Services

## What this category's data looks like

Undergraduate program revision materials include three types: program plans, course syllabi, and credit structure tables, all with version numbers, revision dates, and signature fields. The program plan defines total credits and modules; the course syllabus lists objectives, class hours, and assessment methods for each course; the credit structure table summarizes credits and proportions for each module. After materials enter the knowledge base retrieval node, the original text passages serving as citation sources are segmented and vectorized for reference in authorized access and external service scenarios. The update cadence is to replace the old version after each revision round and retain signed receipts. Field characteristics center on four items: name, quantity, date, and signature. The same record often has mismatched name, quantity, and date across two materials, unsynchronized versions, and missing signatures or receipts. Authorized access and external services require that visitor identity matches the visibility scope; unauthorized access must be invisible, and when opened to parents or superiors, only signed versions are presented.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each containing an original text fragment and a source identifier, and the length can be 0. "Externally available entry points and authorization scope" are subsequently completed by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Program plan | The four items—name, quantity, date, and signature—must be aligned item by item with the course syllabus and credit structure table | Take the same major and same version, compare total credits, module names, revision date, and signature field, and check whether the source identifier in `quoteList` points back to that passage |
| Course syllabus | Course names, class hours, and assessment methods are consistent with the course list in the program plan | Verify the name and class hours course by course, check whether the version number and revision date are synchronized, and confirm that the cited fragments correspond to the original text passages |
| Credit structure table | The sum of credits and proportions for each module is consistent with the total credits in the program plan | Summarize credits by module, check the proportions and total credits, check whether signatures or receipts are complete, and record the number of citations in `responseData` (non-streaming module results returned with detailed output enabled) |
| Knowledge base retrieval node | Citation content is output as an array, the length can be 0, and an empty array is also normal | Run a trial with a question that has no matching materials, confirm that the array is empty while the pipeline runs through, check that `quoteMaxToken` is the citation content budget, and record the array length separately |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the program plan and the course syllabus. Cause: The two materials were revised separately, without cross-checking and version synchronization.
- Symptom: The version displayed at the external entry point is inconsistent with the signed version. Cause: The old version was not replaced, the version was not synchronized, and the authorization scope was not narrowed according to the signed version.
- Symptom: Materials missing signatures or receipts still enter external services. Cause: Authorization determination only looks at identity and does not check the signature field and receipt completeness.

## How to verify the setup

Acceptance for this feature: ask a program plan question with original text support, check whether the citation array and superscripts can point back to the original text passages, and record the number of citations and the `quoteMaxToken` budget; do not compare the two for equality; then ask a question with no matching materials, and confirm that the array is empty while the pipeline runs through.

Business test: access once with a restricted identity and see whether the visible scope matches the setting

- In the node, check that the selected knowledge base uses the same vector model, and verify item by item that the search parameters match the values in the knowledge base retrieval section
- Open the citation superscripts against the source documents, confirm that each citation points back to the original text passage, and check whether signatures and receipts are complete

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
