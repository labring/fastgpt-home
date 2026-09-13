---
title: 解决FastGPT向量排队过高且无法查看队列数量的问题
slug: /zh/troubleshoot/fastgpt-queue-length-monitor
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4277
source_type: GitHub issue
---

# 解决FastGPT向量排队过高且无法查看队列数量的问题

## 现象
多人使用FastGPT时，向量排队任务量异常升高，工作时段排队任务可达150万至300万。部分用户可通过浏览器访问/api/core/dataset/training/getQueueLen接口查看队列长度，但多数普通用户无法获取该信息，持续上传文件导致排队情况进一步恶化。

## 可能原因
多用户同时提交向量处理任务，导致队列积压。系统未向普通用户开放队列状态查看途径，仅部分用户可通过特定接口获取队列数据。

## 排查步骤
1.  调用/api/core/dataset/training/getQueueLen接口，获取当前向量队列的实际长度。
2.  核对当前排队任务的数量，确认是否处于150万至300万的异常区间。
3.  检查该接口的访问权限配置，确认是否限制普通用户调用。

## 解决与验证
可在知识库的排队监控界面添加当前队列长度展示模块，让所有用户直观查看排队规模。或开放/api/core/dataset/training/getQueueLen接口的访问权限，通过定时请求获取队列数据用于监控。验证时，调用接口确认返回的队列长度与实际任务数量一致，减少重复提交文件的行为，观察队列长度是否随任务处理逐步降低。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4277)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
