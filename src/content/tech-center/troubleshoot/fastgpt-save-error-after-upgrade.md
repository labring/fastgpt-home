---
title: 解决FastGPT 4.6.9升级后对话保存失败的问题
slug: /zh/troubleshoot/fastgpt-save-error-after-upgrade
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1124
source_type: GitHub issue
---

# 解决FastGPT 4.6.9升级后对话保存失败的问题

## 现象
用户将FastGPT私有部署版本从4.6.8升级至4.6.9，使用docker部署方式，连接阿里云单节点MongoDB 4.0实例后，在聊天模块发起提问时，对话无法保存。控制台返回报错信息：
```
{
  message: 'Transaction numbers are only allowed on a replica set member or mongos',
  stack: 'MongoBulkWriteError: Transaction numbers are only allowed on a replica set member or mongos\n' +
    '    at h (/app/projects/app/.next/server/chunks/75165.js:6:74632)\n' +
    '    at /app/projects/app/.next/server/chunks/75165.js:6:359597\n' +
    '    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)'
}
```
回退至4.6.8版本后，对话保存功能恢复正常。

## 可能原因
该报错提示MongoDB仅副本集成员或mongos路由支持事务编号相关操作。FastGPT 4.6.9版本新增了依赖MongoDB事务的对话保存逻辑，而用户使用的是单节点MongoDB实例，不支持事务功能，因此触发报错。

## 排查步骤
1. 确认当前FastGPT部署版本为4.6.9，且采用docker部署方式。
2. 查看所连接的MongoDB实例部署类型，确认是否为单节点实例。
3. 查看FastGPT运行日志，确认是否出现指定的MongoBulkWriteError报错。
4. 回退FastGPT版本至4.6.8，验证对话保存功能是否恢复正常。

## 解决与验证
可通过两种方案解决该问题：
方案一：将MongoDB实例调整为副本集模式，满足事务支持要求，升级至FastGPT 4.6.9后可正常使用对话保存功能。
方案二：回退FastGPT版本至4.6.8，恢复对话保存功能，此方案适用于无法调整MongoDB部署的场景。
验证方式：执行对应方案后，在聊天模块发起提问，确认对话内容成功保存，且控制台无指定报错信息。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1124)
