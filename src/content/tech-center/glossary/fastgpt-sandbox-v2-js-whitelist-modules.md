---
title: FastGPT沙盒v2节点JavaScript白名单模块使用规则说明
slug: /zh/glossary/fastgpt-sandbox-v2-js-whitelist-modules
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/sandbox-v2
source_type: 官方文档
---

# FastGPT沙盒v2节点JavaScript白名单模块使用规则说明

## 一句话定义
FastGPT沙盒v2节点中，允许通过require()语法调用的npm模块集合，用于在该节点内执行自定义JavaScript代码，仅包含指定的工具类模块并禁止部分原生系统模块。

## 在 FastGPT 里怎么用
该模块集合仅可在沙盒v2节点的代码执行环节使用。使用时需通过标准require()语法引入白名单内的模块，当前支持的npm模块共有6类，分别为工具函数库lodash、日期处理库moment、轻量日期库dayjs、加密库crypto-js、UUID生成模块uuid、查询字符串解析库qs。各模块的具体使用示例如下：引入lodash可使用`const _ = require('lodash')`，引入moment可使用`const moment = require('moment')`，引入dayjs可使用`const dayjs = require('dayjs')`，引入crypto-js可使用`const CryptoJS = require('crypto-js')`，引入uuid的v4版本可使用`const { v4 } = require('uuid')`，引入qs可使用`const qs = require('qs')`。所有未列入白名单的模块，包括fs、child_process、net等原生系统模块，均无法通过require()调用。

## 容易搞错的地方
最常见的错误是尝试引入未列入白名单的模块，例如fs文件系统模块、child_process子进程模块、net网络模块等，这些模块会被系统禁止使用，导致代码执行失败。此外，需严格遵循require()的调用语法，不得使用未在文档中提及的其他模块引入方式，否则同样会触发调用限制，无法正常执行代码。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/sandbox-v2)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
