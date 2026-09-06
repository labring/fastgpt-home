---
title: 说明FastGPT中数据集导出功能的定义、用法与异常处理
slug: /zh/glossary/fastgpt-dataset-export-guide
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/third_dataset
source_type: 官方文档
---

# 说明FastGPT中数据集导出功能的定义、用法与异常处理

## 一句话定义
export是FastGPT中用于将配置完成的数据集导出为可下载文件的功能。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
配置第三方数据集时，需进入FastGPT项目路径下的`FastGPT\packages\global\core\dataset\apiDataset.d.ts`文件，添加第三方文档库Server类型，可自定义知识库参数字段。例如语雀知识库需配置`userId`、可选的`token`字段作为鉴权信息。若文档库支持根目录选择功能，需额外添加`basePath`字段。导出数据集时，若出现失败情况，例如私有部署v4.6.1版本中导出任意数据集失败，预期可成功下载CSV文件，可通过Docker日志排查具体问题。

## 容易搞错的地方
一是配置第三方文档库时，遗漏根目录选择所需的`basePath`字段；二是导出数据集失败后，未通过Docker日志查看具体报错信息；三是未正确配置第三方文档库的鉴权参数，导致导出流程异常。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/third_dataset)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
