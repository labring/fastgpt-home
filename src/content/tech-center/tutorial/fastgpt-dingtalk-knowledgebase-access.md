---
title: FastGPT接入钉钉知识库的配置与使用说明
slug: /zh/tutorial/fastgpt-dingtalk-knowledgebase-access
page_type: 教程
source: https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/dingtalk_dataset
source_type: 官方文档
---

# FastGPT接入钉钉知识库的配置与使用说明

FastGPT支持通过钉钉企业内部应用接入钉钉知识库，可将钉钉内的在线文档内容同步至FastGPT的知识库中，无需手动复制粘贴文档内容即可完成知识库的扩展，为后续的知识调用、问答生成等场景提供稳定的内容支持。相关配置界面可参考以下图示：
![钉钉知识库配置截图1](/imgs/image-dd1.png)
![钉钉知识库配置截图2](/imgs/image-dd2.png)

## 配置与接入步骤
首先需准备钉钉企业内部应用的App Key、App Secret、User ID三个参数，创建接入配置时需填写的必填参数包括上述三项。具体操作流程如下：
1.  获取钉钉企业内部应用的App Key、App Secret与User ID。
2.  在FastGPT的知识库创建页面中，找到对应的配置区域，依次填写上述三个参数。
3.  填写完成后提交配置，即可完成钉钉知识库的接入。
4.  配置完成后，进入目标知识库的详情页面。
5.  点击页面中的添加文件选项，在弹出的选择界面中选中要导入的钉钉知识库、在线文档或文件夹，完成选择后即可开始导入内容。

## 使用限制说明
当前仅支持导入钉钉在线文档的文本内容，无法导入PDF、Word、Excel、PPT等二进制文件。导入前需确认待导入文件的类型符合要求，避免导入失败。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/dingtalk_dataset)
> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/dingtalk_dataset)

## 适用性与版本范围

本页适用于官方来源记录的 教程 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
