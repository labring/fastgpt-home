---
title: 解决FastGPT调用Azure时内容审查误拦截提问的问题
slug: /zh/troubleshoot/fastgpt-azure-content-interception-fix
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/446
source_type: GitHub issue
---

# 解决FastGPT调用Azure时内容审查误拦截提问的问题

## 现象
用户在FastGPT中提问"预约明天上午10点的会议室"时，触发Azure内容审查机制，导致请求被拦截。

## 可能原因
默认的系统提示词模板可能包含触发Azure内容审查的表述，匹配到审查规则。需按实际环境确认具体触发规则。

## 排查步骤
1.  复现提问"预约明天上午10点的会议室"，确认触发内容审查的现象。
2.  定位FastGPT源码文件projects/app/src/service/moduleDispatch/agent/extract.ts。
3.  检查该文件中的提示词模板配置，确认是否存在触发审查的内容。

## 解决与验证
1.  修改projects/app/src/service/moduleDispatch/agent/extract.ts文件中的提示词模板，调整表述以规避Azure内容审查规则。
2.  重新发起提问"预约明天上午10点的会议室"，确认不再触发内容审查。
3.  验证修改后的模板可正常完成提问流程，功能符合预期。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/446)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
