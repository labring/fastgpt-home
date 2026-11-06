---
title: Sharing and Embedding for Initial Review of Academic Journal Submissions: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c066-f003
page_type: 行业问题页
application_area: education
meta_title: Journal Submissions | Sharing & Embeds | Handover
meta_description: Journal Submissions: review sharing & embeds for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Initial Review of Academic Journal Submissions: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

The category materials for initial review of academic journal submissions draw on submitted manuscripts, author information forms, and plagiarism check reports as sources, updated on a rolling batch basis, with fields covering manuscript title, author attribution, affiliation, manuscript number, receipt date, plagiarism check conclusion, and signature fields. When materials enter the sharing and embedding stage, the submitted manuscript plays the role of displaying the main text, the author information form plays the role of verifying identity and contact details, and the plagiarism check report plays the role of verifying duplication rate and conclusion; together, the three support a signable material draft and handover record. A common field characteristic in the initial review stage is that multiple materials record the same source; the manuscript title, number of authors, and receipt date must remain consistent across two or more materials, versions and dates must be synchronized, signatures and receipts must be complete, and at handover the next stage signs off to confirm.

## Configuration and implementation checks

This step is executed by the sharing link in the publishing channel (the publishing service performs authentication), outputting the sharing link, display parameters, and authentication result. The signable material draft and handover record are then completed by external visitors who see the corresponding content according to their identity. The sharing link can be configured with expiration time, per-minute access limit, point limit, identity verification, and display items for quoted snippets, quoted full text, and source original text.

| Object | Check | Verification action |
| --- | --- | --- |
| Submitted manuscript | Manuscript title, manuscript number, and receipt date are consistent in the author information form and plagiarism check report; signatures and receipts are complete | Compare the title, quantity, and date in the two materials item by item, check signatures and receipts, and record any inconsistencies |
| Author information form | Author attribution, affiliation, and contact details are consistent with the manuscript main text; version and date are synchronized | Check attribution and affiliation against the manuscript main text, and check whether the version number and date are synchronized |
| Plagiarism check report | The plagiarism check conclusion and duplication rate correspond to the manuscript number; quoted snippet and quoted full text display items are toggled as needed | Check the report number against the manuscript number, and check the toggle status of quoted snippets, quoted full text, and source original text item by item |
| Sharing link | Expiration time, per-minute access limit, and identity verification match the expected access volume; `shareId` corresponds to a unique link | Check the time limit and values in the link configuration, and test once each with an unauthenticated session and an over-limit request |

## Three common errors

- Symptom: The title, quantity, or date of the same manuscript does not match between two materials, and the handover is returned. Cause: During drafting, items were not checked against the same record as the baseline, and versions were not synchronized.
- Symptom: The plagiarism check report conclusion does not correspond to the manuscript number, and the signature field is blank. Cause: Signatures or receipts are missing during material circulation, and the responsibility handover is not closed-loop.
- Symptom: The link cannot be opened after some time, or the quoted full text can be seen without logging in. Cause: Expiration time and identity verification were not set as needed, and quoted display items were not checked item by item.

## How to verify the setup

Acceptance for this feature: Access once each with an unauthenticated session and an over-limit request, check the allowance and quoted display, and check the expiration time and per-minute access limit of the link corresponding to `shareId`.

Business test: Draft one copy according to the template and complete one handover, and see whether missing items are blocked.

- In the link configuration, check the expiration time, per-minute access limit, and identity verification callback address, and check the toggle status of quoted snippets, quoted full text, and source original text item by item.
- Draft one material draft according to the template, compare the title, quantity, date, and signatures of the submitted manuscript, author information form, and plagiarism check report, and complete one handover sign-off.
