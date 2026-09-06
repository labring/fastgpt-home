---
title: 解决FastGPT部署后aiproxy模块API密钥明文显示的问题
slug: /zh/troubleshoot/fastgpt-aiproxy-api-key-visibility
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4017
source_type: GitHub issue
---

# 解决FastGPT部署后aiproxy模块API密钥明文显示的问题

## 现象
使用FastGPT时，aiproxy模块的API密钥以明文形式展示，未进行隐藏处理。对比同类设置项，其密钥在首次填写后不再可见，用户建议aiproxy模块也实现该隐藏功能。

## 可能原因
当前aiproxy模块未实现API密钥隐藏逻辑，未找到公开的配置项可调整该展示形式，需结合实际部署环境确认具体原因。

## 排查步骤
1. 访问FastGPT的aiproxy模块配置页面。
2. 查看API密钥的展示形式，确认是否为明文显示。
3. 对比同类设置项的密钥处理逻辑，确认差异点。
4. 确认当前使用的FastGPT版本是否为最新版。

## 解决与验证
当前无公开的官方解决步骤，需等待后续版本更新或结合实际部署逻辑调整。若需临时处理，可参考同类设置项的隐藏逻辑进行自定义调整。

> 来源: [FastGPT GitHub issue #4017](https://github.com/labring/FastGPT/issues/4017)
