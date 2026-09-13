---
title: FastGPT V4.11.0版本升级内容与操作说明
slug: /zh/deploy/upgrade-v4-11-0
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4110
source_type: 官方文档
---

# FastGPT V4.11.0版本升级内容与操作说明

## 这个版本改了什么
项目调整包括移除所有开源功能的限制，包含应用数量和知识库数量上限；调整RoadMap，增加上下文管理、AI生成工作流、高级编排DeBug调试模式等计划；国际版域名将 `fastgpt.io` 调整成 `fastgpt.io`。新增功能包含商业版应用评测（Beta版），可对应用进行有监督评分；工作流部分节点支持报错捕获分支；对话页启用独立tab页面UX；支持Signoz traces和logs系统追踪；新增Gemini2.5、grok4、kimi模型配置；模型调用日志增加首字响应时长和请求IP。优化内容包括优化代码避免递归造成的内存堆积，高并发连续进行知识库预处理时可降低内存消耗；知识库训练支持全部重试当前集合异常数据；工作流valueTypeFormat避免数据类型不一致；修复知识库列表搜索时正则未进行特殊词替换的问题。修复内容为修复问题分类和内容提取节点默认模型无法通过前端校验，导致工作流无法运行和保存发布的问题。工具更新新增Markdown文本转Docx和Xlsx文件功能。
## 升级前要确认的事
商业版用户需准备评估相关环境变量；确认需更新的镜像版本，无需更新mcp_server、Sandbox、AIProxy。需配置的环境变量为EVAL_CONCURRENCY=3和EVAL_LINE_LIMIT=1000。
## 升级步骤（照做）
1. 商业版用户添加环境变量EVAL_CONCURRENCY=3和EVAL_LINE_LIMIT=1000；2. 更新对应镜像的tag：FastGPT镜像为v4.11.0，商业版FastGPT镜像为v4.11.0，fastgpt-plugin镜像为v0.1.5，不更新mcp_server、Sandbox、AIProxy；3. 完成镜像更新并启动服务后，商业版用户在管理端点击一次保存。
## 升级后怎么验证
1. 商业版用户可查看应用评测（Beta版）功能是否可用；2. 测试工作流的问题分类和内容提取节点，确认可通过前端校验，正常运行、保存和发布；3. 测试知识库训练功能，确认可全部重试异常数据；4. 查看模型调用日志，确认包含首字响应时长和请求IP；5. 测试Markdown转Docx、Xlsx功能是否正常；6. 确认应用和知识库数量无上限限制。
> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4110)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
