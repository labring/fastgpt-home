---
title: 说明FastGPT第三方知识库接入的配置与操作步骤
slug: /zh/glossary/fastgpt-third-party-dataset-access
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/dingtalk_dataset
source_type: 官方文档
---

# 说明FastGPT第三方知识库接入的配置与操作步骤

## 一句话定义
FastGPT中用于接入外部第三方知识库的配置参数与数据导入操作流程。

## 在 FastGPT 里怎么用
接入第三方知识库前需获取对应平台的两类参数，一类为App Key、App Secret、User ID，另一类为Token、User ID。创建FastGPT知识库接入项时，需填写对应参数完成配置。配置完成后进入知识库详情页，点击添加文件选项，即可选择需导入的在线文档或文件夹。当前仅支持在线文档文本格式，无法导入PDF、Word、Excel、PPT等二进制文件。获取参数时，需在对应平台的个人头像-设置页面查找，个人版用户需额外为Token赋值权限，企业版用户可直接获取对应参数。

## 容易搞错的地方
仅支持在线文档文本格式，无法导入PDF、Word、Excel、PPT等二进制文件，导入非支持格式的文件会失败。不同用户类型在获取Token时的操作存在差异，个人版用户需额外为Token增加权限，企业版用户无需此步骤。参数填写错误会导致接入失败，需确保获取的App Key、App Secret、User ID或Token、User ID参数准确无误。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/dingtalk_dataset)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
