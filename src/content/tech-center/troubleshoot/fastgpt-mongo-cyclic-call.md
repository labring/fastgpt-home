---
title: 解决FastGPT私有部署版MongoDB连接循环调用相关问题
slug: /zh/troubleshoot/fastgpt-mongo-cyclic-call
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/792
source_type: GitHub issue
---

# 解决FastGPT私有部署版MongoDB连接循环调用相关问题

## 现象
当执行MongoDB连接初始化流程时，出现函数循环调用。具体调用链路为projects/app/src/service/mongo.ts中的connectToDatabase函数调用connectMongo，connectMongo的afterHook钩子调用getInitConfig，getInitConfig函数再次调用connectToDatabase，形成闭环循环。

## 可能原因
三个函数的调用链路形成循环，connectToDatabase触发connectMongo，connectMongo的afterHook触发getInitConfig，getInitConfig又触发connectToDatabase，导致流程无法正常推进。

## 排查步骤
1. 定位到projects/app/src/service/mongo.ts文件，查看connectToDatabase、connectMongo、getInitConfig三个函数的代码逻辑；
2. 梳理各函数的调用触发条件，确认afterHook钩子的执行时机是否会调用getInitConfig；
3. 核对整个初始化流程的调用顺序，确认循环触发的具体节点。

## 解决与验证
需根据实际代码逻辑调整函数调用链路，打破现有循环调用关系。调整完成后重新部署系统，验证MongoDB连接初始化流程可正常执行，无循环调用相关异常。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/792)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
