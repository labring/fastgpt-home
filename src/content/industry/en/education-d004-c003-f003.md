---
title: Sharing and Embedding for Kindergarten Healthcare and Meal Management: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c003-f003
page_type: 行业问题页
application_area: education
meta_title: Child Health and Meals | Sharing & Embeds | Handover
meta_description: Child Health and Meals: review sharing & embeds for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Kindergarten Healthcare and Meal Management: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

In the drafting of materials and handover of responsibility for kindergarten health care and meal management, common materials include quantified recipes, food ingredient procurement and acceptance forms, retention sample records, disinfection records, absence and cause registration, and handover sign-off forms. Sources are mostly the health room ledger, kitchen team records, and class daily reports, with an update cadence advancing daily or per meal, and field characteristics centered on ingredient names and specifications, retention sample time and batch, disinfection time period, and absence cause classification. When materials enter the sharing and embedding function, drafts and handover records serve as content pending issuance, display parameters determine which quoted snippets and source text external visitors can see, the authentication result determines the visible content corresponding to their identity, and the sign-off action is completed by the next stage.

## Configuration and implementation checks

This stage is executed by the share link in the publishing channel (the publishing service performs authentication), outputting the share link, display parameters, and authentication result. Issuable material drafts and handover records are seen by external visitors according to identity, who then complete them. The link can be configured with expiration time, per-minute access limit, credit limit, identity verification, and display items for quoted snippets, quoted full text, and source text.

| Object | Check | Verification action |
| --- | --- | --- |
| Quantified recipe draft | Ingredient names and specifications correspond item by item to procurement categories; a recipe inconsistent with procurement categories counts as a missing item | Draft one according to the template, check whether ingredient names, specifications, and procurement categories align line by line, and record the number of array entries and the tokens of the quoted text |
| Retention sample and handover records | Retention sample time and batch match the document batch; a document that does not match the retention sample batch counts as a missing item | Check the retention sample time, batch, and handover sign-off form, confirm the responsible person, version, and date are consistent, then hand off to the next stage for sign-off |
| Disinfection and absence registration | Disinfection time periods are complete and absence cause classification is clear; a disinfection record missing a time period counts as a missing item | Check the start and end of each disinfection time period segment by segment, inspect the absence cause classification field, and do not release if missing items have not been completed |
| Share link configuration | Expiration time, per-minute access limit, identity verification, and quoted display items are set according to usage needs | Check the time limit and values in the link configuration, check the toggle states of snippet, full text, and source text download item by item, and access once with an unauthenticated session |

## Three common errors

- Symptom: the document and retention sample batch do not match, and it is returned during handover. Cause: the retention sample time and batch were not updated in sync with the document, and the two records each became their own draft.
- Symptom: the recipe is inconsistent with procurement categories, and the acceptance stage confirms repeatedly. Cause: ingredient names and specifications were not filled in under the same standard, and the draft and procurement form were not cross-checked.
- Symptom: the disinfection record is missing a time period, and handover sign-off is blocked. Cause: disinfection time periods were not registered segment by segment, and missing items were not completed during the drafting stage before entering sharing.

## How to verify the setup

Acceptance for this function: access once each with an unauthenticated session and an over-limit request, and check the release and quoted display; check the expiration time, per-minute access limit, and identity verification callback, check the toggles for quoted snippets, quoted full text, and source text item by item, and record the authentication result of the link corresponding to `shareId`.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- Draft one quantified recipe and handover record according to the template, and check that the four fields—ingredient names and specifications, retention sample time and batch, disinfection time period, and absence cause classification—are complete.
- Check the expiration time and per-minute access limit values in the link configuration, access once with an unauthenticated session, and check the toggle states of quoted snippets, quoted full text, and source text item by item.
