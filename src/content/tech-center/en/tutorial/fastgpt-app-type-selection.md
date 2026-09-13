---
title: Select the Right FastGPT Application Types
slug: /en/tutorial/fastgpt-app-type-selection
page_type: 教程/部署
source: https://doc.fastgpt.cn/en/guide/getting-started/quick-start
source_type: 官方文档
---

# Select the Right FastGPT Application Types

## Core Application Type Overview
After completing the four FastGPT quick start cases, users can categorize application types by increasing complexity, each designed for distinct use cases. The four core app types progress from basic content generation to fully autonomous task execution: Conversational Agent addresses how to generate and answer content, Dataset + Conversational Agent adds grounded sourcing for answers, Workflow enforces fixed operational processes, and Agent V2 enables autonomous planning for open-ended tasks.

## Application Type Comparison Table
| App Type                       | Best For                                                              | Core Features                                                |
| ------------------------------ | --------------------------------------------------------------------- | ------------------------------------------------------------ |
| Conversational Agent           | Lightweight Q&A, copywriting, standardized output                     | Prompt, model configuration, tool calling                    |
| Dataset + Conversational Agent | Q&A based on documents, policies, regulations, product manuals        | File import, Dataset retrieval, citing sources               |
| Workflow                       | Fixed steps, conditional branches, review flows, automated processing | Node orchestration, decision nodes, human confirmation       |
| Agent V2                       | Data analysis, complex tasks, multi-step reasoning, dynamic planning  | Autonomous planning, tool calling, virtual machine execution |

## Selection and Combination Guidelines
When selecting an app type, evaluate based on task complexity using the following rules:
1. Lightweight conversation or standardized copy generation: Prioritize the Conversational Agent.
2. Answers requiring existing material sourcing: Choose Dataset + Conversational Agent.
3. Fixed processes with conditional branches, human confirmation, or automated processing: Select Workflow.
4. Open-ended, unfixed-step tasks needing autonomous analysis, tool calling, or code execution: Choose Agent V2.

In real-world projects, these capabilities can be combined to build more robust applications. For example, a customer service assistant can use a Dataset to answer product-related questions and then query order details via tool calling. A content review workflow can use a Dataset to enforce content policies while using Workflow to standardize the review path. For data analysis, teams can first use Agent V2 for exploratory task planning, then solidify stable, repeatable analysis steps into a Workflow for ongoing use.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/guide/getting-started/quick-start)
