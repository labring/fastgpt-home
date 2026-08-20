---
title: FastGPT自部署服务的环境变量参数与配置说明
slug: /zh/deploy/fastgpt-self-host-env-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/config/env
source_type: 官方文档
---

# FastGPT自部署服务的环境变量参数与配置说明

FastGPT 自部署服务的环境变量分为共享变量与各服务专属变量，其中共享变量由 `packages/service/env.ts` 校验，适用于主应用服务（`projects/app`）和商业版 Admin 服务（`pro/admin`），代码沙箱服务（`projects/code-sandbox`）则有专属配置项。需注意，共享布尔变量使用 `true`、`1`、`yes` 或 `y` 表示开启，其他值视为关闭；`FILE_TOKEN_KEY`、`AES256_SECRET_KEY` 与 `INVOKE_TOKEN_SECRET` 为运行期必填项，建议使用随机强密钥，切勿使用示例值。

## 核心共享环境变量说明
基础与密钥类变量包含数据库连接池、索引管理、系统密钥等配置：`DB_MAX_LINK` 默认值为5，用于设置 MongoDB、PG、OceanBase、openGauss 等数据库的连接池最大连接数；`SYNC_INDEX` 默认值为 `true`，启动时会自动创建缺失的 MongoDB 索引并清理显式声明的废弃索引，关闭后需自行维护索引；`ROOT_KEY` 默认值为 `fastgpt_root_key`，是系统管理员 API 密钥，可用于调用 `/api/admin/**` 接口，长度至少6位。服务地址类变量则用于配置第三方服务对接：`PLUGIN_BASE_URL` 默认值为 `http://localhost:3004`，是 FastGPT Plugin 服务地址；`CODE_SANDBOX_URL` 默认值为 `http://localhost:3002`，是代码沙箱服务地址，App 调用沙箱时使用的认证 Token 需与沙箱服务的 `SANDBOX_TOKEN` 保持一致。

## 快速配置与注意事项
可按照以下步骤完成基础配置：
1. 生成必填密钥：使用随机强字符串生成 `FILE_TOKEN_KEY`（至少6位）、`AES256_SECRET_KEY`（至少6位）、`INVOKE_TOKEN_SECRET`（至少32位），避免使用示例值；
2. 配置基础服务地址：根据部署架构修改 `PLUGIN_BASE_URL`、`CODE_SANDBOX_URL` 为内部服务实际地址，确保 `CODE_SANDBOX_TOKEN` 与沙箱服务配置一致；
3. 按需配置商业版服务：若使用 `pro/admin`，需配置 `PRO_URL` 和对应的 `PRO_TOKEN`，且需与商业版服务配置保持一致；
4. 注意边界场景：未配置 AI Proxy 时，会使用默认的 `OPENAI_BASE_URL` 地址，需搭配 `CHAT_API_KEY` 使用；Agent Sandbox 需指定提供方并填写对应必填变量，否则不会启用沙箱功能。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
