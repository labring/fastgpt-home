---
title: Sharing and Embedding for Degree Awards and Certificate Information Reporting: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c026-f003
page_type: 行业问题页
application_area: education
meta_title: Degree Certificates | Sharing & Embeds | Handover
meta_description: Degree Certificates: review sharing & embeds for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Degree Awards and Certificate Information Reporting: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

Degree conferral and certificate information reporting involves three types of materials: degree application forms, thesis review forms, and defense resolutions. The sources are the training unit and the defense committee, and the update cadence rolls with batches and defense seasons. Field characteristics include name, student ID, thesis title, review conclusion, defense date, signature field, and receipt field. When the materials enter the sharing and embedding feature, the degree application form serves as the basis for identity and eligibility, the thesis review form serves as the basis for academic evaluation, and the defense resolution serves as the basis for voting and conclusions. Each of the three plays a role in field verification and handover of responsibility, and it is necessary to ensure that the name, quantity, and date of the same record are consistent across the three materials, that versions are synchronized, and that signatures and receipts are complete.

## Configuration and implementation checks

This step is executed by the sharing link in the publishing channel (the publishing service performs authentication), and outputs the sharing link, display parameters, and authentication result. The material drafts that can be issued and the handover records are seen by external visitors according to their identity, who then complete the corresponding content.

| Object | Check | Verification action |
| --- | --- | --- |
| Degree application form | The name, student ID, thesis title, and defense date must match item by item with the thesis review form and defense resolution, and the signature field and receipt field must not be missing | Check the name, quantity, and date field by field against the three materials, check whether signatures and receipts are complete, and verify the display items corresponding to `shareId` |
| Thesis review form | The review conclusion, review date, and reviewer signature must correspond within the same version to the voting conclusion and defense date in the defense resolution | Check whether the review conclusion and the defense resolution conclusion are consistent, check whether the version dates are synchronized, and access once with an unauthenticated session to verify the referenced display items |
| Defense resolution | The voting conclusion, defense date, and chair signature must form a closed loop with the degree application form and thesis review form, and missing items must be blocked | Check the date and signature in the resolution, check whether the name and quantity match the other two materials, and try once with an over-limit request to verify the per-minute access limit |
| Sharing link configuration | The expiration time, per-minute access limit, credit limit, identity verification, and referenced display items are set according to usage needs | Check the time limit and values in the link configuration, and verify item by item the switch status of quoted snippet, quoted full text, and source original text download |

## Three common errors

- Symptom: The thesis title or defense date of the same record does not match between the degree application form and the defense resolution. Cause: During material drafting, fields were not compared one by one, versions were not synchronized, and missing items were not blocked during handover.
- Symptom: The review conclusion and voting conclusion in the thesis review form and defense resolution are inconsistent. Cause: The two materials were drafted separately, and the conclusion and date of the same record were not checked during handover of responsibility.
- Symptom: Materials lack signatures or receipts, the link cannot be opened after some time, or the quoted full text can be seen without logging in. Cause: Signatures and receipts were not checked during handover, and referenced display items were confused with file permissions.

## How to verify the setup

Acceptance for this feature: access once each with an unauthenticated session and an over-limit request, verify release and referenced display, and check the expiration time, per-minute access limit, and referenced display items corresponding to `shareId`.

Business test: draft one copy according to the template and complete one handover, and see whether missing items are blocked.

- In the link configuration, check the expiration time, per-minute access limit, credit limit, and identity verification callback address, and verify item by item the switch status of quoted snippet, quoted full text, and source original text download.
- Check the name, quantity, date, signature, and receipt field by field against the degree application form, thesis review form, and defense resolution, and after confirming version synchronization, hand off to the next step for sign-off.
