---
title: Sharing and Embedding for Public Vocational Skills Level Assessment: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c034-f003
page_type: 行业问题页
application_area: education
meta_title: Skills Certification | Sharing & Embeds | Handover
meta_description: Skills Certification: review sharing & embeds for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Public Vocational Skills Level Assessment: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses the category of social evaluation of vocational skill level certification, focusing on the drafting and handover of three types of materials: the evaluation implementation plan, the candidate registration form, and the assessor dispatch form. The evaluation implementation plan determines the certification occupation, level, subjects, and schedule; the candidate registration form records the candidate's identity, application conditions, and contact information; the assessor dispatch form states the assessor's qualifications, task assignments, and arrival date. When these three types of materials enter the sharing and embedding function, each plays a different role: the implementation plan serves as the basis for issuance, while the registration form and dispatch form serve as handover attachments; all require complete fields, clear responsible persons, and consistent versions and dates. The material source is the certification body's business system, the update cadence adjusts with batches and certification plans, and the field characteristics center on name, ID number, occupation level, assessment subject, signature field, and receipt field.

## Configuration and implementation checks

This step is executed by the share link in the publishing channel (the publishing service performs authentication), outputting the share link, display parameters, and authentication result. "Issuable material drafts and handover records" are then completed by external visitors who see the corresponding content according to their identity.

| Object | Check | Verification action |
| --- | --- | --- |
| Evaluation implementation plan | Check whether the occupation name, level, subjects, and dates in the candidate registration form and the assessor dispatch form are consistent with the implementation plan, and whether signatures and receipts are complete | Compare the names, quantities, and dates of the three materials one by one, check whether the version number and issuance date are synchronized, and verify the signature field and receipt field |
| Candidate registration form | Check whether the candidate's name, ID number, applied occupation, and level in the registration form are consistent with the implementation plan, and whether the assessment subjects in the assessor dispatch form correspond | Sample registration forms and dispatch forms by batch, check names, quantities, and dates item by item, and confirm that signatures and receipts are complete |
| Assessor dispatch form | Check whether the assessor's name, qualifications, task assignments, and arrival date in the dispatch form are consistent with the implementation plan, and whether they match the number of people in the registration form | Check the assessment subjects, number of people, and dates in the dispatch form and registration form item by item, and check whether versions are synchronized and whether signatures and receipts are complete |
| Share link | Check whether the expiration time, per-minute access limit, credit limit, identity verification, and citation display items are set according to usage needs | Check the time limit and values in the link configuration, access once each with an unauthenticated session and an over-limit request, and check the citation snippet, full citation, and source original text switches item by item |

## Three common errors

- Symptom: The same candidate name or number of assessors does not match between the registration form and the dispatch form. Cause: The two materials were drafted separately, without unified verification of fields and dates against the implementation plan.
- Symptom: Material versions are not synchronized, and the issuance date is inconsistent with the handover record date. Cause: The version number was not unified after drafting, and the version and date were not checked during handover.
- Symptom: The signature field or receipt field is missing, and the material cannot proceed to the next step for signing and acceptance. Cause: Signatures and receipts were not checked item by item during handover, and missing items were not blocked.

## How to verify the setup

This function's acceptance: access once each with an unauthenticated session and an over-limit request, verify the release and citation display, check the expiration time, per-minute access limit, credit limit, and identity verification callback corresponding to `shareId`, and check the citation snippet, full citation, and source original text switch states item by item.

Business test: draft one copy according to the template and complete one handover, and see whether missing items are blocked.

- Check the expiration time, per-minute access limit, credit limit, and identity verification callback address in the link configuration, and access once with an unauthenticated session.
- Check the display switches for the citation snippet, full citation, and source original text item by item, and record the tokens and array count of the citation text.
