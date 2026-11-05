---
title: Sharing and Embedding for Undergraduate Program Establishment and Adjustment: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c017-f003
page_type: 行业问题页
application_area: education
meta_title: Undergraduate Programs | Sharing & Embeds | Access
meta_description: Undergraduate Programs: review sharing & embeds for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Undergraduate Program Establishment and Adjustment: Manage Authorized Access and External Services

## What this category's data looks like

This category's data covers three types of materials: program setup application forms, talent cultivation plans, and expert review opinions. The program setup application form records the program name, code, duration of study, and application date; the talent cultivation plan sets out the curriculum system, credits and credit hours, and cultivation objectives; the expert review opinions include the review date, expert signatures, and receipts. Materials are updated by academic year or application batch, and the field characteristics are that the name, quantity, and date of the same program in different materials must be aligned item by item. When entering the sharing and embedding function, the program setup application form serves as the entry material carrying application information, the talent cultivation plan serves as the process material displaying the curriculum and credit structure, and the expert review opinions serve as the conclusion material providing the basis for signatures and receipts; together, the three form the content basis for external authorized access and display.

## Configuration and implementation checks

This step is performed by the sharing link in the publishing channel (the publishing service performs authentication), and outputs the sharing link, display parameters, and authentication result. "The externally available entry and authorization scope" is then completed by external visitors seeing the corresponding content according to their identity. The sharing link can be configured with an expiration time, a per-minute access limit, a points limit, identity verification, and display items for quoted snippets, quoted full text, and source original text; the quote display items only control snippets and full text, while the file visibility scope is determined by file permissions.

| Object | Check | Verification action |
| --- | --- | --- |
| Program setup application form | The name, quantity, date, and signature must be aligned item by item with the talent cultivation plan and expert review opinions, and the same record must not be inconsistent in two places | Check the program name, code, duration of study, and application date fields, and check whether signatures and receipts are complete |
| Talent cultivation plan | The curriculum system, credits and credit hours, and cultivation objectives must be consistent with the program setup application form, and versions should be synchronized | Check the number of courses, total credits, and wording of cultivation objectives, and check whether the version number and date are synchronized |
| Expert review opinions | The review date, expert signatures, and receipts must be consistent with the corresponding records in the program setup application form and talent cultivation plan | Check the review date and expert signatures, and check whether receipts are missing |
| Sharing link | The expiration time, per-minute access limit, points limit, identity verification, and quote display items are set according to usage needs | Check the time limit and values in the link configuration, try once with an over-limit request, access once with an unauthenticated session, and record the `shareId` |

## Three common errors

- Symptom: the name, quantity, or date of the same program does not match between the program setup application form and the talent cultivation plan. Cause: the two materials are filled in separately, and cross-checking is not done before entering the sharing and embedding process.
- Symptom: the expert review opinions lack signatures or receipts, but the link can still be opened. Cause: material versions are not synchronized, signatures and receipts are not updated with the latest version, and item-by-item checking is not done before publishing.
- Symptom: the quoted full text can be seen without logging in, or the link cannot be opened after a period of time. Cause: the identity verification callback is not enabled, and the expiration time and quote display items are not set according to usage needs.

## How to verify the setup

Acceptance of this function: access once each with an unauthenticated session and an over-limit request, check the allowance and quote display, record the `shareId`, and check item by item the expiration time, per-minute access limit, points limit, identity verification, and the display items for quoted snippets, quoted full text, and source original text.

Business test: access once with a restricted identity, see whether the visible scope matches the setting, and ensure unauthorized content is not visible.

- Check the expiration time, per-minute access limit, points limit, and identity verification callback address in the link configuration, and try once with an over-limit request.
- Check item by item the switch status of the display items for quoted snippets, quoted full text, and source original text, access once with an unauthenticated session, and record the `shareId`.
