---
title: 解决FastGPT中toolChoice和functionCall设为false时误触发文档解析的问题
slug: /zh/troubleshoot/fastgpt-fix-toolchoice-functioncall-parse
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/2519
source_type: GitHub issue
---

# 解决FastGPT中toolChoice和functionCall设为false时误触发文档解析的问题

## 现象
私有部署版本4.8.9 main分支的FastGPT中，将toolChoice和functionCall参数均设置为false时，提交纯文字提问，问答流程仍会执行文档解析功能，该问题导致问答流程不符合配置预期。

## 可能原因
需按实际部署环境的代码逻辑确认参数判断环节是否存在异常，当前已知配置参数未按预期生效，未触发拦截文档解析的逻辑。

## 排查步骤
1. 确认当前FastGPT的部署版本为4.8.9 main分支。
2. 查看项目config配置文件，检查toolChoice与functionCall参数是否均配置为false。
3. 重启FastGPT部署服务，提交纯文字提问，观察问答流程是否触发文档解析。

## 解决与验证
将config配置文件中的toolChoice和functionCall参数均设置为false，重启服务后提交纯文字提问，若问答流程未执行文档解析，直接进入大模型问答环节，则说明问题已解决。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2519)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
