---
title: 解决FastGPT升级后知识库列表页面显示不兼容的问题
slug: /zh/troubleshoot/fastgpt-kb-list-compatibility-issue
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/915
source_type: GitHub issue
---

# 解决FastGPT升级后知识库列表页面显示不兼容的问题

## 现象
配置文件中设置了一个或以上模型的"datasetProcess": true，访问知识库列表页面（xxx/dataset/list）时显示“部分系统不兼容”。访问此前版本创建的单独知识库，可正常选择"datasetProcess": true的模型作为文件处理模型，系统无相关错误日志。

## 可能原因
需按实际部署环境与配置流程确认。

## 排查步骤
1. 确认部署版本为从4.6.3升级至4.6.8的自托管Docker版本。
2. 检查配置文件中模型的"datasetProcess"参数配置，确认参数值设置为true。
3. 确认完整执行了初始化API与Mongo更新的部署流程。
4. 对比此前版本创建的正常知识库配置，排查当前配置的差异。
5. 查看系统日志，确认是否存在未被记录的错误信息。

## 解决与验证
根据排查结果修正配置或部署流程。访问知识库列表页面，确认“部分系统不兼容”提示消失。尝试创建新的知识库，确认可正常选择配置了"datasetProcess": true的模型作为文件处理模型。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/915)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
