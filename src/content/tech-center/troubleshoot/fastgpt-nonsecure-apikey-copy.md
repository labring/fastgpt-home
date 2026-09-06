---
title: 解决FastGPT私有部署中非安全域API密钥复制失效问题
slug: /zh/troubleshoot/fastgpt-nonsecure-apikey-copy
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/235
source_type: GitHub issue
---

# 解决FastGPT私有部署中非安全域API密钥复制失效问题

## 现象
在FastGPT私有部署4.2.1版本中，当通过非安全域网址访问平台时，点击复制API密钥按钮，页面会弹出复制成功的提示，但实际剪贴板中未获取到任何API密钥内容。

## 可能原因
当前复制功能使用了`document.execCommand('copy')`方法，该方法在非安全上下文（HTTP协议且非本地豁免环境）下无法正常完成剪贴板写入操作，因此会出现提示复制成功但无实际内容的情况。

## 排查步骤
1. 确认当前访问FastGPT的网址协议类型，检查是否为HTTP非安全域。
2. 打开浏览器开发者工具的控制台面板，执行复制操作后查看是否存在相关报错信息。
3. 核对当前使用的FastGPT版本是否为4.2.1私有部署版本。

## 解决与验证
若需使用`document.execCommand('copy')`方法实现正常复制，需将FastGPT部署在安全上下文环境中，即使用HTTPS协议，或在本地localhost开发环境中运行。验证方式为：调整访问协议或运行环境后，重新点击复制API密钥按钮，检查剪贴板是否成功获取API密钥内容。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/235)
