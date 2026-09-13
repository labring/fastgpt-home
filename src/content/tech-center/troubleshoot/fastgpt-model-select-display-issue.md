---
title: 解决FastGPT知识库问题优化模型选择仅显示部分配置模型的问题
slug: /zh/troubleshoot/fastgpt-model-select-display-issue
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1818
source_type: GitHub issue
---

# 解决FastGPT知识库问题优化模型选择仅显示部分配置模型的问题

## 现象
FastGPT私有部署版本4.8.4中，进入高级编排模块下的知识库-问题优化页面的模型选择界面，在config.json文件中配置了多个模型的情况下，界面仅显示后三个模型作为可选择项。

## 可能原因
需结合实际部署环境与配置细节确认具体原因，目前无公开的明确已知排查结论。

## 排查步骤
1. 确认当前FastGPT的部署类型为私有部署，版本号为4.8.4。
2. 打开项目的config.json配置文件，查看其中配置的所有模型条目。
3. 登录FastGPT系统，进入高级编排模块，依次点击知识库、问题优化，打开模型选择下拉菜单。
4. 对比config.json中配置的模型列表与界面显示的可选模型列表，记录两者之间的差异内容。

## 解决与验证
根据排查得到的具体问题，执行对应的修复操作。修复完成后，重启相关服务并重新登录系统。再次进入高级编排-知识库-问题优化页面，打开模型选择下拉菜单，确认所有在config.json中配置的模型均正常显示在可选列表中。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1818)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
