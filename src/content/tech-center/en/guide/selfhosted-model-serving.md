---
title: Wiring In a Self-Hosted Inference Endpoint: Chat, Embedding and Rerank
slug: /en/guide/selfhosted-model-serving
page_type: Decision matrix
source: https://github.com/labring/FastGPT
source_type: Open-source repository docs and community threads
article_section: Selection & Evaluation
is_part_of: FastGPT Tech Center
meta_title: Wiring In a Self-Hosted Inference Endpoint: Chat, Embedding and Rerank
meta_description: Learn how to integrate self-hosted chat, embedding, and reranking services into your AI application platform. This guide helps technical decision-makers ch
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Wiring In a Self-Hosted Inference Endpoint: Chat, Embedding and Rerank

## When this decision has to be made
You must decide when integrating internal, self-hosted chat, vector embedding, or reranking services into your existing platform. This decision typically arises in these situations:

*   **Existing platform limitations:** Current platform features do not meet specific business needs. This includes requirements for specialized domain models, private model deployments, or strict control over model inference performance and cost.
*   **Business growth:** If your core business relies on private data or specific model performance, failing to integrate self-hosted services promptly can limit product functionality, degrade user experience, or cause you to miss market opportunities.

Making this decision too early can lead to unnecessary development. You might build complex integrations for unclear business needs or attempt integration before the platform matures. This increases debugging and maintenance costs, wastes resources, and delays core business progress.

Delaying the decision can hinder business development. Without a planned integration solution, urgent needs might force a hasty technical choice. This can accumulate technical debt, lead to high long-term maintenance costs, and make systematic optimization difficult.

Therefore, start evaluating self-hosted service integration as soon as business requirements for model capabilities are clear and the existing platform cannot directly meet them.

## Criteria matrix

| Candidate | Model Type | Integration Method | Authentication Method | Proxy Service Support | Troubleshooting Difficulty | Applicable Scenario |
|---|---|---|---|---|---|---|
| **Direct Custom Request Address** | Chat, Embedding, Rerank | Configure `OPENAI_BASE_URL` or `config.json` custom model request address | `CHAT_API_KEY` or `requestAuth` field | Not supported | Medium | High performance requirements, OpenAI-compatible model interface |
| **OneAPI Integration** | Chat, Embedding, Rerank | Configure `ONEAPI_URL` | OneAPI Token | Supported | Medium | Unified management of multiple models/channels, or non-OpenAI compatible model interface |
| **AIProxy Integration** | Chat, Embedding, Rerank | AIProxy image | Not stated in the documentation; verify in your environment | Supported | Low | Platform has built-in AIProxy channel |

## Why each criterion matters
**Model Type:** This criterion distinguishes the core capabilities provided by your self-hosted service. Chat services typically refer to Large Language Models (LLMs) for text generation and question answering. Embedding services convert text or data into vector representations, forming the basis for knowledge retrieval and semantic matching. Reranking services optimize search results from vector retrieval using more complex models.

Understanding the model type helps define the required integration interface specifications and data flow. If your self-hosted service provides only one capability, choose the corresponding integration method. For example, a self-hosted text embedding model integrates differently from a self-hosted chat generation model due to differences in data input/output formats and expected processing logic. Mismatched model types and integration methods can cause data transmission errors or functional failures.

**Integration Method:** This criterion describes the specific technical path for connecting your self-hosted service to the platform. Different integration methods affect configuration complexity, reliance on existing infrastructure, and potential compatibility issues.

*   **Direct Custom Request Address** requires your self-hosted service to provide an API interface compatible with the platform, typically an OpenAI-compatible interface. Incompatible interfaces require additional adaptation.
*   **OneAPI Integration** means deploying and maintaining a OneAPI service to proxy requests to your self-hosted model. This increases system complexity but offers more flexible model management and authentication.
*   **AIProxy Integration** relies on the platform's built-in AIProxy channel. This is usually the simplest configuration but may have specific requirements for your self-hosted service's interface.

Choosing an inappropriate integration method can lead to service connection failures, performance bottlenecks, or maintenance difficulties.

**Authentication Method:** Authentication is crucial for securing your self-hosted service. It determines how the platform verifies request legitimacy and prevents unauthorized access. Different authentication methods have varying security levels, configuration complexities, and key management requirements.

*   Using `CHAT_API_KEY` or the `requestAuth` field for authentication requires secure storage and transmission of keys. Incorrect authentication configuration can create security vulnerabilities, such as key leaks or unauthorized service calls.
*   With **OneAPI Integration**, authentication is managed by OneAPI. This can simplify platform-side authentication but shifts security responsibility to the OneAPI service.
*   For **AIProxy Integration**, the authentication method needs verification within your deployment environment. Unclear authentication mechanisms between the platform and AIProxy can lead to connection failures or security risks.

**Proxy Service Support:** This criterion evaluates whether the integration solution supports network requests through a proxy server. Proxy services are essential in complex network environments, such as those with firewalls, internal network isolation, or traffic monitoring requirements. If an integration method does not support proxies, you might be unable to access external model services, or you may need to adjust your network architecture.

*   The **Direct Custom Request Address** method typically does not directly support proxies. You would need to implement this via system-level network proxies or container network configurations.
*   **OneAPI** and **AIProxy Integration** usually support proxies because they function as intermediary services.

Lack of proxy support can cause network connectivity issues, especially when calling self-hosted services across network boundaries.

**Troubleshooting Difficulty:** This criterion assesses the complexity of identifying and resolving issues after integrating your self-hosted service. Troubleshooting difficulty depends on log detail, error message clarity, and system architecture transparency.

