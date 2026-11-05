---
title: Sharing and Embedding for Research Project Annual Progress and Acceptance: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c060-f003
page_type: 行业问题页
application_area: education
meta_title: Research Progress | Sharing & Embeds | Handover
meta_description: Research Progress: review sharing & embeds for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Research Project Annual Progress and Acceptance: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This category's data covers the drafting of signable documents and the handover of responsibility for annual progress and acceptance of scientific research projects, involving three types of signable documents: annual progress reports, mid-term review materials, and acceptance reports. The material sources are the project team's stage records, test data, and financial vouchers, and the update cadence advances according to quarterly milestones and acceptance windows. The field characteristics center on project name, task number, number of indicators, start and end dates, responsible person's signature, and receipt of acceptance. Annual progress reports focus on the current period's completed volume and the next-stage plan; mid-term review materials emphasize indicator deviations and adjustment explanations; acceptance reports require full-cycle data closure and conclusion signatures. When these three types of materials enter the sharing and embedding feature, the annual progress report serves as the stage display item, the mid-term review materials serve as the deviation explanation item, and the acceptance report serves as the final conclusion item, each taking on the role of being presented externally according to identity, and the handover records flow in sync with the material versions.

## Configuration and implementation checks

This part is executed by the sharing link in the publishing channel (the publishing service performs authentication), outputting the sharing link, display parameters, and authentication results. The signable material drafts and handover records are then completed by external visitors who see the corresponding content according to their identity.

| Object | Check | Verification action |
| --- | --- | --- |
| Annual progress report | The project name, task number, current period's completed volume, start and end dates, responsible person's signature, and receipt of acceptance are complete, and the name, quantity, and date of the same record are consistent with those in the mid-term review materials | After drafting according to the template, check the field list, compare the same entry in the two materials, and check whether the signature and receipt are attached in full |
| Mid-term review materials | The indicator deviation explanation, adjustment basis, version number, and date are consistent, and the responsible person and acceptance column are clear | Retrieve the previous version and the current version and compare them field by field, confirm that items not synced in the version have been corrected, and that places missing signatures are blocked |
| Acceptance report | Full-cycle data closure, conclusion signature, and receipt are complete, and the quoted snippet and full-text display items are visible according to identity | Access once with an unauthenticated session and check the display item toggles; access once with an over-limit request and check the release result |
| Sharing link | The expiration time, per-minute access limit, point limit, identity verification, and quoted display items are set according to usage needs | Check the time limit and values in the link configuration, try once each with an unauthenticated session and an over-limit request, and record the `shareId` |

## Three common errors

- Symptom: The name, quantity, and date of the same record do not match between the annual progress report and the mid-term review materials. Cause: The two materials were drafted separately, no comparison of the same entry was made, and the versions were not synced.
- Symptom: The acceptance report is missing a signature or missing a receipt, and is returned when handed to the next stage. Cause: The handover records were not synced with the material versions, and the acceptance column was not checked item by item.
- Symptom: The link cannot be opened after a period of time, or the full quoted text can be seen without logging in. Cause: The expiration time and identity verification were not set according to usage needs, and the quoted display item toggles were not checked item by item.

## How to verify the setup

Acceptance of this feature: access once each with an unauthenticated session and an over-limit request, check the release and quoted display, and record the expiration time, per-minute access limit, and identity verification callback result corresponding to the `shareId`.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- Check item by item the sharing link's expiration time, per-minute access limit, point limit, identity verification, and the quoted snippet, quoted full text, and source original text display items, and record the `shareId`.
- Draft the annual progress report, mid-term review materials, and acceptance report according to the template, compare the name, quantity, and date of the same entry, confirm that the signature and receipt are complete, and then hand them to the next stage for acceptance.
