---
title: FastGPT 私有部署的数据路径记录
slug: /zh/reference/fastgpt-review-log-02
page_type: baseline
source: https://doc.fastgpt.cn/self-host/deploy/docker
source_type: 深度场景内容
meta_title: FastGPT 私有部署的数据路径记录
meta_description: 用可填写的记录表梳理 FastGPT 私有部署的数据路径，登记对象存储、解析、检索、模型和外部接口，记录网络边界、使用的数据与维护人，并依据实际配置和日志复核。
delivery_metadata: {"source_front_matter":{"task_id":"W19-baseline-02","content_type":"baseline","product_version":"v4.17.4","review_date":"2026-11-23","translation_group":"fastgpt-review-log-02","article_id":"W19-baseline-02-zh","slug":"fastgpt-review-log-02","language":"zh","meta_title":"FastGPT 私有部署的数据路径记录","meta_description":"用可填写的记录表梳理 FastGPT 私有部署的数据路径，登记对象存储、解析、检索、模型和外部接口，记录网络边界、使用的数据与维护人，并依据实际配置和日志复核。","keywords":"[\"私有部署\",\"数据路径\",\"部署记录\"]","对应元语义题":"登记对象存储、解析、模型、外部接口与维护人","需求依据":"FastGPT W19 客户需求题卡","事实来源":"FastGPT v4.17.4 标签文档","内链":"[\"https://doc.fastgpt.cn/self-host/deploy/docker\",\"https://doc.fastgpt.cn/guide/build/workflow/nodes/http\",\"https://doc.fastgpt.cn/guide/version/commercial\"]","排期":"W19 2026-11-27","事实核验":"{\"核验日期\":\"2026-11-23\",\"版本与套餐\":\"FastGPT v4.17.4 标签文档\",\"90 天复核\":\"2027-02-21\"}"},"editorial_notes":[]}
keywords: 私有部署, 数据路径, 部署记录
schema_type: Article
date_modified: 2026-11-23
---

# FastGPT 私有部署的数据路径记录

## 从请求入口画到实际服务

先记录这次核对的应用、环境和入口，再画出使用者怎样到达 FastGPT。把代理、应用、业务数据库、向量存储和保存原始文件的服务按实际位置标在图上。每个环境单独画一张，避免把测试环境接入的解析服务当作生产条件。团队可以参考[Docker Compose 部署说明](https://doc.fastgpt.cn/self-host/deploy/docker)列出的服务核对遗漏，服务地址与配置以本环境为准。

## 把文件与模型请求分开登记

选一份允许用于测试的文件，看上传后原件存在哪里、解析在哪里运行、切分后的内容怎样进入向量索引。再选一条问题跟踪检索和模型请求，确认问题、引用片段及其他输入分别传向哪里。模型服务如果由外部提供，登记实际调用路径和接收的数据字段。能否出网要根据请求和网络记录核对。

## 按运行证据填写路径表

表中每行对应一个动作或服务。目标写实际接收方，数据项写可以核对的字段，证据填写配置或日志位置。外部业务调用可从[HTTP 请求节点](https://doc.fastgpt.cn/guide/build/workflow/nodes/http)着手核地址、请求方法和变量取值，再由接口负责人对照服务端记录确认。仅查看画布连线会漏掉服务之间的真实网络路径。

| 环节 | 来源与目标 | 实际数据字段 | 部署或网络位置 | 证据位置 | 负责人或待核事项 |
| --- | --- | --- | --- | --- | --- |
|   |   |   |   |   |   |
|   |   |   |   |   |   |

## 安排复查人与触发条件

部署位置、模型提供方式或外部接口一旦变化，由维护人重测对应路径。登记配置差异、核对时间和仍待确认的服务。需要核对某项版本能力时查[版本能力说明](https://doc.fastgpt.cn/guide/version/commercial)，再对照本机版本和采购条款。记录表可附在运维交接材料里，用于查明哪个环节处理了什么数据。

## 用两份记录核对一次配置变更

模型改用另一家服务时，先对比变更前后的配置，记录入口请求是否仍通过同一个代理。再用获准的测试材料发一次请求，对照代理或网关的实际访问记录，确认接收服务、时间和请求关联标识。把原路径、变更后的路径和实际观察分成三列。如果配置指向一个地址，日志中却出现另一处接收方，把这项留给网络和模型维护人共同复核。
