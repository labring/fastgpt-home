---
title: Sharing and Embedding for Research Ethics Review: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c062-f003
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Sharing & Embeds | Access
meta_description: Research Ethics: review sharing & embeds for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Research Ethics Review: Manage Authorized Access and External Services

## What this category's data looks like

This page addresses the research ethics review scenario and aggregates three types of materials: ethics review applications, informed consent form templates, and risk assessment forms. The materials come from the daily intake and archiving of institutional ethics committees and research management departments; the update cadence advances with project intake batches, and the field characteristics center on project name, number of subjects, review date, and signature fields. When entering the sharing and embedding feature, the ethics review application serves as the primary record, used to present review conclusions and authorization scope externally; the informed consent form template serves as attachment material and enters the visibility scope settings together with the application; the risk assessment form serves as process material, and whether it is displayed is determined by identity. The names, quantities, and dates of the three materials in the same record must remain consistent, and versions and signature receipts must be synchronized; otherwise the external entry point will expose inconsistent information.

## Configuration and implementation checks

The share link in the publishing channel (the publishing service performs authentication) outputs only the share link, display parameters, and authentication results; the externally available entry point and authorization scope must then be handled so that external visitors see the corresponding content according to identity. The share link can be configured with an expiration time, per-minute access limit, credit limit, identity verification, and display items for quoted snippets, quoted full text, and source original text.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | The project name, number of subjects, review date, and signature fields must be consistent with the informed consent form template and the risk assessment form | In the link configuration, check the time limit and display items, and use `shareId` to locate the link, then compare the names, quantities, and dates of the three materials item by item |
| Informed consent form template | The version number and signature receipt must be synchronized with the records in the ethics review application | Access once with an unauthenticated session, and check whether the quoted snippet and quoted full text of this template are displayed according to the switch state |
| Risk assessment form | The risk assessment date and signature fields must match those of the ethics review application and the informed consent form template | Try once with an over-limit request, check whether the per-minute access limit takes effect, and confirm that this form is not visible beyond authorization |
| Share link | The expiration time, per-minute access limit, credit limit, and identity verification are set according to usage needs | In the link configuration, check the time limit and values, and access once with an unauthenticated session to check the admission result |

## Three common errors

- Symptom: the names, quantities, and dates of the same record do not match across two materials. Cause: the ethics review application and the informed consent form template are maintained separately, without field synchronization.
- Symptom: the link cannot be opened after a period of time. Cause: the expiration time has passed, and the publishing service denies access according to the settings.
- Symptom: the quoted full text can be seen even without logging in. Cause: the identity verification callback is not connected, and the quoted display item switch is not differentiated by identity.

## How to verify the setup

This feature acceptance: access once each with an unauthenticated session and an over-limit request, check admission and quoted display, and use `shareId` to locate the link and check the expiration time, per-minute access limit, and identity verification callback address.

Business test: access once with a restricted identity, see whether the visibility scope matches the settings, and check whether the fields, dates, and signatures of the ethics review application, informed consent form template, and risk assessment form are consistent.

- In the link configuration, check the expiration time, per-minute access limit, credit limit, and identity verification callback address, and use `shareId` to record the link.
- Check the switch states of the display items for quoted snippets, quoted full text, and source original text item by item, and confirm that the visibility scope is determined by file permissions.
