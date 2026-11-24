---
title: FastGPT V4.15.4版本MongoDB索引同步调整操作说明
slug: /zh/reference/fastgpt-4154-mongo-index-sync
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/4-15/4154
source_type: 官方文档小节
---

# FastGPT V4.15.4版本MongoDB索引同步调整操作说明

## 结论
V4.15.4版本中SYNC_INDEX环境变量已弃用，新增MONGO_DEPRECATE_INDEX环境变量，默认值为true，用于控制是否清理Schema显式标记的废弃索引。FastGPT启动时会自动执行安全的索引同步，仅创建当前Schema缺失的索引，清理符合要求的系统内置废弃索引，保留客户自建索引与未声明索引。

## 具体怎么做
### 环境变量参数
- `MONGO_DEPRECATE_INDEX`：默认值`true`，控制是否清理Schema标记的废弃索引，设为`false`时仅跳过废弃索引清理，不影响缺失索引创建。
如需在升级V4.15.4前完整删除历史过期索引，按以下步骤操作：
1. 升级并启动一次V4.15.3版本
2. 设置`SYNC_INDEX=true`，重启服务并等待索引同步完成
3. 确认索引同步成功后，再升级至V4.15.4版本
执行前需备份数据库。

## 注意事项
1. V4.15.4不会自动标记任何历史索引为废弃，升级该版本时不会自动删除旧索引，后续版本将通过Schema显式废弃标记逐步清理对应索引。
2. 该同步不会调用Mongoose的全量`syncIndexes()`，不会按"未在Schema中声明"条件批量删除索引。
3. 建议为自建索引显式设置自定义名称，避免与FastGPT系统内置索引重名。
4. V4.15.3的索引同步会删除所有未在当时Schema中声明的索引，可能包含客户自建索引，执行步骤前需检查现有索引，或记录自建索引定义以便后续重建。
5. `MONGO_DEPRECATE_INDEX=false`仅跳过未来版本可能声明的废弃索引清理，不影响缺失索引的创建。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/4-15/4154)
