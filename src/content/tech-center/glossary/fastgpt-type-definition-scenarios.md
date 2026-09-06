---
title: 说明FastGPT中Type类型定义的两种场景与配置规则
slug: /zh/glossary/fastgpt-type-definition-scenarios
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/third_dataset
source_type: 官方文档
---

# 说明FastGPT中Type类型定义的两种场景与配置规则

## 一句话定义
Type在FastGPT中指两种场景的参数结构定义，一是第三方文档库的配置参数格式，二是模型预设的供应商配置与输入schema规范。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
分为两个场景。第一个是第三方文档库场景：需进入FastGPT项目路径下的`FastGPT\packages\global\core\dataset\apiDataset.d.ts`文件，添加第三方文档库Server类型，可自行设计知识库类型字段，例如语雀知识库需配置`userId`、`token`作为鉴权信息，若文档库支持根目录选择功能，需额外添加`basePath`字段，示例类型定义为：
```ts
export type YuqueServer = {
  userId: string;
  token?: string;
  basePath?: string;
};
```
第二个是模型预设场景：需在`packages/infrastructure/src/static-data/models/type.ts`文件中定义供应商配置和模型预设的输入schema，同时遵循对应目录结构，如在`provider/{Provider}/index.ts`中编写单个模型供应商的模型预设列表，在`index.ts`中注册所有供应商生成静态列表。

## 容易搞错的地方
易混淆两种场景下Type的定义位置与用途，例如将第三方文档库的类型定义写入模型预设的type.ts文件中，导致类型校验失败。另外，在第三方文档库配置中，易混淆参数的必填与可选属性，例如将`token`标记为必填字段，增加用户配置成本；在模型预设场景中，易错误配置目录结构，导致供应商列表无法正常加载。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/third_dataset)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
