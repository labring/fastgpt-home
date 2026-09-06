---
title: 解决FastGPT API调用文件上传时找不到指定文件的问题
slug: /zh/troubleshoot/fastgpt-api-file-found
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4012
source_type: GitHub issue
---

# 解决FastGPT API调用文件上传时找不到指定文件的问题

## 现象
本地部署FastGPT+ds后，在FastGPT提供的页面中可正常实现docx文件分析。尝试通过API调用文件上传功能，按教程使用`{"type": "file_url", "name": "1.docx", "url": "http://127.0.0.1:5000/1.docx"}`参数，本地搭建的HTTP环境中该文件可在浏览器直接下载，但API调用时提示找不到文件。

## 可能原因
容器内的127.0.0.1不指向部署FastGPT的宿主机本机，需使用正确的IP或域名。

## 排查步骤
1. 确认FastGPT的部署环境为容器化部署。
2. 检查API调用中填写的url参数，若使用127.0.0.1，需替换为宿主机的实际IP或可访问的域名。
3. 验证替换后的url是否可在容器内部访问，需按实际环境确认。
4. 确认目标文件确实存在于对应地址的服务中。

## 解决与验证
将API调用参数中的url地址内的127.0.0.1替换为宿主机的实际IP或可访问的域名，重新发起API调用。若调用后不再提示找不到文件，且可正常完成docx文件分析，则问题解决。

> 来源: [FastGPT GitHub issue #4012](https://github.com/labring/FastGPT/issues/4012)
