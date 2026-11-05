---
title: Sharing and Embedding for Kindergarten Operations and Quality Self-Assessment: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c006-f003
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Quality | Sharing & Embeds | Handover
meta_description: Kindergarten Quality: review sharing & embeds for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Kindergarten Operations and Quality Self-Assessment: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

Kindergarten operation behavior and quality self-assessment materials come from three types of records: self-assessment reports, issue lists, and rectification plans. The update cadence rolls forward by semester and rectification milestones. Field characteristics center on names, quantities, dates, and signatures: self-assessment reports require all sections to be complete—operating conditions, safety and hygiene, care and education, faculty and staff, and internal management; issue lists require issue descriptions, responsible persons, and rectification deadlines; rectification plans require measures, completion dates, and receipts. When materials enter the sharing and embedding stage, the self-assessment report serves as the main document and is viewed by external visitors according to identity, while the issue list and rectification plan are displayed synchronously as attachments alongside the main document. The three share the same record's names, quantities, and dates; if any field does not match, it is treated as a missing item.

## Configuration and implementation checks

This step is executed by the share link in the publishing channel (the publishing service performs authentication), outputting the share link, display parameters, and authentication results. "Draft materials and handover records that can be issued" are then completed by external visitors who see the corresponding content according to identity. The link can be configured with an expiration time, per-minute access limit, credit limit, identity verification, and display items for quoted snippets, quoted full text, and source original text.

| Object | Check | Verification action |
| --- | --- | --- |
| Self-assessment report | Fields in all sections—operating conditions, safety and hygiene, care and education, faculty and staff, and internal management—are complete, and dates and signatures are consistent | Check fields section by section, access once with an unauthenticated session, and confirm that quoted snippets and quoted full text are released according to identity |
| Issue list | Issue description, responsible person, and rectification deadline are complete, and the names and quantities of the same record match across both materials | Check names and quantities against the self-assessment report, and check whether versions and dates are synchronized |
| Rectification plan | Measures, completion date, and receipt are complete, and the responsible person is clear | Check signatures and receipts, and confirm the values of the share link's expiration time and per-minute access limit |
| Share link | Expiration time, per-minute access limit, credit limit, identity verification, and quoted display items are set according to usage needs | Check the time limit and values in the link configuration, try once with an over-limit request, and confirm the authentication result of the link corresponding to `shareId` |

## Three common errors

- Symptom: The names, quantities, or dates of the same record do not match between the self-assessment report and the issue list. Cause: The two materials were drafted separately and did not share the same field source.
- Symptom: The rectification plan version was changed, but the quoted full text in the share link is still the old version. Cause: The version was not synchronized, and the publishing channel did not regenerate display items when the materials were updated.
- Symptom: The handover record lacks a signature or receipt, yet the link has already been released. Cause: The responsibility handover did not complete sign-off, and the share link's expiration time and identity verification were not tightened according to the stage.

## How to verify the setup

Acceptance for this feature: access once each with an unauthenticated session and an over-limit request, check release and quoted display, confirm the switch status of quoted snippets, quoted full text, and source original text, and record the authentication result of the link corresponding to `shareId`.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- Check the expiration time, per-minute access limit, credit limit, and identity verification callback address in the link configuration
- Check the display switches for quoted snippets, quoted full text, and source original text item by item, and record `shareId` and the authentication result
