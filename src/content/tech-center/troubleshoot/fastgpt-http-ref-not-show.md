---
title: 解决FastGPT HTTP模块接入知识库后引用内容不显示问题
slug: /zh/troubleshoot/fastgpt-http-ref-not-show
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1207
source_type: GitHub issue
---

# 解决FastGPT HTTP模块接入知识库后引用内容不显示问题

## 现象
使用FastGPT HTTP模块接入知识库时，接口返回内容包含q、a、sourceName字段，部分用户还尝试添加id、sourceId字段。附带的截图显示接口返回了包含上述字段的有效数据，但对话界面无法正常展示知识库引用内容，未出现对应的引用弹窗或来源标注。

## 可能原因
FastGPT的HTTP模块需要匹配特定格式的知识库引用数据，若返回数据的字段名称、嵌套结构不符合系统的引用解析规则，系统将无法自动识别并渲染引用内容。

## 排查步骤
1.  检查HTTP接口返回的JSON数据结构，确认知识库引用相关的字段未被错误嵌套在其他对象内部，例如未被额外包裹在data字段中。
2.  核对使用的字段名称，确认是否为官方支持的sourceName、id、sourceId等标识字段。
3.  对照官方文档中HTTP模块知识库引用的标准数据格式要求，逐一检查返回字段的正确性。
4.  确认返回的a字段是否为知识库问答的答案内容，q字段是否为关联的问题内容。

## 解决与验证
按照FastGPT官方要求的HTTP模块引用数据格式调整返回内容，确保字段名称和结构符合系统解析规则。例如使用sourceName字段展示引用来源名称，a字段关联问答答案内容，id或sourceId用于唯一标识引用来源。调整完成后重新发起对话，查看对话界面是否正常展示知识库引用内容。若仍未解决，需按实际环境确认其他相关配置项。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1207)
