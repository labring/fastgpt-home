---
title: 说明FastGPT第三方文档库Server类型的配置参数与步骤
slug: /zh/glossary/third-party-dataset-server-type
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/third_dataset
source_type: 官方文档
---

# 说明FastGPT第三方文档库Server类型的配置参数与步骤

## 一句话定义
第三方文档库Server类型是FastGPT中用于自定义第三方文档库鉴权与基础配置字段的数据类型。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
首先需进入FastGPT项目的指定文件路径：`FastGPT\packages\global\core\dataset\apiDataset.d.ts`。在此文件中添加第三方文档库的Server类型，字段可根据实际需求自定义设计。以语雀知识库为例，需配置鉴权相关字段，可通过如下TypeScript代码定义对应Server类型：
```ts
export type YuqueServer = {
  userId: string;
  token?: string;
  basePath?: string;
};
```
其中userId为必填的鉴权字段，token为可选的鉴权令牌字段，basePath为可选的根目录路径字段。若第三方文档库支持根目录选择功能，则必须添加basePath字段以实现对应配置。

## 容易搞错的地方
1.  部分用户会遗漏为支持根目录选择功能的文档库添加basePath字段，导致根目录选择功能无法正常生效。
2.  误将token字段设为必填项，实际部分第三方文档库无需token即可完成鉴权流程。
3.  未在指定的`apiDataset.d.ts`文件中添加Server类型，导致第三方文档库配置无法被系统识别。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/third_dataset)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
