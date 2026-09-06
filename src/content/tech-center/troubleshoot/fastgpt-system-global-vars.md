---
title: FastGPT 系统级变量共享：历史需求与会话变量边界
slug: /zh/troubleshoot/fastgpt-system-global-vars
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4609
source_type: GitHub issue
---

# FastGPT 系统级变量共享：历史需求与会话变量边界

跨会话 token 缓存、跨应用共享和长期记忆需要明确存储范围与有效期。FastGPT 的当前会话变量可参与工作流参数传递，系统级持久化共享需求应单独设计与验证。

## 历史范围与已知事实

[Issue #4609](https://github.com/labring/FastGPT/issues/4609) 于 2025 年 4 月提出系统级变量管理需求，原记录列举了定期获取 token、跨应用共享和长期记忆三个场景。当前[HTTP 节点文档](https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/http) 将 `variables` 定义为当前对话的全局变量，并支持引用前方节点输出。

## 诊断与接入步骤

1. 将数据按“本轮使用、同一会话复用、跨会话共享、长期保存”划分，明确所属用户、应用和过期时间。
2. 在测试流程中通过变量或前方节点输出传递一个普通测试值，分别在同一会话、新会话和另一应用中读取，记录实际生命周期。
3. 对确需跨会话复用的 token，可由业务后端负责获取、缓存、刷新和鉴权，通过 HTTP 节点调用该后端。此路径属于外部服务集成方案。
4. 对共享内容验证用户和应用的访问边界；对 token 验证有效期、刷新失败及撤销后的行为。凭证仅在授权服务间传递。

## 验证结果

形成变量作用域与生命周期的测试结果，并确认重启、新会话、过期和越权访问的处理符合需求。系统级变量的内置支持范围应按目标版本的功能文档核对。
