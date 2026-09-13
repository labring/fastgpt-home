---
title: 说明FastGPT部署Dockerfile的镜像源配置变更事项
slug: /zh/glossary/fastgpt-dockerfile-registry-modification
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/778
source_type: 官方文档
---

# 说明FastGPT部署Dockerfile的镜像源配置变更事项

## 一句话定义
该内容为FastGPT部署所用Dockerfile文件中镜像源配置项的官方变更说明，明确了更新后的镜像源地址。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
在部署FastGPT的流程中，需对Dockerfile文件进行修改，将其中的镜像源配置项设置为https://registry.npmmirror.com。相关配置操作可参考[阿里云官方文档](https://developer.aliyun.com/article/801527)完成，文档中包含了镜像源配置的具体操作指引。

## 容易搞错的地方
容易将配置项的名称误写为原文中出现的register，正确的配置项名称应为registry。同时需严格使用指定的镜像源地址，避免因地址输入错误导致镜像拉取失败或部署流程异常。需注意该变更仅涉及FastGPT部署所用的Dockerfile文件，其他配置文件无需进行相关调整。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/778)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
