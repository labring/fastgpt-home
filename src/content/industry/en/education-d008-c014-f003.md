---
title: Sharing and Embedding for School Moral Education and Class Teacher Work: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c014-f003
page_type: 行业问题页
application_area: education
meta_title: Pastoral Education | Sharing & Embeds | Access
meta_description: Pastoral Education: review sharing & embeds for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for School Moral Education and Class Teacher Work: Manage Authorized Access and External Services

## What this category's data looks like

School moral education and homeroom teacher work materials include themed class meeting plans, student comprehensive quality records, and home visit records. Themed class meeting plans have fields for activity objectives, preparation, process, and reflection, along with date, homeroom teacher signature, and parent receipt; student comprehensive quality records contain dimensions such as ideological and moral character, academic level, physical and mental health, artistic literacy, and social practice, each with observation points, grades, dates, and teacher signatures; home visit records contain home visit time, location, subject, purpose, process, parent opinions, and signatures of both parties. Materials are updated weekly or monthly and summarized at the end of the semester. When entering the sharing and embedding function, themed class meeting plans serve as externally displayed samples, comprehensive quality records serve as the subject of restricted viewing, and home visit records serve as attachments requiring receipt confirmation.

## Configuration and implementation checks

This step is executed by the sharing link in the publishing channel (the publishing service performs authentication), outputting the sharing link, display parameters, and authentication results. The externally accessible entry points and authorization scope must be seen by external visitors according to their identity before they can proceed to complete the corresponding content.

| Object | Check | Verification action |
| --- | --- | --- |
| Themed class meeting plan | The name, quantity, date, and signature are consistent between the plan and the summary table; if the signature or receipt is missing, it cannot be made external | Check the plan date, homeroom teacher signature, and parent receipt, and compare them item by item against the summary table |
| Student comprehensive quality record | The name, quantity, and date of the same record match between the class register and the submitted materials, and the versions are synchronized | Access with a restricted identity and check whether the visible scope and record version are consistent |
| Home visit record | The home visit time, subject, parent opinions, and signatures are complete, and the receipt is not missing | Check the receipt and signatures, and verify whether the dates in the two places are consistent |
| Sharing link | The expiration time, per-minute access limit, identity verification, and referenced display items are as configured | Access once each with an unauthenticated session and an over-limit request, and check the release and referenced display of the link corresponding to `shareId` |

## Three common errors

- Phenomenon: The name and date of the same student do not match between the comprehensive quality record and the home visit record. Cause: The two materials are entered separately, without version synchronization and cross-checking.
- Phenomenon: A themed class meeting plan is still displayed externally when it lacks a parent receipt or homeroom teacher signature. Cause: Receipts and signatures are not included in the pre-publication checklist.
- Phenomenon: An unauthenticated session can see the full referenced text. Cause: The referenced display item switch is confused with file permissions, and the authentication callback does not take effect.

## How to verify the setup

This function's acceptance: Access once each with an unauthenticated session and an over-limit request, and check the release and referenced display of the link corresponding to `shareId`.

Business test: Access once with a restricted identity and see whether the visible scope matches the configuration.

- In the link configuration, check the expiration time, per-minute access limit, identity verification callback, and referenced display item switch
- Access once with an unauthenticated session, and confirm that the referenced snippet, full text, and source original text are displayed according to the switch
