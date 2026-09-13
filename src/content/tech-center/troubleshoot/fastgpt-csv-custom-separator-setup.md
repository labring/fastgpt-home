---
title: FastGPT知识库导入CSV文档的自定义分隔符设置方法
slug: /zh/troubleshoot/fastgpt-csv-custom-separator-setup
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1267
source_type: GitHub issue
---

# FastGPT知识库导入CSV文档的自定义分隔符设置方法

## 现象
在FastGPT知识库中导入CSV格式文档时，希望将文档每行内容分割为单独的段落，但不清楚如何配置自定义分隔符，无法实现预期的分段效果。例如导入的CSV包含三行数据，期望将第一行内容拆分为第一段"A:1\nC:1\nE:1"，第二行拆分为第二段"B:2\nD:2"，第三行拆分为第三段"A:3\nB:3\nC:3\nD:3\nE:3"。

## 可能原因
未明确FastGPT知识库CSV导入流程中的自定义分隔符配置方式，无法将CSV每行内容拆分为独立的文档段落。

## 排查步骤
1. 进入FastGPT知识库的文档导入管理页面，选择CSV格式文件并上传。
2. 查看导入配置区域的所有选项，定位分隔符相关的设置项。
3. 核对当前分隔符的配置值，确认是否需要调整为自定义分隔符。

## 解决与验证
在CSV导入的配置界面中，找到自定义分隔符的设置入口，将分隔符配置为换行符即可实现每行内容单独分段。导入完成后，可查看知识库内的文档内容，确认分段效果与预期一致，即原CSV的每一行对应一个独立段落。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1267)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
