---
title: FastGPT V4.15.0-beta2版本升级详情与操作指引
slug: /zh/deploy/upgrade-v4-15-0-beta2
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41502
source_type: 官方文档
---

# FastGPT V4.15.0-beta2版本升级详情与操作指引

## 这个版本改了什么
新增功能包括支持Skill编辑与Agent静态Skill使用，重写agentV2循环逻辑，知识库搜索支持原生多模态embedding模型与图搜图，Chat API新增dataId校验，对/v1/chat/completions、/v2/chat/completions与chatTest在工作流执行前校验dataId重复情况，重复时返回业务错误。优化内容包括调整OTEL日志采集格式，禁用工作流无效连接模式，新增工作流超长节点名适配，优化知识库搜索测试交互与数据编辑弹窗，完善reason hide开关仅隐藏UI显示但保留LLM请求参数，优化流恢复暂停体验与异常中断会话恢复速度，新增应用切换时记住最近会话功能，优化响应详情展示与chat2messages适配逻辑。修复内容包括工作流单节点调试异常默认值、模型配置defaultConfig覆盖异常、团队切换时本地chat缓存清理、对话流恢复相关问题、停止会话提示样式、v1/completions接口quoteList缺失q与a字段。代码优化包括拆分AI request与工作流运行详情代码，实现用户自定义密钥计费逻辑，补充流恢复相关模块的设计文档与单元测试，将volume manager的运行环境从bun改为Node.js。

## 升级前要确认的事
若使用Opensandbox，需确认AGENT_SANDBOX_VOLUME_MANAGER_MOUNT_PATH环境变量不再生效，可移除该配置项。Opensandbox固定将持久化数据挂载至/workspace，旧沙盒持久化数据将受到影响。

## 升级步骤（照做）
更新fastgpt-app镜像tag为v4.15.0-beta2，更新fastgpt-pro镜像tag为v4.15.0-beta2。若使用Opensandbox，更新fastgpt-agent-sandbox镜像tag为v0.2.0，更新fastgpt-agent-volume-manager镜像tag为v0.2.0。移除AGENT_SANDBOX_VOLUME_MANAGER_MOUNT_PATH环境变量（若存在）。

## 升级后怎么验证
检查各服务镜像版本是否为v4.15.0-beta2（fastgpt-app、fastgpt-pro）与v0.2.0（Opensandbox相关组件）。发起新对话，验证Skill编辑与Agent功能正常运行。测试知识库搜索多模态embedding模型与图搜图功能，确认返回结果符合预期。调用/v1/chat/completions、/v2/chat/completions或chatTest接口，使用重复dataId发起请求，确认返回业务错误。测试工作流超长节点名显示、表单输入文件回填、会话恢复等功能，验证应用切换时记住最近会话的功能正常。检查环境变量中已移除AGENT_SANDBOX_VOLUME_MANAGER_MOUNT_PATH配置项。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41502)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
