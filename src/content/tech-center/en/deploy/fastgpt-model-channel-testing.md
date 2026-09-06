---
title: Verify Operational Status of Configured FastGPT Model Channels
slug: /en/deploy/fastgpt-model-channel-testing
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/model/intro
source_type: Official documentation
---

# Verify Operational Status of Configured FastGPT Model Channels

## Purpose of Model Channel Testing
FastGPT’s self-hosted model testing utility allows administrators to confirm that configured large language model channels function as intended. This validation step verifies connectivity, authentication, and basic response capability for each deployed model channel, without requiring end-user interaction.

## Step-by-Step Testing Workflow
Follow this structured process to run model channel tests:
1.  Access the test interface: Locate and select the "Model Test" button within the model channel management dashboard. This action loads a complete list of all currently configured models, as referenced in the visual aid labeled `aiproxy5`.
2.  Initiate the test run: After reviewing the list of configured models, click the "Start Test" button to begin automated validation of every listed model. The test interface will update in real time as each channel is evaluated, as shown in the visual aid labeled `aiproxy6`.
3.  Review final test results: Once all tests complete, the system displays a detailed report for each model. The report includes individual test outcomes and measured response times for every configured channel, as demonstrated in the visual aid labeled `aiproxy7`.

## Test Result Details
The final test report provides two core data points for each configured model channel:
- Test outcome: A clear indication of whether the channel passed validation (successful connection and valid model response) or failed validation due to a testing issue.
- Response time: The elapsed time between sending a standardized test prompt and receiving a complete model response, measured in milliseconds.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/model/intro)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
