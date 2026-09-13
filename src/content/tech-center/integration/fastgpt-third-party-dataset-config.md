---
title: 为FastGPT添加第三方知识库对接的自定义配置表单
slug: /zh/integration/fastgpt-third-party-dataset-config
page_type: 集成
source: https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/third_dataset
source_type: 官方文档
---

# 为FastGPT添加第三方知识库对接的自定义配置表单

该配置用于在FastGPT的第三方知识库创建页面，添加对接所需的表单字段。相关渲染逻辑位于`FastGPT\projects\app\src\pageComponents\dataset\ApiDatasetForm.tsx`文件中，该文件负责承载知识库创建页的字段填写界面。文中附带的截图可直观展示表单与弹窗的最终呈现效果。

## 配置步骤
1. 打开`FastGPT\projects\app\src\pageComponents\dataset\ApiDatasetForm.tsx`文件。
2. 添加`{renderBaseUrlSelector()}`代码，用于渲染`Base URL`字段。
3. 若需支持根目录选择功能，添加`{renderDirectoryModal()}`代码。该组件点击选择按钮后会弹出根目录选择窗口，对应对接API的`getfiledetail`方法。若知识库不支持该方法，可省略该组件的引用。
文中附带的五张截图分别展示了表单字段与弹窗界面的不同状态。

仅保留基础字段渲染或添加根目录选择组件，均可适配不同的第三方知识库对接需求。所有配置均基于对接API的对应方法实现，无需额外调整其他配置项。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/third_dataset)

## 适用性与版本范围

本页适用于官方来源记录的 集成 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
