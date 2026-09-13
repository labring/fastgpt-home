---
title: FastGPT Skill Layer Core Design Philosophy
slug: /en/tutorial/fastgpt-skill-layer-design
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/build/skill/intro
source_type: Official documentation
---

# FastGPT Skill Layer Core Design Philosophy

# AI Agent Capability Layer Hierarchy
FastGPT aligns with standard AI agent cognitive frameworks by organizing system capabilities into three distinct layers, each serving a unique functional role. This layered architecture separates core cognition, direct execution tools, and high-level professional workflows to optimize structured task handling.

| Layer Name | Core Responsibility | Analogous Role |
|---|---|---|
| Brain | Reasoning and planning via native large language models | AI's central cognitive core |
| Tools | Simple execution interfaces including web requests and temporary code snippets | AI's hands and feet for direct action |
| Skills | Complete operational knowledge and professional domain logic | Modular workflow guidance bundles |

# Skill Module Core Composition
A skill is defined as a self-contained modular package that bundles two mandatory, tightly integrated components. First, instruction markdown provides clear, step-by-step operational guidance for completing a targeted task, translating high-level domain logic into actionable steps for the AI system. Second, executable scripts contain the low-level code that runs in a secure background sandbox to execute the actual task steps, turning the written guidance into tangible, automated results.

# Skill vs Tool Practical Distinction
To clarify the difference between tools and skills, use a common household analogy: a tool is equivalent to a single screwdriver in a workshop, designed for one specific, simple isolated action. A skill, by contrast, is a complete furniture assembly guide, which combines step-by-step instructional context and pre-written execution code to deliver a fully completed complex workflow. When presented with a relevant task context, the AI system will automatically retrieve the appropriate skill from its stored skill library, run the embedded scripts in the secure background sandbox, and execute the full end-to-end workflow without additional manual intervention.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/skill/intro)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
