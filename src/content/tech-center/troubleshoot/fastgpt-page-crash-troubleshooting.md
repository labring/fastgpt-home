---
title: FastGPT页面因浏览器兼容或翻译设置异常导致崩溃的排查与解决
slug: /zh/troubleshoot/fastgpt-page-crash-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/715
source_type: GitHub issue
---

# FastGPT页面因浏览器兼容或翻译设置异常导致崩溃的排查与解决

## 现象
部分场景下出现页面崩溃问题，多数触发场景为特定浏览器环境，或开启中文翻译功能后出现。

## 可能原因
一是浏览器存在兼容异常；二是系统内的中文翻译功能开启引发兼容冲突。

## 排查步骤
1. 记录页面崩溃时的使用环境，包括浏览器类型、是否开启中文翻译功能。
2. 更换其他浏览器访问目标页面，观察是否仍出现崩溃。
3. 检查并关闭当前开启的中文翻译功能，重新加载页面验证。

## 解决与验证
若为浏览器兼容问题，更换浏览器后即可恢复页面正常访问。若为中文翻译功能导致的兼容冲突，关闭该功能后页面可恢复正常。验证时重新加载目标页面，确认无崩溃现象即可。

> 来源: [FastGPT GitHub issue #715](https://github.com/labring/FastGPT/issues/715)
