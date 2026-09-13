---
title: 为FastGPT实现导出PDF与Word文档的解决方案
slug: /zh/troubleshoot/fastgpt-pdf-word-export-solution
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2511
source_type: GitHub issue
---

# 为FastGPT实现导出PDF与Word文档的解决方案

## 现象
用户需要为FastGPT添加非导入式的PDF、Word文档导出插件，当前无内置对应功能，无法直接完成非导入式的文档导出操作。

## 可能原因
当前FastGPT未提供内置的非导入式PDF、Word文档导出功能，需通过外部插件或自定义API实现对应能力。

## 排查步骤
1. 确认当前FastGPT的部署方式，包括源码部署或docker-compose部署模式。
2. 明确需要实现的导出格式及非导入式导出的具体需求。
3. 评估通过自定义API或第三方服务实现导出功能的适配性。

## 解决与验证
方案一：通过laf实现导出功能
1. 配置云存储桶，记录存储桶名称。
2. 编写laf函数，实现Markdown内容解析、Word文档生成及存储上传逻辑，接收`content`参数作为导出内容。
3. 将该laf函数作为FastGPT的插件调用，传入需要导出的内容即可生成并获取文档URL。
方案二：通过自定义Python API实现
1. 编写Python API，接收请求内容，将Markdown格式的内容转换为Word文档。
2. 将该API部署至可访问的环境，作为FastGPT的外部插件使用。
3. 调用FastGPT插件接口，传入对应参数，验证文档生成与导出功能正常。

> 来源: [FastGPT GitHub issue #2511](https://github.com/labring/FastGPT/issues/2511)
