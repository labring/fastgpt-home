---
title: FastGPT沙盒V2可使用的JavaScript第三方模块说明
slug: /zh/node/fastgpt-sandbox-v2-js-modules
page_type: 工作流节点
source: https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/sandbox-v2
source_type: 官方文档
---

# FastGPT沙盒V2可使用的JavaScript第三方模块说明

在FastGPT沙盒V2节点的代码运行环境中，仅支持通过require()引入预先指定的npm模块，未被列入可用清单的模块无法直接调用。该限定用于保障代码运行的安全性与稳定性，避免滥用系统资源或执行危险操作，确保沙盒环境的可控性。

## 可用npm模块列表
以下npm模块可通过`require()`使用：

| 模块 | 说明 | 示例 |
|------|------|------|
| `lodash` | 工具函数库 | `const _ = require('lodash')` |
| `moment` | 日期处理 | `const moment = require('moment')` |
| `dayjs` | 轻量日期库 | `const dayjs = require('dayjs')` |
| `crypto-js` | 加密库 | `const CryptoJS = require('crypto-js')` |
| `uuid` | UUID 生成 | `const { v4 } = require('uuid')` |
| `qs` | 查询字符串解析 | `const qs = require('qs')` |

## 禁用模块说明
除上述列出的模块外，其他系统级或底层模块均被禁止使用，例如fs、child_process、net等模块无法通过require()引入到沙盒V2节点的JavaScript代码中。此类限制覆盖了文件系统操作、进程管理、网络通信等底层系统操作，可有效防止代码执行可能影响系统安全的行为，保障FastGPT工作流的运行安全。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/sandbox-v2)
> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/sandbox-v2)

## 适用性与版本范围

本页适用于官方来源记录的 工作流节点 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
