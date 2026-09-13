---
title: 解决FastGPT配置向量模型后部分模型未显示的问题
slug: /zh/troubleshoot/fastgpt-vector-model-display
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/2941
source_type: GitHub issue
---

# 解决FastGPT配置向量模型后部分模型未显示的问题

## 现象
用户在FastGPT中通过config.json配置了两个向量模型，分别为`moka-m3e-large`与`text2vec-embedding-model`。但前端页面的向量模型列表仅展示了`moka-m3e-large`，未显示`text2vec-embedding-model`。

## 可能原因
当前已知配置项存在但未被前端正确展示，具体可能的原因包括配置参数格式不符合系统识别规则、配置文件未被系统正确加载，或服务未重启导致旧配置仍生效。具体原因需按实际部署环境确认。

## 排查步骤
1. 核对config.json中的向量模型配置，确认`text2vec-embedding-model`的配置格式与已正常显示的`moka-m3e-large`保持一致，检查是否存在语法错误，如引号不匹配、逗号缺失等。
2. 确认config.json文件已保存成功，未出现写入失败的情况。
3. 重启FastGPT服务，使新的配置内容生效。
4. 清除前端浏览器缓存后重新访问页面，查看模型列表是否更新。

## 解决与验证
修正config.json中的配置错误，确保`text2vec-embedding-model`的配置项完整且格式正确。重启FastGPT服务，清除前端缓存后重新访问页面，确认`text2vec-embedding-model`出现在向量模型列表中，即完成解决与验证。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2941)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
