---
title: FastGPT V4.9.13版本升级操作与功能变更说明
slug: /zh/deploy/fastgpt-v4913-upgrade-notes
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4913
source_type: 官方文档
---

# FastGPT V4.9.13版本升级操作与功能变更说明

本文档针对FastGPT V4.9.13版本的升级操作、新增功能与修复问题进行说明，供自部署用户参考。

### 升级操作步骤
按照以下步骤执行升级：1. 将FastGPT官方镜像的tag设置为`v4.9.13`；2. 若使用商业版，同步将商业版镜像的tag设置为`v4.9.13`；3. `mcp_server`、`Sandbox`、`AIProxy`无需执行更新操作。

### 版本新增与优化内容
本次版本新增套餐缓存功能，可减少MongoDB数据库的查询次数，降低数据库压力。同时对NodeId生成规则进行优化，调整为随机值生成，避免出现首字母为数字的NodeId，可减少部分场景下的命名冲突问题。此外，知识库集合搜索功能新增嵌套搜索支持，可满足更复杂的信息检索需求。

### 修复的已知问题
本次版本修复了多个此前版本存在的异常：1. 对话日志的日期范围选择异常，修复后可正常筛选指定时间段的对话日志；2. API调用时传入的system提示词可能重复的问题，避免了提示词重复导致的模型输出异常；3. AI对话或工具调用未选择文件链接时，仍从历史记录读取文件的问题，修正了文件读取的触发逻辑；4. 手动更新知识库索引时，错误删除旧索引导致手动索引无效的问题，保障了手动索引更新的有效性。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4913)
