---
title: Sharing and Embedding for Degree Awards and Certificate Information Reporting: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c026-f003
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Sharing & Embeds | Access
meta_description: Degree Certificates: review sharing & embeds for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Degree Awards and Certificate Information Reporting: Manage Authorized Access and External Services

## What this category's data looks like

This page addresses the degree conferral and certificate information reporting scenario; the materials come from degree application forms, thesis review forms, defense resolutions, and similar documents. The degree application form records the applicant's basic information, course grades, and supervisor's comments; the thesis review form carries the reviewers' conclusions, scores, and signatures; the defense resolution records the defense committee's voting results, date, and the chair's signature. The three types of materials are reported by batch, fields are slightly adjusted according to the training unit's template, and the update cadence is synchronized with the defense season and the degree committee cycle. When entering the authorized access and external services feature, the degree application form serves as the identity and qualification source document, while the thesis review form and defense resolution serve as process and conclusion evidence, each taking on the external display role of verifiable fields and signature receipts.

## Configuration and implementation checks

The share link in the publishing channel (the publishing service performs authentication) only outputs the share link, display parameters, and authentication results; the externally accessible entry point and authorization scope must be handled next so that external visitors see the corresponding content according to their identity. The share link can be configured with an expiration time, per-minute access limit, credit limit, identity verification, and display items for quoted snippets, quoted full text, and source original text.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | The applicant's name, student ID, course grades, and supervisor signature date must be consistent with the thesis review form; when versions are not synchronized, the latest signed version prevails | Compare the names, quantities, and dates in the two materials field by field, check whether signatures and receipts are complete, and record the link configuration corresponding to `shareId` |
| Thesis review form | The reviewers' conclusions, scores, and signature dates must correspond to the voting results and defense date in the defense resolution; if signatures or receipts are missing, it must not be released | Access once with a restricted identity, check whether the visible scope of the review form matches the identity, and ensure unauthorized fields are not visible |
| Defense resolution | The defense committee's voting results, chair's signature, and date must be consistent with the degree application form and thesis review form; the quantities and dates in the same record must not conflict | Check item by item the toggle status of quoted snippets, quoted full text, and source original text display, and confirm that the file visibility scope is determined by file permissions |
| Share link | The expiration time, per-minute access limit, credit limit, identity verification, and quote display items are set according to usage needs | Check the time limit and values of `shareId`, access once each with an unauthenticated session and an over-limit request, and record the release results |

## Three common errors

- Symptom: The names, quantities, or dates of the same record do not match between the degree application form and the thesis review form. Cause: The two material versions are not synchronized, and signatures and receipts were not compared field by field before reporting.
- Symptom: The defense resolution lacks the chair's signature or receipt but is still placed in the externally visible scope. Cause: The completeness of signatures was not verified before the material entered the share link, and the visible scope does not match the identity.
- Symptom: The link cannot be opened after some time, or the quoted full text can be seen without logging in. Cause: The expiration time and identity verification were not set as expected, and the quote display items were conflated with file permissions.

## How to verify the setup

Feature acceptance: Access once each with an unauthenticated session and an over-limit request, check the release and quote display, and record the authentication results and display parameters of `shareId`.

Business test: Access once with a restricted identity, see whether the visible scope matches the settings, ensure unauthorized content is not visible, and when opening to parents or superiors, ensure the identity and visible scope match.

- In the link configuration, check the expiration time, per-minute access limit, credit limit, and identity verification callback address, and record the values item by item.
- Check item by item the toggle status of quoted snippets, quoted full text, and source original text display, and confirm that the file visibility scope is determined by file permissions.
