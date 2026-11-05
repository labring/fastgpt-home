---
title: Forms and User Interaction for Off-Campus Training Registration and Compliance: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c045-f016
page_type: 行业问题页
application_area: education
meta_title: Training Compliance | Forms | Access
meta_description: Training Compliance: review forms for authorized access. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Off-Campus Training Registration and Compliance: Manage Authorized Access and External Services

## What this category's data looks like

This page addresses authorized access and external services in off-campus training compliance filing and penalty response. Materials come from three categories: school operating licenses, course filing materials, and fee disclosure. The update cadence follows filing changes, annual inspections, and penalty rectification. School operating license fields include institution name, address, principal, validity period, and issuing authority; course filing materials include course name, class hours, textbook version, and instructor; fee disclosure includes fee items, standards, refund rules, and disclosure date. When these three categories of materials enter the form input node, each plays a different role: the license determines subject qualification and authorization scope, course filing determines which courses can be publicly displayed, and fee disclosure determines which fee information can be disclosed to parents. Fields are mainly text, dates, and signed receipts, and must be checked item by item against the originals to avoid names, quantities, and dates not matching between two materials.

## Configuration and implementation checks

This step is performed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The externally available entry points and authorization scope are then completed by subsequent nodes or manually. The form does not automatically recognize material content, nor does it determine the authenticity of materials.

| Object | Check | Verification action |
| --- | --- | --- |
| School operating license | Institution name, address, principal, validity period, and issuing authority must match the originals, and signatures and receipts must be complete | Check field names one by one in the node configuration, compare the license scan with the form fields, and check required markers |
| Course filing materials | Course name, class hours, textbook version, and instructor must match the filing receipt, and dates and versions must be synchronized | Check required settings one by one, reference the `formInputResult` field in subsequent nodes and run a test to confirm the course fields can be retrieved |
| Fee disclosure | Fee items, standards, refund rules, and disclosure date must match the disclosure document, and signatures and receipts must be complete | Reference the `selectResult` output in subsequent nodes and run a test to confirm the fee fields can be retrieved, and check the disclosure date |
| Field transfer after submission | Subsequent nodes can retrieve the corresponding field values, and restricted identities cannot see unauthorized content | Reference the field in subsequent nodes and run a test, access once with a restricted identity, and see whether the visible scope matches the settings |

## Three common errors

- Symptom: the name, class hours, and date of the same course do not match between two materials. Cause: filing materials and disclosure materials are filled in separately, no cross-check is done, and versions are not synchronized.
- Symptom: the institution name in the school operating license and the course filing materials is inconsistent. Cause: after a name change, only one material was updated, while the other still uses the old version and lacks a signature or receipt.
- Symptom: the fee disclosure lacks a signature or receipt, yet it still enters the subsequent process after submission. Cause: required markers do not cover the signature field, and the completeness of the receipt was not manually reviewed.

## How to verify the setup

This feature acceptance: fill in once and submit, check the field values retrieved by subsequent nodes, and confirm that the `formInputResult` and `selectResult` fields can be referenced.

Business test: access once with a restricted identity and see whether the visible scope matches the settings.

- Check one by one whether the form fields correspond one-to-one with the field names, dates, and signatures of the school operating license, course filing materials, and fee disclosure, and mark key fields as required.
- Reference the `formInputResult` and `selectResult` fields in subsequent nodes and run a test to confirm that field values can be retrieved after submission and that restricted identities cannot see unauthorized content.
