---
title: Routing and Fallback Across Models: What to Split On, What to Fall Back To
slug: /en/guide/model-routing-and-fallback
page_type: Decision matrix
article_section: Selection & Evaluation
is_part_of: FastGPT Tech Center
meta_description: Compare model routing and fallback options for FastGPT, including latency, cost, context limits, failure handling, and migration checks.
delivery_source_type: Open-source repository docs and community threads
source_type: 深度场景内容
source: https://doc.fastgpt.cn/zh-CN/self-host/config/env
meta_title: Routing and Fallback Across Models: What to Split On, What to Fall Back To | FastGPT Technical Center
schema_type: TechArticle
date_published: 2026-09-28
date_modified: 2026-09-28
source_file: 决策矩阵页-第2批/英文-fastgpt.io/guide/model-routing-and-fallback.md
source_sha256: bdeacc70342827f496ab0459963e9e762bf7711618e2c1436703b46bd90ad9da
source_verified: 2026-09-14
publication_batch: W9
delivery_note: Criteria taken from the open-source repository and community threads, verified 2026-09-14.
---

# Routing and Fallback Across Models: What to Split On, What to Fall Back To

## When this decision has to be made
Define routing and fallback when using multiple models or channels and selecting call paths by business type, cost, or availability. Complex scheduling introduced too early adds operating costs; delayed planning can increase the impact of outages, timeouts, or QPS limits. High-cost models may also add unnecessary expense to simple QA workloads. Validate tool calling, multimodal capabilities, and response formats across primary and standby models. Changes to embedding models or vector databases require separate retrieval and index-migration assessment.

## Criteria matrix

These are optional routing designs. The selected gateway or workflow must implement and validate their triggers, monitoring, switching, and recovery. Measure latency and recovery speed in the intended deployment.
| Candidate Routing/Fallback Strategy | Supported Model Type Coverage | Configuration Implementation Difficulty | Routing Latency Overhead | Fault Recovery Speed | Component Compatibility | Observability Support |
|--------------------------------------|--------------------------------|------------------------------------------|--------------------------|----------------------|--------------------------|------------------------|
| Split by request business attribute | Validated models for tool calls, multimodal input, general QA, and other required capabilities | Medium: define request-to-model mappings | Depends on classification and rule execution | Depends on standby compatibility and switching implementation | Validate gateway or workflow support for model capabilities | Record request types and routing results; correlate business attributes with available usage records |
| Split by model performance metrics | Models exposing the required metrics | High: implement metric collection and rules | Depends on metric access and decision method | Depends on sampling, thresholds, and switching | Validate monitoring and gateway or workflow compatibility | Collect response times, error rates, and routing results using available logs and monitoring tools |
| Split by channel health status | Channels with validated authentication and calling capabilities | Depends on probes, error classification, and standby configuration | Depends on health probes and caching | Depends on timeouts, retries, and switching rules | Validate authentication, interfaces, and model capabilities | Record health, errors, and switching results against the actual AI Proxy or gateway capabilities |
| Split by resource load | Model services exposing node load and supporting scheduling | High: implement metrics and scheduling | Depends on metric access and rules | Depends on spare capacity and scheduling | Validate orchestration, gateway, and scheduling interfaces | Correlate resource metrics and request results; K8s metrics or other monitoring can supply inputs |
| Split by invocation cost | Models with comparable pricing and acceptable business quality | Medium: implement price mappings and budget rules | Depends on rules and cost calculation | Depends on standby compatibility and switching | Validate cost-rule support in the gateway or workflow | Track tokens, costs, and outcomes; usage records provide inputs to implemented routing rules |
| Hybrid multi-dimensional routing | Candidates validated for capabilities and interfaces | High: combine rules and conflict priorities | Depends on metrics and rule execution | Depends on priorities and recovery implementation | Validate metric and scheduling dependencies | Correlate business, performance, health, load, and cost data in dashboards and alerts |