*   With **Direct Custom Request Address**, issues like `Connection error` or `LLM model response empty` require checking platform logs, model service logs, and network connectivity. The scope of investigation is broad.
*   **OneAPI Integration** requires checking both platform and OneAPI logs, as well as communication between OneAPI and your self-hosted service. This adds more troubleshooting paths.
*   **AIProxy Integration** is often built into the platform, and its optimized logging may reduce troubleshooting difficulty.

High troubleshooting difficulty means more time and resources are needed to resolve problems, impacting service stability and availability.

**Applicable Scenario:** This criterion summarizes the most suitable application scenarios for each integration solution. It helps decision-makers choose the best solution based on specific business needs and technology stacks.

*   If your organization already has a mature OneAPI deployment for managing various models, **OneAPI Integration** for self-hosted services is a natural choice.
*   If you have extreme performance requirements for model inference and your self-hosted service interface is directly compatible with the platform, **Direct Custom Request Address** might be superior.
*   If the platform has a built-in AIProxy channel that is easy to configure, consider **AIProxy Integration** first.

Choosing a solution that doesn't match your scenario can lead to unnecessary complexity, performance bottlenecks, or limited functionality. For example, in scenarios requiring unified management of many models, selecting direct custom request address configuration would result in scattered and difficult-to-maintain configurations.

## The cost of switching later
Once you select and implement a self-hosted inference service integration solution, changing it later involves significant costs.

**Data Migration and Compatibility:** If the original solution involved specific data storage formats (e.g., index structures for certain vector databases), switching solutions might require rebuilding or migrating this data. For example, moving from one vector database to another might necessitate re-vectorization or complex index conversions. This is time-consuming and risks data inconsistency or loss during migration.

**Index Reconstruction:** Vector and reranking services typically rely on efficient index structures. Changing the integration solution, especially if it involves underlying vector database or model service changes, will almost certainly require rebuilding all related indexes. Index reconstruction is resource-intensive and time-consuming. For large knowledge bases, it can take hours or even days, during which the service may not provide full functionality.

**Downtime Window:** A certain degree of service interruption is an unavoidable cost when switching solutions. Whether online or offline migration, some downtime is needed. The duration depends on data volume, system complexity, and the maturity of the migration plan. To minimize business impact, this typically occurs during off-peak hours, but it still affects user experience and business continuity.

**Verification Workload:** This is a significant cost after switching solutions. After deploying a new integration solution, you must conduct comprehensive functional, performance, and stability testing. This includes:
*   Verifying model output meets expectations.
*   Ensuring performance metrics (e.g., response time, throughput) are met.
*   Checking system stability under high load.
*   Confirming seamless integration with existing business processes.

If the new solution introduces new proxy services or authentication mechanisms, you must also verify their correctness and security. The verification workload is substantial, requiring dedicated testing teams and ample time to ensure the reliability of the new solution.

**Development and Integration Costs:** These costs are also significant. Switching solutions may mean modifying substantial code, reconfiguring environment variables, or even adjusting system architecture. For example, moving from direct custom request address configuration to OneAPI integration requires deploying a OneAPI service and modifying platform configurations to point to OneAPI. This involves new dependency management, deployment processes, and potential compatibility issues.

## When this decision can wait
Under certain specific conditions, you can postpone the selection of a self-hosted inference service integration solution.

First, **if the platform's built-in model services meet all current business needs**, you do not need to integrate self-hosted services. If the platform's chat, vector, and reranking models meet performance, cost, and functional expectations without obvious bottlenecks or deficiencies, introducing external self-hosted services only adds unnecessary complexity and maintenance costs.

Second, **if business requirements for model capabilities are unclear or in an exploratory phase**, you can delay the decision. For example, if model requirements for new features or products are still in the Proof-of-Concept (PoC) stage, or if expected model performance is not yet quantified, investing resources in self-hosted service integration selection might lead to wasted effort if requirements change. Use existing platform capabilities for rapid iteration and validation; consider integration once requirements are clear.

Third, **if your organization lacks mature self-hosted inference services or relevant operational capabilities**, do not rush integration. Self-hosted services require specialized teams for development, deployment, monitoring, and maintenance. If these capabilities are not established, or if the self-hosted service itself lacks stability, integrating it into a production environment will introduce more risks and uncertainties, potentially affecting overall system stability. In this situation, building internal technical capabilities is a more reasonable priority.

Finally, **if budget or resources are limited**, you can also choose to postpone this decision. Self-hosted service integration often involves additional hardware investment, development personnel costs, and long-term maintenance expenses. If your current project budget is tight, or team resources are limited, forcing integration may lead to project delays or quality degradation. In such cases, prioritize ensuring the normal operation of core business, and plan for integration when resources are sufficient.

## Keep reading

- [Chunking by Document Type: How Each Class Splits and What Values to Use](/en/guide/chunking-strategy-selection)
- [When an Index Must Be Rebuilt: Triggers, Cost and Migration Paths](/en/guide/index-rebuild-and-migration)

## References

- [FastGPT environment variables](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- [FastGPT Docker Compose deployment](https://doc.fastgpt.cn/zh-CN/self-host/deploy/docker)

## Next steps

The criteria above can be checked against public documentation and a test deployment. To decide against a specific workload, data boundary and operations setup, contact sales for an assessment; the cloud service can be used first to validate feasibility before choosing a deployment form.

- Contact sales: assess the choice against your conditions
- Get started: validate feasibility on the cloud service
- Pricing: compare what each form covers
