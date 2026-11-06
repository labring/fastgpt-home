---
title: Sharing and Embedding for Undergraduate Curriculum Planning: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c018-f003
page_type: 行业问题页
application_area: education
meta_title: Program Revision | Sharing & Embeds | Handover
meta_description: Program Revision: review sharing & embeds for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Undergraduate Curriculum Planning: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page centers on undergraduate program revision; the materials include the program plan, course syllabi, and the credit structure table. The sources are drafting records from academic affairs and departments, and the update cadence advances with revision batches. When entering the sharing and embedding feature, the program plan serves as the master outline, the course syllabi serve as the course-level basis, and the credit structure table serves as the basis for verifying quantities and structure. Field characteristics center on course name, credit count, revision date, and signature field; the version number and receipt must match the issuance date. After the materials enter this feature, the publishing channel generates a share link, external visitors view the corresponding content according to their identity, and sign-off and responsibility handover are completed.

## Configuration and implementation checks

This step is executed by the share link in the publishing channel (the publishing service performs authentication), outputting the share link, display parameters, and authentication results. "Issuable material drafts and handover records" are then completed by external visitors viewing the corresponding content according to their identity. The share link can be configured with an expiration time, per-minute access limit, credit limit, identity verification, and display items for quoted snippets, full quotes, and source originals.

| Object | Check | Verification action |
| --- | --- | --- |
| Program plan | Course name, credit count, revision date, and signature field must match the course syllabi and credit structure table item by item | Check the time limit in the link configuration, access once with an unauthenticated session, and verify the display items corresponding to `shareId` |
| Course syllabi | If the name, count, or date of the same course does not match across the two materials, it must not be issued | Check item by item the toggle status of quoted snippets, full quotes, and source originals, and record the number of array entries |
| Credit structure table | Version and date must match; if the signature or receipt is missing, it must not proceed to the next step | Try the per-minute access limit once with an over-limit request, and verify the allow result and receipt fields |
| Handover record | The responsible person is clear, the sign-off date corresponds to the version number, and the receipt is complete | Draft according to the template and complete one handover, and verify whether missing items are blocked |

## Three common errors

- Symptom: the link cannot be opened after some time. Cause: the expiration time was set according to usage needs, and the time limit was not checked in the link configuration.
- Symptom: the full quote can be seen without logging in. Cause: the toggle status of quote display items was not checked item by item, and the identity verification callback did not take effect.
- Symptom: the same course name, count, and date do not match across the two materials. Cause: versions were not synchronized, or the signature or receipt is missing.

## How to verify the setup

Feature acceptance: access once each with an unauthenticated session and an over-limit request, and verify the allow result and quote display; check the expiration time, per-minute access limit, identity verification, and quote display items corresponding to the link for `shareId`.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- Check the expiration time and per-minute access limit in the link configuration, and try once with an over-limit request.
- Check item by item the toggle status of quoted snippets, full quotes, and source originals, and record the quoted text tokens and the number of array entries.
