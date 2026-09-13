---
title: FastGPT Agent沙箱的配置、镜像源设置及迁移流程说明
slug: /zh/glossary/agent-sandbox-config-migration
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/self-host/config/sandbox/opensandbox
source_type: 官方文档
---

# FastGPT Agent沙箱的配置、镜像源设置及迁移流程说明

## 一句话定义
Agent沙箱是FastGPT中运行Agent任务的隔离运行环境，支持配置依赖源与执行数据迁移。

## 在 FastGPT 里怎么用
### 依赖源配置
环境变量`AGENT_SANDBOX_PYPI_INDEX_URL`适用于所有运行态镜像。`AGENT_SANDBOX_APT_MIRROR`仅对root权限的Agent沙箱有效，需配置为apt仓库根地址，不可填写至`dists`或具体版本目录。Ubuntu不同架构需选择对应镜像：amd64/x86_64使用`https://mirrors.tuna.tsinghua.edu.cn/ubuntu`，arm64/aarch64使用`https://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports`。配置后系统会读取沙箱的`/etc/os-release`，根据Ubuntu版本和codename生成并覆盖`/etc/apt/sources.list.d/ubuntu.sources`，原有文件会备份为`.copy`；删除环境变量后，有备份的文件会恢复，无备份的保持不变，初始化阶段不会执行`apt-get update`。

### 数据迁移
升级迁移Agent沙箱数据时，可通过`dryRun`参数控制。当`dryRun: true`时，重点关注`normalization.pendingCount`，该字段为待处理数据总数，需为0才可开始正式迁移。若该值大于0，可通过`normalization.sandboxPendingCount`、`normalization.legacyDebugChatCleanup.pendingChatCount`和`normalization.legacyDebugChatCleanup.list`定位待处理数据，此时`normalizationBlocked`为`true`，不会进入后续流程。当`dryRun: false`时，需确认`normalization.pendingCount`为0、`normalizationBlocked`为`false`且`failedCount`为0，才算迁移成功。若接口返回超时，不代表迁移失败，需等待原任务结束后重试，任务锁占用时需稍后再试。

## 容易搞错的地方
1. `AGENT_SANDBOX_APT_MIRROR`不可填写至`dists`或具体版本目录，必须为apt仓库根地址。
2. Ubuntu不同架构需选择对应镜像源，amd64和arm64的镜像地址不可混用。
3. `dryRun: true`仅用于前置清洗统计，不能用于判断正式迁移的`failedCount`、`failures`或`skipped`字段。
4. 正式迁移失败时需查看`failedCount`和`failures`字段，前置清洗失败需查看`normalization.failures`。
5. `skippedCount > 0`不代表迁移失败，但未完成所有遗留记录的迁移。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/config/sandbox/opensandbox)

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-16/4160)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
