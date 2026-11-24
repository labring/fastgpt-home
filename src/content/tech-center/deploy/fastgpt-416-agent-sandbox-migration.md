---
title: 完成FastGPT 4.16版本Agent Sandbox数据迁移工作
slug: /zh/deploy/fastgpt-416-agent-sandbox-migration
page_type: 部署场景
source: https://doc.fastgpt.cn/self-host/upgrading/4-16/41601
source_type: 官方文档小节
---

# 完成FastGPT 4.16版本Agent Sandbox数据迁移工作

### 变更说明与迁移前提
本版本将 App Chat 的 Agent Sandbox 从“每个对话一个实例”调整为“同一 App、同一用户共享一个实例”。不同对话的文件仍分别保存在 sessions/&lt;chatId&gt; 目录中，已发布 Skill 则统一保存在共享的 projects 目录中。仅此前启用过 Agent Sandbox 的环境需要执行本节迁移步骤，未启用过的环境可直接跳过。

### 迁移操作步骤
首先执行 dry-run 命令，查看 beta6 Sandbox 字段归一化和旧 Skill Debug Chat 清理的待处理数，该命令不会创建资源、访问对象存储或修改数据：
```bash
curl -X POST 'https://你的域名/api/admin/4160/initUserSandbox' \
-H 'Content-Type: application/json' \
-H 'rootkey: 你的ROOT_KEY' \
-d '{"dryRun":true}'
```
查看 dry-run 结果后，执行正式迁移命令。正式迁移会先执行 beta6 归一化，仅在剩余待处理数归零时，才在同一请求中继续 Workspace 归档：
```bash
curl -X POST 'https://你的域名/api/admin/4160/initUserSandbox' \
-H 'Content-Type: application/json' \
-H 'rootkey: 你的ROOT_KEY' \
-d '{"dryRun":false}'
```
如果返回结果的 failures 中仅包含 `Sandbox source is missing or deleted`，且确认对应 App 或 Skill 已不再存在，可添加 skipError 参数跳过这些残留 Sandbox：
```bash
curl -X POST 'https://你的域名/api/admin/4160/initUserSandbox' \
-H 'Content-Type: application/json' \
-H 'rootkey: 你的ROOT_KEY' \
-d '{"dryRun":false,"skipError":true}'
```
skipError 默认值为 false，省略时保持严格迁移。该开关仅跳过 source 已缺失或已软删除的整个分组，不会对分组内的 Sandbox 执行归档、删除或迁移操作；跳过明细通过 skippedCount 和 skipped 返回。归档、对象存储、Provider 和并发控制等其他错误仍会阻断迁移。

### 迁移逻辑与完成验证
迁移会先执行 V4.15.0-beta6 的完整前置逻辑：补齐旧 Sandbox 的 sourceType/sourceId、清理遗留字段、删除无法归属的孤立资源，并清理缺失 sourceType 的旧 Skill Debug Chat 三表数据及私有、公开 Bucket 旧前缀。与 App 同 ID 的 Skill 会跳过 Chat 清理。两类数据重新统计后合计为 normalization.pendingCount；数量不为 0 时不会进入 Workspace 归档。归零后直接归档全部旧 Workspace 并清理旧计算资源，再迁移 Skill，最后按 App、用户聚合到用户级 Sandbox。只要归档阶段存在失败，安装阶段就不会开始。新的 Sandbox 会在 Workspace 安装完成后暂停，首次使用时再按正常流程启动。脚本可安全重试，已完成的归档和迁移不会重复执行；迁移完成后会保留旧归档和旧 MongoDB 记录作为备份。
请检查返回结果中的 normalization.pendingCount、normalizationBlocked、failedCount、failures、skippedCount 和 skipped。只有 normalization.pendingCount 和 failedCount 均为 0，且 normalizationBlocked 为 false 时，才表示所有未跳过的 Sandbox 迁移完成；skipped 中的 Legacy 记录会保留且不会迁移。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/4-16/41601)
