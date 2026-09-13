---
title: Update FastGPT Configuration for Tool Choice Changes
slug: /en/deploy/fastgpt-config-tool-choice-updates
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/465
source_type: 官方文档
---

# Update FastGPT Configuration for Tool Choice Changes

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Configuration Change Overview
FastGPT has updated its configuration and model invocation workflows to align with OpenAI’s deprecation of function calls in favor of tool choice. The legacy `config.json` setup guide is no longer actively maintained. All users deploying or maintaining FastGPT must reference the current [Model Configuration](../../config/model/intro.en.mdx) documentation for supported, up-to-date configuration procedures.

## Core Parameter Renaming and Consolidation
The most impactful change to existing configuration files is the renaming of the `functionCall` field to `toolChoice` within all model configuration blocks. The functional behavior of the field remains consistent with prior releases:
- When set to `true`, the associated model will use OpenAI’s tools mode by default
- When omitted entirely or set to `false`, the model will use prompt-based generation instead of tool-based invocation
A secondary consolidation change affects model setup: the query rewriting model and content extraction model now share a single shared configuration, removing the need for separate, individual setup for these two previously distinct model types.

## Mandatory New Configuration Field
All FastGPT deployments must add the top-level `"ReRankModels": []` array to their configuration file. This new field standardizes rerank model configuration across the platform, replacing legacy rerank model setup patterns. Users should populate this array with valid model identifiers as required for their specific deployment, following guidelines outlined in the current model configuration documentation.

## Step-by-Step Update Procedure
Follow these concrete steps to update your FastGPT configuration file:
1.  Locate your existing FastGPT configuration file on your deployment server
2.  Search for all instances of the `functionCall` field within model configuration entries, and rename each to `toolChoice`
3.  Add the line `"ReRankModels": []` as a top-level entry in your configuration file
4.  Review your updated configuration against the current [Model Configuration](../../config/model/intro.en.mdx) documentation to confirm all changes meet latest platform requirements

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/465)
