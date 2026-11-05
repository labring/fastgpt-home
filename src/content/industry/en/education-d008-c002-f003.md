---
title: Sharing and Embedding for Kindergarten Play Activity Organization: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c002-f003
page_type: 行业问题页
application_area: education
meta_title: Kindergarten Play | Sharing & Embeds | Access
meta_description: Kindergarten Play: review sharing & embeds for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Kindergarten Play Activity Organization: Manage Authorized Access and External Services

## What this category's data looks like

The materials for kindergarten game activity organization in authorized access and external services come from observation records, area plans, material placement lists, activity objectives, and reflections converted into next week's plans. These materials are updated weekly, and their field characteristics are area names, material quantities, objective items, observation correspondences, and reflection items. When entering the sharing and embedding function, the correspondence between observation records and area plans serves as the basis for determining the visible scope, material placement quantities serve as one of the display parameters, and activity objective achievement and reflections converted into next week's plans serve as the externally displayed content. The share link in the publishing channel is responsible for packaging the above materials into an entry point, but the visible scope is still determined by file permissions. The referenced display items only control the display of snippets, full text, and source original text, and do not change the file visible scope.

## Configuration and implementation checks

This step is executed by the share link in the publishing channel (the publishing service performs authentication), outputting the share link, display parameters, and authentication results. The externally available entry point and authorization scope are then completed by external visitors seeing the corresponding content according to their identity.

| Object | Check | Verification action |
| --- | --- | --- |
| Correspondence between observation records and area plans | The correspondence is consistent with the visible scope; unauthorized access is not visible | Access once with a restricted identity, and verify the visible area of the link corresponding to `shareId` |
| Material placement quantities | The quantities match the placement items in the area plan | Verify material quantities against plan items one by one, and check whether any items are missing |
| Activity objectives and observation records | Objective items correspond to observed behaviors | Compare objectives and observation records one by one, and mark non-corresponding items |
| Reflections converted into next week's plans | Reflection items have been transferred into next week's plans | Verify whether the reflection items appear in next week's plans |

## Three common errors

- Phenomenon: Parents open the link and cannot see the material placement list. Cause: Material quantities were not updated with the area plan, the correspondence between observation records and area plans is missing, and the visible scope determination fails.
- Phenomenon: Activity objectives do not match observation records. Cause: Objective items were not adjusted according to observation results, reflections were not transferred into next week's plans, and objectives do not match observations.
- Phenomenon: The link cannot be opened after a period of time or access is rate-limited. Cause: The expiration time and per-minute access limit were not set according to usage needs, and unauthenticated sessions can also see the full referenced text.

## How to verify the setup

Acceptance of this function: Access once each with an unauthenticated session and an over-limit request, verify the allowance and referenced display, and verify the display parameters and authentication results of the link corresponding to `shareId`.

Business test: Access once with a restricted identity, and see whether the visible scope matches the settings.

- In the link configuration, verify the expiration time and per-minute access limit, and try once with an over-limit request.
- Verify the toggle states for displaying referenced snippets, referenced full text, and source original text one by one.
