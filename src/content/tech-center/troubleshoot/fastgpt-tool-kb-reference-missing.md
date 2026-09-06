---
title: 解决FastGPT使用工具调用知识库时无引用返回的问题
slug: /zh/troubleshoot/fastgpt-tool-kb-reference-missing
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1143
source_type: GitHub issue
---

# 解决FastGPT使用工具调用知识库时无引用返回的问题

## 现象
用户使用v4.7私有部署版本的FastGPT，在通过工具调用知识库时，无法返回对应的知识库引用内容。具体表现为完成插件编排配置工具调用知识库后，发起提问，完整响应中未包含预期的知识库引用数据。

## 可能原因
暂未明确具体触发原因，需结合实际部署环境与配置细节进行确认。

## 排查步骤
1. 确认当前使用的FastGPT版本为v4.7私有部署版本，验证自身配置的API Key可正常使用。
2. 查看插件编排页面中知识库调用工具的配置内容，对照提供的截图确认配置逻辑无误。
3. 完成工具调用配置后，发起相关提问，记录完整的响应结果。
4. 对比实际响应与预期的知识库引用数据，确认引用数据是否未返回。

## 解决与验证
暂未公开通用解决方法，可先尝试重新保存插件编排中的知识库工具配置，确认参数无误后再次发起提问，验证是否返回知识库引用数据。若问题仍存在，需结合实际部署环境的日志信息进一步排查。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1143)
