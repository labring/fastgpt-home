---
title: 为FastGPT添加第三方文档库的配置参数与字段说明
slug: /zh/integration/fastgpt-third-dataset-config
page_type: 集成
source: https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/third_dataset
source_type: 官方文档
---

# 为FastGPT添加第三方文档库的配置参数与字段说明

FastGPT支持集成第三方文档库，用于接入外部知识库资源，扩展系统的知识库覆盖范围，满足多样化的知识库构建需求。在正式接入第三方文档库前，需先完成配置参数的定义工作，确保系统能够正确识别并调用外部文档库的接口与相关资源，避免出现调用失败或权限不足的问题。

## 配置步骤与参数定义
首先，定位到FastGPT项目的指定文件路径：`FastGPT\packages\global\core\dataset\apiDataset.d.ts`，打开该文件后，需添加对应第三方文档库的Server类型定义。知识库的配置字段可根据实际业务需求自行设计，核心需包含用于鉴权或基础访问的信息字段，确保系统能够完成与外部文档库的身份验证与数据交互。以语雀知识库为例，其鉴权需要`userId`与`token`两个字段，其中`token`为可选字段，可根据实际的鉴权规则调整是否必填。若文档库支持根目录选择功能，还需额外添加`basePath`字段用于指定根目录路径，实现对特定目录下文档的接入。以下是语雀知识库的配置类型示例代码：
```ts
export type YuqueServer = {
  userId: string;
  token?: string;
  basePath?: string;
};
```

## 功能补充说明
当文档库具备根目录选择功能时，必须添加`basePath`字段，否则无法正常实现根目录选择的配置逻辑。可通过官方文档中的对应链接，查看根目录功能的详细实现说明。配置完成相关类型定义后，即可在系统的知识库管理界面中，选择对应的第三方文档库类型，并填写配置参数。相关的配置操作效果，可参考官方提供的配套图示`/imgs/thirddataset-1.png`进行验证与调整，确保配置的参数能够正常生效。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/third_dataset)

## 适用性与版本范围

本页适用于官方来源记录的 集成 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
