---
title: Citations and Source Traceability for Degree Awards and Certificate Information Reporting: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c026-f010
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Citations | Access
meta_description: Degree Certificates: review citations for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Degree Awards and Certificate Information Reporting: Manage Authorized Access and External Services

## What this category's data looks like

This page addresses authorized access and external services in the scenario of degree conferral and certificate information reporting, involving three types of materials: degree application forms, thesis review forms, and defense resolutions. The degree application form carries the applicant's basic information, degree category, and application date, and is the starting point for identity and eligibility; the thesis review form carries the reviewer, review conclusion, and review date, and supports the academic evaluation chain; the defense resolution carries the defense committee, voting result, resolution date, and signatures, and is the basis for the conferral conclusion. Materials enter the knowledge base by batch and version, and the update cadence advances along with review and defense milestones; field characteristics center on name, student ID, thesis title, date, quantity, and signature fields. During external services, each of the three types of materials serves as a citable source, the authorization scope determines the visible segments, and the source identifier is used to refer back to the original text, making it convenient for parents or superiors to view the corresponding content under a restricted identity.

## Configuration and implementation checks

This link is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each entry containing an original text segment and a source identifier, and the length may be 0. The externally available entry points and authorization scope are subsequently completed by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | Whether the fields, dates, and signatures are consistent with the same record in the thesis review form and defense resolution | Check the name, student ID, thesis title, application date, and signature fields, and compare whether the three materials point to the same record |
| Thesis review form | Whether the reviewer, review conclusion, review date, and signature are complete, and whether the version is in sync | Open the citation marker to refer back to the original paragraph, check the review conclusion and date, and check whether the signature or receipt is missing |
| Defense resolution | Whether the defense committee, voting result, resolution date, and signature match those in the application form and review form | Access once with a restricted identity, check whether the visible scope matches the authorization settings, and confirm that unauthorized content is not visible |
| Cited content output | The number of returned entries is consistent with the matched materials; being empty is also normal, and `quoteMaxToken` only constrains the citation text budget | Run a test with a question that matches no materials, see that the array is empty while the chain continues, and record the number of array entries separately |

## Three common errors

- Symptom: The thesis title or date of the same record does not match between the degree application form and the defense resolution. Cause: The two materials were entered separately and their versions are not in sync, so the cited segments each point to a different version.
- Symptom: The thesis review form has a review conclusion but lacks the reviewer's signature or receipt. Cause: When the material was archived, only the body text was collected and not the signature page, so citations can refer back to the body text but there is no signature basis.
- Symptom: There is no citation marker in the answer, or there is an answer but the citation array is empty. Cause: No materials were matched in this round, or the matched segments were not output with the answer; an empty array is a normal output and does not mean retrieval failed.

## How to verify the setup

This feature's acceptance: ask a question with an original-text basis, and check whether the citation array and markers can refer back to the original text; then ask a question with no matching materials, confirm that the array is empty while the chain runs through, and verify that `quoteMaxToken` only governs the citation text budget, with the number of array entries recorded separately.

Business test: access once with a restricted identity, see whether the visible scope matches the settings, and confirm that unauthorized content is not visible.

- Open the search parameter panel and check item by item, confirm that the associated knowledge base selected is a knowledge base with the same vector model, and record the materials matched in this round and the `quoteList` information.
- Open the citation markers in the conversation, check against the source documents whether each citation can refer back to the original paragraph, and check whether the number of entries in the citation array in `responseData` (non-streaming module results returned with detailed output enabled) is consistent with the matched materials.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
