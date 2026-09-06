---
title: 解决FastGPT私有部署中http下载链接无法点击的问题
slug: /zh/troubleshoot/fastgpt-http-download-link-unclickable
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5552
source_type: GitHub issue
---

# 解决FastGPT私有部署中http下载链接无法点击的问题

## 现象
用户在FastGPT 4.12.0私有部署版本中，通过自定义MCP编写了生成Word文档并返回下载链接的脚本。该下载链接可在对话页面正常显示，但无法点击。点击链接时浏览器控制台无任何请求记录，将链接复制到新浏览器窗口则可正常完成下载。从用户提供的截图可见对话页面展示了下载链接，但无相关网络请求日志。

## 可能原因
该问题符合用户猜测的HTTP协议相关场景。当FastGPT部署环境使用HTTPS协议时，对话页面内的HTTP协议下载链接会被浏览器的混合内容安全策略拦截，无法触发正常的点击请求。

## 排查步骤
1. 确认FastGPT部署的访问协议类型，记录当前使用的协议。
2. 查看自定义MCP生成的下载链接所使用的协议，对比FastGPT的访问协议。
3. 打开浏览器开发者工具的网络面板，重新尝试点击下载链接，检查是否存在被拦截的请求。
4. 查看浏览器安全设置，确认混合内容拦截功能的开启状态。

## 解决与验证
将自定义MCP生成的下载链接协议调整为与FastGPT部署协议保持一致。若FastGPT使用HTTPS，则生成HTTPS协议的下载链接；若FastGPT使用HTTP，则使用HTTP协议的链接。调整完成后，重新在对话页面点击下载链接，确认可以正常触发下载请求并完成下载。同时可复制链接到新窗口测试，确保链接本身功能正常。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/5552)
