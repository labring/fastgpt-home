---
title: 解决FastGPT无法直接导出问答内容至可下载Word文档的问题
slug: /zh/troubleshoot/fastgpt-word-export-api
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1101
source_type: GitHub issue
---

# 解决FastGPT无法直接导出问答内容至可下载Word文档的问题

## 现象
用户在编写说明文档时，希望通过FastGPT完成多轮问答，将每一轮的问答内容逐步插入Word文档并直接下载，但当前FastGPT未提供该内置功能。

## 可能原因
FastGPT当前版本未内置将多轮问答内容导出为可直接下载的Word文档的功能，官方暂无该功能的开发计划，无法直接通过平台自带选项完成导出。

## 排查步骤
1. 确认自身是否需要将FastGPT的问答内容导出为Word文档的功能，若无需内置功能，可通过自定义方式实现。
2. 查阅FastGPT官方提供的API文档，获取用于获取问答内容的接口参数，具体参数需按实际部署环境确认。
3. 确认API调用的相关配置，需按实际环境调整。

## 解决与验证
通过编写Python脚本实现需求，多次调用FastGPT的API获取每一轮的问答内容，将获取到的内容按预设目录与需求整理，生成Word文档并提供下载能力。具体的API请求参数、接口地址与内容解析逻辑需根据实际部署的FastGPT环境确认。

> 来源: [FastGPT GitHub issue #1101](https://github.com/labring/FastGPT/issues/1101)
