---
title: Sharing and Embedding for Off-Campus Training Registration and Compliance: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c045-f003
page_type: 行业问题页
application_area: education
meta_title: Training Compliance | Sharing & Embeds | Handover
meta_description: Training Compliance: review sharing & embeds for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Off-Campus Training Registration and Compliance: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses off-campus training compliance filing and penalty response scenarios. Materials include three categories: school operating licenses, course filing materials, and fee disclosure. School operating licenses are issued by the approving authority, course filing materials are compiled by teaching research and academic affairs, and fee disclosure is verified by finance and school administration. The update cadence is triggered by filing batches, course adjustments, and fee changes. When materials enter the sharing feature, the school operating license is displayed as the entity qualification, course filing materials are displayed as the course list, and fee disclosure is displayed as pricing and refund rules. Field characteristics center on names, quantities, dates, and signatures: the same course name must be consistent between filing materials and fee disclosure, class hours must correspond to fee amounts, effective dates must align with disclosure dates, and responsible person signatures and receipt numbers must be complete. After materials enter the publishing channel, the share link is only responsible for display and authentication, and does not change file permissions.

## Configuration and implementation checks

This step is executed by the share link in the publishing channel (the publishing service performs authentication), outputting the share link, display parameters, and authentication results. Signable material drafts and handover records are completed by external visitors according to their identity. The share link can be configured with expiration time, per-minute access limit, credit limit, identity verification, and display items for quoted snippets, quoted full text, and source original text.

| Object | Check | Verification action |
| --- | --- | --- |
| School operating license | Check whether the license number, issuance date, and signature are consistent with the filing form | Check the time limit in the link configuration, and try once with an over-limit request, recording the `shareId` |
| Course filing materials | Check whether the course name, class hours, and effective date are consistent with the fee disclosure | Access once with an unauthenticated session, and check item by item the toggle status of quoted snippets, quoted full text, and source original text |
| Fee disclosure | Check whether the fee items, refund rules, and disclosure date are consistent with the course filing materials | Check the identity verification callback address, and confirm that an unauthenticated session cannot view the quoted full text |
| Handover record | Check whether the responsible person signature, receipt number, and version date are complete | Draft one according to the template and complete one handover, and see whether missing items are blocked |

## Three common errors

- Symptom: The same course's name and class hours do not match between the filing materials and the fee disclosure. Cause: The two materials were drafted separately, without cross-checking and version synchronization.
- Symptom: The effective dates of the school operating license and course filing materials are inconsistent, and signatures or receipts are missing. Cause: The handover step did not sign off item by item according to the template, and versions were not synchronized.
- Symptom: The link cannot be opened after a period of time, or the quoted full text can be seen without logging in. Cause: The expiration time and identity verification were not set according to usage needs, and the quote display items were not checked item by item.

## How to verify the setup

Feature acceptance: Access once each with an unauthenticated session and an over-limit request, check the allow/deny behavior and quote display, record the `shareId`, and confirm that the number of quotes and `quoteMaxToken` are not compared for equality.

Business test: Draft one according to the template and complete one handover, and see whether missing items are blocked.

- Check the expiration time, per-minute access limit, credit limit, and identity verification callback address in the link configuration.
- Check item by item the toggle status of quoted snippets, quoted full text, and source original text, and confirm that the file visibility scope is determined by file permissions.
