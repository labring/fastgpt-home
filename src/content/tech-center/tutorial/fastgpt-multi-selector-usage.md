---
title: 配置FastGPT多选择器实现多目标元素选取
slug: /zh/tutorial/fastgpt-multi-selector-usage
page_type: 教程
source: https://doc.fastgpt.cn/zh-CN/guide/dataset/websync
source_type: 官方文档
---

# 配置FastGPT多选择器实现多目标元素选取

在FastGPT的网页同步抓取配置流程中，当需要同时匹配多个不同类型的页面元素时，可使用多选择器完成配置。该配置方式已在FastGPT官方文档的演示场景中得到应用，可精准定位多个目标元素。

### 多选择器配置步骤
1. 编写单组选择器：每组选择器对应一类目标元素，遵循CSS选择器语法。例如，若需选取class为docs-content下同时包含mb-0和d-flex类的子元素，可编写选择器`.docs-content .mb-0.d-flex`，其含义为匹配docs-content类下同时具备mb-0与d-flex类的子元素；若需选取class为docs-content下带有data-prismjs-copy属性的div元素，可编写选择器`.docs-content div[data-prismjs-copy]`，其含义为匹配docs-content类下带有data-prismjs-copy属性的div元素。
2. 组合多组选择器：将多组单选择器用英文逗号隔开，即可实现多类目标元素的同时匹配。例如上述两组选择器组合后为`.docs-content .mb-0.d-flex, .docs-content div[data-prismjs-copy]`。

多选择器的配置方式可用于同时抓取文档标题与代码块等不同类型的页面元素，满足网页同步抓取的多样化需求。在实际配置中，只需按照单组选择器编写、多组选择器组合的流程操作，即可完成多元素抓取的选择配置。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/dataset/websync)

## 适用性与版本范围

本页适用于官方来源记录的 教程 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
