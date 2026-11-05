---
title: Sharing and Embedding for Enterprise Employee Skills Assessment: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c035-f003
page_type: 行业问题页
application_area: education
meta_title: Employee Skills | Sharing & Embeds | Handover
meta_description: Employee Skills: review sharing & embeds for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Enterprise Employee Skills Assessment: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

Enterprise independent skilled talent evaluation generates three types of materials during filing and implementation: the filing form, the evaluation specification, and the candidate roster. The filing form records the institution and occupation names, evaluation scope, signatures, and dates; the evaluation specification records the assessment method, scoring rules, and version number; the roster records candidate names, identity information, declared occupations, and quantities. The materials come from evaluation institution submission and internal review, are updated with each batch submission, and versions and dates must be kept in sync. When entering the sharing and embedding stage, the filing form is cited and displayed as the qualification basis, the evaluation specification is cited and displayed as the assessment basis, and the roster is cited and displayed as the personnel list. Together, the three support external visitors in viewing the corresponding content according to their identity, and on that basis completing the signing and receipt of material drafts and handover records.

## Configuration and implementation checks

This stage is executed by the sharing link in the publishing channel (the publishing service performs authentication), and outputs the sharing link, display parameters, and authentication results. The material drafts and handover records that can be issued are then completed by external visitors who see the corresponding content according to their identity. The sharing link can be configured with an expiration time, a per-minute access limit, a points limit, identity verification, and display items for quoted snippets, quoted full text, and source original text.

| Object | Check | Verification action |
| --- | --- | --- |
| Enterprise evaluation filing form | Institution name, occupation name, evaluation scope, signatures, and dates are consistent between the filing form and the evaluation specification | Check the quoted display item switches of the link corresponding to `shareId`, and compare the names, dates, and signatures of the two materials item by item |
| Evaluation specification | The version number and effective date are in sync, and the scoring rules correspond to the evaluation scope in the filing form | Access once with an unauthenticated session, and check whether quoted snippet and full-text display are released according to identity |
| Candidate roster | Candidate names, quantities, and declared occupations are consistent with the evaluation scope in the filing form, and receipts are complete | Check the value of the per-minute access limit, and try once with an over-limit request |
| Handover record | Responsible person, receipt time, and version number are complete, and correspond to the roster quantity | Check the expiration time setting, and verify the time limit in the link configuration |

## Three common errors

- Symptom: The same candidate's name, quantity, and date do not match between the roster and the filing form. Cause: The two materials were drafted separately without cross-checking fields.
- Symptom: The evaluation specification version is not synchronized, and the old scoring rules are still cited. Cause: The version number and effective date were not updated with the materials.
- Symptom: The handover record lacks a signature or receipt, and the next stage cannot sign for receipt. Cause: The responsible person was not clarified, and the receipt field was left blank.

## How to verify the setup

Acceptance for this feature: access once each with an unauthenticated session and an over-limit request, and check release and quoted display.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- Check the expiration time, per-minute access limit, and points limit values of the `shareId` link.
- Check the switch status of quoted snippet, quoted full text, and source original text download item by item.
