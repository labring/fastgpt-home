---
title: 解决FastGPT本地可运行但Docker打包后依赖缺失问题
slug: /zh/troubleshoot/fastgpt-docker-missing-deps
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/2156
source_type: GitHub issue
---

# 解决FastGPT本地可运行但Docker打包后依赖缺失问题

## 现象
本地部署FastGPT后可正常运行，按照部署流程使用Docker打包部署后无法正常运行，提示存在依赖缺失问题。相关报错截图未展示具体缺失依赖的详细文本。

## 可能原因
仅根据当前反馈，该问题可能与Docker打包过程中依赖项未正确纳入镜像有关，具体原因需按实际打包环境确认。

## 排查步骤
1.  确认本地部署的FastGPT可正常运行，且Docker打包部署后确实出现依赖缺失问题。
2.  检查Docker打包流程是否严格遵循官方部署步骤执行。
3.  查看Docker容器启动后的日志，提取与依赖缺失相关的报错内容。
4.  对比本地运行环境与Docker镜像内的依赖配置情况。

## 解决与验证
根据排查得到的具体缺失依赖项，在Dockerfile中补充对应的依赖安装命令，重新执行Docker打包流程。启动重新打包后的Docker容器，确认FastGPT可以正常运行，无依赖缺失相关提示。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2156)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
