---
title: Build FastGPT Core Application Use Cases
slug: /en/tutorial/fastgpt-quickstart-core-apps
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/getting-started/quick-start
source_type: Official documentation
---

# Build FastGPT Core Application Use Cases

## Overview
This page delivers a structured walkthrough of four core FastGPT application types, enabling users to quickly understand platform capabilities. It is intended for first-time FastGPT users, as well as pre-sales, delivery, operations, legal, and administrative roles seeking to evaluate or run the platform. Over the walkthrough, users will build four applications in sequential order: a corporate email writing conversational agent, a Civil Code Q&A assistant combining a dataset and conversational agent, a content review and automatic rewriting workflow, and an intelligent data analysis Agent V2. When working through each application, users should focus on three core objectives: identifying the problem each app type solves, understanding the reasoning behind key configuration choices, and observing validation outcomes post-deployment. All provided parameters and prompts serve as reusable starting points; for production deployments, users may substitute their own business materials, review rules, notification channels, and data files.

## Required Preparations
Before beginning the walkthrough, gather the following mandatory assets:
- An available AI model, such as GLM-5.1 or other pre-configured models
- A dataset test file, for example the Civil Code, company policies, or product manuals
- An email SMTP authorization code, to test the email tool functionality
- A sample Excel or CSV file, to test the Agent V2 intelligent data analysis feature

## Sequential Application Builds
Each application targets a distinct use case, with core configurations aligned to its intended function:
1. **Conversational Agent (Corporate Email Writing Assistant)**: Designed to draft professional corporate correspondence. Key configurations will standardize tone and structure for business emails, with validation focused on generating accurate, context-appropriate draft content.
2. **Dataset + Conversational Agent (Civil Code Q&A Assistant)**: Built to answer queries using a curated internal dataset. Key configurations will link the target dataset to the conversational agent framework, with validation focused on retrieving relevant dataset content to respond to legal questions.
3. **Workflow (Content Review and Automatic Rewriting)**: Orchestrates automated content checks and revisions. Key configurations will define formal review rules and rewriting logic, with validation focused on consistent application of review standards and accurate content modification.
4. **Agent V2 (Intelligent Data Analysis Agent)**: Processes and analyzes structured data files. Key configurations will connect the agent to the sample Excel or CSV file, with validation focused on generating meaningful, actionable data insights.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/getting-started/quick-start)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
