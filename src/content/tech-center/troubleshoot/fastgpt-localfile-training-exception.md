---
title: 解决FastGPT调用localFile接口上传知识库文件训练异常问题
slug: /zh/troubleshoot/fastgpt-localfile-training-exception
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/6145
source_type: GitHub issue
---

# 解决FastGPT调用localFile接口上传知识库文件训练异常问题

## 现象
该问题出现在FastGPT 4.14.3私有部署版本中，调用api/core/dataset/collection/create/localFile接口上传知识库文件后，出现训练数据异常问题。

## 可能原因
暂未从当前反馈中明确具体触发因素，需结合实际调用日志、接口参数及服务运行状态按实际环境确认。

## 排查步骤
1.  确认调用的接口路径为api/core/dataset/collection/create/localFile，检查接口请求参数是否符合官方文档要求。
2.  查看接口调用返回的日志及报错信息，确认是否存在请求异常或返回异常。
3.  检查上传的知识库文件格式、大小是否符合平台要求（需按实际环境确认）。
4.  核对FastGPT私有部署版本为4.14.3，确认版本是否存在已知异常。

## 解决与验证
修复排查步骤中发现的异常项后，重新调用api/core/dataset/collection/create/localFile接口上传知识库文件，验证训练数据是否恢复正常。若问题仍存在，需收集完整运行日志及接口请求信息协助进一步排查。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/6145)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
