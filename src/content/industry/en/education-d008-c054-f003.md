---
title: Sharing and Embedding for Self-Study Exam Records and Graduation Review: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c054-f003
page_type: 行业问题页
application_area: education
meta_title: Self-Study Exams | Sharing & Embeds | Access
meta_description: Self-Study Exams: review sharing & embeds for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Self-Study Exam Records and Graduation Review: Manage Authorized Access and External Services

## What this category's data looks like

Self-taught examination registration records and graduation review involve three types of materials: registration records, course qualification certificates, and graduation application forms. Registration records document the candidate's basic information and the status of each examination registration; course qualification certificates indicate the course name, qualification date, and signature/seal; graduation application forms summarize the number of courses, credits, and review signatures. The material sources are exports from provincial examination office systems and archives of the main examining institutions, and the update cadence changes with examination periods and graduation batches. When entering the sharing and embedding feature, registration records serve as the working draft for identity and scope determination, course qualification certificates serve as the content source for quoted display items, and graduation application forms serve as the object for signature and receipt verification in external services. The fields, dates, and signatures of the three must be compared item by item to avoid mismatches in names, quantities, or dates for the same record across two materials, or unsynchronized versions, missing signatures, and missing receipts.

## Configuration and implementation checks

This step is executed by the sharing link in the publishing channel (the publishing service performs authentication), and outputs the sharing link, display parameters, and authentication result. The externally available entry points and authorization scope are then completed by external visitors seeing the corresponding content according to their identity.

| Object | Check | Verification action |
| --- | --- | --- |
| Registration records | The visitor's identity matches the visible scope, and unauthorized access is not visible; the name and examination registration number in the record are consistent with the course qualification certificate | Access once with a restricted identity and check whether the visible scope matches the setting; check the name, quantity, and date in the record and the qualification certificate |
| Course qualification certificate | Quoted display items are toggled as needed, and the visible scope of fragments and full text is determined by file permissions; the qualification date and signature/seal are complete | Check item by item the toggle status of quoted fragments, quoted full text, and source original text; verify the qualification certificate date and signature |
| Graduation application form | Signatures and receipts are complete, and the number of courses matches the registration records and course qualification certificates; versions are synchronized | Check the signatures and receipts on the application form; compare the number of courses and dates; verify the display parameters of the link corresponding to `shareId` |
| Sharing link | Expiration time, per-minute access limit, points limit, and identity verification are set according to usage needs | Check the time limit and values; access once each with an unauthenticated session and an over-limit request; check `shareId` and the authentication result |

## Three common errors

- Symptom: the link cannot be opened after a period of time. Cause: the expiration time has arrived, or the publishing channel has not synchronized an extension of the time limit, causing the sharing link to become invalid.
- Symptom: the course name, quantity, and date for the same record do not match between the registration records and the course qualification certificate. Cause: the versions of the two materials are not synchronized, or they were not checked against the same batch during entry.
- Symptom: the graduation application form lacks a signature or receipt. Cause: the review step did not complete the signature and receipt, and no completeness check was performed when the material entered external services.

## How to verify the setup

This feature's acceptance: access once each with an unauthenticated session and an over-limit request, and check the allowance and quoted display; check the expiration time, per-minute access limit, and identity verification callback of the link corresponding to `shareId`.

Business test: access once with a restricted identity and see whether the visible scope matches the setting; check the toggle status of quoted fragments, quoted full text, and source original text.

- In the link configuration, check the expiration time, per-minute access limit, points limit, and identity verification callback address.
- Check item by item the toggle status of quoted fragments, quoted full text, and source original text, and record the array length and quoted text tokens.
