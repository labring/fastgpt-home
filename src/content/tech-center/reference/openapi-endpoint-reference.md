---
title: FastGPT OpenAPI 接口速查表（v4.17.2）
slug: /zh/reference/openapi-endpoint-reference
page_type: 基准数据页
source_type: 官方文档
source: https://doc.fastgpt.cn/zh-CN/openapi/app
description: FastGPT v4.17.2 官方 OpenAPI 文档中的 33 个接口：方法、路径、用途，并逐个核对开源仓库里的路由文件。
language: zh
check_day: 2026-10-13
---

# FastGPT OpenAPI 接口速查表（v4.17.2）

本页汇总 FastGPT v4.17.2 官方 OpenAPI 文档（应用、对话、知识库三篇）中出现的 33 个接口，并按 v4.17.2 的开源仓库目录核对 `projects/app/src/pages/api/` 下是否有对应路由文件。

| 方法 | 接口数 |
| --- | --- |
| DELETE | 5 |
| GET | 6 |
| POST | 20 |
| PUT | 2 |

## 应用接口（2 个）

| 方法 | 路径 | 用途 | 文档分节 | 开源仓库路由 |
| --- | --- | --- | --- | --- |
| GET | `/api/proApi/core/app/logs/getTotalData` | 获取应用总体数据统计 | 日志接口 | 未见（以官方文档为准） |
| POST | `/api/proApi/core/app/logs/getChartData` | 获取应用图表数据 | 日志接口 | 未见（以官方文档为准） |

## 对话接口（11 个）

| 方法 | 路径 | 用途 | 文档分节 | 开源仓库路由 |
| --- | --- | --- | --- | --- |
| POST | `/api/v1/chat/completions` | 发起会话；交互节点继续运行；请求插件 | 发起会话 | 有 |
| POST | `/api/core/chat/history/getHistories` | 获取会话列表 | 会话管理 | 有 |
| PUT | `/api/core/chat/history/updateHistory` | 修改会话标题；修改会话置顶状态 | 会话管理 | 有 |
| DELETE | `/api/core/chat/history/delHistory` | 删除单个会话 | 会话管理 | 有 |
| DELETE | `/api/core/chat/history/clearHistories` | 清空应用会话 | 会话管理 | 有 |
| GET | `/api/core/chat/init` | 获取会话基本信息 | 对话管理 | 有 |
| POST | `/api/core/chat/record/getPaginationRecords` | 获取对话列表 | 对话管理 | 有 |
| GET | `/api/core/chat/record/getResData` | 获取单个对话运行详情 | 对话管理 | 有 |
| DELETE | `/api/core/chat/record/delete` | 删除对话 | 对话管理 | 有 |
| POST | `/api/core/chat/feedback/updateUserFeedback` | 更新反馈（点赞 / 点踩） | 对话管理 | 有 |
| POST | `/api/core/ai/agent/v2/createQuestionGuide` | 猜你想问 | 猜你想问 | 有 |

## 知识库接口（20 个）

| 方法 | 路径 | 用途 | 文档分节 | 开源仓库路由 |
| --- | --- | --- | --- | --- |
| POST | `/api/core/dataset/create` | 创建知识库 | 知识库 | 有 |
| POST | `/api/core/dataset/list` | 获取知识库列表 | 知识库 | 有 |
| GET | `/api/core/dataset/detail` | 获取知识库详情 | 知识库 | 有 |
| DELETE | `/api/core/dataset/delete` | 删除知识库 | 知识库 | 有 |
| POST | `/api/core/dataset/collection/create` | 创建空集合/目录 | 集合 | 有 |
| POST | `/api/core/dataset/collection/create/text` | 创建一个纯文本集合 | 集合 | 有 |
| POST | `/api/core/dataset/collection/create/link` | 创建一个链接集合 | 集合 | 有 |
| POST | `/api/core/dataset/collection/create/localFile` | 创建一个文件集合 | 集合 | 有 |
| POST | `/api/core/dataset/collection/create/apiCollection` | 通过 API 数据集创建集合（V1） | 集合 | 有 |
| POST | `/api/proApi/core/dataset/collection/create/externalFileUrl` | 创建一个外部文件库集合（商业版） | 集合 | 未见（以官方文档为准） |
| POST | `/api/core/dataset/collection/listV2` | 获取集合列表 | 集合 | 有 |
| GET | `/api/core/dataset/collection/detail` | 获取集合详情 | 集合 | 有 |
| POST | `/api/core/dataset/collection/update` | 更新数据集集合信息 | 集合 | 有 |
| POST | `/api/core/dataset/collection/delete` | 删除集合 | 集合 | 有 |
| POST | `/api/core/dataset/data/pushData` | 推送数据到训练队列 | 数据 | 有 |
| POST | `/api/core/dataset/data/v2/list` | 获取集合的数据列表 | 数据 | 有 |
| GET | `/api/core/dataset/data/detail` | 获取单条数据详情 | 数据 | 有 |
| PUT | `/api/core/dataset/data/update` | 修改单条数据 | 数据 | 有 |
| DELETE | `/api/core/dataset/data/delete` | 删除单条数据 | 数据 | 有 |
| POST | `/api/core/dataset/searchTest` | 搜索测试 | 搜索测试 | 有 |

## 怎么读这张表

1. 路径取自官方文档的请求示例，文档示例里的服务地址是 `http://localhost:3000`，调用时换成实际部署地址。
2. 同一路径在文档中出现多次（例如对话接口的不同用法）时，本页只列一次，「用途」列出各处的小节标题。
3. 「开源仓库路由」一列为「未见」的接口，开源仓库对应目录下没有同名路由文件，可能由商业版服务提供，调用前以官方文档与实际部署为准。
4. 接口鉴权、请求体与返回字段见官方 OpenAPI 文档对应小节。

## 这张表的适用范围

接口清单取自 FastGPT v4.17.2 的官方 OpenAPI 文档与开源仓库目录。文档未收录的内部接口不在本页范围内；私有化部署若做过二次开发，以实际部署为准。

## 来源

- [FastGPT v4.17.2 OpenAPI 文档：应用接口](https://doc.fastgpt.cn/zh-CN/openapi/app)
- [FastGPT v4.17.2 OpenAPI 文档：对话接口](https://doc.fastgpt.cn/zh-CN/openapi/chat)
- [FastGPT v4.17.2 OpenAPI 文档：知识库接口](https://doc.fastgpt.cn/zh-CN/openapi/dataset)
- [FastGPT v4.17.2 API 路由目录](https://github.com/labring/FastGPT/tree/v4.17.2/projects/app/src/pages/api)
