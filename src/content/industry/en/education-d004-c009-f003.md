---
title: Sharing and Embedding for Compulsory Education Dropout Prevention: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c009-f003
page_type: 行业问题页
application_area: education
meta_title: Dropout Prevention | Sharing & Embeds | Handover
meta_description: Dropout Prevention: review sharing & embeds for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Compulsory Education Dropout Prevention: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

Drafting materials and handover of responsibility for compulsory education dropout prevention and control revolve around three types of materials: dropout risk ledgers, persuasion-to-return records, and home visit records. The ledger source is school and township surveys, with fields including student name, class, risk level, guardian, contact information, date, and signature; the persuasion-to-return record source is the persuasion responsible person, with fields including persuasion time, location, participants, result, and signature; the home visit record source is the homeroom teacher and assigned responsible person, with fields including home visit time, target, issues, measures, receipt, and signature. The update rhythm is weekly surveys, monthly summaries, and immediate supplementary entries by event. When materials enter the sharing stage, the ledger assumes the role of verifying the base number, the persuasion-to-return record assumes the role of documenting the process, and the home visit record assumes the role of evidence and receipt; together, the three support a signable draft and handover record.

## Configuration and implementation checks

This step is executed by the sharing link in the publishing channel (the publishing service performs authentication), outputting the sharing link, display parameters, and authentication result. The signable material draft and handover record are completed by external visitors according to their identity seeing the corresponding content.

| Object | Check | Verification action |
| --- | --- | --- |
| Dropout risk ledger | Fields are complete, dates and signatures are consistent, and names and quantities match those in the persuasion-to-return records | Check the ledger fields and signatures, and compare names, quantities, and dates in the persuasion-to-return records one by one |
| Persuasion-to-return record | Persuasion time, participants, result, and signature are complete, and the version is synchronized with the ledger | Check the signature and receipt of the persuasion-to-return record, and check whether the version number is consistent with the ledger date |
| Home visit record | Home visit time, target, measures, receipt, and signature are complete, and correspond to the risk level in the ledger | Check the home visit receipt and signature, and check whether they correspond to the risk level and date in the ledger |
| Sharing link | Expiration time, per-minute access limit, point limit, identity verification, and citation display items are set as needed | Access once with an unauthenticated session, try once with an over-limit request, and check the citation snippet, full citation, and source original text switches item by item |

## Three common errors

- Phenomenon: The same student's name, quantity, and date do not match between the ledger and the persuasion-to-return record. Cause: The two are entered separately without cross-checking, and versions are not synchronized.
- Phenomenon: The home visit record lacks a signature or receipt, making responsibility impossible to confirm during handover. Cause: Required-field validation was not set in the material drafting and responsibility handover steps, and the receipt was not collected.
- Phenomenon: The link cannot be opened after a period of time, or the full citation can be seen without logging in. Cause: The expiration time and identity verification were not set according to usage needs, and citation display items were not checked item by item.

## How to verify the setup

Acceptance of this feature: Access once each with an unauthenticated session and an over-limit request, and check the allowance and citation display; in the link configuration, check the expiration time, per-minute access limit, point limit, identity verification, and citation display items, and record `shareId`.

Business test: Draft one according to the template and complete one handover to see whether missing items are blocked.

- In the link configuration, check the expiration time, per-minute access limit, point limit, and identity verification callback address, and access once with an unauthenticated session.
- Check the citation snippet, full citation, and source original text switch status item by item, try once with an over-limit request, and record `shareId` and the authentication result.
