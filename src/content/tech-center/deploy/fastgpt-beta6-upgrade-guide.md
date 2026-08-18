---
title: FastGPT V4.15.0-beta6版本升级步骤与配置说明
slug: /zh/deploy/fastgpt-beta6-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41506
source_type: 官方文档
---

# FastGPT V4.15.0-beta6版本升级步骤与配置说明

## 版本变更要点
本版本存在多处关键配置变更与数据迁移需求。首先，对话标题生成模型的配置方式调整：不再通过环境变量`CHAT_TITLE_MODEL`配置，升级后可在「模型配置」的「默认模型配置」中选择「对话标题模型」，未配置时将使用用户问题截断作为标题。若此前配置过该环境变量，升级后需从`fastgpt`和`fastgpt-pro`的环境变量中移除，并在页面重新选择对应模型。其次，本版本将Skill Edit对话迁移至标准Chat存储模型，需执行专属初始化接口完成旧数据迁移。此外，Agent Sandbox新增包管理镜像源配置，可提升私有网络或跨境环境下依赖安装的稳定性。

## 升级操作步骤
1.  移除旧环境变量：若配置过`CHAT_TITLE_MODEL`，需从服务环境变量中删除该参数。
2.  执行数据迁移接口：先执行dry-run模式统计数据，确认无误后再执行正式迁移。该接口仅用于本次升级迁移，不对外作为OpenAPI接口。命令如下：
    ```bash
    # 统计模式
    curl -X POST https://你的域名/api/admin/4150/init4150-beta6 \
    -H Content-Type: application/json \
    -H rootkey: 你的ROOT_KEY \
    -d { "dryRun":true }
    ```
    确认统计结果无误后，将`dryRun`改为`false`执行正式迁移。注意该接口不支持仅传递部分Skill ID，需全量扫描skills表以避免sandbox实例误标。
3.  更新镜像版本：需更新以下镜像的tag：`fastgpt-app`、`fastgpt-pro`为`v4.15.0-beta6`；`fastgpt-plugin`为`v1.0.0-beta6`；`aiproxy`为`v0.6.2`。若启用Agent Sandbox，需同步更新`fastgpt-agent-sandbox-proxy`和`fastgpt-agent-sandbox`为`v0.2.0-beta3`。
4.  可选配置镜像源：若需配置包管理镜像源，可添加以下环境变量：
    ```env
    AGENT_SANDBOX_NPM_REGISTRY = # Agent Sandbox内npm/yarn/pnpm/bun镜像源
    AGENT_SANDBOX_PYPI_INDEX_URL = # Agent Sandbox内pip/uv镜像源
    ```
    该配置会按内容hash缓存，仅在配置变化时重新写入sandbox runtime state。

## 升级注意事项
本次升级存在两项关键风险与注意点：一是LLM请求追踪记录（`llm_request_records`）新增`teamId`字段，需注意后续相关数据的兼容性；二是数据迁移接口不会回填历史App Chat的`sourceType`字段，且仅会清理旧Skill Debug对话数据与异常sandbox实例。对于无有效归属的orphan sandbox，仅在非dry-run模式下会删除远端资源、归档文件与Mongo记录，dry-run模式仅统计数量。此外，配置Agent Sandbox镜像源仅会在sandbox初始化时写入镜像配置，不影响已运行的sandbox实例。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41506)
