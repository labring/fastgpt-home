---
title: 解决FastGPT外链弹窗加载时window.onload冲突问题
slug: /zh/troubleshoot/fastgpt-embed-onload-conflict-fix
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/720
source_type: GitHub issue
---

# 解决FastGPT外链弹窗加载时window.onload冲突问题

## 现象
使用FastGPT外链弹窗形式加载机器人时，若HTML代码中存在两个window.onload相关事件绑定，会出现事件覆盖bug，导致机器人无法正常加载或弹窗，加载完成后可能无响应。

## 可能原因
window.onload是浏览器DOM的单个事件属性，直接多次赋值会覆盖之前绑定的逻辑。该特性为浏览器默认行为，仅允许单个函数绑定到window.onload属性。当页面存在其他自定义window.onload绑定代码时，FastGPT嵌入代码的embedChatbot函数会被覆盖，无法正常执行。

## 排查步骤
1. 查看当前使用的FastGPT外链弹窗加载代码所在的HTML文件，检索是否存在多个window.onload相关的事件绑定或赋值代码。
2. 确认页面中是否存在其他自定义的window.onload逻辑，包括直接赋值或其他事件绑定方式。
3. 加载页面，观察FastGPT机器人弹窗是否无法正常触发，或加载完成后未弹出对话窗口。

## 解决与验证
将原FastGPT外链加载代码中的`window.onload = embedChatbot;`替换为`window.addEventListener('load', function() { embedChatbot(); });`。该替换方式使用addEventListener方法，可同时绑定多个load事件，不会互相覆盖。替换完成后，重新加载页面，验证多个load事件绑定不会互相覆盖，FastGPT外链弹窗可正常触发并加载。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/720)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
