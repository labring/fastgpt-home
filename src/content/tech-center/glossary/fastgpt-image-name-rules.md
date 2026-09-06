---
title: 说明FastGPT镜像名的组成、分类与使用规则
slug: /zh/glossary/fastgpt-image-name-rules
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/xinference
source_type: 官方文档
---

# 说明FastGPT镜像名的组成、分类与使用规则

## 一句话定义
FastGPT镜像名是用于标识不同功能FastGPT容器镜像的基础字符串，需搭配Tag组成完整的镜像标识。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
FastGPT镜像分为git版与阿里云版两类，各类镜像的具体名称如下：git版主镜像为ghcr.io/labring/fastgpt:latest，Plugin镜像为ghcr.io/labring/fastgpt-plugin，代码沙箱镜像为ghcr.io/labring/fastgpt-code-sandbox，MCP SSE server镜像为ghcr.io/labring/fastgpt-mcp_server，商业版镜像为ghcr.io/c121914yu/fastgpt-pro:latest。阿里云版主镜像为registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt，其余镜像前缀统一为registry.cn-hangzhou.aliyuncs.com/fastgpt/。完整镜像需拼接Tag，例如registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt:v4.6.1对应4.6.3版本镜像，具体版本可查看Docker Hub或GitHub仓库。

## 容易搞错的地方
未指定Tag的镜像默认使用latest标签，需注意部分镜像的Tag版本号与实际版本并非直接对应。阿里云商业版镜像的地址格式与其他阿里云镜像不同，需单独确认。镜像的具体版本无法仅通过Tag版本号直接推断，需通过Docker Hub或GitHub仓库核实。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/upgrade-instruction)

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/custom-models/xinference)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
