---
title: FastGPT文件输入功能的配置、使用与原理解析
slug: /zh/tutorial/fastgpt-file-input-config
page_type: 教程/部署
source: https://doc.fastgpt.cn/zh-CN/guide/build/general/fileInput
source_type: 官方文档
---

# FastGPT文件输入功能的配置、使用与原理解析

FastGPT从4.8.9版本起，支持在简易模式和工作流中配置用户上传文件功能，可实现文档解析与多模态文件处理两类场景，不同版本的功能逻辑存在差异，需结合实际版本调整配置。

### 配置与使用步骤
1. 简易模式配置：进入应用构建的通用配置页面，找到左侧的文件上传配置项，点击右侧的开启/关闭按键打开配置弹窗。开启后，调试对话框将出现文件选择图标，可上传所需文件。自4.8.13版本起，简易模式将强制解析上传文件的内容并放入system提示词中，无需模型自主决策是否读取文件。
2. 工作流配置：在工作流的系统配置中，找到文件输入配置项，点击右侧的开启/关闭按键打开配置弹窗。基础使用可通过工具调用接入文档解析，实现与简易模式一致的效果；也可自定义内容提取、分析等流程，将处理结果传递至HTTP或其他模块，构建文件处理SOP。

### 文档解析与多模态处理原理
上传的文件以URL形式存储在对话记录中`role=user`的消息内，对应结构为`UserChatItemValueItemType`，仅存储文件类型、名称、URL等信息，不会保存解析后的文档内容。文档解析仅处理PDF、Word、Excel、Markdown、HTML等文档文件，通过文件URL的后缀判断类型，接收`array string`类型的文件URL输入，输出解析后的文本内容；多个文件将按`File: ${filename} Content ${content} /Content`模板拼接，不同文件间通过分隔符`\n******\n`分隔。多模态文件（图片、音频、视频）需通过开启多模态识别的LLM处理，文档解析节点会自动忽略此类文件。在AI节点中，可通过新增的文档链接输入（`array string`类型）引用文件URL，系统将自动解析并按模板`将 FilesContent /FilesContent 中的内容作为本次对话的参考: FilesContent {{quote}} /FilesContent`拼接至system消息中。

自4.8.13版本起，文件上传功能有多项更新：简易模式强制解析文件、不再解析历史记录中的文件；工具调用与AI对话支持直接选择文档引用，无需挂载文档解析节点，自动解析历史文件；插件单独运行不再支持全局文件，插件输入可配置文件类型；工作流调用插件或子工作流时，不再自动传递上传的文件，需手动指定变量或链接。

> 来源：https://doc.fastgpt.cn/zh-CN/guide/build/general/fileInput
