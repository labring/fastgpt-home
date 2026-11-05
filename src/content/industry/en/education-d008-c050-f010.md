---
title: Citations and Source Traceability for Foreign Teacher Recruitment and Course Scheduling: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c050-f010
page_type: 行业问题页
application_area: education
meta_title: Foreign Teachers | Citations | Access
meta_description: Foreign Teachers: review citations for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Foreign Teacher Recruitment and Course Scheduling: Manage Authorized Access and External Services

## What this category's data looks like

This page focuses on foreign teacher appointment and course scheduling, organizing three types of materials: appointment contracts, work permit materials, and course scheduling tables, and provides externally available entry points and authorization scope. Appointment contracts carry the hiring entity, position, appointment period, compensation, and signature page; work permit materials carry the permit number, validity period, issuing authority, and receipt; course scheduling tables carry course names, instructors, weeks, class hours, and adjustment records. When these three types of materials enter the knowledge base retrieval node, each is associated as an independent source; the node is only responsible for returning the matched original text fragments as an array, with source identifiers carried out together with the fragments, for subsequent steps to compare fields, write ledgers, and generate reports. In terms of update cadence, contracts use signing and renewal as nodes, permit materials use issuance and extension as nodes, and course tables use semesters and schedule adjustments as nodes. Any material version change requires re-ingestion into the knowledge base and retention of source identifiers, to avoid mismatches in names, quantities, and dates for the same record across two materials.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text fragment and a source identifier, and the length may be 0. "Externally available entry points and authorization scope" are completed by subsequent AI nodes, code nodes, or manual work. The cited content is output as an array, and the length may be 0; even if no content is found, the output chain still completes.

| Object | Check | Verification action |
| --- | --- | --- |
| Appointment contract | Whether fields, dates, and signatures are complete, and whether the name, position, and appointment period match those in the work permit materials | In the node, check the selected collection and vector model, open the citation marker to compare against the original contract paragraphs, and compare the name, position, appointment period, and signature page item by item |
| Work permit materials | Whether the permit number, validity period, issuing authority, and receipt connect with the contract dates, and whether the versions are synchronized | Run a test with a question that has no matching materials, and see whether the output is empty while the chain continues; then check whether the number of returned items in `responseData` (non-streaming module results returned with detailed output enabled) is consistent with the matched permit materials |
| Course scheduling table | Whether the course names, instructors, weeks, and class hours are consistent across the two materials, and whether schedule adjustments have receipts | Open the search parameter panel and check the values item by item; check whether the cited fragments in `quoteList` can point back to the original course table text, and confirm that the number of array items is consistent with the matched materials |

## Three common errors

- Symptom: The same foreign teacher's name is written differently in the appointment contract and the work permit materials, and the dates also do not match. Cause: The two materials were entered separately, without field-level comparison and unification.
- Symptom: The course scheduling table has been version-changed, but the cited fragments still point to the old version's weeks and class hours. Cause: After the version change, it was not re-ingested into the knowledge base, and the source identifier was not updated synchronously.
- Symptom: The cited fragments do not match the original text, or there is no citation marker in the answer. Cause: First check whether this round hit anything and which material was hit, then look at trimming, and do not directly attribute it to length trimming.

## How to verify the setup

This feature's acceptance: ask a question with original text support, and check whether the cited content array and citation markers can point back to the original text paragraphs; then ask a question with no matching materials, and confirm that the array is empty while the output chain completes. The number of citations is the array length, and `quoteMaxToken` is the citation content budget; the two are not compared for equality.

Business test: access once with a restricted identity, and see whether the visible scope matches the setting and whether unauthorized content is invisible.

- Check whether the selected knowledge bases use the same vector model, and open the search parameter panel to check the values item by item.
- Run a test once with a restricted identity, record the number of citation array items and the source identifiers in `quoteList` within `responseData`, and compare them against the original text paragraphs.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
