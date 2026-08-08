---
title: FastGPT文件输入功能的配置方法与工作原理解读
slug: /zh/tutorial/fastgpt-file-input-config-principle
page_type: 教程/部署
source: https://doc.fastgpt.cn/zh-CN/guide/build/general/fileInput
source_type: 官方文档
---

# FastGPT文件输入功能的配置方法与工作原理解读

## 功能适用范围与核心差异
从4.8.9版本起，FastGPT支持在简易模式和工作流中配置用户上传文件功能。该功能分为文档解析与多模态识别两类处理逻辑：LLM模型无法直接解析普通文档，需先将文档转为文本后拼接进提示词；多模态文件（图片、音频、视频）则需交由支持对应能力的模型处理。

## 快速配置步骤
### 简易模式配置
进入应用构建的通用配置页面，找到左侧文件上传配置项，点击右侧的开启/关闭按键打开配置弹窗。开启后，调试对话框将出现文件选择icon，可直接上传目标文件。自4.8.13版本起，简易模式将强制解析上传文件并将内容放入system提示词，无需模型自主决策是否读取文件。
### 工作流配置
在工作流的系统配置中，找到文件输入配置项，点击开启/关闭按键打开配置弹窗。工作流中可直接通过工具调用接入文档解析节点，实现与简易模式一致的效果，也可自定义文件处理流程，将提取的分析结果传递至HTTP或其他模块。

## 核心原理与易错点
上传的文件仅以URL形式存储在对话记录中，不会保存解析后的内容，其存储结构符合`UserChatItemValueItemType`定义：`type`可选`text`或`file`，`file`类型包含`type`（image/audio/video/file）、`name`、`key`、`url`字段。
文档解析节点仅处理文档类型文件，通过文件URL的后缀判断类型，会自动忽略多模态文件，且仅解析本轮工作流接收的文件，不处理历史记录中的文件。多个文档将按`File: ${filename} Content ${content} /Content`模板拼接，不同文档间以`\n******\n`作为分隔符。
在AI节点（AI对话/工具调用）中，可直接传入Array string类型的文件URL列表，系统会自动解析并将内容拼接进system提示词，提示词模板为：`将 FilesContent /FilesContent 中的内容作为本次对话的参考: FilesContent {{quote}} /FilesContent`。
自4.8.13版本起，该功能有多项更新：简易模式不再由模型决策是否解析文件；工具调用与AI对话可直接选择文档引用，无需挂载文档解析节点；插件与子工作流不再自动传递上传文件，需手动指定输入变量。

> 来源：https://doc.fastgpt.cn/zh-CN/guide/build/general/fileInput
