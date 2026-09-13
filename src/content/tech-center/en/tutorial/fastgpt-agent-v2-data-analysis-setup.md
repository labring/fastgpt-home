---
title: Set Up FastGPT Intelligent Data Analysis Agent
slug: /en/tutorial/fastgpt-agent-v2-data-analysis-setup
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/getting-started/quick-start
source_type: Official documentation
---

# Set Up FastGPT Intelligent Data Analysis Agent

## Create the Agent Application
In the FastGPT Studio interface, click **Create App**, select the `Conversational Agent V2` option, and name the new application `Intelligent Data Analysis Agent`.

## Configure Core Settings
First, set the AI model to GLM-5.1 for all AI configuration tasks. The system prompt should standardize the agent’s behavior as a senior data analyst with access to three core tools: 📄 Read File, 💻 Sandbox Execution, and ❓ Proactive Follow-up. The prompt enforces a pre-execution planning workflow to reduce requirement misinterpretation, including steps to review data structure, draft an analysis plan, execute tasks incrementally, and deliver a formal analysis report with data overviews, core findings, visualizations, and business recommendations. For production deployments, extend the prompt to include internal metric definitions such as GMV, ROI, conversion rate, active customers, and repurchase rate.

Configure the opening welcome message to guide user interaction using this standardized text:
```text
Hello! I am the Intelligent Data Analysis Agent 📊

Just drag and drop your Excel or CSV file here and tell me what you want to analyze.

For example:
- "Analyze this sales data and find the best-selling products and trends"
- "Help me look at changes in user activity and find the reasons for the decline"
- "Compare the conversion rates of three channels, which one has the highest ROI?"

I will first understand your data, formulate an analysis plan, and then run the analysis code in the sandbox.
I will proactively ask you for clarification when needed.
```

## Enable Virtual Machine Capability
This isolated execution environment is required for file reading and Python code execution. It prevents direct changes to the local host machine, while allowing the agent to run pandas, matplotlib, and numpy-based scripts, process uploaded data files, and generate statistical results. This capability is a key feature of Agent V2 that distinguishes it from standard chat applications.

## Validate the Agent Workflow
Complete these step-by-step tests:
1. Upload a sample sales data Excel or CSV file to the studio
2. Enter the test query: `Help me analyze this sales data to see which products sell well and which channel has the highest ROI`
3. Monitor the agent’s execution through the studio interface

Confirm the agent follows the full required workflow: first reading the uploaded file to identify data structure and fields, presenting a formal analysis plan, executing sandboxed code as needed, sharing key findings with supporting visualizations, and delivering actionable business recommendations. If the query includes ambiguous details, verify the agent proactively requests clarification instead of proceeding with an unvalidated analysis.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/getting-started/quick-start)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
