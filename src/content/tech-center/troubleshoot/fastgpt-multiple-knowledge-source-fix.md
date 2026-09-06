---
title: 解决FastGPT中知识库引用仅能选择单一来源的问题
slug: /zh/troubleshoot/fastgpt-multiple-knowledge-source-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1599
source_type: GitHub issue
---

# 解决FastGPT中知识库引用仅能选择单一来源的问题

## 现象
在FastGPT的AI对话框中，配置知识库引用时仅能选择知识库或HTTP请求其中一个来源，无法添加多个引用源。当前使用版本为v4.8的私有部署或公有云版本。

## 可能原因
当前知识库引用功能的默认配置或界面逻辑限制仅能选择单一来源，未提供直接添加多个引用源的选项，未出现明确报错提示。

## 排查步骤
1. 确认当前使用的FastGPT版本为v4.8，进入AI对话的知识库引用配置界面。
2. 尝试勾选多个知识库或HTTP请求来源，观察界面是否存在选择限制。
3. 确认已配置正常可用的密钥，排除密钥相关的功能限制。

## 解决与验证
可通过三种方式实现多来源引用：
1. 使用工具调用功能完成多来源引用，该方式准确好用，会消耗额外token。
2. 配置HTTP请求，确保其返回的引用格式与知识库引用格式完全一致，通过系统自带的知识库引用合并功能整合多来源内容。
3. 在代码层面将知识库搜索结果同步至HTTP请求中，在代码逻辑内完成多来源结果的合并。
配置完成后，在AI对话框中调用配置后的多来源内容，确认引用结果正确合并即可完成验证。

> 来源: [FastGPT GitHub issue #1599](https://github.com/labring/FastGPT/issues/1599)
