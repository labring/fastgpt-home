---
title: FastGPT App与Admin共享变量配置参数速查
slug: /zh/reference/fastgpt-app-admin-env-vars
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/config/env
source_type: 官方文档小节
---

# FastGPT App与Admin共享变量配置参数速查

## 结论
本文整理了FastGPT App与Admin共享变量的官方配置参数，可直接用于自部署FastGPT的环境变量配置。所有参数均来自官方文档，可直接参考使用。

## 具体怎么做
可通过配置以下环境变量调整相关功能参数，参数详情如下：
| 参数名 | 默认值 | 说明 |
| --- | --- | --- |
| AGENT_ENGINE | fastAgent | Agent引擎，可选 fastAgent 或 piAgent |
| SKIP_FILE_TYPE_CHECK | false | 是否跳过上传文件类型检查 |
| WECHAT_CHANNEL_CONCURRENCY | 1000 | 微信渠道 poll worker 并发数，最小 10 |
| PARSE_FILE_WORKERS | 5 | 文件解析 worker 常驻线程数 |
| HTML_TO_MARKDOWN_WORKERS | 10 | HTML 转 Markdown worker 常驻线程数 |
| TEXT_TO_CHUNKS_WORKERS | 10 | 文本切块 worker 常驻线程数 |
| PARSE_FILE_TIMEOUT_SECONDS | 600 | 文件解析单任务超时时间，单位秒 |
| WORKFLOW_MAX_RUN_TIMES | 500 | 工作流最大运行次数，避免极端死循环 |
| WORKFLOW_MAX_LOOP_TIMES | 100 | 循环/并行节点最大输入数组长度 |
| WORKFLOW_PARALLEL_MAX_CONCURRENCY | 10 | 并行节点并发上限，且不能超过 WORKFLOW_MAX_LOOP_TIMES |
| SYSTEM_MAX_STRING_LENGTH_M | 100 | 系统变量替换等同步字符串处理最大字符数，单位 M；1 表示 1,000,000 字符，范围 1 到 100 |
| CHAT_MAX_QPM | 5000 | 聊天 QPM 限制；若用户套餐另有限制，以套餐限制为准 |
| SERVICE_REQUEST_MAX_CONTENT_LENGTH | 10 | 服务端接收请求体最大大小，单位 MB |
| MAX_FOLDER_DEPTH | 4 | 允许的最深文件夹层级，根目录下最多 4 层文件夹；范围 2 到 20 |
| APP_FOLDER_MAX_AMOUNT | 1000 | 应用文件夹最大数量 |
| DATASET_FOLDER_MAX_AMOUNT | 1000 | 数据集文件夹最大数量 |
| UPLOAD_FILE_MAX_SIZE | 1000 | 最大上传文件大小，单位 MB |
| UPLOAD_FILE_MAX_AMOUNT | 1000 | 最大上传文件数量 |
| LLM_REQUEST_TRACKING_RETENTION_HOURS | 6 | LLM 请求追踪保留时长，单位小时 |
| MAX_HTML_TRANSFORM_CHARS | 1000000 | HTML 转 Markdown 的最大字符数，超过后不转换 |

## 注意事项
1. 部分参数设有取值范围，如WECHAT_CHANNEL_CONCURRENCY最小为10，SYSTEM_MAX_STRING_LENGTH_M范围为1到100；
2. WORKFLOW_PARALLEL_MAX_CONCURRENCY不能超过WORKFLOW_MAX_LOOP_TIMES；
3. 若用户套餐存在额外限制，聊天QPM以套餐限制为准；
4. 配置时需注意各参数的单位，如UPLOAD_FILE_MAX_SIZE单位为MB，PARSE_FILE_TIMEOUT_SECONDS单位为秒。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/config/env)
