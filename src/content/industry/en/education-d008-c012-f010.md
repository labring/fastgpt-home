---
title: Citations and Source Traceability for District Teaching Research and Classroom Reviews: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c012-f010
page_type: 行业问题页
application_area: education
meta_title: Teaching Reviews | Citations | Access
meta_description: Teaching Reviews: review citations for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for District Teaching Research and Classroom Reviews: Manage Authorized Access and External Services

## What this category's data looks like

This page focuses on materials for district and county teaching research activities and lesson observation and evaluation scenarios: teaching research activity notices, lesson observation records, and lesson evaluation minutes. These materials are usually aggregated by activity batch or semester, and the fields include activity name, subject, grade, instructor, observer, evaluator, date, and signature or receipt number. The lesson observation record and lesson evaluation minutes for the same lesson must corroborate each other in name, quantity, and date. When the materials enter the knowledge base retrieval node, each is associated as an independent source; the notice is used to define the activity scope and authorized subjects, the lesson observation record is used to verify participants and dates, and the lesson evaluation minutes are used to verify conclusions and signatures. The update cadence is per activity batch, and when a new version overwrites an old version, the version identifier must be retained. For external service, the visibility scope for parents or superiors is determined by the authorization scope, and citation sources and traceability are used to point back to the original text passages.

## Configuration and implementation checks

This part is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing the original text fragment and source identifier, and the length may be 0. The externally available entry points and authorization scope are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Teaching research activity notice | The activity name, subject, date, and signature or receipt number in the notice are consistent with the corresponding fields in the lesson observation record and lesson evaluation minutes | Open the original notice, verify the activity name, date, and signature or receipt number, then compare item by item with the lesson observation record and lesson evaluation minutes |
| Lesson observation record | The instructor, observer, and date in the lesson observation record are consistent with the name, quantity, and date in the lesson evaluation minutes, and the version is the latest | Open the citation marker in the conversation, compare against the source document, and verify the instructor, observer, date, and version identifier |
| Lesson evaluation minutes | The conclusions, signature, or receipt in the lesson evaluation minutes correspond to the notice and lesson observation record, with no missing items | Verify the signature or receipt of the lesson evaluation minutes, and confirm consistency with the name, quantity, and date in the notice and lesson observation record |
| Cited content output | The number of returned items is consistent with the matched materials; being empty is also normal; the citation array in `responseData` (non-streaming module results returned with detailed output enabled) and the original text passages can be pointed back to | Run a trial with a question that has no matching materials, and see that the output is empty while the chain continues; then open the citation marker and compare against the original text |

## Three common errors

- Symptom: The name, quantity, and date of the lesson observation record and lesson evaluation minutes for the same lesson do not match across the two materials. Cause: The materials were entered separately by different batches or versions, and no field-level comparison was performed.
- Symptom: The notice has been updated, but the lesson observation record and lesson evaluation minutes still cite the old version. Cause: The versions were not synchronized, and when the new version overwrote the old version, the version identifier and update record were not retained.
- Symptom: The lesson evaluation minutes lack a signature or receipt, and the authorization scope cannot be confirmed during external service. Cause: The signature or receipt was not archived together with the materials, or the receipt number was not written into the citation source.

## How to verify the setup

Acceptance for this feature: ask a question with original-text support, and verify whether the citation array and markers can point back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality; if a citation upper limit is involved, verify the tokens of the cited text, and record the array item count separately.

Business test: access once with a restricted identity, and see whether the visible scope matches the setting, with unauthorized content not visible; then verify whether the authorization scope in `quoteList` matches the citation source identifier.

- Open the search parameter panel, verify that the associated knowledge base uses the same vector model, and verify item by item that the search parameter values are consistent with the knowledge base retrieval section.
- Open the citation marker in the conversation, compare against the source document, verify whether each citation can point back to the original text passage, and record the citation array length and the `quoteMaxToken` value.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
