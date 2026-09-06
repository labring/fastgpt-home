---
title: Control FastGPT Response Stability with Temperature
slug: /en/tutorial/fastgpt-temperature-configuration
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/build/general/ai_settings
source_type: Official documentation
---

# Control FastGPT Response Stability with Temperature

## What is the FastGPT Temperature Parameter?
The Temperature parameter within FastGPT’s AI configuration settings controls the core randomness and stability of generated model responses. This parameter directly impacts how consistent or variable the output of your FastGPT application will be. Lower numerical values for temperature reduce randomness, producing more stable, predictable responses that align closely with established rules and factual guidelines. Higher temperature values increase randomness, leading to more diverse, creative, and unstructured output.

## Recommended Use Case Profiles
FastGPT provides clear guidance for selecting temperature values based on common application scenarios, as defined in official documentation:
- Customer support and dataset Q&A: Use a lower temperature value to ensure consistent, reliable responses that follow predefined rules and sourced content.
- Copywriting, creative storytelling, and collaborative brainstorming: Use a higher temperature value to encourage imaginative, varied content generation.
- Uncertain use cases: If no specific requirements for response stability or variability are identified, retain the default temperature setting to avoid unintended output shifts.

## Step-by-Step Configuration and Parameter Reference
First, the step-by-step workflow to adjust the temperature parameter:
1. Log into the FastGPT platform and navigate to the application build dashboard.
2. Select the specific application you wish to configure for AI response settings.
3. Open the "AI Settings" tab within the application’s configuration menu.
4. Locate the Temperature parameter field in the core AI settings panel.
5. Adjust the parameter value to match your intended use case requirements.
6. Save the configuration changes to activate the new temperature setting.

A formal reference for the parameter is as follows:
| Parameter Name | Official Purpose |
|----------------|------------------|
| Temperature    | Controls response stability and variability; lower values increase consistency, higher values increase creative diversity |

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/general/ai_settings)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
