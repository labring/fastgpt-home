---
title: 为FastGPT添加第三方文档库的类型与配置参数
slug: /zh/tutorial/fastgpt-third-party-dataset-config
page_type: 教程
source: https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/third_dataset
source_type: 官方文档
---

# 为FastGPT添加第三方文档库的类型与配置参数

## 类型定义前置操作
进入FastGPT项目路径下的`FastGPT\packages\global\core\dataset\apiDataset.d.ts`文件，添加第三方文档库Server类型。知识库类型的字段可根据实际业务需求设计，无需受固定格式限制。以语雀知识库为例，需配置鉴权相关的基础字段以完成接入。

## 配置参数与代码示例
以语雀第三方文档库的配置为例，官方给出的Server类型定义代码如下：
```ts
export type YuqueServer = {
  userId: string;
  token?: string;
  basePath?: string;
};
```
各参数的详细说明如下：
| 参数名 | 类型 | 可选状态 | 功能说明 |
| --- | --- | --- | --- |
| userId | string | 必填 | 鉴权所需的用户标识，用于验证文档库访问权限 |
| token | string | 可选 | 鉴权令牌，用于补充完成鉴权流程 |
| basePath | string | 可选 | 根目录路径，仅当文档库支持根目录选择功能时需配置该字段 |

> 🤖 成功提示：若文档库具备根目录选择功能，必须添加`basePath`字段以适配相关交互逻辑。

## 界面配置说明
完成类型定义后，FastGPT的知识库配置界面会自动加载已定义的第三方文档库类型，可直接在界面中填写对应参数，完成第三方文档库的接入配置。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/third_dataset)

## 适用性与版本范围

本页适用于官方来源记录的 教程 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
