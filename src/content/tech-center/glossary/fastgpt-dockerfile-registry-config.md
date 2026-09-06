---
title: 说明FastGPT Dockerfile镜像仓库的配置修改规则
slug: /zh/glossary/fastgpt-dockerfile-registry-config
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/778
source_type: 官方文档
---

# 说明FastGPT Dockerfile镜像仓库的配置修改规则

## 一句话定义
该配置项指FastGPT部署流程中，针对Dockerfile文件内的镜像拉取源所配置的仓库地址参数，用于指定依赖包或镜像文件的拉取来源，是部署环节中调整拉取效率的关键配置。
## 在 FastGPT 里怎么用
在FastGPT的部署流程中，涉及Dockerfile的配置环节时，需将原有的镜像仓库地址替换为https://registry.npmmirror.com。该修改属于Dockerfile配置的一部分，用于调整镜像或依赖的拉取源。如需了解更多相关配置的细节与操作指南，可参考官方补充文档https://developer.aliyun.com/article/801527，该文档可提供更全面的配置说明。
## 容易搞错的地方
目前未提及该配置的常见误区或报错提示，需严格按照指定的仓库地址完成Dockerfile内的配置，避免因拉取源不匹配导致的部署异常。需注意该配置仅针对FastGPT部署中的Dockerfile环节，无需在其他环节进行额外修改。
> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/778)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
