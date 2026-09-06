---
title: 解决FastGPT v4.8.7插件代码运行报错ECONNREFUSED问题
slug: /zh/troubleshoot/fastgpt-plugin-code-run-econnrefused
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/2390
source_type: GitHub issue
---

# 解决FastGPT v4.8.7插件代码运行报错ECONNREFUSED问题

## 现象
在FastGPT v4.8.7私有部署版本中，创建插件并使用基础功能的代码运行功能时，会返回如下报错：
```json
{
  "message": "",
  "name": "AggregateError",
  "method": "post",
  "code": "ECONNREFUSED"
}
```

## 可能原因
暂无明确已知关联配置项，需结合实际部署环境排查具体原因。

## 排查步骤
1.  确认当前使用的FastGPT版本为v4.8.7私有部署版本。
2.  核对触发插件代码运行功能时返回的报错内容，确认包含`"name": "AggregateError"`、`"method": "post"`、`"code": "ECONNREFUSED"`字段。
3.  检查部署环境中与代码运行功能相关的网络配置、端口运行状态。
4.  确认所使用的密钥是否正常可用。

## 解决与验证
根据排查步骤确认的具体问题进行针对性修复。修复完成后，重新创建插件并触发代码运行功能，验证报错是否不再出现。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2390)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
