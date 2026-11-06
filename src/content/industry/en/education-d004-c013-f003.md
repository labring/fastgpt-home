---
title: Sharing and Embedding for School Teacher Training Credits: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c013-f003
page_type: 行业问题页
application_area: education
meta_title: Teacher Credits | Sharing & Embeds | Handover
meta_description: Teacher Credits: review sharing & embeds for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for School Teacher Training Credits: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses material drafting and responsibility handover in credit management for primary and secondary school teacher training, involving three types of materials: training notices, credit recognition forms, and participant rosters. Training notices come from the training organizing department and are issued with each batch; their fields include training name, start and end dates, credit hours, and target participants. Credit recognition forms come from the assessment stage and record credits and recognition conclusions by person and by subject. Participant rosters come from registration and sign-in summaries and include name, unit, ID document identifier, and attendance status. The three types of materials update at different rhythms: notices adjust with each batch, rosters are supplemented with sign-ins, and recognition forms are rolled back with reviews. When materials enter the sharing and embedding stage, the notice assumes the basis role, the roster assumes the verification role, and the recognition form assumes the result role; the three are aligned by the same batch and same version for sign-off in the next stage.

## Configuration and implementation checks

This step is executed by the sharing link in the publishing channel (the publishing service performs authentication), outputting the sharing link, display parameters, and authentication result. The material drafts that can be issued and the handover records are completed by external visitors according to their identity seeing the corresponding content.

| Object | Check | Verification action |
| --- | --- | --- |
| Training notice | Training name, start and end dates, credit hours, and target participants are complete; signatures and receipts are complete | Check the notice fields item by item against the template, and compare the dates and number of people with the roster of the same batch |
| Credit recognition form | Name, unit, subject, credits, and recognition conclusion are consistent with the participant roster | Extract several records and check whether the names, quantities, and dates in the recognition form and the roster match |
| Participant roster | Sign-in status and attendance records are complete; version number and date are synchronized | Check the roster version and date, and confirm that signatures and receipts are not missing |
| Sharing link | Expiration time, per-minute access limit, identity verification, and citation display items are configured as needed | Check the time limit and values in the link configuration, test once each with an unauthenticated session and an over-limit request, and record `shareId` |

## Three common errors

- Phenomenon: The same teacher's name or unit is written inconsistently in the notice and the recognition form. Cause: The two materials were drafted separately, were not aligned by the same batch version, and were not compared field by field during handover.
- Phenomenon: The roster has been supplemented with sign-ins, but the recognition form is still issued according to the old version. Cause: The version was not synchronized, the handover record did not indicate the version number and date, and the next stage signed off according to the old draft.
- Phenomenon: The handover record lacks a signature or receipt, but the materials have already circulated. Cause: The sign-off stage did not enforce verification of the signature and receipt fields, and missing items were not blocked.

## How to verify the setup

This feature acceptance: access once each with an unauthenticated session and an over-limit request, check the release and citation display, and record `shareId`.

Business test: draft one copy according to the template and complete one handover, and see whether missing items are blocked.

- Check the expiration time, per-minute access limit, identity verification, and citation display items item by item, and record `shareId`.
- Draft the training notice, credit recognition form, and participant roster according to the template, check the names, quantities, dates, and signatures, and then complete one handover.
