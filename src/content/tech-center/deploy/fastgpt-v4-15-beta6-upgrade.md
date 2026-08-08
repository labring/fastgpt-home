---
title: FastGPT V4.15.0-beta6版本升级配置与数据迁移操作指南
slug: /zh/deploy/fastgpt-v4-15-beta6-upgrade
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41506
source_type: 官方文档
---

# FastGPT V4.15.0-beta6版本升级配置与数据迁移操作指南

## 版本变更说明
本次版本更新包含多处配置变更：对话标题生成模型不再通过`CHAT_TITLE_MODEL`环境变量配置，升级后可在「模型配置」的「默认模型配置」中选择「对话标题模型」，未配置时将使用用户问题截断作为标题。若此前配置过该环境变量，升级后需从fastgpt和fastgpt-pro的环境变量中移除，并在页面重新选择对应模型。此外，本版本将Skill Edit对话迁移至标准Chat存储模型，需执行专属初始化接口完成旧数据迁移。

## 升级与迁移操作步骤
1.  **配置更新**：移除旧环境变量`CHAT_TITLE_MODEL`，在系统页面完成对话标题模型的重新配置。如需配置Agent Sandbox包管理镜像源，可添加以下可选环境变量：
    - `AGENT_SANDBOX_NPM_REGISTRY`：配置npm/yarn/pnpm/bun使用的npm镜像源
    - `AGENT_SANDBOX_PYPI_INDEX_URL`：配置pip/uv使用的PyPI镜像源
2.  **数据迁移**：先确认新的Chat source索引已创建，执行以下dry-run模式的初始化接口统计迁移数据：
    ```bash
    curl -X POST https://你的域名/api/admin/4150/init4150-beta6 \
    -H "Content-Type: application/json" \
    -H "rootkey: 你的ROOT_KEY" \
    -d '{"dryRun":true}'
    ```
    返回结果确认无误后，将`dryRun`改为`false`执行正式迁移与清理：
    ```bash
    curl -X POST https://你的域名/api/admin/4150/init4150-beta6 \
    -H "Content-Type: application/json" \
    -H "rootkey: 你的ROOT_KEY" \
    -d '{"dryRun":false}'
    ```
3.  **镜像更新**：更新对应服务的镜像tag：fastgpt-app、fastgpt-pro为`v4.15.0-beta6`，fastgpt-plugin为`v1.0.0-beta6`，aiproxy为`v0.6.2`；启用Agent Sandbox时，需同步更新fastgpt-agent-sandbox-proxy和fastgpt-agent-sandbox为`v0.2.0-beta3`。

## 升级风险提示
本次升级中，LLM请求追踪记录（`llm_request_records`）新增`teamId`字段，实现团队隔离能力。需注意该接口仅用于本次升级迁移，不作为对外OpenAPI接口使用，且不会回填历史App Chat的sourceType字段。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41506
