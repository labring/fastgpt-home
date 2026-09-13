---
title: 解决FastGPT子流程二次调用外部接口参数丢失问题
slug: /zh/troubleshoot/fastgpt-subflow-param-missing
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4407
source_type: GitHub issue
---

# 解决FastGPT子流程二次调用外部接口参数丢失问题

## 现象
FastGPT 4.9.1至4.9.3版本中，使用子流程执行文生视频任务时，先调用文生图模型获取任务ID，再通过该ID请求视频生成结果URL，请求URL中使用占位符`{{$fUPukvp4oyFY.cEILwvf6HYWx$}}`绑定生成的任务ID。首次调用可正常获取ID与任务状态，但二次循环请求以轮询状态时未传递该ID参数，导致条件判断结果为FAIL。

## 可能原因
子流程多次调用外部接口时，首次生成的任务ID参数未在后续循环请求中正确保留与传递，导致二次请求缺失必要的身份与任务标识参数，无法完成状态判断。

## 排查步骤
1.  确认当前FastGPT版本处于4.9.1至4.9.3区间。
2.  进入子流程配置页面，查看二次轮询请求的URL参数，确认是否绑定了首次调用生成的变量。
3.  查看平台接口请求日志，确认首次调用返回的任务ID是否被正确存储到变量中。
4.  检查占位符`{{$fUPukvp4oyFY.cEILwvf6HYWx$}}`是否正确配置在二次请求的URL路径中。

## 解决与验证
在子流程中配置变量持久化规则，确保首次调用生成的任务ID参数可在后续循环请求中正常引用。验证时触发完整文生视频流程，确认二次轮询请求携带正确的任务ID参数，状态判断正常，最终成功获取视频结果URL。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4407)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
