---
title: 解决FastGPT知识库问答场景下的图片加载失败问题
slug: /zh/troubleshoot/fastgpt-knowledge-base-image-load-failure
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4568
source_type: GitHub issue
---

# 解决FastGPT知识库问答场景下的图片加载失败问题

## 现象
知识库问答场景中，部分图片无法正常加载，无法正常显示的图片对应知识库中配置的图片资源。

## 可能原因
知识库中配置的图片路径添加了base_url参数，引发路径拼接逻辑异常，无法正确指向并获取图片资源。

## 排查步骤
1. 检查知识库内配置的图片路径是否添加了base_url参数，确认配置项的具体内容。
2. 核对图片实际存储路径与配置路径的对应关系，确认路径是否匹配资源实际位置。
3. 验证未添加base_url时的图片加载情况，对比两次加载结果的差异，确认是否由base_url配置引发问题。
4. 需按实际环境确认网络访问是否存在限制，无法正常访问外部资源的情况也会引发加载失败。

## 解决与验证
移除知识库图片路径中的base_url参数，使用原始图片路径完成配置。重新发起知识库问答流程，确认配置后的图片可正常加载。若需保留base_url配置，需按实际环境调整路径拼接逻辑，需按实际环境确认具体调整方式。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4568)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
