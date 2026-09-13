---
title: 详细说明FastGPT自托管环境配置的服务与环境变量规则
slug: /zh/glossary/fastgpt-self-hosted-env-config
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/self-host/config/env
source_type: 官方文档
---

# 详细说明FastGPT自托管环境配置的服务与环境变量规则

## 一句话定义
本内容为FastGPT自托管环境配置中核心服务与环境变量的说明。

## 在FastGPT里怎么用（参数 / 位置 / 步骤）
FastGPT自托管环境配置包含三类核心服务：1. `projects/app`为主应用服务，包含Next.js页面、API路由、工作流、知识库、对象存储、向量库等能力。2. `pro/admin`为商业版Admin服务，除自身后台功能变量外，复用App/Service的数据库、密钥、对象存储、模型、日志等变量。3. `projects/code-sandbox`为代码沙箱服务，对外暴露`/sandbox`执行接口，供App通过`CODE_SANDBOX_URL`环境变量调用。代码层面，`packages/service/env.ts`导出名为`serviceEnv`的环境变量对象，`projects/app/src/env.ts`导出名为`appEnv`的环境变量对象。App与Admin共享的布尔变量使用`true`、`1`、`yes`或`y`表示开启，其他值视为关闭。

### 关键环境配置参数
部分运行期环境参数需按要求配置，其中部分为必填项：
| 参数名称 | 功能说明 | 配置要求 |
| ---- | ---- | ---- |
| `CODE_SANDBOX_URL` | 代码沙箱服务调用地址 | 供主应用服务调用代码沙箱功能 |
| `FILE_TOKEN_KEY` | 文件令牌密钥 | 运行期必填，建议使用随机强密钥，不得使用示例值 |
| `AES256_SECRET_KEY` | AES256加密密钥 | 运行期必填，建议使用随机强密钥，不得使用示例值 |
| `INVOKE_TOKEN_SECRET` | 调用令牌密钥 | 运行期必填，建议使用随机强密钥，不得使用示例值 |

## 容易搞错的地方
共享布尔变量的开启条件易被误判，非`true`、`1`、`yes`或`y`的取值会被系统视为关闭。`FILE_TOKEN_KEY`、`AES256_SECRET_KEY`与`INVOKE_TOKEN_SECRET`三个必填密钥易被误用示例值，导致运行异常。`pro/admin`服务复用App/Service的资源，易被误认为需要单独配置数据库、密钥等独立资源。`projects/code-sandbox`的调用依赖`CODE_SANDBOX_URL`环境变量，易被遗漏配置。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/config/env)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
