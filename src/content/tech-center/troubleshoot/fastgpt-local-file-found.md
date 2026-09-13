---
title: 解决FastGPT调用知识库本地文件导入提示找不到文件的问题
slug: /zh/troubleshoot/fastgpt-local-file-found
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1988
source_type: GitHub issue
---

# 解决FastGPT调用知识库本地文件导入提示找不到文件的问题

## 现象
本地部署4.8.4开源版FastGPT，调用`/api/core/dataset/collection/create/localFile`接口导入本地文件时，执行curl命令后返回报错`curl: (26) couldn't open file "D:\1\test1.docx"`，提示找不到文件。

## 可能原因
结合报错信息，核心原因为执行curl命令的环境无法读取指定的文件路径。具体包括：指定的文件在执行命令的服务器上不存在；文件路径格式与当前运行环境不匹配；执行命令的用户无文件读取权限。

## 排查步骤
1.  确认目标文件存在于执行curl命令的服务器的对应路径中。
2.  检查文件路径格式是否适配当前运行环境，例如Windows系统的盘符路径无法在Linux环境下直接识别。
3.  验证执行命令的用户对目标文件拥有读取权限。
4.  完成检查后，重新调整参数执行接口调用命令。

## 解决与验证
将目标文件上传至执行curl命令的服务器本地，修正`file=@`后的路径为服务器可识别的本地路径，重新执行原curl命令。若不再出现`curl: (26) couldn't open file`报错，且知识库成功导入目标文件，则问题解决。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1988)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
