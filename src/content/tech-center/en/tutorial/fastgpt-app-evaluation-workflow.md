---
title: Prepare FastGPT App Evaluation Data and Tasks
slug: /en/tutorial/fastgpt-app-evaluation-workflow
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/build/evaluation
source_type: Official documentation
---

# Prepare FastGPT App Evaluation Data and Tasks

## Access the Evaluation Template
After selecting the target FastGPT application for evaluation, a dedicated download button for the CSV evaluation template becomes available in the evaluation workspace. A visual reference for this interface element is provided via the asset at `/imgs/evaluation2.png`. This button generates a standardized CSV file pre-configured with the four mandatory fields required for evaluation dataset creation.

## Required Dataset Fields and Constraints
The official FastGPT evaluation CSV template includes four core fields for each entry:
- Global variables: Contextual variables applied to the evaluation session
- q (question): The user input question submitted to the target application
- a (expected answer): The pre-defined correct response for comparison against the application’s output
- Chat history: Previous conversation context included during the evaluation query

All uploaded datasets must adhere to strict rules set by the platform:
- A maximum of 1,000 QA pairs per single dataset file
- Full compliance with the template’s field structure; unapproved additional fields will cause task initialization failures
- All data must be entered in strict alignment with the template’s format to ensure successful parsing during evaluation.

## Step-by-Step Evaluation Task Creation
Follow these sequential steps to launch an evaluation task:
1. Navigate to the evaluation section of your target FastGPT application.
2. Select the specific application to run the evaluation against.
3. Click the download CSV template button to retrieve the standardized dataset file.
4. Populate the template with valid data across all required fields, ensuring adherence to the format constraints.
5. Upload the fully completed CSV dataset file to the FastGPT evaluation interface.
6. Click the "Start Evaluation" button to initialize the automated evaluation task.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/evaluation)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
