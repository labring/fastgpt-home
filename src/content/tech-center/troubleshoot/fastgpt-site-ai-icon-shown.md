---
title: 第三方站点嵌入 FastGPT 后 AI 浮窗图标缺失的历史排查
slug: /zh/troubleshoot/fastgpt-site-ai-icon-shown
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4918
source_type: GitHub issue
---

# 第三方站点嵌入 FastGPT 后 AI 浮窗图标缺失的历史排查

## 适用场景与历史记录

原报告来自 FastGPT 公有云用户，描述 help.mingdao.com 嵌入的免登录窗口在部分访客浏览器中没有 AI 图标。 原始讨论提交于 2025-05-29，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

应检查第三方宿主页的嵌入脚本、页面结构和访客环境。

## 排查与复测

1. 在正常与异常浏览器中访问同一宿主页面，记录浏览器版本和插件环境。
2. 检查嵌入脚本与静态资源的状态码，以及 CSP、跨域或脚本错误。
3. 检查浮窗元素是否已生成及其可见区域，用独立浏览器配置进行对照。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：帮助文档站点嵌入的fastgpt免登陆窗口，有些用户不显示AI图标。](https://github.com/labring/FastGPT/issues/4918)
