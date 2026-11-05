---
title: Conversation Records and Traceability for Journal Review, Proofreading and Editorial Quality: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c068-f007
page_type: 行业问题页
application_area: education
meta_title: Journal Editing | Chat Records | Versions
meta_description: Journal Editing: review chat records for version tracking. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Conversation Records and Traceability for Journal Review, Proofreading and Editorial Quality: Maintain Document Versions and Changes

## What this category's data looks like

This page addresses material versions and change maintenance in the context of journal three-review-three-proof and editorial quality. Materials include three-review forms, proofs, proofreading records, author receipts, and final review opinions. They come from each stage of the editorial process, and the update cadence changes as review rounds progress. Three-review form fields include review round, date, and signature; proof fields include proof round, page number, and revision marks; proofreading record fields include proofreader, error type, and quantity. When these materials enter the conversation log and audit feature, each assumes an evidentiary role: the three-review form proves the review round and signature, the proof proves the version and revisions, and the proofreading record proves errors and quantities. The conversation log interface paginates by application and session dimensions, returning a list of session messages and the total record count, including role and reference information. The business deliverable is registered, exported, and reviewed by humans or external systems based on this.

## Configuration and implementation checks

This step is executed by the conversation log interface (by application and session dimensions), outputting a list of session messages and the total record count, including role and reference information. The "version ledger and change records" are then completed by humans or external systems. The interface only retrieves session evidence and does not write to the business ledger; the number of messages and the number of sessions are not the same quantity.

| Object | Check | Verification action |
| --- | --- | --- |
| Three-review form | The review round, date, signature, and final review opinion are unique in the current version, and the old version is traceable | Pull records by application and session dimensions, and verify that `chatId` matches the actual session; compare whether the name, quantity, and date of the three-review form and the proofreading record are consistent |
| Proof | The proof round, page number, revision marks, and references are updated synchronously; after changing one piece of content, the version number and references are updated synchronously | Page through to retrieve all records, sample one to verify the role, reference information, and time; check whether the entry corresponding to `dataId` is synchronized |
| Proofreading record | The proofreader, error type, quantity, and receipt are complete; missing signatures or receipts must be supplemented | Pull two consecutive pages and compare the total record count total and offset; verify the number of reference entries and reference text tokens in `value`, and record the array length separately |
| Version ledger and change records | The current version is unique, the old version is traceable, references are synchronized, and response `code` of 200 indicates a successful request | After exporting records, review the name, quantity, date, and signature, and confirm that the version number and references are updated synchronously |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the three-review form and the proofreading record. Cause: The two materials were not registered under the same version, and field sources are not synchronized.
- Symptom: The proof has been revised, but references still point to the old version. Cause: The version was not synchronized, references were not updated with the content, and the old version is not traceable.
- Symptom: The three-review form lacks a signature or receipt. Cause: The review round was not closed, and the material did not enter the current version ledger.

## How to verify the setup

Feature acceptance: Page through to retrieve all records by total record count, and sample one to verify the role, reference information, and time; verify `_id`, `dataId` and `value`, and confirm that response `code` of 200 matches the total record count total.

Business test: Change one piece of content and see whether the version number and references are updated synchronously.

- Pull records by application and session dimensions, pull two consecutive pages and compare the total record count total and offset, and confirm that all records are retrieved.
- Open one record to verify the role, reference information, and time, and compare the name, quantity, date, and signature of the three-review form, proof, and proofreading record.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
