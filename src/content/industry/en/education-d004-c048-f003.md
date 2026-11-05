---
title: Sharing and Embedding for Sino-Foreign Education Establishment and Annual Reports: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c048-f003
page_type: 行业问题页
application_area: education
meta_title: Joint Education | Sharing & Embeds | Handover
meta_description: Joint Education: review sharing & embeds for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Sino-Foreign Education Establishment and Annual Reports: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This category covers the drafting of materials and the handover of responsibilities for the establishment and annual reporting of Chinese-foreign cooperatively run educational institutions, involving three types of texts: the establishment application, the cooperation agreement, and the articles of association. The establishment application lists, by approval field, the institution name, educational level, program offerings, enrollment scale, and term; the cooperation agreement stipulates each party's capital contribution, management structure, intellectual property, and termination clauses; the articles of association set out the governance mechanism, decision-making procedures, and financial system. The sources of the materials are negotiation and finalization by the cooperating parties, review by the school's legal and finance departments, and revisions based on feedback from the approval authority. The update cadence is synchronized with the application window and the annual reporting cycle, typically rolling on an annual basis or by approval round. Field characteristics center on names, quantities, dates, signatures, and version numbers; if any field is inconsistent between two materials, it constitutes a missing item. When materials enter a share link, the establishment application, cooperation agreement, and articles of association each serve as independent records, and the publishing service decides, based on the identity verification callback, the referenced snippets and full-text scope visible to external visitors, while the file visibility scope is still determined by file permissions.

## Configuration and implementation checks

This step is executed by the share link in the publishing channel (with the publishing service performing authentication), outputting the share link, display parameters, and authentication results. The draftable materials and handover records can be seen by external visitors according to their identity, who then continue to complete the corresponding content. The share link can be configured with an expiration time, a per-minute access limit, a credit limit, identity verification, and display items for referenced snippets, referenced full text, and source original text.

| Object | Check | Verification action |
| --- | --- | --- |
| Establishment application | The name, quantity, date, and signature must be aligned item by item with the cooperation agreement and the articles of association, and the version number must be consistent; a missing signature or receipt is deemed a missing item | Draft one according to the template, check that the fields are complete, then go through a handover sign-off once, and access it once with an unauthenticated session to see whether missing items are blocked |
| Cooperation agreement | The dates and signatures of the capital contribution, management structure, intellectual property, and termination clauses must be consistent with the establishment application, and the name and quantity in the same record must not fail to match | Check the institution name, number of programs, and term dates in the agreement and the application, confirm the versions are synchronized, and retain the receipt |
| Articles of association | The wording of the governance mechanism, decision-making procedures, and financial system must be consistent with the cooperation agreement, and the signature page and version date must be complete | Check the corresponding clauses of the articles of association and the agreement item by item, confirm the signatures and dates are consistent, and then hand it to the next step for sign-off |
| Share link | The expiration time, per-minute access limit, identity verification, and reference display items are set as needed, and `shareId` is used to locate the link configuration | Check the time limit and values, try once with an over-limit request, and access once with an unauthenticated session to verify the admission and reference display |

## Three common errors

- Symptom: the same institution name is written differently in the establishment application and the cooperation agreement. Cause: the two materials were drafted separately, field alignment and version synchronization were not performed, and item-by-item checks were not done at handover.
- Symptom: the enrollment scale or capital contribution amount does not match between the articles of association and the agreement. Cause: the numbers come from different sources, the update cadence is inconsistent, and missing signatures or receipts cause missing items not to be blocked.
- Symptom: the link cannot be opened after some time, or the referenced full text can be seen without logging in. Cause: the expiration time and identity verification were not set as needed, and reference display items were conflated with file permissions.

## How to verify the setup

Acceptance for this feature: access once each with an unauthenticated session and an over-limit request, verify the admission and reference display, and confirm that the expiration time, per-minute access limit, identity verification, and display items for referenced snippets, referenced full text, and source original text of the link corresponding to `shareId` meet expectations.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- Check the name, quantity, date, and signature of the establishment application, cooperation agreement, and articles of association, confirm the versions are synchronized, and retain the receipt.
- Check the expiration time, per-minute access limit, identity verification, and reference display items of the share link, and try once each with an unauthenticated session and an over-limit request.