## Why each criterion matters
### Supported model type coverage
Model coverage determines whether the strategy meets required capabilities. FastGPT v4.15.0 added multimodal audio and video input, and v4.8.20 supported DeepSeek reasoning output. Validate tool calls, input formats, and output processing for both primary and standby models. Retrieval components have separate constraints: existing Milvus deployments following the v4.16.2 upgrade require version 2.5.16 or later and the BM25 migration. Validate retrieval migration and model-call routing separately.

### Configuration implementation difficulty
FastGPT v4.17.0 requires AI Proxy. Set `AIPROXY_API_ENDPOINT` to the service root URL and provide a valid administrator `AIPROXY_API_TOKEN`. Validate basic model-channel configuration separately from dynamic business, performance, load, or cost routing. Dynamic rules, metrics, and switching behavior depend on the selected gateway or workflow implementation. When retaining another aggregation service, validate interfaces, authentication, and call-chain compatibility and assign configuration responsibilities to each layer.

### Routing latency overhead
Routing overhead depends on request classification, metric collection, caching, and rule execution. Measure time to first response and total duration at the target concurrency for either single- or multi-dimensional designs. Evaluate decision quality, timeouts, and queuing, and validate frontend optimizations separately from model-gateway performance.

### Fault recovery speed
Recovery capability depends on tested health probes, error classification, timeouts, retries, standby switching, and restoration policies. Include tool calling and streaming-response compatibility in validation. The v4.16.2 file-parser Worker scheduling changes concern file processing; measure model failure recovery through actual model-call tests.

### Component compatibility
Check compatibility across FastGPT, AI Proxy, model interfaces, and the monitoring or scheduling components in use. Follow target-version dependency and environment requirements. If retrieval changes are included, such as adding BM25 in an existing Milvus deployment, validate the Milvus version and migration separately. Handle other vector engines according to their supported features.

### Observability support
Observability allows operations teams to monitor routing operation status in real time. FastGPT v4.8.20 added usage record export and dashboard functions, v4.15.0 optimized team isolation for LLM request tracking. Routing strategies without observability cannot detect configuration errors or model anomalies in time, leading to problem escalation. For example, you cannot count the invocation frequency and error rate of each model, and cannot optimize routing rules to improve performance and reduce costs.

## The cost of switching later
Changing routing strategies requires channel, authentication, and rule updates, plus tests for business routing, fallback, tool calls, streaming, and cost tracking. Restart requirements and switching windows depend on the actual components; gradual traffic cutover can reduce impact. Added aggregation or monitoring components require clear dependencies and ownership. If embedding models or retrieval engines also change, plan backups and index migration separately. For an existing Milvus deployment adopting the v4.16.2 BM25 migration, follow the official procedure to migrate to `modeldata_v2` and validate retrieval results.

## When this decision can wait
For single-model, low-traffic testing, start with simple channel configuration and an acceptable failure-recovery procedure. FastGPT v4.17.0 still requires basic AI Proxy deployment and configuration. Add dynamic routing and standby channels as business types, traffic, or availability needs grow, while monitoring model health, timeouts, and costs.

## Keep reading

- [Releasing and Regression-Testing an App: Versions, Canary and Rollback](/en/guide/app-release-and-regression)
- [Where Files Live: Local Volumes, Object Storage and External S3](/en/guide/file-storage-selection)

## References

- [FastGPT v4.17.0 required AI Proxy dependency](https://github.com/labring/FastGPT/releases/tag/v4.17.0)
- [AI Proxy endpoint and token configuration](https://github.com/labring/FastGPT/blob/v4.17.0/document/content/self-host/config/env.mdx)
- [FastGPT v4.16.2 Worker changes and Milvus migration scope](https://github.com/labring/FastGPT/releases/tag/v4.16.2)

- [FastGPT environment variables](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- [FastGPT Docker Compose deployment](https://doc.fastgpt.cn/zh-CN/self-host/deploy/docker)

## Next steps

The criteria above can be checked against public documentation and a test deployment. To decide against a specific workload, data boundary and operations setup, contact sales for an assessment; the cloud service can be used first to validate feasibility before choosing a deployment form.

- [Contact sales](/en/contact): assess the choice against your conditions
- [Get started](/en/start): validate feasibility on the cloud service
- [Pricing](/en/price): compare what each form covers
