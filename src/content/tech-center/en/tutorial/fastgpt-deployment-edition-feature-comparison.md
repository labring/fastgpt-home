---
title: FastGPT Deployment Edition Feature Comparison Guide
slug: /en/tutorial/fastgpt-deployment-edition-feature-comparison
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/version/commercial
source_type: Official documentation
---

# FastGPT Deployment Edition Feature Comparison Guide

This reference document outlines functional differences across FastGPT’s official deployment editions, designed to support technical engineering teams and decision makers evaluating platform options. All feature data is sourced directly from official FastGPT documentation.

## Feature Comparison Table
The following table summarizes supported features across the Community Edition, Commercial Edition, and Cloud Service:
|                                                        | Community Edition                                       | Commercial Edition | Cloud Service |
| ------------------------------------------------------ | ------------------------------------------------------- | ------------------ | ------------- |
| **App Building**                                       |                                                         |                    |               |
| Workflow orchestration                                 | ✅                                                      | ✅                 | ✅            |
| Share links and API                                    | ✅                                                      | ✅                 | ✅            |
| App publishing security config                         | ❌                                                      | ✅                 | ✅            |
| Third-party publishing (Lark, WeChat Official Account) | ❌                                                      | ✅                 | ✅            |
| Run log dashboard                                      | ❌                                                      | ✅                 | ✅            |
| App evaluation                                         | ❌                                                      | ✅                 | ✅            |
| Agent and Skill assisted generation                    | ❌                                                      | ✅                 | ✅            |
| System tool remote debugging                           | ❌                                                      | ✅                 | ✅            |
| **Dataset**                                            |                                                         |                    |               |
| Dataset                                                | ✅                                                      | ✅                 | ✅            |
| Third-party Dataset scheduled sync                     | ❌                                                      | ✅                 | ✅            |
| Dataset index enhancement                              | ❌                                                      | ✅                 | ✅            |
| Website sync                                           | ❌                                                      | ✅                 | ✅            |
| Image Dataset                                          | ❌                                                      | ✅                 | ✅            |
| **General Features**                                   |                                                         |                    |               |
| Multi-model configuration                              | ✅                                                      | ✅                 | ✅            |
| Model log dashboard                                    | ✅                                                      | ✅                 | ✅            |
| Model content moderation                               | ❌                                                      | ✅                 | ✅            |
| **Enterprise Features**                                |                                                         |                    |               |
| Custom branding                                        | ❌                                                      | ✅                 | In design     |
| Multi-tenancy & billing                                | ❌                                                      | ✅                 | ✅            |
| Team spaces & permissions                              | ❌                                                      | ✅                 | ✅            |
| Admin dashboard                                        | ❌                                                      | ✅                 | Not needed    |
| SSO login                                              | ❌                                                      | ✅                 | In design     |
| Commercial license                                     | [View open source license](./opensource/license.en.mdx) | Full               | Full          |

## Category-Specific Feature Breakdown
Features are grouped by core use case:
1. **App Building**: The Community Edition supports core workflow orchestration and shareable links/APIs, but lacks app security configuration, third-party publishing, run logs, app evaluation, agent/skill assisted generation, and system tool remote debugging — all of which are included in Commercial and Cloud editions.
2. **Dataset**: All editions support basic dataset management, but premium tools including third-party scheduled sync, index enhancement, website sync, and image datasets are exclusive to Commercial and Cloud editions.
3. **General Features**: Multi-model configuration and model log dashboards work across all editions, while model content moderation is only available in paid editions.
4. **Enterprise Features**: Enterprise-grade tools like multi-tenancy, team permissions, and full commercial licensing are included in Commercial and Cloud editions. Custom branding and SSO login are available for Commercial Edition and marked as in design for Cloud Service. An admin dashboard is included with Commercial Edition and marked as not needed for Cloud Service.

## License and Deployment Notes
The Community Edition uses the open source license linked in the comparison table, while Commercial Edition and Cloud Service include full commercial licensing for production deployments.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/version/commercial)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
