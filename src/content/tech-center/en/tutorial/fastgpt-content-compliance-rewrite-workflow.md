---
title: Set up FastGPT content review and rewrite workflow
slug: /en/tutorial/fastgpt-content-compliance-rewrite-workflow
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/getting-started/quick-start
source_type: Official documentation
---

# Set up FastGPT content review and rewrite workflow

## Core Content Review and Rewrite Workflow Overview
This workflow automates end-to-end content validation and automatic rewriting using a custom FastGPT dataset storing standardized content compliance guidelines. The workflow classifies input content against the stored rules, triggers targeted rewriting for sensitive wording, blocks prohibited content entirely, and routes safe content for direct publication, reducing manual review overhead.

## Compliance Rule Dataset Preparation
The foundational component of this workflow is a dedicated dataset containing content compliance rules. Use the following exact rule template for initial setup:
```text
Content Compliance Rules

Safe Content (can be published directly)
- Objective factual statements
- Normal event notifications, meeting arrangements
- Product feature descriptions (based on real data)
- Industry knowledge sharing

Sensitive Wording (needs rewriting)
- Absolute language: "best,", "first,", "100%", "absolute,", "only"
- Exaggerated claims: "disrupting the industry,", "unprecedented,", "unmatched"
- Unverified data: conversion rates, satisfaction rates, growth rates without sources
- Comparative disparagement: directly naming competitors and belittling them

Prohibited Content (must not be published)
- Illegal information: involving pornography, gambling, drugs, fraud, pyramid schemes
- Personal attacks: insults, defamation against individuals or groups
- False information: fabricated data, forged qualifications, impersonating official sources
- Sensitive topics: political sensitivity, religious discrimination, regional attacks
```
The rule base does not need to be complex for initial testing. For quick validation, split the rules into three simplified categories: safe content, content needing rewriting, and prohibited content. For formal production deployments, expand the rule set with additional categories such as advertising-sensitive terms, medical compliance requirements, prohibited financial marketing claims, brand tone guidelines, or region-specific restrictions.

## Step-by-Step Configuration Steps
1. Create a new dataset in FastGPT with the exact name "Content Compliance Rules".
2. Upload a plain text file containing the provided content compliance rule template to the new dataset.
3. Organize the uploaded rules into three core categories for initial validation: Safe Content, Sensitive Wording, and Prohibited Content.
4. For production use, extend the rule base with industry, brand, channel, or region-specific compliance rules as required.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/getting-started/quick-start)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
