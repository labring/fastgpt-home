---
title: 为FastGPT部署提供BGE重排序模型的代码下载相关资源
slug: /zh/deploy/fastgpt-bge-rerank-code-download
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/bge-rerank
source_type: 官方文档
---

# 为FastGPT部署提供BGE重排序模型的代码下载相关资源

在FastGPT的自托管部署流程中，自定义BGE重排序模型的代码获取是重要环节。本页提供官方维护的三款BGE重排序模型的代码仓库地址，帮助技术人员与选型人员完成自定义重排序模型的配置与部署。

## 可用BGE重排序模型代码仓库
FastGPT官方提供三款BGE重排序模型的代码资源，均托管于指定的GitHub仓库中，具体仓库地址如下：
1.  bge-reranker-base 模型代码仓库：https://github.com/labring/FastGPT/tree/main/plugins/model/rerank-bge/bge-reranker-base
2.  bge-reranker-large 模型代码仓库：https://github.com/labring/FastGPT/tree/main/plugins/model/rerank-bge/bge-reranker-large
3.  bge-reranker-v2-m3 模型代码仓库：https://github.com/labring/FastGPT/tree/main/plugins/model/rerank-bge/bge-reranker-v2-m3
每款代码仓库对应一款不同的BGE重排序模型，可根据实际部署的资源需求、精度需求等选择对应的版本。

## 代码获取与部署准备步骤
完成自定义BGE重排序模型配置的前置步骤如下：
1.  结合业务场景的实际需求，选定合适的BGE重排序模型版本。
2.  访问对应模型的GitHub仓库地址，下载完整的代码文件至本地或部署服务器。
3.  将下载的代码文件放置至FastGPT项目的`plugins/model/rerank-bge`目录下，完成代码的基础部署准备。该目录为FastGPT官方指定的重排序模型插件存放路径，确保代码可被系统正常识别与调用。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/custom-models/bge-rerank)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
