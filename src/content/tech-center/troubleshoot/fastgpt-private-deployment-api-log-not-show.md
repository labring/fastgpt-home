---
title: FastGPT 4.8.2私有部署版API调用自定义反馈日志不显示的排查与解决
slug: /zh/troubleshoot/fastgpt-private-deployment-api-log-not-show
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1669
source_type: GitHub issue
---

# FastGPT 4.8.2私有部署版API调用自定义反馈日志不显示的排查与解决

## 现象
用户在FastGPT 4.8.2私有部署版本中，设置自定义反馈节点后，通过外部链接调用应用对话时，日志界面可正常显示自定义反馈内容；但通过API调用时，日志界面无法显示该自定义反馈内容。

## 可能原因
目前无官方明确根因，仅能基于现象推断，相关根因排查需结合实际部署环境的后端日志与代码逻辑确认。

## 排查步骤
1. 确认当前使用的FastGPT版本为4.8.2私有部署版。
2. 分别使用外部链接、API两种方式调用同一配置了自定义反馈节点的应用，对比两者的日志显示差异。
3. 检查API调用的请求格式与参数是否符合官方文档规范，确保未遗漏触发自定义反馈节点的必要配置项。
4. 查看FastGPT后端运行日志，搜索与API调用、自定义反馈节点相关的日志信息，确认是否存在异常或报错。

## 解决与验证
若排查后确认调用配置无误，可尝试关注官方仓库的更新日志，确认是否有针对该问题的修复。验证方式为：重新通过API调用配置了自定义反馈节点的应用，查看日志界面是否正常显示自定义反馈内容，同时确认外部链接调用的日志显示状态正常。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1669)
