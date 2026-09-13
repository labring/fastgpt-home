---
title: 解决FastGPT中上传图片无法被LLM调用下载的问题
slug: /zh/troubleshoot/fastgpt-image-download-failed
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3208
source_type: GitHub issue
---

# 解决FastGPT中上传图片无法被LLM调用下载的问题

## 现象
用户在FastGPT中上传图片后，调用大语言模型处理图片时出现下载失败提示。对应日志包含如下报错信息：
```
error => 400 Error while downloading http://localhost:3000/api/common/file/read/test.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJidWNrZXROYW1lIjoiY2hhdCIsInRlYW1JZCI6IjY2OGUxNzc3MDQ0YWVhZTA3ODAwZWI2OSIsInRtYklkIjoiNjY4ZTE3NzcwNDRhZWFlMDc4MDBlYjZkIiwiZmlsZUlkIjoiNjczZjEzNWQ0NzY3YjU0NmMxYWYxNjdjIiwiZXhwIjoxNzMyNzkxNzczLCJpYXQiOjE3MzIxODY5NzN9.lytRl5f1xpAWT7m6AuqbdGJijscDP0bQSiABJKOyfgk
```
同时会出现`LLM response error`的警告日志，请求体中包含指向localhost:3000的图片访问地址。

## 可能原因
1.  大语言模型服务无法访问FastGPT的本地回环地址localhost:3000，因为大语言模型服务可能部署在其他机器或容器环境中，无法直接访问本地FastGPT服务。
2.  图片访问地址使用的localhost未替换为可被大语言模型服务访问的实际IP或域名。
3.  需按实际环境确认token是否过期或参数配置有误。

## 排查步骤
1.  查看大语言模型服务的部署机器地址，确认该机器能否访问FastGPT的服务地址。
2.  在大语言模型服务所在的机器上，执行curl命令访问图片地址，验证是否能正常获取图片资源。
3.  检查请求中的图片URL，确认未使用localhost作为访问地址。
4.  核对图片访问地址中的token参数，确认token未过期且包含正确的业务字段。

## 解决与验证
1.  将图片访问地址中的localhost替换为FastGPT服务的实际可访问IP或域名，例如将`http://localhost:3000`替换为`http://10.56.135.208:3000`。
2.  重新发起图片处理请求，查看日志是否仍存在下载失败的报错信息。
3.  确认大语言模型可以正常获取图片并完成内容描述，验证问题已解决。
若为私有部署版本，需按实际服务部署环境调整访问地址。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3208)
