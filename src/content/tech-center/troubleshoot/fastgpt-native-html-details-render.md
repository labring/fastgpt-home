---
title: 解决FastGPT中原生HTML details-summary折叠语法无法渲染的问题
slug: /zh/troubleshoot/fastgpt-native-html-details-render
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/5958
source_type: GitHub issue
---

# 解决FastGPT中原生HTML details-summary折叠语法无法渲染的问题

## 现象
在FastGPT对话框中输入原生HTML的details-summary标签代码时，内容直接以源码形式展示，未被渲染为可折叠的交互组件。默认展示的HTML外框较大，影响内容阅读体验，无法实现点击展开详情的交互效果。

## 可能原因
FastGPT的Markdown渲染逻辑未正确识别并解析原生HTML details-summary标签，导致其未被转换为可折叠的交互组件，仅以原始代码形式展示。

## 排查步骤
1. 核对输入的details-summary标签代码，确保语法符合HTML规范，包括标签正确闭合、summary标签嵌套在details标签内等结构要求。
2. 确认FastGPT的Markdown渲染模块是否开启了原生HTML标签的解析权限，需按实际环境确认配置项。
3. 测试其他原生HTML标签的渲染情况，判断是否为全局渲染异常，或仅针对details-summary标签的解析问题。

## 解决与验证
按照HTML规范编写正确的details-summary标签代码，确保FastGPT的Markdown渲染模块开启了原生HTML标签的渲染支持。输入示例代码后，可看到summary标题正常展示，点击后展开详情内容，不再展示源码，即可验证解决效果。示例代码如下：
```
<details>
    <summary>Details</summary>
    Something small enough to escape casual notice.
</details>
```

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/5958)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
