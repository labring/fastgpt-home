---
title: Sharing and Embedding for Kindergarten Safety and Emergency Drills: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c005-f003
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Safety | Sharing & Embeds | Handover
meta_description: Kindergarten Safety: review sharing & embeds for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Kindergarten Safety and Emergency Drills: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page is intended for kindergarten safety protection and emergency drill scenarios, capturing signable material drafts and handover records, covering four types of fields: hazard items and rectification deadlines, drill headcount and sign-in, access control and school bus check items, and responsible person signature. The material sources are the kindergarten's daily inspections, drill plans, and access control and school bus ledgers, and the update cadence rolls with the drill cycle and rectification deadlines. When entering the sharing and embedding feature, the material draft takes the role of the accessed object, the handover record takes the role of the verification object for version and date consistency, and the share link takes the role of the publishing and authentication entry point. The field characteristics require the hazard closed-loop status, the correspondence between drill headcount and sign-in headcount, each check item being placed one by one, and the responsible person signature being traceable.

## Configuration and implementation checks

This step is executed by the share link in the publishing channel (the publishing service performs authentication), outputting the share link, display parameters, and authentication result. The signable material drafts and handover records are then completed by external visitors seeing the corresponding content according to their identity.

| Object | Check | Verification action |
| --- | --- | --- |
| Signable material draft | Whether hazard items and rectification deadlines are closed loop one by one, and whether the responsible person signature is consistent with the version date | After drafting by template, check whether missing items are blocked, and record the display parameters corresponding to `shareId` |
| Handover record | Whether drill headcount and sign-in correspond to the plan, and whether access control and school bus check items are missing | Complete one handover sign-off, and verify the display toggle status of the quoted fragment and the quoted full text |
| Share link | Whether the expiration time and per-minute access limit match the expected access volume | Access once with an unauthenticated session, and try once with an over-limit request, then verify the pass result and authentication callback |

## Three common errors

- Symptom: the hazard record remains in the registered state, and no closed loop is seen even after the rectification deadline has passed. Cause: the material draft lacks the rectification deadline field and the responsible person signature, and the handover was not checked by dimension.
- Symptom: the recorded drill headcount does not match the plan setting, and the sign-in sheet does not correspond to the drill subjects. Cause: the plan version and the record version were not synchronized, and the handover record did not lock the version and date.
- Symptom: access control and school bus check items are missing, and access is rate-limited or the link cannot be opened after a period of time. Cause: the check items were not placed one by one, and the time limit and access limit configured for the link were not checked as needed.

## How to verify the setup

This feature acceptance: access once each with an unauthenticated session and an over-limit request, verify the pass and quoted display, and check the expiration time, per-minute access limit, and identity verification callback corresponding to `shareId`.

Business test: draft one by template and complete one handover, and see whether missing items are blocked.

- Check the display toggle status of the quoted fragment, quoted full text, and source original text item by item, and record the tokens and array count of the quoted text.
- Check the expiration time and per-minute access limit values in the link configuration, try once with an over-limit request, and confirm the authentication result and pass scope.
