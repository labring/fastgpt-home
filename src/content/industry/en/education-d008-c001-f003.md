---
title: Sharing and Embedding for Daily Kindergarten Care Management: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c001-f003
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Care | Sharing & Embeds | Access
meta_description: Kindergarten Care: review sharing & embeds for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Daily Kindergarten Care Management: Manage Authorized Access and External Services

## What this category's data looks like

Kindergarten childcare daily life management materials include daily life schedules, morning and afternoon check records, and child health observation records. These materials are produced daily, summarized weekly, and archived monthly, with an update rhythm synchronized with the kindergarten schedule. The field characteristics are: the daily life schedule contains activity time periods, segment names, venues, and lead teachers; the morning and afternoon check records contain two columns for morning check and afternoon check, including body temperature, oral cavity, skin, mental state, and handling opinions; the child health observation records contain observation date, observation items, description, handling, and parent receipt. When the materials enter the sharing and embedding function, the daily life schedule assumes the role of external notification, the morning and afternoon check records assume the role of health credentials, and the child health observation records assume the role of individual tracking. Together, the three constitute an authorized access entry point open to parents or superiors.

## Configuration and implementation checks

This part is executed by the sharing link in the publishing channel (the publishing service performs authentication), outputting the sharing link, display parameters, and authentication results. The externally available entry point and authorization scope are then completed by external visitors seeing the corresponding content according to their identity. The sharing link can be configured with expiration time, per-minute access limit, points limit, identity verification, and display items for quoted snippets, quoted full text, and source original text.

| Object | Check | Verification action |
| --- | --- | --- |
| Daily life schedule | The segment names, quantities, and dates in the table must correspond consistently with the morning and afternoon check records and health observation records | Check the segment names, quantities, and dates of the three materials day by day, and confirm that no names or quantities mismatch |
| Morning and afternoon check records | The dates, number of children, and signatures for the morning check and afternoon check must be complete, and must be consistent with the number of children in the schedule for that day | Spot-check the morning and afternoon check records and the schedule for the same date, and verify the number of children, dates, and signature fields |
| Child health observation records | The observation date, handling opinions, and parent receipt must be complete, and the version must be synchronized with the latest record | Check whether the observation record version is the latest, and check whether the receipt and signature are missing |
| Sharing link | The expiration time, per-minute access limit, points limit, and identity verification are set according to usage needs, and the quote display items are toggled as needed | Check the time limit and values in the link configuration, try once with an over-limit request, access once with an unauthenticated session, and verify the release and quote display of the link corresponding to `shareId` |

## Three common errors

- Phenomenon: The names, quantities, and dates of the same record do not match between the schedule and the morning and afternoon check records. Cause: The two materials are maintained separately, and no cross-material verification was performed.
- Phenomenon: The health observation record has been updated, but the sharing link still shows the old version. Cause: The version was not synchronized, and the publishing channel was not republished when the record was updated.
- Phenomenon: The morning and afternoon check records lack signatures or parent receipts. Cause: The record circulation process did not set up completeness checks for signatures and receipts.

## How to verify the setup

Acceptance of this function: Access once each with an unauthenticated session and an over-limit request, verify the release and quote display, and check the expiration time, per-minute access limit, and identity verification callback of the link corresponding to `shareId`.

Business test: Access once with a restricted identity, and see whether the visible scope matches the setting.

- Check the expiration time, per-minute access limit, points limit, and identity verification callback address in the link configuration, and try once with an over-limit request.
- Check the display toggle status of quoted snippets, quoted full text, and source original text item by item, and confirm that the number of quotes and the tokens of the quoted text are recorded separately.
