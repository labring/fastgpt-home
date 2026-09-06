---
title: 解决FastGPT无法支持PPT文档问答的问题
slug: /zh/troubleshoot/fastgpt-ppt-qa-support
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/642
source_type: GitHub issue
---

# 解决FastGPT无法支持PPT文档问答的问题

## 现象
FastGPT 无法对 PPT 格式文档进行问答交互，无法正常解析并读取 PPT 文档内容以提供相关问答服务。

## 可能原因
FastGPT 默认未集成 PPT 文档的解析能力，未配置针对 PPT 格式的文档处理适配规则。

## 排查步骤
1. 确认当前 FastGPT 版本是否已集成 PPT 文档解析支持，需按实际环境确认。
2. 检查项目官方文档，查找是否存在关于 PPT 文档支持的相关配置说明。
3. 核对已加载的文档处理插件或模块，确认是否包含 PPT 格式的适配配置。

## 解决与验证
当前无官方提供的直接配置步骤，需按实际环境确认是否存在官方适配方案或第三方解析插件。验证方式为尝试上传 PPT 格式文档至 FastGPT 应用，查看是否可正常解析并完成问答交互。

> 来源: [FastGPT GitHub issue #642](https://github.com/labring/FastGPT/issues/642)
