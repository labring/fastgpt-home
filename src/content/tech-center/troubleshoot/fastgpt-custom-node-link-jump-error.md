---
title: FastGPT自定义节点内HTML链接无法触发浏览器跳转的排错指南
slug: /zh/troubleshoot/fastgpt-custom-node-link-jump-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4966
source_type: GitHub issue
---

# FastGPT自定义节点内HTML链接无法触发浏览器跳转的排错指南

## 现象
FastGPT自定义节点内插入HTML代码后，点击其中的链接无法触发浏览器跳转。示例代码为<a href="https://baidu.com" class="card-button" target="_blank">百度</a>，预期点击后跳转至对应网址，实际无响应。

## 可能原因
无明确可依据的预设原因，需按实际环境确认。

## 排查步骤
1.  检查节点内HTML代码的语法正确性，核对示例代码<a href="https://baidu.com" class="card-button" target="_blank">百度</a>的属性是否符合规范，确保无拼写或格式错误。
2.  确认FastGPT节点的渲染配置，排查是否存在对HTML链接交互的限制。
3.  验证节点内其他元素的交互状态，确认是否为整体渲染异常导致的无响应。
4.  核对当前使用的FastGPT版本信息，查阅版本更新记录，排查是否存在已知的交互渲染问题。

## 解决与验证
若排查发现HTML语法存在错误，修正代码后重新发布节点测试。若为节点渲染配置限制，调整对应配置后验证。验证方式为点击节点内的链接，确认触发浏览器跳转至目标网址，如百度页面。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4966)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
