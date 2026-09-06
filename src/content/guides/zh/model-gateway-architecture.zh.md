<!--
Delivery metadata (not published with the body)
slug: model-gateway-architecture
locale: zh
canonical: https://fastgpt.cn/guide/model-gateway-architecture
hreflang: zh-CN | zh-CN → https://fastgpt.cn/guide/model-gateway-architecture | en → https://fastgpt.io/guide/model-gateway-architecture | x-default → https://fastgpt.io/guide/model-gateway-architecture
Meta title: FastGPT 模型网关架构：渠道路由、凭据与故障验收
Meta description: 说明 FastGPT 模型网关与自定义端点的请求路径，梳理渠道配置、OneAPI 导入、凭据管理和失败场景，形成可交接的接入验收清单。
keywords: FastGPT,model,gateway,architecture
结构化数据: Article + BreadcrumbList
内链: FastGPT 私有化部署就绪度：六项上线条件与验收清单 / FastGPT 本地模型 TCO：接入验收、容量与任务成本
配图需求: Text and accessible tables; no image is required for this release.
发布批次: Week07
-->

# FastGPT 模型网关架构：路由、凭据与故障处理

模型网关把应用使用的模型名称映射到具体服务商、部署地址和凭据。设计时应同时考虑聊天、embedding、重排及其他模型类型，让应用能够使用稳定名称，并让运维人员定位一次请求实际经过的渠道。

FastGPT 的官方模型配置文档介绍了 AIProxy 的渠道管理、负载均衡、模型日志与看板。向量模型服务负责生成 embedding；模型网关负责请求路由。为两类服务分别配置容量和健康检查，才能清楚判断请求失败发生在哪一层。

## 画出一条请求路径

一条典型路径是：FastGPT 应用选择模型 → 模型配置决定请求地址或网关 → 网关选择渠道 → 上游模型服务返回结果。每一层都应能对应到模型标识、请求时间和响应状态。

| 配置对象 | 需要确认的内容 | 验收方法 |
| --- | --- | --- |
| 应用模型名称 | FastGPT 中的模型标识与上游标识映射 | 同一应用调用时能找到实际渠道 |
| 网关渠道 | 地址、鉴权、可用模型与启停状态 | 对每个渠道独立发送最小请求 |
| 请求格式 | 消息、流式响应、工具调用与其他参数 | 使用业务实际使用的参数组合测试 |
| 模型预算 | 输入上限、输出预算与应用超时 | 测试长输入、长输出与慢请求 |
| 运维记录 | 请求状态、延迟、用量与关联标识 | 从应用错误定位到上游响应 |

## 明确直连与网关路由

FastGPT 模型配置中的字段使用 `requestUrl` 与 `requestAuth`。配置完整的自定义请求 URL 后，请求可以走该地址，绕过模型渠道选择。需要统一渠道管理时，应在接入验收中确认实际请求路径。

为每个渠道配置独立凭据，限定其可访问的模型和使用范围。凭据通过部署环境或管理配置维护，导出配置和日志时进行脱敏。第三方接口支持的参数需要逐项验证，尤其是流式结束事件、工具调用结构和图片输入。

## 迁移已有 OneAPI 配置

官方文档给出了显式导入 OneAPI 渠道的接口：`POST /api/channels/import/oneapi`。迁移前备份原配置，准备导入所需的管理信息；导入后逐条检查代理地址、模型和 API Key 的映射，再启用业务流量。

先通过一个测试应用验证普通聊天与流式聊天，再加入业务需要的工具调用和长上下文。原渠道保留到目标渠道通过验收，切换时记录应用绑定与恢复方法。导入后的配置正确性应由实际请求确认。

## 设计失败处理

为连接失败、鉴权失败、限流、模型报错和超时分别定义动作。仅在请求具备可安全重试条件时重试；具有外部副作用的工具执行需要单独控制重复调用。多渠道切换也应检查输出格式和能力是否一致。

测试时主动停止一个测试渠道，观察实际请求分配与错误返回。为长响应记录首个输出耗时和完整响应耗时；为 embedding 与重排记录输入量、延迟和失败比例。对同一问题使用相同输入进行重复测试，避免把输入变化归因于路由策略。

## 上线验收表

每种模型至少覆盖成功、错误凭据、限流或过载、超时、上游异常响应五类场景。验收记录应包含模型名称、实际渠道、请求类型、结果、延迟与恢复动作。用一条失败请求演示从应用到网关再到上游的定位过程，形成运维交接材料。

## 继续阅读

- [FastGPT 私有化部署就绪度：六项上线条件与验收清单](https://fastgpt.cn/guide/private-deployment-readiness)
- [FastGPT 本地模型 TCO：接入验收、容量与任务成本](https://fastgpt.cn/guide/local-model-tco)

## 参考资料

- [FastGPT 模型配置与 OneAPI 迁移](https://doc.fastgpt.cn/zh-CN/self-host/config/model/intro)
- [AIProxy 官方仓库](https://github.com/labring/aiproxy)
- [FastGPT embedding 请求实现](https://github.com/labring/FastGPT/blob/2bab5c1e06c46362f40a454d49d963e8bf0c62bc/packages/service/core/ai/embedding/index.ts)
