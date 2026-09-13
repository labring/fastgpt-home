---
title: 解决FastGPT私有部署上传文件权限拒绝报错问题
slug: /zh/troubleshoot/fastgpt-private-deploy-permission-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/3242
source_type: GitHub issue
---

# 解决FastGPT私有部署上传文件权限拒绝报错问题

## 现象
部署环境为CentOS7，使用docker compose部署的FastGPT v4.8.11-fix私有版本，上传文件时触发系统级权限拒绝报错，完整报错文本为`EACCES: permission denied, open '/tmp/aIQs6kGiQMUG.docx'`。

## 可能原因
该报错源于文件系统权限配置不足。具体为FastGPT的运行进程无法对指定的临时文件目录`/tmp`执行读写操作，导致无法正常保存上传的文件。

## 排查步骤
1. 确认CentOS7系统中，执行docker compose部署的用户对`/tmp`目录拥有读写权限。
2. 查看docker compose的配置文件，检查临时文件相关的挂载参数与权限配置是否符合部署要求。
3. 确认FastGPT容器运行的用户身份，确保该用户可正常访问宿主机的`/tmp`目录。

## 解决与验证
针对排查出的权限配置问题，调整对应目录的权限设置或docker compose的用户运行配置，确保FastGPT的运行进程可对`/tmp`目录执行读写操作。完成配置调整后，重新执行文件上传操作，验证是否不再出现`EACCES: permission denied`相关报错。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/3242)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
