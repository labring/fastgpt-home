---
title: FastGPT中Markdown解析的HTML标签无法正常渲染的排错方法
slug: /zh/troubleshoot/fastgpt-markdown-html-tag-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1206
source_type: GitHub issue
---

# FastGPT中Markdown解析的HTML标签无法正常渲染的排错方法

## 现象
在FastGPT v4.7.1私有部署版本的对话框中，用户尝试插入自定义HTML代码以嵌入外部网页，具体使用的iframe代码为`<iframe height=850 width=90% src="http://mctool.wangmingchang.com/index/jspay/dashang" frameborder=0 allowfullscreen></iframe>`。用户预期该代码可正常渲染并嵌入对应网页，但实际渲染结果未正确解析该HTML标签，无法显示预期的嵌入内容，仅出现不符合预期的展示效果。

## 可能原因
FastGPT默认的Markdown解析器出于安全考量，默认禁用了部分HTML标签，尤其是iframe这类可嵌入外部资源的标签，以防止跨站脚本攻击等安全风险。因此，用户自定义的非允许HTML标签无法被正常解析和渲染，仅会保留原始代码或被过滤处理。

## 排查步骤
1. 确认当前部署的FastGPT版本为v4.7.1私有部署版，与问题描述中的版本一致。
2. 检查待插入的自定义内容是否包含HTML标签，尤其是iframe、script等非基础Markdown原生支持的标签。
3. 查阅官方文档，确认FastGPT当前Markdown渲染支持的标签范围。
4. 需按实际环境确认是否存在可调整HTML标签渲染权限的配置项，无通用默认配置可直接修改。

## 解决与验证
若需在FastGPT中使用自定义HTML标签，需调整对应Markdown解析器的安全配置，允许所需的HTML标签。由于具体配置方式需结合实际部署环境，需参考官方文档或部署说明进行操作。验证方式为重新插入目标HTML代码，确认可以正常渲染对应的嵌入内容，与预期效果一致。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1206)
