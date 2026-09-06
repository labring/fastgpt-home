---
title: Define and Use FastGPT AI Agent Skills
slug: /en/tutorial/fastgpt-ai-agent-skills
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/build/skill/intro
source_type: Official documentation
---

# Define and Use FastGPT AI Agent Skills

## What Is a FastGPT AI Agent Skill?
Under the latest ecosystem designs of mainstream AI providers, a **\"Skill\"** within FastGPT is defined as a **persistent, reusable, and modular workflow and capability package**. This structured design allows teams to encapsulate repeatable AI tasks into self-contained units that can be accessed across sessions and workflows.

## Core Attribute Breakdown
Every FastGPT AI Agent Skill includes three standardized core traits directly tied to its design:
1. **Persistent**: Saved Skill configurations remain available across all workspace chat sessions without needing reconfiguration
2. **Reusable**: The same Skill package can be invoked across multiple independent chat interactions
3. **Modular**: The Skill operates as an independent capability that can be integrated into larger agent workflows without conflicting with existing tools

## Practical Skill Usage Example
A common use case for FastGPT AI Agent Skills involves automating spreadsheet analysis and reporting. Teams can package custom spreadsheet audit logic and pre-built report formatting templates into a single Skill. When a user uploads a new complex spreadsheet during a chat session, the FastGPT agent will automatically run the saved Skill in the background: it will audit the spreadsheet data, compute required results, and format the output into a complete analysis report using the pre-defined template.

## Step-by-Step Skill Implementation Workflow
1. Bundle required assets: Compile custom audit code and report formatting templates into a single Skill package
2. Save the Skill: Store the finalized package in your FastGPT workspace for persistent access
3. Invoke the Skill: During a new chat session, upload the target file and select the saved Skill to execute
4. Access results: Wait for the FastGPT agent to complete the background workflow and deliver the formatted output

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/skill/intro)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
