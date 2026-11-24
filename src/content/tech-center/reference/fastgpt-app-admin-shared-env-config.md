---
title: FastGPT App与Admin共享变量的服务地址与集成配置速查
slug: /zh/reference/fastgpt-app-admin-shared-env-config
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/config/env
source_type: 官方文档小节
---

# FastGPT App与Admin共享变量的服务地址与集成配置速查

## 结论
本文整理了FastGPT部署时App与Admin共享变量的服务地址与集成相关配置项。通过这些参数可完成插件、代码沙箱、第三方平台等服务的集成配置。

## 具体怎么做
可通过配置以下环境变量完成对应服务的集成：
| 变量名 | 默认值 | 说明 |
| --- | --- | --- |
| PLUGIN_BASE_URL | http://localhost:3004 | FastGPT Plugin 服务地址；部署模板通常会配置为内部 Plugin 服务地址。 |
| PLUGIN_TOKEN | token | 调用 Plugin 服务使用的认证 Token；需与 Plugin 服务配置一致。 |
| CODE_SANDBOX_URL | http://localhost:3002 | Code Sandbox 服务地址；部署模板通常会配置为内部 Code Sandbox 服务地址。 |
| CODE_SANDBOX_TOKEN | codesandbox | App 调用 Code Sandbox 时使用的认证 Token，需与沙箱服务 SANDBOX_TOKEN 一致。 |
| AIPROXY_API_ENDPOINT | 空 | AI Proxy 服务地址；配置后模型请求会优先走 AI Proxy。 |
| AIPROXY_API_TOKEN | 空 | 调用 AI Proxy 使用的认证 Token。 |
| OPENAI_BASE_URL | https://api.openai.com/v1 | 未配置 AI Proxy 时，兼容 OpenAI 协议的默认模型接口地址。 |
| CHAT_API_KEY | 空 | 未配置 AI Proxy Token 时，兼容 OpenAI 协议的默认模型 API Key。 |
| CRM_API_URL | 空 | 官网访客归因 CRM 的 API 基础地址（包含 /api/v1 ）；为空时不进行身份上报。 |
| CRM_API_KEY | 空 | CRM 管理 API Key，用于注册或登录成功后按 visitor_id 绑定 FastGPT 用户。 |
| MARKETPLACE_URL | https://v2.marketplace.fastgpt.cn | 插件市场接口地址。 |
| FEISHU_BASE_URL | https://open.feishu.cn | 飞书开放平台地址，私有化飞书可改为对应域名。 |
| DINGTALK_BASE_URL | https://api.dingtalk.com | 钉钉新版 API 基础地址。 |
| DINGTALK_OAPI_BASE_URL | https://oapi.dingtalk.com | 钉钉 OAPI 基础地址。 |
| YUQUE_DATASET_BASE_URL | https://www.yuque.com | 语雀知识库地址。 |

## 注意事项
1. 部分认证参数需与对应服务的配置保持一致，如PLUGIN_TOKEN需和Plugin服务配置一致，CODE_SANDBOX_TOKEN需和沙箱服务SANDBOX_TOKEN一致。
2. 配置AIPROXY_API_ENDPOINT后，模型请求会优先走AI Proxy；未配置时将使用OPENAI_BASE_URL和CHAT_API_KEY的默认配置。
3. CRM_API_URL为空时，不会进行官网访客身份上报。
4. 私有化飞书部署时，可修改FEISHU_BASE_URL为对应私有域名。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/config/env)
