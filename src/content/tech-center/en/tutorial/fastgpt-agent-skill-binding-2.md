---
title: Bind Skills to FastGPT Agent Applications
slug: /en/tutorial/fastgpt-agent-skill-binding-2
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/build/skill/integration
source_type: Official documentation
---

# Bind Skills to FastGPT Agent Applications

### Eligible Application Types
Only Agent-type FastGPT applications support direct binding of custom skills. Simple applications and workflow-based applications do not have this integration capability. This constraint aligns with the secure execution requirements for associated skill code.

### Step-by-Step Binding Workflow
Follow these structured steps to associate a published skill with your Agent app:
1. Navigate to the editing page of the target Agent application you wish to integrate the skill into.
2. In the left-hand configuration panel of the editing interface, locate the **"Associated Skill"** configuration section.
3. Click the **Select** button on the right side of the Associated Skill section. In the popup selection list, select your already published skill.

![Associate Skill & VM Configuration Interface](/imgs/associated_skills_vm.png)

### Automatic Virtual Machine Configuration
FastGPT mandates secure, isolated execution for all associated skill code. When you finalize the skill binding process, the system will automatically enable the "Virtual Machine" setting for your Agent application. A critical operational constraint applies here: this Virtual Machine setting cannot be disabled while any skill remains associated with the application.

> 💡 **Warning Note**: Skill code execution requires a secure isolated environment. When associating a skill, the system will automatically enable the Virtual Machine setting. This setting cannot be disabled while a skill remains linked to the Agent app.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/skill/integration)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
