---
title: FastGPT第三方知识库自定义接入的开发流程说明
slug: /zh/integration/fastgpt-third-party-dataset-dev-2
page_type: 集成与发布渠道
source: https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/third_dataset
source_type: 官方文档
---

# FastGPT第三方知识库自定义接入的开发流程说明

FastGPT内置了飞书、语雀等常用文档库，但不同用户可能需要接入其他自定义文档库。为实现不同文档库的统一接入，FastGPT制定了标准的第三方知识库接口规范，所有内置知识库均基于该规范扩展，开发者可参考现有代码完成自定义开发。

### 开发核心规范
第三方知识库开发需遵循4个核心接口要求，同时每个文档库的功能实现需通过Hook文件完成5个固定函数的定义。开发者可参考内置知识库的实现代码完成开发。开发前需明确文档库的鉴权与配置参数，例如语雀知识库需要配置`userId`、`token`作为鉴权信息，若文档库支持根目录选择功能，还需添加`basePath`字段用于配置根目录路径。所有开发需在指定的代码路径内完成，避免破坏原有系统功能。

### 具体开发步骤
1.  **添加文档库参数**：进入`FastGPT\packages\global\core\dataset\apiDataset.d.ts`文件，添加自定义知识库的Server类型，定义所需的鉴权或配置字段。
2.  **创建Hook文件**：在`FastGPT\packages\service\core\dataset\apiDataset\`下新建专属文件夹及`api.ts`文件，实现`listFiles`、`getFileContent`、`getFileDetail`、`getFilePreviewUrl`、`getFileId`5个核心函数。
3.  **完成系统适配**：依次修改类型定义文件、工具类文件、调用入口文件，添加多语言翻译、知识库图标，并在知识库列表页和配置表单中添加对应的入口与配置项。若文档库不支持根目录选择，无需添加`renderBaseUrlSelector()`和`renderDirectoryModal()`组件，避免出现配置错误。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/third_dataset)
