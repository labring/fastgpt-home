---
title: 解释FastGPT官方文档中import语句的含义与使用规则
slug: /zh/glossary/fastgpt-docs-import-usage
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/getting-started
source_type: 官方文档
---

# 解释FastGPT官方文档中import语句的含义与使用规则

## 一句话定义
import是FastGPT官方文档页面中用于导入内置组件的ES模块导入语句。

## 在 FastGPT 里怎么用
在FastGPT官方文档的前端代码中，import语句是标准的组件导入方式，用于从内部组件路径引入预设的文档展示组件。常见使用示例包含两种：一是解构导入Alert弹窗组件，写法为`import { Alert } from '@/components/docs/Alert';`；二是默认导入FastGPTLink链接组件，写法为`import FastGPTLink from '@/components/docs/linkFastGPT';`。导入的组件可用于实现文档内的提示弹窗、官方链接渲染等功能，是文档页面代码的重要组成部分。

## 容易搞错的地方
需注意两种导入语法的区别：解构导入需使用大括号包裹组件名称，默认导入则无需大括号。同时，导入路径必须为FastGPT官方文档项目内部的`@/components/docs/`目录下的路径，不可替换为外部非官方组件路径，否则会导致文档页面无法正常加载对应组件。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/getting-started)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
