<!--
Delivery metadata (not published with the body)
slug: model-gateway-architecture
locale: en
canonical: https://fastgpt.io/guide/model-gateway-architecture
hreflang: en | zh-CN → https://fastgpt.cn/guide/model-gateway-architecture | en → https://fastgpt.io/guide/model-gateway-architecture | x-default → https://fastgpt.io/guide/model-gateway-architecture
Meta title: FastGPT Model Gateway Architecture and Routing Guide
Meta description: Plan FastGPT model routing, direct endpoints, channel credentials, OneAPI imports, and failure tests with an operational checklist for model integration.
keywords: FastGPT,model,gateway,architecture
结构化数据: Article + BreadcrumbList
内链: FastGPT Private Deployment Readiness and Launch Checks / FastGPT Local Model TCO, Capacity and Integration Guide
配图需求: Text and accessible tables; no image is required for this release.
发布批次: Week07
-->

# FastGPT Model Gateway Architecture: Routing and Operations

A model gateway maps the model name used by an application to an upstream provider, endpoint, and credential. Design the integration for chat, embedding, reranking, and other required model types. Applications need stable names, while operators need a way to identify the channel that handled a request.

FastGPT's model configuration documentation describes AIProxy channel management, load balancing, model logs, and dashboards. An embedding service generates vectors; a gateway routes requests. Give each service its own capacity assumptions and health checks so failures can be located precisely.

## Trace a complete request

A typical request follows this path: the FastGPT application selects a model, its configuration chooses a direct endpoint or gateway, the gateway selects a channel, and the upstream model returns a response. Associate each hop with a model identifier, request time, and response status.

| Configuration | What to confirm | Acceptance check |
| --- | --- | --- |
| Application model name | Mapping between FastGPT and upstream identifiers | Identify the actual channel used by an application |
| Gateway channel | Endpoint, authentication, enabled models, and status | Send a minimal request through each channel |
| Request format | Messages, streaming, tool calls, and optional parameters | Test the combinations used in the business workflow |
| Request budget | Input limits, output budget, and application timeout | Exercise long inputs, long outputs, and slow responses |
| Operational records | Status, latency, usage, and correlation identifiers | Trace an application failure to its upstream response |

## Make direct routing explicit

The FastGPT configuration fields are named `requestUrl` and `requestAuth`. A complete custom request URL can send traffic directly to that address, bypassing model-channel selection. Confirm the route actually used when centralized channel management is a requirement.

Use separate channel credentials and restrict their model access and scope. Manage secrets through the deployment environment or administrative configuration, and redact exported configurations and logs. Validate provider compatibility parameter by parameter, especially streaming termination, tool-call structures, and image inputs.

## Import existing OneAPI channels deliberately

The official documentation provides an explicit OneAPI import endpoint: `POST /api/channels/import/oneapi`. Back up the original configuration and prepare the required management information. After import, inspect each proxy address, model mapping, and API Key before routing business traffic through the new channels.

Use a test application to exercise ordinary and streaming chat, followed by the required tool calls and long-context requests. Retain the original channel until the replacement passes. Record application bindings and the restoration procedure at cutover. Successful requests provide the evidence that imported settings work.

## Define failure behavior

Specify separate actions for connection failures, authentication errors, rate limits, model errors, and timeouts. Retry only when the request can be repeated safely. Tool execution with external side effects requires its own duplicate-execution controls. Channel failover should also preserve the response format and capabilities expected by the application.

Disable a test channel and observe actual request allocation and errors. For long responses, record time to first output and total response time. For embedding and reranking, record input volume, latency, and failure rate. Keep inputs fixed when comparing routing behavior.

## Hand over an operational acceptance record

For each model type, cover success, invalid credentials, rate limiting or overload, timeout, and an abnormal upstream response. Record the configured model, actual channel, request type, outcome, latency, and recovery action. Demonstrate how an operator traces one failed request from the application through the gateway to the provider.

## Related guides

- [FastGPT Private Deployment Readiness and Launch Checks](https://fastgpt.io/guide/private-deployment-readiness)
- [FastGPT Local Model TCO, Capacity and Integration Guide](https://fastgpt.io/guide/local-model-tco)

## References

- [FastGPT model configuration and OneAPI migration](https://doc.fastgpt.cn/zh-CN/self-host/config/model/intro)
- [AIProxy official repository](https://github.com/labring/aiproxy)
- [FastGPT embedding request implementation](https://github.com/labring/FastGPT/blob/2bab5c1e06c46362f40a454d49d963e8bf0c62bc/packages/service/core/ai/embedding/index.ts)
