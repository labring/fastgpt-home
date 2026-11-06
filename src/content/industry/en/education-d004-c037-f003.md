---
title: Sharing and Embedding for Vocational Training Subsidy Applications: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c037-f003
page_type: 行业问题页
application_area: education
meta_title: Training Subsidies | Sharing & Embeds | Handover
meta_description: Training Subsidies: review sharing & embeds for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Vocational Training Subsidy Applications: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

Vocational training subsidy application materials generally include the class opening filing form, attendance records, the completion assessment form, as well as signable material drafts and handover records. These materials come from two stages: the training process and the subsidy application, and their update cadence follows the class opening batches and completion batches, with field characteristics concentrated in names, quantities, dates, and signature receipts. When entering the sharing and embedding feature, the class opening filing form handles the display of basic project information, the attendance records handle the display of personnel attendance, the completion assessment form handles the display of results, and the signable material drafts and handover records serve as the basis for sign-off in the next stage. External visitors see the corresponding content according to their identity, and the material drafts and handover records are only considered to have completed circulation after sign-off.

## Configuration and implementation checks

This step is executed by the sharing link in the publishing channel (the publishing service performs authentication), outputting the sharing link, display parameters, and authentication results. The signable material drafts and handover records are then completed by external visitors seeing the corresponding content according to their identity. The sharing link can be configured with an expiration time, a per-minute access limit, a points limit, identity verification, and display items for quoted snippets, quoted full text, and source original text.

| Object | Check | Verification action |
| --- | --- | --- |
| Class opening filing form | Names, quantities, dates, and signatures are consistent between the filing form and the draft | Check the names, quantities, dates, and signatures of the filing form and the draft, and verify that versions and dates are synchronized |
| Attendance records | The same record matches in names, quantities, and dates between the attendance records and the completion assessment form | Compare the names, quantities, and dates of the attendance records and the completion assessment form one by one, and confirm that signatures or receipts are complete |
| Completion assessment form | Assessment results are consistent with the names, quantities, and dates in the handover records | Check the completion assessment form and the handover records, verify signatures and receipts, and record the version number |
| Sharing link | Expiration time, per-minute access limit, identity verification, and quote display items are set as needed | Check the time limit and values in the link configuration, access once each with an unauthenticated session and an over-limit request, and record the `shareId` |

## Three common errors

- Symptom: The names, quantities, and dates of the same record do not match between the class opening filing form and the material draft. Cause: During drafting, items were not compared one by one according to the template, and versions were not synchronized.
- Symptom: The number of people or dates in the attendance records and the completion assessment form are inconsistent. Cause: The two materials were updated separately without cross-checking, and signatures or receipts are missing.
- Symptom: The link cannot be opened after a period of time, and the quoted full text can be seen without logging in. Cause: The expiration time and identity verification were not configured as needed, and the quote display items were not checked one by one.

## How to verify the setup

Feature acceptance: Access once each with an unauthenticated session and an over-limit request, and check the allowance and quote display; check the expiration time, per-minute access limit, identity verification, and quote display items in the link configuration, and record the `shareId`.

Business test: Draft one copy according to the template and complete one handover, and see whether missing items are blocked.

- Check the expiration time and per-minute access limit in the link configuration, try an over-limit request once, and record the `shareId`.
- Check the display switches for quoted snippets, quoted full text, and source original text one by one, and access once with an unauthenticated session.
