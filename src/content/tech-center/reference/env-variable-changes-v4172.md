---
title: FastGPT 环境变量变化表：v4.16.2 → v4.17.2
slug: /zh/reference/env-variable-changes-v4172
page_type: 基准数据页
source_type: 官方文档
source: https://doc.fastgpt.cn/zh-CN/self-host/config/env
description: 对比 FastGPT v4.16.2 与 v4.17.2 两个发布版本的官方环境变量说明：新增 5 项、移除 2 项、默认值变化 4 项，逐项回到源码核对。
language: zh
check_day: 2026-10-13
---

# FastGPT 环境变量变化表：v4.16.2 → v4.17.2

本页逐行比对 FastGPT v4.16.2 与 v4.17.2 两个发布版本的官方环境变量说明，列出新增、移除与默认值有变化的变量，并把每一项回到 v4.17.2 的开源仓库源码（共 12 个 `env.ts` 定义文件）核对。

| 变化类型 | 数量 |
| --- | --- |
| 新增 | 5 |
| 移除 | 2 |
| 默认值变化 | 4 |
| 说明文字有更新 | 4 |

## 新增的变量（5 项）

| 变量 | 所属分组 | 默认值 | 说明 | 源码核对 |
| --- | --- | --- | --- | --- |
| `DEFAULT_TEAM_BASIC_PERMISSIONS_ENABLED` | 功能开关与限制 | `false` | 新建团队时是否为默认全员组授予应用、Skill 和知识库创建权限，不影响已有团队。FastGPT 与 Pro Admin 服务应保持配置一致。 | 一致 |
| `DISABLE_MARKETPLACE` | App 额外变量 | `false` | 是否隐藏插件市场安装入口；设为 `true` 时仅保留本地文件安装。 | 一致 |
| `FILE_URL_EXPIRED_DAYS` | 域名、前端与运行时 | `90` | 聊天记录中持久化文件访问短链的有效期，单位天，支持小数。 | 一致 |
| `SYSTEM_MIGRATION_BATCH_SIZE` | 功能开关与限制 | `100` | 系统迁移任务每批处理的记录数，范围 `50`～`1000`。 | 一致 |
| `SYSTEM_MIGRATION_DELAY_SECONDS` | 功能开关与限制 | `0` | 配置了 delay 的系统迁移任务延迟执行时间，单位秒，默认 `0` 为不延迟。 | 一致 |

## 默认值有变化的变量（4 项）

| 变量 | v4.16.2 默认值 | v4.17.2 默认值 | 源码核对 |
| --- | --- | --- | --- |
| `AIPROXY_API_ENDPOINT` | 空 | 无，**必填** | 源码无默认值，与「必填」一致 |
| `AIPROXY_API_TOKEN` | 空 | 无，**必填** | 源码无默认值，与「必填」一致 |
| `DB_MAX_LINK` | `5` | `10` | 一致 |
| `SANDBOX_POOL_SIZE` | `20` | `5` | 一致 |

## 说明文字有更新的变量（4 项）

| 变量 | v4.17.2 说明 |
| --- | --- |
| `AIPROXY_API_ENDPOINT` | AI Proxy 服务根地址，例如 `http://aiproxy:3000`，不要附加 `/v1`。 |
| `AIPROXY_API_TOKEN` | AI Proxy 管理员 Token，必须与服务端配置一致且不能为空。 |
| `CHECK_INTERNAL_IP` | 是否启用内网 IP 检查，用于降低 SSRF 风险。仅作用于用户或工作流可控的出站 URL；部署方配置的服务地址（SSO/外部用户系统、模型地址、飞书/钉钉/语雀基础地址、自定义 PDF 解析、自定义安全校验、快速登录、对话日志、短信代理、发票 Webhook、企业认证等）不受影响。 |
| `DB_MAX_LINK` | MongoDB、PG、OceanBase、openGauss 等数据库连接池最大连接数，自动限制在 10～1000。 |

## 从说明中移除的变量（2 项）

| 变量 | v4.16.2 所属分组 | v4.16.2 说明 | v4.17.2 的 env.ts 定义中 |
| --- | --- | --- | --- |
| `CHAT_API_KEY` | 服务地址与集成 | 未配置 AI Proxy Token 时，兼容 OpenAI 协议的默认模型 API Key。 | 已无定义 |
| `OPENAI_BASE_URL` | 服务地址与集成 | 未配置 AI Proxy 时，兼容 OpenAI 协议的默认模型接口地址。 | 已无定义 |

## 怎么读这张表

1. 「源码核对」一列是把变量名回到 v4.17.2 的 `env.ts` 定义里查 `.default(...)` 的结果：「一致」表示源码默认值与文档相同；「开源 env.ts 未定义」多为商业版服务读取的变量，或由其他模块直接读取，开源仓库的定义文件里没有它。
2. 「从说明中移除」指该变量不再出现在 v4.17.2 的官方说明里；「仍有定义」的变量可能只是改了说明位置或仍有兼容读取；「已无定义」只说明 env.ts 定义文件里没有它，升级前按实际部署核对。
3. 升级时先看「移除」与「默认值变化」两节：依赖旧默认值的部署，在升级后行为可能改变。

## 这张表的适用范围

数值取自 FastGPT v4.16.2 与 v4.17.2 两个发布版本的官方文档与开源仓库源码。私有化部署以实际配置文件为准；商业版服务的变量以商业版文档为准。完整变量清单见环境变量说明。

## 来源

- [FastGPT 环境变量说明（现行文档）](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- [FastGPT v4.16.2 service 环境变量定义](https://github.com/labring/FastGPT/blob/v4.16.2/packages/service/env.ts)
- [FastGPT v4.16.2 app 环境变量定义](https://github.com/labring/FastGPT/blob/v4.16.2/projects/app/src/env.ts)
- [FastGPT v4.16.2 code-sandbox 环境变量定义](https://github.com/labring/FastGPT/blob/v4.16.2/projects/code-sandbox/src/env.ts)
- [FastGPT v4.17.2 service 环境变量定义](https://github.com/labring/FastGPT/blob/v4.17.2/packages/service/env.ts)
- [FastGPT v4.17.2 app 环境变量定义](https://github.com/labring/FastGPT/blob/v4.17.2/projects/app/src/env.ts)
- [FastGPT v4.17.2 code-sandbox 环境变量定义](https://github.com/labring/FastGPT/blob/v4.17.2/projects/code-sandbox/src/env.ts)
