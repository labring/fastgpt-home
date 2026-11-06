---
title: Sharing and Embedding for School Mental Health Screening and Referrals: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c015-f003
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Sharing & Embeds | Access
meta_description: Student Mental Health: review sharing & embeds for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for School Mental Health Screening and Referrals: Manage Authorized Access and External Services

## What this category's data looks like

This page addresses the primary and secondary school mental health screening and referral scenario, and the materials include three types: psychological screening plans, interview records, and referral forms. Psychological screening plans are prepared by the school's psychological teacher team on a per-semester basis and contain scale names, screening dates, classes, and numbers of people; interview records are filled in by homeroom teachers or psychological teachers and contain student names, interview dates, interview key points, and signatures; referral forms are issued by psychological teachers and contain the referral target, referral reason, receiving unit, and receipt. When these three types of materials enter the sharing and embedding function, the screening plan serves as the background basis, the interview record serves as the process evidence, and the referral form serves as the credential for external circulation. The update rhythm is centralized revision after each semester's screening, while referral forms are updated in real time with individual cases. In terms of field characteristics, the same student's name, dates, and quantities in the three materials must be consistent, signatures and receipts must not be missing, and versions must be synchronized. This function exposes the above materials externally in the form of a sharing link, allowing parents or superiors to view the corresponding scope according to their identity.

## Configuration and implementation checks

This part is executed by the sharing link in the publishing channel (the publishing service performs authentication), and outputs the sharing link, display parameters, and authentication results. The externally available entry points and authorization scope are then completed by external visitors seeing the corresponding content according to their identity.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | Whether the scale names, screening dates, and class numbers in the plan are consistent with the interview records and referral forms | Check the names, dates, and quantities in the plan against the interview records and referral forms, and check whether signatures and receipts are complete; verify the expiration time and per-minute access limit in the link configuration, and try once with an over-limit request |
| Interview record | Whether the student names, interview dates, and interview key points in the record correspond to the referral form receipt | Compare the names, dates, and quantities in the interview record and referral form item by item, and confirm that signatures are complete; access once with an unauthenticated session, and check the switch status of the snippet, full text, and original text download in the citation display items |
| Referral form | Whether the referral target, referral reason, receiving unit, and receipt in the referral form are consistent with the screening plan and interview record | Check whether the referral form receipt is returned, and check whether the version is synchronized; verify the identity verification callback address in the link configuration, and access once with an unauthenticated session |
| Sharing link | Whether the link's expiration time, per-minute access limit, credit limit, and identity verification are configured as needed | Check the expiration time and per-minute access limit values of the link corresponding to `shareId`, and try once with an over-limit request; check the citation display item switches, and confirm the visible scope of citation snippets, citation full text, and source original text download |

## Three common errors

- Symptom: The same student's name and dates in the screening plan and interview record do not match. Cause: The two materials were filled in by different personnel at different times without cross-checking.
- Symptom: The referral form lacks the receiving unit's receipt or the psychological teacher's signature. Cause: The referral process was not closed-loop, the receipt was not collected, or the signature step was omitted.
- Symptom: The link cannot be opened after a period of time, or the citation full text can be seen without logging in. Cause: The expiration time was not set as needed, identity verification was not integrated, or the citation display item switches were not checked item by item.

## How to verify the setup

This function's acceptance: access once each with an unauthenticated session and an over-limit request, and check the allow/deny behavior and citation display; check the expiration time, per-minute access limit, and identity verification callback of the link corresponding to `shareId`, and confirm item by item the switch status of citation snippets, citation full text, and source original text download.

Business test: access once with a restricted identity and see whether the visible scope matches the setting; compare the names, dates, quantities, and signature receipts in the psychological screening plan, interview record, and referral form, and confirm that versions are synchronized.

- In the link configuration, check the expiration time and per-minute access limit values, and try once with an over-limit request to confirm that access is rate-limited.
- Access once with an unauthenticated session, check whether the identity verification callback takes effect, and check item by item the switch status of citation snippets, citation full text, and source original text download.
