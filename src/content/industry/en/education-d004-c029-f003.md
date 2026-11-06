---
title: Sharing and Embedding for Vocational College Curriculum Planning: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c029-f003
page_type: 行业问题页
application_area: education
meta_title: Vocational Curricula | Sharing & Embeds | Handover
meta_description: Vocational Curricula: review sharing & embeds for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Vocational College Curriculum Planning: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This category's data looks like
Talent cultivation program development in vocational colleges involves three types of materials: talent cultivation programs, course standards, and job competency analysis tables. The sources are the academic affairs office and the professional teaching and research offices, and the update cadence follows academic years and program adjustments. The talent cultivation program carries the training objectives, program length, and course structure; the course standard corresponds to the class hours, assessment, and content requirements of a single course; the job competency analysis table records job tasks, competency items, and corresponding courses. When these three types of materials enter the sharing and embedding stage, each plays a different role: the talent cultivation program is cited as the main document, the course standard is checked item by item as an attachment, and the job competency analysis table is spot-checked as supporting evidence. Field characteristics center on names, quantities, dates, and signatures: the name and class hours of the same course in the program and the standard must be consistent, the number of job competency items and the number of courses covered must match, the version number and issue date must be synchronized, and the handover record must include the transferor, the receiver, and the receipt. After drafting is completed, the materials enter the publishing channel to generate a sharing link, are viewed by external visitors according to identity, and then go through sign-off.

## Configuration and implementation checks

This step is executed by the sharing link in the publishing channel (the publishing service performs authentication), and outputs the sharing link, display parameters, and authentication results. The material drafts that can be issued and the handover records are then completed by external visitors who see the corresponding content according to identity. The sharing link can be configured with an expiration time, a per-minute access limit, a points limit, identity verification, and display items for quoted snippets, quoted full text, and source original text.

| Object | Check | Verification action |
| --- | --- | --- |
| Talent cultivation program | Names, quantities, dates, and signatures are complete, and each item is consistent with the course standards and job competency analysis table | Check the course names and class hours in the program, compare them with the same-named entries in the course standards, check whether the issue date and version number are synchronized, and confirm the signatures of the transferor and receiver and the receipt |
| Course standard | Course name, class hours, and assessment method are consistent with the corresponding entries in the talent cultivation program | Check the course name and class hours item by item, check the version number and issue date, and confirm the receiver's signature and receipt in the handover record |
| Job competency analysis table | The number of job competency items is consistent with the number of corresponding courses covered, and dates and signatures are complete | Check the number of competency items and the number of courses covered, check the version and date, and confirm the signatures and receipt |
| Sharing link | Expiration time, per-minute access limit, identity verification, and quoted display items are set according to usage needs | Check the time limit and values in the link configuration, try once with an over-limit request, access once with an unauthenticated session, check the switch status of quoted snippets, quoted full text, and source original text item by item, and record `shareId` |

## Three common errors

- Symptom: the name and class hours of the same course in the talent cultivation program and the course standard do not match. Cause: the two materials were drafted separately, no field-level comparison was made, and the version and date were not synchronized.
- Symptom: the number of competency items in the job competency analysis table is inconsistent with the number covered by the course standard. Cause: after competency items were adjusted, they were not written back to the course standard, resulting in deviations in quantity and date.
- Symptom: the handover record lacks a signature or receipt, and the link cannot be opened after expiration. Cause: the transfer and receipt steps were not closed-loop, and the expiration time and identity verification were not set according to usage needs.

## How to verify the setup

Acceptance for this feature: access once each with an unauthenticated session and an over-limit request, check the allow decision and quoted display, and record the expiration time, per-minute access limit, identity verification callback, and the switch status of quoted snippets, quoted full text, and source original text corresponding to `shareId`.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the link configuration, check the expiration time and per-minute access limit, try once with an over-limit request, and confirm that rate limiting takes effect.
- Access once with an unauthenticated session, check the identity verification callback and quoted display items, and check the switch status of quoted snippets, quoted full text, and source original text item by item.
