---
title: 为FastGPT第三方知识库添加自定义配置表单与根目录选择功能
slug: /zh/tutorial/fastgpt-third-dataset-form
page_type: 教程
source: https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/third_dataset
source_type: 官方文档
---

# 为FastGPT第三方知识库添加自定义配置表单与根目录选择功能

## 目标文件与功能说明
该操作用于对接第三方知识库时，配置自定义表单字段与根目录选择功能。需修改的目标文件为`FastGPT\projects\app\src\pageComponents\dataset\ApiDatasetForm.tsx`，该文件负责渲染创建知识库页的字段填写界面。文件内置两个核心渲染组件，可根据第三方知识库的API支持情况决定是否启用。

## 配置步骤与代码实现
打开目标文件，添加以下代码片段：
```tsx
{renderBaseUrlSelector()} // 对`Base URL`字段的渲染
{renderDirectoryModal()} // 点击「选择」后弹出的`选择根目录`窗口
```
上述两个组件对应第三方知识库API的`getfiledetail`方法，若知识库不支持该方法，可省略这两个组件的引用。若第三方知识库需要完整支持根目录选择功能，需在该文件中补充对应配置内容。相关界面效果可通过文档内的对应截图查看，包含Base URL配置界面、根目录选择弹窗等元素。

## 功能使用说明
配置完成后，创建第三方知识库的表单将包含预设的配置字段与根目录选择功能。其中Base URL字段用于配置第三方知识库的访问地址，根目录选择功能可用于指定同步知识库的根目录范围，适配不同的第三方知识库对接需求。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/third_dataset)

## 适用性与版本范围

本页适用于官方来源记录的 教程 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
