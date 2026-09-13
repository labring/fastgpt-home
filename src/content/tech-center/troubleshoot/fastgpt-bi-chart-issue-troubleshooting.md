---
title: 解决FastGPT中BI基础图表插件调用报错与绘图异常问题
slug: /zh/troubleshoot/fastgpt-bi-chart-issue-troubleshooting
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/2989
source_type: GitHub issue
---

# 解决FastGPT中BI基础图表插件调用报错与绘图异常问题

## 现象
1.  在AI应用中配置BI基础图表系统插件后，与大模型交互问答时报错"LLM api response empty"。
2.  在高级编排中配置该插件可正常运行，但仅能生成异常的折线图，无法生成柱状图与饼图。

## 可能原因
当前未明确具体触发原因，需结合实际部署环境与配置细节确认，可能涉及插件配置、数据输入或大模型返回格式相关因素。

## 排查步骤
1.  确认当前使用的FastGPT私有部署版本为4.8.11。
2.  检查AI应用中配置的BI基础图表插件的关联数据输入是否完整合规。
3.  验证高级编排中该插件的运行状态，对比正常与异常场景的配置差异。
4.  查看大模型交互时的返回日志，确认是否存在内容为空的情况。

## 解决与验证
针对报错"LLM api response empty"，需先确认大模型返回内容是否正常。针对绘图异常问题，需核对数据输入格式与插件要求的匹配度。验证步骤为：在高级编排中测试各类图表生成，确认基础功能可用性；重新配置AI应用中的BI基础图表插件，发起大模型交互，验证报错与绘图问题是否解决。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2989)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
