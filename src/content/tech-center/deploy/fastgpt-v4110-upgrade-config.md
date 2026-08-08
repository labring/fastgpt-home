---
title: FastGPT V4.11.0版本升级步骤与配置变更说明
slug: /zh/deploy/fastgpt-v4110-upgrade-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4110
source_type: 官方文档
---

# FastGPT V4.11.0版本升级步骤与配置变更说明

## 版本升级概述
V4.11.0是FastGPT带有环境变量变更的重要升级版本，包含镜像更新、配置调整及多项功能优化。该版本移除了所有开源功能的限制，包括应用数量和知识库数量上限，同时调整了RoadMap，新增上下文管理、AI生成工作流、高级编排DeBug调试模式等规划，国际版域名同步调整为fastgpt.io。

## 升级操作步骤
1.  修改环境变量：商业版用户需添加评估相关环境变量，参数为`EVAL_CONCURRENCY=3`（评估单节点并发数）和`EVAL_LINE_LIMIT=1000`（评估文件最大行数），更新完成后需在管理端点击一次保存。
2.  更新镜像：将FastGPT本体镜像tag更新为`v4.11.0`，商业版镜像tag同步更新为`v4.11.0`，fastgpt-plugin镜像tag更新为`v0.1.5`；mcp_server、Sandbox、AIProxy无需执行更新操作。

## 变更细节与易错点
该版本新增商业版应用评测（Beta版）、工作流节点报错捕获分支、对话页独立tab页面UX优化，支持Signoz traces和logs系统追踪，新增Gemini2.5、grok4、kimi模型配置，模型调用日志新增首字响应时长和请求IP信息。优化内容包括优化代码降低递归导致的内存堆积，尤其在高并发知识库预处理场景可降低内存消耗；知识库训练支持全部重试当前集合异常数据；修复工作流中问题分类和内容提取节点默认模型无法通过前端校验，导致工作流无法运行和保存发布的问题；同时优化工作流valueTypeFormat避免数据类型不一致，修复知识库列表搜索时正则未替换特殊词的问题。工具更新方面新增Markdown文本转Docx和Xlsx文件的功能。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4110
