---
title: Sharing and Embedding for Research Project Annual Progress and Acceptance: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c060-f003
page_type: 行业问题页
application_area: education
meta_title: Research Progress | Sharing & Embeds | Access
meta_description: Research Progress: review sharing & embeds for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Research Project Annual Progress and Acceptance: Manage Authorized Access and External Services

## What this category's data looks like

This page focuses on annual progress and acceptance materials for research projects, covering three types: annual progress reports, mid-term review materials, and acceptance reports. Annual progress reports are submitted on an annual cycle, recording the completion of phase objectives and the use of funds; mid-term review materials are formed during the mid-execution of the project, focusing on milestone nodes and adjustment explanations; acceptance reports summarize all outcomes, indicators, and signatures at project completion. The fields of the three types of materials include project name, responsible person, start and end dates, task indicators, number of outcomes, funding amount, signatures, and receipts. When materials enter the sharing and embedding function, annual progress reports serve as process records for phased review, mid-term review materials serve as node evidence for comparison, and acceptance reports serve as final conclusions for archiving and reporting. The update rhythm advances with the project cycle, and versions are prone to inconsistencies in names, quantities, and dates, requiring visibility to be restricted by identity in authorized access and external services.

## Configuration and implementation checks

This part is executed by the sharing link in the publishing channel (the publishing service performs authentication), outputting the sharing link, display parameters, and authentication results. The externally available entry points and authorization scope are then completed by external visitors seeing the corresponding content according to their identity. The sharing link can be configured with expiration time, per-minute access limit, point limit, identity verification, and display items for quoted snippets, quoted full text, and source original text.

| Object | Check | Verification action |
| --- | --- | --- |
| Annual progress report | Check the project name, responsible person, start and end dates, and task indicators on an annual cycle, and compare item by item with the mid-term review materials and acceptance report | Check the expiration time and per-minute access limit in the link configuration, and open the sharing link with a restricted identity to view the report fields |
| Mid-term review materials | Check the milestone nodes, adjustment explanations, and signature receipts, and confirm consistency with the quantities and dates in the annual progress report and acceptance report | Check item by item the display switches for quoted snippets, quoted full text, and source original text, and record the number of array entries and the `quoteMaxToken` budget |
| Acceptance report | Check the completion outcomes, indicator completion status, funding amount, and signature receipts, and confirm version synchronization with the annual progress report and mid-term review materials | Access once with an unauthenticated session to verify whether the identity verification callback allows passage; try once with an over-limit request against the per-minute access limit |
| Sharing link | Match by visitor identity and visible scope; unauthorized access must not be visible; `shareId` is used to locate the specific link | Check the link configuration corresponding to `shareId`, and confirm that the expiration time, point limit, and display items meet the requirements of external services |

## Three common errors

- Phenomenon: The number of outcomes for the same project does not match between the annual progress report and the acceptance report. Cause: The two materials were filled in separately, versions were not synchronized, and unified verification was lacking.
- Phenomenon: The project name and start and end dates are inconsistent between the mid-term review materials and the acceptance report. Cause: After project adjustments, only one material was updated, and the other was not revised accordingly.
- Phenomenon: The acceptance report lacks a signature or receipt, yet the sharing link can still be opened. Cause: The signature process was not completed, and the link configuration was not tightened according to the material status.

## How to verify the setup

Acceptance of this function: Access once each with an unauthenticated session and an over-limit request, and check passage and citation display; check item by item the expiration time, per-minute access limit, identity verification callback, quoted snippet and quoted full text switches, record the number of array entries and the `quoteMaxToken` budget, and confirm that the link corresponding to `shareId` outputs correctly.

Business test: Access once with a restricted identity to see whether the visible scope matches the settings.

- Check the expiration time and per-minute access limit in the link configuration, and try once with an over-limit request.
- Access once with an unauthenticated session to verify whether the identity verification callback and citation display items allow passage as configured.
