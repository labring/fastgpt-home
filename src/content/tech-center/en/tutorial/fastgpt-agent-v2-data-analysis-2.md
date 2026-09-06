---
title: Set Up Agent V2 For Dynamic Data Analysis
slug: /en/tutorial/fastgpt-agent-v2-data-analysis-2
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/getting-started/quick-start
source_type: Official documentation
---

# Set Up Agent V2 For Dynamic Data Analysis

# Agent V2 Capabilities for Dynamic Tasks
Agent V2 is purpose-built for open-ended, multi-step tasks requiring dynamic planning, unlike workflow tools that rely on fully predefined step sequences. It is optimized for tasks with “unfixed steps,” including data analysis, file processing, multi-tool collaboration, and complex problems that require follow-up clarification of user requirements. No predefined step definitions are required for Agent V2; users only need to provide the core goal and relevant data sources. The Agent autonomously decides whether to read the file first, perform statistics, ask follow-up questions, or run code based on the data structure and problem complexity. Compared to Case 3’s fixed workflow structure, which required predefined paths such as retrieval rules, classification, branching, and rewriting or rejection, Agent V2 operates as an autonomous executor.

# Core Use Case for Business Data Analysis
This use case simulates daily data analysis needs for operations, product, or sales teams. The core workflow allows users to upload an Excel file, pose questions in natural language, and have the Agent autonomously read the file, formulate an analysis plan, and execute the analysis in a virtual machine. Data analysis is an ideal scenario for Agent V2 due to three inherent characteristics: the analysis path is not fixed, tasks often require multi-step reasoning, and user requirements may need additional clarification. For a single Excel file, different stakeholders may prioritize different metrics such as product sales, channel ROI, regional trends, or anomalous orders. A fixed workflow cannot pre-cover all possible analysis paths, but Agent V2 can dynamically adjust its planning based on the submitted question and data structure.

# Step-by-Step Implementation Workflow
1. Prepare a business-focused Excel file containing relevant metrics for analysis
2. Navigate to the FastGPT Agent V2 configuration workspace
3. Upload the prepared Excel file as the dedicated data source for the agent
4. Input a natural language analysis goal or specific question (e.g., "Summarize regional sales performance" or "Flag unusual order volumes")
5. Allow the Agent to autonomously determine subsequent actions: this may include reading the file’s data structure, performing statistical calculations, posing follow-up clarification questions if required, or executing code in a virtual machine to complete the analysis
6. Retrieve and review the generated analysis output

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/getting-started/quick-start)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
