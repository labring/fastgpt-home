---
title: FastGPT V4.9.12版本环境变量变更升级说明
slug: /zh/reference/fastgpt-v4912-env-vars-update
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/4912
source_type: 官方文档小节
---

# FastGPT V4.9.12版本环境变量变更升级说明

## 结论
FastGPT V4.9.12版本存在环境变量配置变更，该版本的升级适配仅针对低于4.12.0的旧版本。未完成配置调整直接升级可能引发系统运行异常。

## 具体怎么做
1. 确认当前部署的FastGPT版本低于4.12.0；
2. 查阅官方文档中对应版本的环境变量变更说明，调整相关配置参数；
3. 按照标准流程完成FastGPT V4.9.12版本的升级部署。

## 注意事项
1. 该环境变量变更仅适用于V4.9.12版本的升级场景，不适用于其他版本；
2. 升级前需备份原有配置文件与业务数据，避免配置丢失；
3. 若当前版本高于4.12.0，无需执行该版本的环境变量变更操作；
4. 升级过程中若涉及升级脚本，需参考对应版本的官方说明，严格遵循配置调整要求。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/4912)
