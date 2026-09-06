---
title: Create and Configure FastGPT Skill Workspaces
slug: /en/tutorial/fastgpt-skill-creation
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/build/skill/development
source_type: Official documentation
---

# Create and Configure FastGPT Skill Workspaces

## Skill Creation Fundamentals
FastGPT skill workspaces enable custom functional tooling within the platform, with two standardized initialization pathways to support both quick setup and AI-aided development. All skill creation initiates from the platform’s dedicated skill building interface, where users access the core configuration tools.

## Skill Setup Popup Fields
To begin creating a skill, click the "Create" card: this is the dashed box area marked with a plus icon on the interface. The resulting popup form includes four core configurable fields:
- Skill name: A unique, human-readable identifier for the skill
- Icon: A visual marker for quick identification within the platform’s skill library
- Description: Contextual details outlining the skill’s intended purpose and use cases
- Requirements: Functional specifications or use case details defining the skill’s behavior

## Two Generation Workflow Modes
The system initializes skill workspaces using one of two distinct methods, based on whether the default template is retained or modified:
1. **Default Template Mode**: If the pre-filled "Goal/Process/Requirements" template is left unchanged, the system uses built-in basic structural frameworks and boilerplate code to generate the full skill workspace. This workflow does not invoke any AI models, and no point credits are consumed during setup.
2. **AI-Assisted Generation Mode**: If custom functional requirements are entered into the requirements field (for example, "build a skill that extracts all email addresses from a provided text"), the system automatically calls the configured default system LLM in the background. This process generates the `SKILL.md` scheme and initializes the associated skill code, with point consumption applied for the model usage.

## Step-by-Step Skill Creation Workflow
Follow this structured workflow to set up a FastGPT skill:
1. Navigate to the FastGPT platform’s dedicated skill building module.
2. Locate the "Create" card—a dashed box with an integrated plus icon—and click to open the setup popup.
3. Populate all required fields in the setup form: enter a unique skill name, select or upload a custom icon, add a descriptive overview of the skill, and input clear functional requirements.
4. Choose your preferred initialization mode:
   - For a pre-built base structure without AI involvement, retain the default "Goal/Process/Requirements" template.
   - For automated code and scheme generation, input custom functional requirements into the dedicated field to trigger AI-assisted setup.
5. Confirm the setup details to finalize creation of the skill workspace. The system will process your request immediately, with completion times varying based on the selected initialization mode.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/skill/development)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
