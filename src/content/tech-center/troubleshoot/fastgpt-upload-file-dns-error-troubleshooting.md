---
title: FastGPT上传文件时fastgpt-plugin EAI_AGAIN报错排错
slug: /zh/troubleshoot/fastgpt-upload-file-dns-error-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5935
source_type: GitHub issue
---

# FastGPT上传文件时fastgpt-plugin EAI_AGAIN报错排错

## 现象
在FastGPT私有部署版本4.14.1的聊天问答窗口上传文件时，系统会提示`Load systen model error, please check fastgpt-plugin`，同时抛出`TypeError: fetch failed`报错。报错根因为`Error: getaddrinfo EAI_AGAIN fastgpt-plugin`，附带错误码`errno: -3001, code: 'EAI_AGAIN'`。

## 可能原因
该报错的核心问题是系统无法解析域名`fastgpt-plugin`。常见触发场景包括：本地DNS服务器临时故障、部署环境的容器网络配置异常导致无法访问内部插件服务域名、`fastgpt-plugin`服务未正常启动。

## 排查步骤
1.  检查`fastgpt-plugin`服务的运行状态，确认私有部署环境中该服务的容器或进程是否正常启动。
2.  在FastGPT部署的服务器或容器内执行DNS解析测试，运行`nslookup fastgpt-plugin`或`dig fastgpt-plugin`命令，查看是否能正常解析该域名。
3.  检查本地DNS配置，可尝试更换为公共DNS服务器后重试解析。
4.  确认FastGPT部署环境的网络配置，确保可以正常访问`fastgpt-plugin`服务的网络地址。

## 解决与验证
若排查发现`fastgpt-plugin`服务未启动，启动该服务后重新上传文件测试。若为DNS解析问题，修复DNS配置后重试。验证标准为：在聊天问答窗口上传文件时，不再出现`Load systen model error, please check fastgpt-plugin`提示，且无`TypeError: fetch failed`相关报错，则问题解决。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/5935)
