---
title: Context and Token Budgets for Kindergarten Healthcare and Meal Management: Compare Documents and Locate Differences
slug: /en/industry/education-d002-c003-f002
page_type: 行业问题页
application_area: education
meta_title: Child Health and Meals | Context & Tokens | Checks
meta_description: Child Health and Meals: review context & tokens for document checks. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Context and Token Budgets for Kindergarten Healthcare and Meal Management: Compare Documents and Locate Differences

## What this category's data looks like

This page focuses on kindergarten health care and meal management materials, sourced from health room ledgers, canteen procurement documents, sample retention records, menus, and disinfection sheets, updated daily or weekly. Field characteristics include ingredient names and specifications, sample retention times and batches, disinfection periods, and absence cause categorization. When materials enter this function, ledgers and documents serve as the verification base, menus and procurement categories serve as comparison objects, and sample retention and disinfection records serve as discrepancy localization clues, jointly supporting the consistency determination of names, quantities, and dates for the same object across two materials.

## Configuration and implementation checks

This part is executed by application settings (response limits, etc.), outputting the length of a single answer and the range of context that can be accommodated. The "discrepancy list" is then completed by the model, with entry and authorization handled by the publishing service and file permissions.

| Object | Check | Verification action |
| --- | --- | --- |
| Ingredient names and specifications | When documents and sample retention batches do not match, whether the names or specifications are consistent across the two materials | Check procurement documents against sample retention records, and confirm the slider positions of `maxResponse` and `maxContext` in application settings |
| Sample retention times and batches | Whether the batches and dates in sample retention records and ledgers correspond item by item | Compare sample retention labels with health room ledgers, record inconsistent fields, and check the `quoteMaxToken` reference budget |
| Disinfection periods | Whether disinfection records are missing periods or periods are misaligned with the schedule | Check disinfection sheets against schedules day by day, and mark missing periods |
| Absence cause categorization | Whether absence registration and cause categorization use the same criteria across the two materials | Compare absence registration with health room summaries, and mark categorization discrepancies |

## Three common errors

- Phenomenon: documents and sample retention batches do not match. Cause: procurement documents are summarized daily, sample retention records are registered by meal, and batch numbers are not unified.
- Phenomenon: menus and procurement categories are inconsistent. Cause: menus are arranged weekly, procurement documents are filled in based on actual arrivals, and category names are not aligned.
- Phenomenon: disinfection records are missing periods. Cause: disinfection sheets are filled in by shift, some periods are not recorded, and they cannot correspond item by item with the schedule.

## How to verify the setup

This function acceptance: ask a question that requires a long answer, see whether the ending is complete, and check the slider positions of `maxResponse` and `maxContext`.

Business test: use one real record to find a field inconsistent with the ledger, hand it to the reviewer for confirmation, and write it back.

- In application settings, check the response limit switch and slider positions, and confirm they match the answer length required by the page.
- Compare usage from two runs, and check the change in single-run usage after adjusting the limit.
