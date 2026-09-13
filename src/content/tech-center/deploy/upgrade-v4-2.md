---
title: FastGPT 4.2版本QAModel配置格式变更升级说明
slug: /zh/deploy/upgrade-v4-2
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/42
source_type: 官方文档
---

# FastGPT 4.2版本QAModel配置格式变更升级说明

## 这个版本改了什么
99.9%的用户不受该升级影响。本次升级主要修改配置文件中QAModel的格式，从原先的数组格式调整为对象格式。调整后的格式示例如下：
```json
"QAModel": {
    "model": "gpt-3.5-turbo-16k",
    "name": "GPT35-16k",
    "maxToken": 16000,
    "price": 0
}
```
该改动的目的是固定使用一个最合适的模型执行任务，无需保留选择余地。

## 升级前要确认的事
需确认当前配置文件中的QAModel字段为数组格式。若该字段已为对象格式，则无需进行任何调整。同时需确认部署环境加载的配置文件为当前编辑的目标文件。

## 升级步骤（照做）
找到部署使用的配置文件，定位到QAModel字段。将该字段从数组格式修改为指定的对象格式，参考上述提供的JSON示例。保存修改后的配置文件即可完成配置调整。

## 升级后怎么验证
启动FastGPT服务后，检查服务日志，确认无QAModel相关的格式错误日志。测试QA任务的执行流程，确认任务可以正常完成且使用配置中指定的模型。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/42)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
