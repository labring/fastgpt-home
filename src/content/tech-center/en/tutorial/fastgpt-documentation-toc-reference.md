---
title: FastGPT Official Documentation Table of Contents Reference
slug: /en/tutorial/fastgpt-documentation-toc-reference
page_type: 教程/部署
source: https://doc.fastgpt.cn/en/toc
source_type: 官方文档
---

# FastGPT Official Documentation Table of Contents Reference

## FastGPT Documentation TOC Reference Overview
This page provides a structured, curated reference to the official English FastGPT technical documentation, organized by functional workflows for engineers, technical decision-makers, and application builders. All paths listed here are pulled directly from the official documentation table of contents, with no external or inferred content added. The documentation is split into core functional groups covering initial setup, application building, knowledge base management, deployment, admin controls, and troubleshooting.

## Core Documentation Category Table
The following table maps official documentation paths to their functional categories, as sourced directly from the official TOC:
| Documentation Category | Official Paths |
|------------------------|----------------|
| Getting Started | `/en/guide/getting-started/index`, `/en/guide/getting-started/quick-start`, `/en/guide/index`, `/en/guide/version/cloud/faq` |
| Admin & Team Settings | `/en/guide/admin/sso`, `/en/guide/admin/teamMode` |
| Agent Building (v2) | `/en/guide/build/agentv2/debug`, `/en/guide/build/agentv2/settings`, `/en/guide/build/agentv2/vm` |
| General Application Settings | `/en/guide/build/general/ai_settings`, `/en/guide/build/general/chat_input_guide`, `/en/guide/build/general/fileInput`, `/en/guide/build/general/voiceInput`, `/en/guide/build/general/welcomeText` |
| Evaluation & FAQ Tools | `/en/guide/build/evaluation`, `/en/guide/build/faq` |
| Publishing & Deployment | `/en/guide/build/publish/dingtalk`, `/en/guide/build/publish/feishu`, `/en/guide/build/publish/link`, `/en/guide/build/publish/mcp_server`, `/en/guide/build/publish/official_account`, `/en/guide/build/publish/openapi`, `/en/guide/build/publish/wechat`, `/en/guide/build/publish/wecom` |
| Skill Development | `/en/guide/build/skill/development`, `/en/guide/build/skill/initialization`, `/en/guide/build/skill/integration`, `/en/guide/build/skill/intro`, `/en/guide/build/skill/version` |
| Custom Tools & Plugins | `/en/guide/build/tools/mcp_tools`, `/en/guide/build/tools/system-plugins/upload_system_tool` |
| Workflow Automation | `/en/guide/build/workflow/intro`, `/en/guide/build/workflow/nodes/ai_chat`, `/en/guide/build/workflow/nodes/content_extract`, `/en/guide/build/workflow/nodes/coreferenceResolution`, `/en/guide/build/workflow/nodes/custom_feedback`, `/en/guide/build/workflow/nodes/dataset_search`, `/en/guide/build/workflow/nodes/document_parsing`, `/en/guide/build/workflow/nodes/form_input`, `/en/guide/build/workflow/nodes/http`, `/en/guide/build/workflow/nodes/knowledge_base_search_merge`, `/en/guide/build/workflow/nodes/loop`, `/en/guide/build/workflow/nodes/loop_run`, `/en/guide/build/workflow/nodes/parallel_run`, `/en/guide/build/workflow/nodes/question_classify`, `/en/guide/build/workflow/nodes/reply`, `/en/guide/build/workflow/nodes/sandbox-v2`, `/en/guide/build/workflow/nodes/text_editor`, `/en/guide/build/workflow/nodes/tfswitch`, `/en/guide/build/workflow/nodes/tool`, `/en/guide/build/workflow/nodes/user-selection`, `/en/guide/build/workflow/nodes/variable_update` |
| Chat Interface Features | `/en/guide/chat/htmlRendering`, `/en/guide/chat/quoteList` |
| Knowledge Base Management | `/en/guide/dataset/collection_tags`, `/en/guide/dataset/dataset_engine`, `/en/guide/dataset/faq`, `/en/guide/dataset/rag`, `/en/guide/dataset/template`, `/en/guide/dataset/third-party/api_dataset`, `/en/guide/dataset/third-party/dingtalk_dataset`, `/en/guide/dataset/third-party/lark_dataset`, `/en/guide/dataset/third-party/third_dataset`, `/en/guide/dataset/third-party/yuque_dataset`, `/en/guide/dataset/websync` |
| Troubleshooting FAQ | `/en/faq/chat` |

## Practical Navigation Workflow Example
For engineers building a custom workflow-based FastGPT application, the recommended documentation path follows a linear workflow: start with the workflow introduction at `/en/guide/build/workflow/intro`, then reference individual node documentation such as `/en/guide/build/workflow/nodes/dataset_search` for knowledge base retrieval and `/en/guide/build/workflow/nodes/http` for external API integration. Once the workflow is configured, use the publishing guides at `/en/guide/build/publish/openapi` to deploy the application via OpenAPI, or `/en/guide/build/publish/wecom` for WeChat Work integration. Additional configuration for chat interface behavior can be found in `/en/guide/chat/quoteList` and `/en/guide/chat/htmlRendering` to customize response formatting and citation display. For team-based deployments, reference the team mode settings at `/en/guide/admin/teamMode` and SSO configuration at `/en/guide/admin/sso` to manage access controls.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/toc)
