---
title: Connect Private ChatGLM2 to FastGPT
slug: /en/deploy/fastgpt-custom-chatglm2-integration
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/custom-models/chatglm2
source_type: Official documentation
---

# Connect Private ChatGLM2 to FastGPT

## Supported Native Model Capabilities
FastGPT provides native, out-of-the-box support for invoking cloud-based OpenAI APIs using a personal OpenAI API KEY. The platform currently integrates three core model types: GPT-3.5, GPT-4, and embedding models designed specifically for dataset construction. This native integration simplifies the process of connecting standard OpenAI-compatible models to FastGPT, requiring no custom code or third-party middleware for basic deployment.

## Data Security Considerations
Many users and organizations handle sensitive operational data that cannot be safely transmitted to third-party cloud LLM providers. For these scenarios, relying exclusively on cloud-based models is not feasible due to data security requirements. FastGPT addresses this need by supporting connections to private, self-hosted large language models, allowing users to maintain full control over their data while still leveraging the platform’s core functionality.

## ChatGLM2 Reference Integration
This documentation outlines the step-by-step process for connecting a private large language model to FastGPT, using Tsinghua’s ChatGLM2 as a concrete reference example. ChatGLM2 is a widely used open-source large language model, and its compatibility with standard API formatting makes it a straightforward choice for private deployment with FastGPT. The integration process follows FastGPT’s established custom model configuration patterns, ensuring consistency across all supported private model deployments.

## Step-by-Step Integration Workflow
The following sequence outlines the core steps to connect a self-hosted ChatGLM2 instance to FastGPT, using only platform-native configuration tools:
1.  Deploy and validate your self-hosted ChatGLM2 instance, ensuring it exposes a valid API endpoint for external requests
2.  Navigate to the custom model management page within the FastGPT administrative interface
3.  Create a new custom model entry, and input the ChatGLM2 API endpoint alongside your personal OpenAI API KEY (or equivalent authentication token for the private model)
4.  Configure the model’s input and output formatting to match the specifications required by FastGPT’s workflow engine
5.  Execute a test connection to verify that FastGPT can successfully send requests to and receive responses from the ChatGLM2 instance

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/custom-models/chatglm2)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
