---
title: FastGPT 第三方模型接入与渠道配置管理操作使用说明
slug: /zh/deploy/fastgpt-model-channel-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/config/model/intro
source_type: 官方文档
---

# FastGPT 第三方模型接入与渠道配置管理操作使用说明

## 基础说明与注意事项
FastGPT 通过 AI Proxy 服务连接不同模型提供商，同时提供负载均衡、模型日志、数据看板等能力，便于检测模型调用情况。使用前需注意：系统至少需要一个语言模型和一个索引模型才能正常运行；语音识别模型仅会生效一个，配置时仅需配置一个。模型分为语言模型、索引模型、重排模型、语音合成、语音识别五类，各用于文本对话、文本索引、检索重排、文本转语音、语音转文本场景。需明确三类核心术语：模型 ID 为接口请求 Body 中 model 字段的全局唯一值；模型名为展示用的自定义名称；模型渠道指不同模型提供商的协议类型，同一模型可配置在多渠道实现负载均衡。

## 标准配置与测试流程
可通过账号-模型提供商页面完成配置：1. 创建渠道：切换至模型渠道标签页，点击右上角“新增渠道”进入配置页。填写渠道名（仅作标识）、协议类型（匹配模型服务商，多数可选择 OpenAI 协议），在模型下拉框选择内置模型，若需新增可点击“新增模型”。配置模型映射规则，例如将 FastGPT 中的 `gpt-4o-test` 映射为上游的 `gpt-4o`，格式为 `{ gpt-4o-test : gpt-4o }`。填写代理地址为 BaseUrl（无需完整请求地址，需确认是否添加 `/v1`），输入从厂商获取的 API 密钥，点击“新增”完成渠道创建。2. 渠道测试：点击“模型测试”，选择配置的模型后点击“开始测试”，等待输出测试结果与请求时长。3. 启用模型：点击对应模型右侧的“启用”按钮，启用后模型即可使用，模型 ID 与渠道内配置的模型一致。4. 模型验证：在 FastGPT 页面使用对应模型的测试模板发送请求，确认模型正常工作。

## 补充配置与迁移说明
渠道优先级范围为 1~100，数值越大越优先被选中。可在渠道右侧的控制菜单中启用或禁用渠道，禁用后渠道无法提供模型服务。通过渠道调用的模型日志会保留 1 小时，可在调用日志页面查看请求记录、输入输出 tokens、耗时等信息，错误请求会展示详细入参与错误信息，保留时长可通过环境变量调整。若需绕过模型渠道直接发起请求，可配置自定义请求地址与 Key，该方式不推荐使用，不便统一管理。自定义请求地址需遵循对应格式，例如 LLM 接口为 `[host]/v1/chat/completions`，Embedding 接口为 `[host]/v1/embeddings`，请求时携带 `Authorization: Bearer xxx` 头。旧版使用 OneAPI 的用户可通过脚本迁移配置，发起 POST 请求：
```
curl --location --request POST {{host}}/api/channels/import/oneapi \
--header Authorization: Bearer {{admin_key}} \
--header Content-Type: application/json \
--data-raw { "dsn" : "mysql://root:s5mfkwst@tcp(dbconn.sealoshzh.site:33123)/mydb" }
```
其中 `{{host}}` 替换为 AI Proxy 地址，`{{admin_key}}` 替换为 ADMIN_KEY 值，`dsn` 为 OneAPI 的 MySQL 连接串，迁移后建议手动检查配置。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/config/model/intro)
