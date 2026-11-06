---
title: Sharing and Embedding for Journal Publication Licensing and Annual Verification: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c069-f003
page_type: 行业问题页
application_area: education
meta_title: Journal Licensing | Sharing & Embeds | Handover
meta_description: Journal Licensing: review sharing & embeds for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Journal Publication Licensing and Annual Verification: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page focuses on drafting materials and handover of responsibility in the context of journal publication licenses and annual verification, involving three types of materials: the journal publication license, the annual verification form, and the rectification report. The sources are the license issuing authority, the annual verification system, and the internal rectification ledger. The update cadence is synchronized with the verification cycle, rolling by year or by rectification deadline. Field characteristics include license number, journal name, sponsoring organization, verification year, rectification items, issue date, and signature field. When the materials enter the sharing and embedding feature, the license and the verification form are displayed as the main documents, while the rectification report serves as an attachment receipt. Each plays a different role, together forming a signable material draft and handover record.

## Configuration and implementation checks

This step is executed by the share link in the publishing channel (the publishing service performs authentication), outputting the share link, display parameters, and authentication result. The signable material draft and handover record are completed by external visitors according to their identity, who see the corresponding content. The share link can be configured with an expiration time, per-minute access limit, credit limit, identity verification, and display items for quoted snippet, quoted full text, and source original text.

| Object | Check | Verification action |
| --- | --- | --- |
| Journal publication license | The license number, journal name, sponsoring organization, validity period, and issue date must be consistent with the annual verification form | Check the time limit and `shareId` in the link configuration, and compare the license number and the journal name on the verification form item by item |
| Annual verification form | The verification year, journal name, sponsoring organization, signature, and receipt date must be consistent with the license | Check the values, verify whether the verification year corresponds to the issue date, and confirm that the signature field has no missing items |
| Rectification report | The rectification items, completion date, responsible person, and receipt must be consistent with the records in the verification form | Access once with an unauthenticated session, and check the rectification report's quoted display items and receipt signature status |
| Share link configuration | The expiration time, per-minute access limit, identity verification, and quoted display items are set as needed | Check the `shareId` and expiration time values, and try once with an over-limit request |

## Three common errors

- Symptom: The journal name and date of the same record do not match between the license and the verification form. Cause: The two materials were drafted separately, without field-level comparison and version synchronization.
- Symptom: The rectification report has been updated, but the share link still displays the old version. Cause: The version was not synchronized, and the publishing channel did not regenerate the link or refresh the display parameters.
- Symptom: The annual verification form is missing a signature or receipt, and the handover is returned. Cause: During the handover of responsibility, the signature field and receipt date were not checked, and missing items were not blocked.

## How to verify the setup

Feature acceptance: Access once each with an unauthenticated session and an over-limit request, check the release and quoted display, and confirm the `shareId`, expiration time, and the switch status of quoted snippet and quoted full text.

Business test: Draft one copy according to the template and complete one handover, and see whether missing items are blocked.

- Check the `shareId`, expiration time, per-minute access limit, and identity verification callback address in the link configuration.
- Check the switches for quoted snippet, quoted full text, and source original text download item by item, and compare the journal name, date, and signature between the license and the verification form.
