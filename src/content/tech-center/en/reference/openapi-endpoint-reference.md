---
title: FastGPT OpenAPI Endpoint Reference (v4.17.2)
slug: /en/reference/openapi-endpoint-reference
page_type: reference-data
source_type: Official documentation
source: https://doc.fastgpt.cn/en/openapi/app
description: The 33 endpoints in the FastGPT v4.17.2 OpenAPI documentation: method, path and purpose, each checked against the route files in the open-source repository.
language: en
check_day: 2026-10-13
---

# FastGPT OpenAPI Endpoint Reference (v4.17.2)

This page lists the 33 endpoints that appear in the FastGPT v4.17.2 OpenAPI documentation (apps, chat and knowledge bases). Each path is checked against the v4.17.2 repository for a matching route file under `projects/app/src/pages/api/`.

| Method | Endpoints |
| --- | --- |
| DELETE | 5 |
| GET | 6 |
| POST | 20 |
| PUT | 2 |

## Apps endpoints (2)

| Method | Path | Purpose | Doc section | Route in open-source repo |
| --- | --- | --- | --- | --- |
| GET | `/api/proApi/core/app/logs/getTotalData` | Get App Overall Statistics | Log API | Not found (follow the official docs) |
| POST | `/api/proApi/core/app/logs/getChartData` | Get App Chart Data | Log API | Not found (follow the official docs) |

## Chat endpoints (11)

| Method | Path | Purpose | Doc section | Route in open-source repo |
| --- | --- | --- | --- | --- |
| POST | `/api/v1/chat/completions` | Start Chat; Continue Interaction; Request Plugin | Start Chat | Yes |
| POST | `/api/core/chat/history/getHistories` | Get Session List | Session Management | Yes |
| PUT | `/api/core/chat/history/updateHistory` | Update Session Title; Update Session Pin Status | Session Management | Yes |
| DELETE | `/api/core/chat/history/delHistory` | Delete a Session | Session Management | Yes |
| DELETE | `/api/core/chat/history/clearHistories` | Clear App Sessions | Session Management | Yes |
| GET | `/api/core/chat/init` | Get Session Basic Info | Message Management | Yes |
| POST | `/api/core/chat/record/getPaginationRecords` | Get Message List | Message Management | Yes |
| GET | `/api/core/chat/record/getResData` | Get Message Run Details | Message Management | Yes |
| DELETE | `/api/core/chat/record/delete` | Delete Message | Message Management | Yes |
| POST | `/api/core/chat/feedback/updateUserFeedback` | Update Feedback (Like / Dislike) | Message Management | Yes |
| POST | `/api/core/ai/agent/v2/createQuestionGuide` | Question Suggestions | Question Suggestions | Yes |

## Knowledge bases endpoints (20)

| Method | Path | Purpose | Doc section | Route in open-source repo |
| --- | --- | --- | --- | --- |
| POST | `/api/core/dataset/create` | Create Dataset | Dataset | Yes |
| POST | `/api/core/dataset/list` | Get Dataset List | Dataset | Yes |
| GET | `/api/core/dataset/detail` | Get Dataset Details | Dataset | Yes |
| DELETE | `/api/core/dataset/delete` | Delete Dataset | Dataset | Yes |
| POST | `/api/core/dataset/collection/create` | Create Empty Collection/Folder | Collection | Yes |
| POST | `/api/core/dataset/collection/create/text` | Create a Text Collection | Collection | Yes |
| POST | `/api/core/dataset/collection/create/link` | Create a Link Collection | Collection | Yes |
| POST | `/api/core/dataset/collection/create/localFile` | Create a File Collection | Collection | Yes |
| POST | `/api/core/dataset/collection/create/apiCollection` | Create a Collection from an API Dataset (V1) | Collection | Yes |
| POST | `/api/proApi/core/dataset/collection/create/externalFileUrl` | Create an External File Collection (Commercial) | Collection | Not found (follow the official docs) |
| POST | `/api/core/dataset/collection/listV2` | Get Collection List | Collection | Yes |
| GET | `/api/core/dataset/collection/detail` | Get Collection Details | Collection | Yes |
| POST | `/api/core/dataset/collection/update` | Update Collection Info | Collection | Yes |
| POST | `/api/core/dataset/collection/delete` | Delete Collection | Collection | Yes |
| POST | `/api/core/dataset/data/pushData` | Push Data to Processing Queue | Data | Yes |
| POST | `/api/core/dataset/data/v2/list` | Get Collection Data List | Data | Yes |
| GET | `/api/core/dataset/data/detail` | Get Single Data Details | Data | Yes |
| PUT | `/api/core/dataset/data/update` | Update Single Data | Data | Yes |
| DELETE | `/api/core/dataset/data/delete` | Delete Single Data | Data | Yes |
| POST | `/api/core/dataset/searchTest` | Search Test | Search Test | Yes |

## How to read it

1. Paths come from the request examples in the official documentation. The examples use `http://localhost:3000`; replace it with your deployment address.
2. When the same path appears several times in the documentation, it is listed once here, and the purpose column lists each section heading where it appears.
3. "Not found" means the open-source repository has no route file with that name. The endpoint may be served by the commercial edition; check the official documentation and your deployment before calling it.
4. Authentication, request bodies and response fields are covered in the matching sections of the official OpenAPI documentation.

## Scope of this reference

The endpoint list comes from the FastGPT v4.17.2 official OpenAPI documentation and repository tree. Internal endpoints that the documentation does not cover are out of scope. Customised self-hosted deployments follow their own implementation.

## Sources

- [FastGPT v4.17.2 OpenAPI documentation: Apps](https://doc.fastgpt.cn/en/openapi/app)
- [FastGPT v4.17.2 OpenAPI documentation: Chat](https://doc.fastgpt.cn/en/openapi/chat)
- [FastGPT v4.17.2 OpenAPI documentation: Datasets](https://doc.fastgpt.cn/en/openapi/dataset)
- [FastGPT v4.17.2 API route tree](https://github.com/labring/FastGPT/tree/v4.17.2/projects/app/src/pages/api)
