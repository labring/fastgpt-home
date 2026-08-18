---
title: FastGPT多类型AI模型的配置流程与使用注意事项
slug: /zh/deploy/fastgpt-model-configuration
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/config/model/intro
source_type: 官方文档
---

# FastGPT多类型AI模型的配置流程与使用注意事项

FastGPT 借助 AI Proxy 服务可连接各类 AI 模型提供商，同时提供负载均衡、模型日志、数据看板等能力，便于检测模型调用情况。使用前需注意：语音识别模型仅需配置一个即可生效；系统至少需要一个语言模型和一个索引模型才能正常运行。模型分为语言模型（支持文本对话与多模态图片识别）、索引模型（文本块索引检索）、重排模型（优化检索排名）、语音合成、语音识别五类。需明确三类核心术语：模型 ID 为接口请求 Body 中 model 字段的全局唯一值；模型名为展示用自定义名称；模型渠道指不同模型提供商的协议类型，同一模型可配置到多渠道实现负载均衡；自定义请求地址/Key 不推荐使用，不便统一管理。

## 标准配置步骤
1. **创建渠道**：进入「账号-模型提供商」页面，切换到「模型渠道」标签页，点击右上角「新增渠道」。以阿里百炼模型为例，需填写：渠道名（仅作标识）、协议类型（匹配模型服务商，多数支持 OpenAI 协议）、模型（可选择内置或点击「新增模型」添加自定义模型）、模型映射（如 `{"gpt-4o-test": "gpt-4o"}`，将 FastGPT 请求的模型映射为上游实际使用的模型）、代理地址（仅填写 BaseUrl，需注意添加 `/v1`）、API 密钥（从模型厂商获取的凭证，部分厂商需多密钥组合），完成后点击「新增」。
2. **渠道测试**：点击「模型测试」，选择配置的模型点击「开始测试」，等待输出测试结果与请求时长。
3. **启用模型**：系统内置主流厂商模型，可直接点击「启用」，模型 ID 需与「模型渠道」中配置的模型一致。
4. **模型测试**：在 FastGPT 页面对应模型分类下可发起简单测试，验证模型是否正常工作。

## 额外配置与维护
渠道优先级范围为 1~100，数值越高越优先被选中；可在渠道右侧控制菜单启用或禁用渠道，禁用后无法提供服务。模型调用日志会保留 1 小时（可通过环境变量调整），记录请求输入输出 Token、耗时、地址等信息，错误请求会展示详细入参与报错信息。若需部署私有 ReRank 模型，可点击查看对应教程。自定义请求地址需填写完整接口路径，如 LLM 为 `[host]/v1/chat/completions`，请求时会携带 `Authorization: Bearer xxx` 头。旧版使用 OneAPI 的用户，可通过脚本迁移配置：执行以下命令，替换 `{{host}}` 为 AI Proxy 地址、`{{admin_key}}` 为 ADMIN_KEY 值、`dsn` 为 OneAPI 的 MySQL 连接串：
```
curl --location --request POST {{host}}/api/channels/import/oneapi \
--header Authorization: Bearer {{admin_key}} \
--header Content-Type: application/json \
--data-raw { "dsn" : "mysql://root:s5mfkwst@tcp(dbconn.sealoshzh.site:33123)/mydb" }
```
脚本仅做简单映射，迁移后需手动检查配置。易错点包括：新增模型时若模型 ID 与内置重复，会修改内置模型而非新增。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/config/model/intro)
