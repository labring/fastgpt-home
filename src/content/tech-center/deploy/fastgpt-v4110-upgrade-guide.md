---
title: FastGPT V4.11.0版本升级操作与配置变更说明
slug: /zh/deploy/fastgpt-v4110-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4110
source_type: 官方文档
---

# FastGPT V4.11.0版本升级操作与配置变更说明

### 版本核心调整
FastGPT V4.11.0 版本包含环境变量变更、镜像更新要求及多项基础调整。本次升级移除了开源版本的应用数量与知识库数量上限限制，同时调整了产品路线规划，新增上下文管理、AI生成工作流、高级编排调试模式等计划内容，国际版域名保持为`fastgpt.io`。

### 升级操作步骤
1.  配置环境变量：商业版用户需新增以下环境变量，更新完成后登录管理端点击一次保存按钮：
    ```bash
    EVAL_CONCURRENCY=3 # 评估单节点并发数
    EVAL_LINE_LIMIT=1000 # 评估文件最大行数
    ```
2.  更新对应镜像版本：
    - FastGPT 官方镜像：将tag更新为`v4.11.0`
    - FastGPT 商业版镜像：将tag更新为`v4.11.0`
    - fastgpt-plugin 镜像：将tag更新为`v0.1.5`
    - mcp_server、Sandbox、AIProxy 无需执行更新操作。

### 功能更新与修复
本次升级新增多项实用功能：商业版上线应用评测（Beta版），支持对应用进行有监督评分；工作流节点支持报错捕获分支；对话页新增独立Tab页面UI优化；支持Signoz追踪系统的traces与logs；新增Gemini2.5、grok4、kimi三款模型的配置支持；模型调用日志新增首字响应时长与请求IP字段。
优化内容包括：修复递归逻辑导致的内存堆积问题，高并发知识库预处理场景可降低内存消耗；支持知识库训练时重试全部集合异常数据；完善工作流valueTypeFormat配置，避免数据类型不一致问题；修复知识库列表搜索时正则未替换特殊词的异常。
此外修复了问题分类与内容提取节点默认模型无法通过前端校验的问题，该问题曾导致工作流无法运行、保存及发布。工具层面新增Markdown文本转换为Docx和Xlsx文件的功能。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4110
