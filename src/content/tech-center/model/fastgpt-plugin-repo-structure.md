---
title: FastGPT Plugin生态各仓库的功能划分与使用指引说明
slug: /zh/model/fastgpt-plugin-repo-structure
page_type: 模型指南
source: https://doc.fastgpt.cn/zh-CN/plugin/intro
source_type: 官方文档
---

# FastGPT Plugin生态各仓库的功能划分与使用指引说明

FastGPT Plugin生态主要涉及四类核心仓库，不同仓库承担差异化职责，可帮助技术选型人员与工程师快速匹配插件开发、维护的资源方向。

## 核心仓库功能清单
| 仓库                        | 作用                                           |
| --------------------------- | ---------------------------------------------- |
| `labring/fastgpt-plugin`    | 插件服务、SDK、CLI、调试监视器和基础设施代码。 |
| `fastgpt-official-plugins`  | 官方维护或审核通过的插件。                     |
| `fastgpt-community-plugins` | 社区第三方插件。                               |
| `fastgpt-business-plugins`  | 私有插件、客户定制插件和商业交付插件。         |

## 插件开发资源使用说明
`fastgpt-plugin`仓库仅提供开发、构建、检查、打包和服务端运行能力，不承载具体插件的业务代码。具体插件的源码需根据其属性，存放至对应的专用仓库中：官方维护或审核通过的插件存放至`fastgpt-official-plugins`，社区第三方插件存放至`fastgpt-community-plugins`，私有、客户定制及商业交付插件存放至`fastgpt-business-plugins`。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/plugin/intro)

## 适用性与版本范围

本页适用于官方来源记录的 模型指南 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
