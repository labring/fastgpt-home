---
title: FastGPT低版本浏览器兼容问题排查与修复指南
slug: /zh/troubleshoot/fastgpt-low-browser-compatibility-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3000
source_type: GitHub issue
---

# FastGPT低版本浏览器兼容问题排查与修复指南

## 现象
私有部署FastGPT 4.8.6及后续版本中，低版本浏览器（如Chrome 45左右版本、Chrome 80版本、国产化浏览器）无法打开分享链接。进入工作流设计界面时会触发报错并返回工作台，简易应用界面可正常访问。部分版本开启文件上传后，上传文件并发送会触发报错返回工作台。

## 可能原因
代码中使用了Array.prototype.findLast API，该API在Chrome 100版本以下的浏览器中未被支持，导致低版本浏览器运行时出现语法错误，引发功能异常。

## 排查步骤
1. 打开浏览器开发者工具，查看控制台报错信息，确认是否存在与findLast相关的语法错误。
2. 核对浏览器版本，若为Chrome 100版本以下或对应低版本国产化浏览器，可初步确认兼容性问题。
3. 确认FastGPT部署版本是否为4.8.6及之后的版本。

## 解决与验证
1. 升级浏览器至Chrome 100版本及以上，可修复findLast API不支持导致的报错。
2. 若无法升级浏览器，可参考issue #3000、#3147的修复方案重新编译部署FastGPT。
3. 验证方式：访问分享链接或进入工作流设计界面，确认无报错且功能正常；上传文件并发送，确认无返回工作台的问题。

> 来源: [FastGPT GitHub issue #3000](https://github.com/labring/FastGPT/issues/3000)
