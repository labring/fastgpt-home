---
title: Sharing and Embedding for College Admissions and Application Placement: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c052-f003
page_type: 行业问题页
application_area: education
meta_title: College Admissions | Sharing & Embeds | Handover
meta_description: College Admissions: review sharing & embeds for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for College Admissions and Application Placement: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This category's data looks like this: Material drafting and responsibility handover for regular higher education institution admissions enrollment and filing involves three types of records: enrollment plans, filing rules, and admission rosters. Enrollment plans provide the major group, batch, and planned number; filing rules give the filing ratio, tie-breaking order, and adjustment criteria; admission rosters carry the candidate number, score, and pre-admission conclusion. The material sources are documents issued by the provincial admissions office and export tables from the school's admissions system. The update cadence advances by batch, and fields must be re-checked after each round of filing. When entering the sharing and embedding stage, the enrollment plans and filing rules serve as the basis for the draft, and the admission roster serves as the main body of the handover record. The fields, dates, and signatures of the three must be aligned item by item to form a signable material draft and handover record.

## Configuration and implementation checks

This step is executed by the sharing link in the publishing channel (the publishing service performs authentication), outputting the sharing link, display parameters, and authentication result. The signable material draft and handover record are then completed by external visitors according to the content they see based on their identity.

| Object | Check | Verification action |
| --- | --- | --- |
| Enrollment plan | The names, quantities, and dates of the major group, batch, and planned number must be consistent with the filing rules | Compare the major group names and planned numbers in the two materials item by item, and check the version and date |
| Filing rules | The fields for the filing ratio, tie-breaking order, and adjustment criteria must be complete and signed | Draft one according to the template, and check whether the rule clauses are missing items and whether the signature and receipt are in place |
| Admission roster | The fields for the candidate number, score, and pre-admission conclusion must be complete, and the responsible person must be clear | Check the same record's name, quantity, and date in the roster and the draft, and check whether the version is synchronized |
| Handover record | The recipient, receipt date, and receipt must be complete, and missing items should be blocked | Complete one handover, use `shareId` to locate the link, and check the display parameters and authentication result |

## Three common errors

- Phenomenon: The name, quantity, or date of the same candidate does not match in the two materials. Cause: The enrollment plan and admission roster were exported separately, and the fields were not checked against the same version.
- Phenomenon: The material has been circulated but the version is not synchronized, and the recipient sees the old draft. Cause: After the draft was updated, the sharing link was not regenerated, and the display parameters still point to the old content.
- Phenomenon: The handover record lacks a signature or receipt, and the next step cannot be signed for. Cause: The responsible person and receipt date were not set as required in the template, and missing items were not blocked.

## How to verify the setup

Acceptance of this function: access once with an unauthenticated session and once with an over-limit request, check the release and citation display, and check the display parameters and authentication result corresponding to `shareId`.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the link configuration, check the expiration time, per-minute access limit, and identity verification callback address, and check item by item the switch status of cited snippet, cited full text, and source original text download.
- Draft one material draft according to the template, check the fields, dates, and signatures of the enrollment plan, filing rules, and admission roster item by item, then complete one handover and retain the receipt.
