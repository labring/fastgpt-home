---
title: Sharing and Embedding for Self-Study Exam Records and Graduation Review: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c054-f003
page_type: 行业问题页
application_area: education
meta_title: Self-Study Exams | Sharing & Embeds | Handover
meta_description: Self-Study Exams: review sharing & embeds for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Self-Study Exam Records and Graduation Review: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page focuses on material drafting and handover of responsibility in self-study examination registration records and graduation review. Category materials include registration records, course pass certificates, and graduation application forms. Registration records document the candidate's basic information and historical scores, course pass certificates prove single-subject passage, and graduation application forms consolidate application information and review comments. These materials come from provincial examination offices, host institutions, and study-aid organizations. Their update cadence is synchronized with examination periods and graduation review batches. Field characteristics cover name, examination registration number, course code, score, date, signature, and seal. When materials enter the sharing and embedding feature, registration records serve as the identity and score ledger, course pass certificates serve as single-subject proof, and graduation application forms serve as the consolidation and handover carrier. Each plays a different role and together they support issuable drafts and handover records.

## Configuration and implementation checks

This part is executed by the share link in the publishing channel (the publishing service performs authentication), outputting the share link, display parameters, and authentication results. Issuable material drafts and handover records are completed by external visitors according to the content they can see based on their identity. The share link can be configured with expiration time, per-minute access limit, point limit, identity verification, and display items for quoted snippets, quoted full text, and source original text.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration records | The name, examination registration number, course code, quantity, and dates among the registration records, course pass certificates, and graduation application forms must be consistent, and signatures and receipts must be complete | Compare the fields and dates of the three materials item by item, check whether signatures and receipts are complete, and check whether versions are synchronized |
| Course pass certificates | The course name, score, and date on the course pass certificate are consistent with the registration records, and match the number of courses summarized in the graduation application form | Extract the course pass certificate and cross-check it with the registration records and graduation application form to confirm there are no discrepancies in course codes and quantities |
| Graduation application form | The graduation application form has complete fields, clear responsible persons, consistent version and date, complete signatures and seals, and traceable handover records | Draft a graduation application form according to the template, complete one handover, check whether missing items are blocked, and verify the responsible person's receipt |
| Share link | The share link's expiration time, per-minute access limit, identity verification, and quote display items are configured as needed, and `shareId` is traceable | Check the link configuration, access once each with an unauthenticated session and an over-limit request, and check the display of quoted snippets and full text |

## Three common errors

- Symptom: The same candidate's name or course quantity does not match between the registration records and the graduation application form. Cause: Cross-checking was not performed during material drafting, versions were not synchronized, resulting in inconsistent fields.
- Symptom: The date on the course pass certificate is inconsistent with the date recorded in the registration records. Cause: Update cadence was not synchronized, old-version materials were not replaced, and dates were not verified during handover.
- Symptom: The graduation application form lacks signatures or receipts, and the handover record is incomplete. Cause: Responsible persons were not clarified, the receipt step was missing, and the handover process was not completed after material drafting.

## How to verify the setup

This feature's acceptance: access once each with an unauthenticated session and an over-limit request, verify release and quote display, and check the expiration time, per-minute access limit, identity verification callback, and display items for quoted snippets, full text, and source original text corresponding to `shareId`.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- Check the share link's expiration time, per-minute access limit, identity verification, and quote display items, and try once each with an unauthenticated session and an over-limit request.
- Draft a graduation application form according to the template, cross-check the fields, dates, and signatures of the registration records and course pass certificates, complete the handover, and record the receipt.
