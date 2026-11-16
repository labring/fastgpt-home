---
slug: /en/guide/pricing-migration-and-billing-reconcile
meta_title: "FastGPT Pricing Migration and Billing Checks"
meta_description: "Check FastGPT v4.17.3 pricing fields and migration status, then trace token units and usage through model, application, and team records after upgrade."
schema_type: Article
page_type: 实施指南
date_published: 2026-11-09
date_modified: 2026-11-09
keywords: ""
---

# Pricing Unit Migration and Billing Reconciliation

**The migration changes how pricing fields and units are stored, not how much is consumed. When a bill does not match after an upgrade, the usual cause is configuration left in old fields, or a unit conversion that missed a factor of one thousand. The order of checks runs from fields to units to amounts; reversing it turns reconciliation into a loop of guessing units from totals.**

## Why pricing configuration has to change at upgrade

FastGPT v4.17.3 consolidates model pricing into two paths: language models use a tier structure, other models use a unit price; all token-related values are expressed in millions. The old root-level pricing fields are no longer read. Configuration written there is effectively absent, and charges no longer resolve to an amount.

Assessing the impact takes one question: does this deployment have self-hosted models or system models whose prices were edited. If so, every one needs a check. If not, the ownership of team models and system models still needs confirming, because the two follow different billing rules.

## Field structure and unit mapping

Language model pricing lives in `pricing.tiers`, which holds unit price and tier ceilings, with ceilings expressed in millions of tokens and unit price limited to two decimal places. Text to speech is priced per million characters, speech to text per 60 seconds, and both use the unit price format. Three model families, three units; filling one where another belongs raises no error and only shifts the amount.

Units converge on millions because pricing values are otherwise too small for two decimal places. The decimal limit forces the price magnitude up, and that magnitude multiplied by consumption yields the number on the bill. The derivation can be replayed when checking an amount: take one call record, multiply unit price by usage, and compare with the billed figure. A difference of one order of magnitude means the unit was never changed.

## Conversion direction and three common mistakes

The migration direction is fixed: old unit prices for tokens and text to speech are multiplied by 1,000, old tier ceilings for language models are divided by 1,000, and speech to text stays as it is. Reversing the direction produces a three-order-of-magnitude gap that is visible at a glance; intermediate errors are the harder ones.

The first mistake is changing unit price and leaving ceilings alone. Ceilings in millions with prices at their old magnitude look plausible in the first tier and jump once a tier boundary is crossed. The second is applying the thousand factor to speech to text as well. Text to speech counts characters, speech to text counts seconds, and a shared conversion inflates the second. The third is filling both fields for one model. Where both exist, the current version reads one; the other remains and misleads the next reviewer into treating it as live configuration.

## How the free fallback surfaces

System models whose migration is incomplete are treated as free, and team models are not billed at all. Together these create a misleading picture: consumption continues while the bill stays flat. The way to find it is the per-model consumption detail. When a model shows call records but zero amount, check its migration status first, then whether it is a team model.

The fallback is a transition state rather than a defect. The longer it lasts, the likelier it surfaces during month-end settlement, when backfilling and tracing cost more than an immediate check would have.

The fastest test for a suspected fallback compares call count with billed count for the same model. Equal counts with a zero amount indicate the fallback; more calls than billed entries means part of the traffic never reached pricing at all, which is a different problem and usually points at a channel that is missing a price entirely.

## Three-layer reconciliation

The model layer compares unit price and tier ceiling against the official structure, line by line. The application layer checks token statistics, confirming that call volume and billed volume move together per application. The team layer totals the amounts and compares with the sum from the model layer. Whichever layer diverges first is the layer to trace back.

The reconciliation sheet holds one row per model with columns for call count, billed count and amount, plus a note column for exceptions. When two of the three columns move in opposite directions, the row deserves a separate check: rising calls with a flat amount usually means the fallback, while a rising amount with flat calls usually means a unit error.

Member-level channels are easy to overlook. Members can configure their own models and channels, and billing follows the channel a model belongs to. The same model attached to a team channel and to a member channel produces different bills, and when a channel is reused across teams the model layer double counts. Totalling at the team layer before comparing downwards surfaces the duplication earlier.

## Timing the reconciliation

Reconciliation does not have to wait for month end. Run the model layer on the day migration completes, the application layer weekly once that passes, and the team layer at month end. Three different rhythms compressed into one sitting lose the ability to localise a problem.

When a gap appears, freeze pricing configuration before investigating. During migration one person edits configuration while another adjusts billing definitions, and conclusions drawn while both move do not hold. With changes frozen, walk the models one at a time, record each edit, and release the freeze afterwards. Each record needs at least four items: model name, old field, new field and time of change. Only then can the next reconciliation explain the difference.

## Recovery order after a failed migration

Three backfill jobs run once startup dependencies complete, sharing at most three concurrent slots, and failed items can be retried after the data is fixed. The recovery order is: confirm the price migration job finished, correct model configuration, then re-run reconciliation. Doing it the other way reconciles unmigrated prices against migrated bills, and the mismatch that follows looks like a pricing error rather than a sequencing one.

When a team owner replaces references to a failed model, the replacement covers language, speech playback and rerank models only. Index models, dynamic references and empty values are outside that scope, and those three need checking separately after a replacement. Without that step, one part of the chain still reports a missing model while the configuration screen looks complete.

## Isolate pricing from aggregation with two calls

Pick a migrated system language model and capture two reproducible calls from the same team and application. Record their model IDs, input usage, output usage and effective pricing configuration. If the model has tiers, choose calls on different sides of a threshold and reconcile each against its applicable tier. Keep zero-usage and zero-charge records in the review. Investigate request completion in the first case and effective pricing in the second. Test a team-owned model separately because it is outside the system-model migration. If individual calls reconcile while application totals diverge, compare the reporting interval and application ID before changing the model configuration.

## Source of facts

Verified on 2026-11-09. Product version: FastGPT v4.17.3.

| Topic | Source |
| --- | --- |
| Pricing fields, units, conversion rules, backfill jobs | [Release notes 4.17.3](https://github.com/labring/FastGPT/releases/tag/v4.17.3) |
| Token statistics per application | [Release notes 4.17.1](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-17/4171) |
