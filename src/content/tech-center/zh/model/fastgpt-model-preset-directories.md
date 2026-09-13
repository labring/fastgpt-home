---
title: FastGPT模型预设相关目录的结构与各文件的作用说明
slug: /zh/model/fastgpt-model-preset-directories
page_type: 模型指南
source: https://doc.fastgpt.cn/zh-CN/plugin/model-presets
source_type: 官方文档
---

# FastGPT模型预设相关目录的结构与各文件的作用说明

## 目录基础信息
该目录为FastGPT模型预设的核心存储目录，完整路径为`packages/infrastructure/src/static-data/models/`，包含核心配置文件与多类子目录，用于统一管理所有模型供应商的预设参数与相关资源。

## 目录与文件功能说明
该目录的完整结构与各文件功能如下：
```text
packages/infrastructure/src/static-data/models/
├── index.ts
├── model.ts
├── type.ts
├── channel-avatar/
└── provider/
    └── {Provider}/
        ├── index.ts
        └── logo.svg
```
- `provider/{Provider}/index.ts`：存储单个模型供应商的模型预设列表。
- `index.ts`：用于注册所有供应商，生成全局的`staticModelList`与供应商列表。
- `model.ts`：维护供应商显示名映射表`ModelProviderMap`，以及AIProxy渠道列表`aiproxyChannels`。
- `type.ts`：定义供应商配置与模型预设的输入schema规范。
- `provider/{Provider}/logo.svg`：对应模型供应商的展示Logo文件。
- `channel-avatar/`：存储AIProxy渠道的头像资源目录。

## 配置操作步骤
如需新增或修改模型供应商配置，可按照以下流程操作：
1.  在`provider/`目录下创建以供应商名称命名的子目录，例如`provider/anthropic/`。
2.  在新建的子目录中添加`index.ts`文件，编写该供应商专属的模型预设列表。
3.  上传对应供应商的Logo文件，命名为`logo.svg`并放入子目录中。
4.  回到根目录的`index.ts`，注册新增的供应商，自动将其纳入全局供应商列表与`staticModelList`。
5.  在`model.ts`中，将该供应商的显示名补充至`ModelProviderMap`，如需接入AIProxy渠道，同步将其添加至`aiproxyChannels`。
6.  在`type.ts`中，补充该供应商对应的配置与模型预设的输入schema定义。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/plugin/model-presets)

## 适用性与版本范围

本页适用于官方来源记录的 模型指南 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
