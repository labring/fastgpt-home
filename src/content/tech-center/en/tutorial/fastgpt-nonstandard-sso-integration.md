---
title: Integrate Non-Standard SSO Systems With FastGPT
slug: /en/tutorial/fastgpt-nonstandard-sso-integration
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/admin/sso
source_type: Official documentation
---

# Integrate Non-Standard SSO Systems With FastGPT

# Overview
This technical page outlines two supported methods to integrate non-standard single sign-on (SSO) systems with FastGPT, for engineering and technical decision-making teams evaluating or operating FastGPT deployments. All guidance aligns with official FastGPT administrative SSO documentation.

# Self-Developed SSO Integration
This self-service path enables teams to build a custom SSO integration using FastGPT’s standardized interface specifications. Follow these sequential steps:
1. Initialize your development environment using the official FastGPT SSO template repository, available at https://github.com/labring/fastgpt-sso-template. This template provides pre-configured foundations that adhere to FastGPT’s required SSO interface standards.
2. Develop your custom SSO service, implementing all required standard interfaces provided by FastGPT to enable secure authentication and user synchronization.
3. Deploy the completed custom SSO service to a production-ready hosting environment.
4. Navigate to the fastgpt-pro configuration panel, and input the fully deployed public service address to activate the integration.

# FastGPT Team Custom Development
For teams without internal SSO engineering resources, the FastGPT team can deliver a fully integrated SSO solution. This process requires two core preparation tasks:
1. Gather and submit three mandatory resources for your non-standard SSO system: official SSO operational documentation, member and organization data retrieval documentation, and a publicly accessible external test address for validation.
2. The FastGPT team will implement the integration by adding a dedicated authentication provider and corresponding environment variables within the fastgpt-sso-service codebase, then write custom integration logic tailored to your system’s specifications.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/admin/sso)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
