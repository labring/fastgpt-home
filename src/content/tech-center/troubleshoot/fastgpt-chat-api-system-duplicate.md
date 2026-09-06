---
title: 解决FastGPT对话API调用时system内容重复显示问题
slug: /zh/troubleshoot/fastgpt-chat-api-system-duplicate
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/5045
source_type: GitHub issue
---

# 解决FastGPT对话API调用时system内容重复显示问题

## 现象
调用FastGPT的v1/chat/completions对话接口时，传入包含system角色的messages数组，示例代码如下：
```
messages = [
        {"role": "system", "content": "自定义system信息"},
        {"role": "user", "content": "用户提问"}
]
```
在AI对话界面中，该system内容会重复显示两次。

## 可能原因
具体原因未在当前反馈中明确，需结合实际部署环境与配置细节确认。

## 排查步骤
1. 核对调用的接口为v1/chat/completions，确认传入的messages数组中仅包含一条system角色的消息。
2. 查看AI对话界面的展示结果，确认system内容重复出现的次数为两次。
3. 确认当前使用的FastGPT私有部署版本为4.9.11。
4. 按实际环境检查相关配置项，确认是否存在导致system提示重复加载的设置。

## 解决与验证
当前无明确通用解决方法，需结合实际排查结果调整。验证方式为重新调用v1/chat/completions接口，传入包含单条system角色的messages参数，确认AI对话界面中system内容仅显示一次。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/5045)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
