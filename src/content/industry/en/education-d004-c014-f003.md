---
title: Sharing and Embedding for School Moral Education and Class Teacher Work: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c014-f003
page_type: 行业问题页
application_area: education
meta_title: Pastoral Education | Sharing & Embeds | Handover
meta_description: Pastoral Education: review sharing & embeds for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for School Moral Education and Class Teacher Work: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses the school moral education and homeroom teacher work scenario. Material sources include themed class meeting plans, student comprehensive quality records, and home visit records. The update cadence is triggered by semester milestones and daily events, and the field characteristics center on name, quantity, date, signature, and receipt. When themed class meeting plans enter sharing and embedding, they serve as the draft for activity objectives, process, and approval; student comprehensive quality records serve as the aggregation of semester evaluation and factual basis; home visit records serve as the original evidence of home-school communication. During drafting, all three types of materials require complete fields, clear responsible persons, and consistent version and date, after which they enter the handover stage and are signed for by the next stage. Sharing and embedding are used to present finalized materials to external visitors by identity, but the citation display items only control the display of snippets, full text, and source original text, and do not change the file visibility scope.

## Configuration and implementation checks

This step is executed by the share link in the publishing channel (the publishing service performs authentication), and outputs the share link, display parameters, and authentication result. "Issuable material drafts and handover records" are then completed by external visitors who see the corresponding content by identity.

| Object | Check | Verification action |
| --- | --- | --- |
| Themed class meeting plan | Name, quantity, date, and signature are complete, and version matches the handover receipt | In the link configuration, check the expiration time and per-minute access limit, check the citation display item switches one by one, and record `shareId` |
| Student comprehensive quality record | The name, quantity, and date of the same record match across different materials | Access once with an unauthenticated session, and check whether the citation snippet, citation full text, and source original text download are allowed by identity |
| Home visit record | No missing signature or receipt items; when the version is not synchronized, the latest issued version prevails | Draft one according to the template and complete one handover, check whether missing items are blocked, and record `shareId` |
| Share link | Expiration time, per-minute access limit, identity verification, and citation display items are set according to usage needs | Check the values and try once with an over-limit request, confirm the authentication callback and the allow result, and record `shareId` |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match in two materials. Cause: During drafting, the unified field template was not checked, and item-by-item comparison was missing before handover.
- Symptom: The version is not synchronized, and the old draft and the new draft circulate at the same time. Cause: After issuance, the version identifier was not updated, and the share link still points to the old content.
- Symptom: Signature or receipt is missing, and the next stage cannot sign for it. Cause: The handover record did not set required fields, and the responsible person and date fields were left blank.

## How to verify the setup

This feature acceptance: Access once each with an unauthenticated session and an over-limit request, and check the allow result and citation display; check the expiration time, per-minute access limit, identity verification, and citation display items, and record `shareId`.

Business test: Draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the link configuration, check the expiration time, per-minute access limit, credit limit, and identity verification callback address, and check the citation snippet, citation full text, and source original text download switches one by one.
- Draft one themed class meeting plan according to the template and complete one handover, and check whether the name, quantity, date, signature, and receipt are complete and whether missing items are blocked.
