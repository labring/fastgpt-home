---
title: 解决FastGPT钉钉机器人调用知识库API图片地址缺失BASE_URL问题
slug: /zh/troubleshoot/fastgpt-dingtalk-image-url-missing-baseurl
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1145
source_type: GitHub issue
---

# 解决FastGPT钉钉机器人调用知识库API图片地址缺失BASE_URL问题

## 现象
在私有部署的FastGPT中，通过钉钉机器人调用知识库应用API时，接口返回的图片地址仅包含知识库内的相对路径，未拼接配置的BASE_URL，导致图片无法正常加载展示。使用的模型为文心一言-Speed。

## 可能原因
私有部署环境中，未正确配置图片资源地址的BASE_URL自动拼接逻辑，导致API返回的图片资源仅保留相对路径，未补充完整的访问域名前缀。具体配置项需按实际部署环境确认。

## 排查步骤
1. 确认当前私有部署环境的BASE_URL配置参数是否正确填写。
2. 查看知识库中上传的图片资源的存储路径格式。
3. 调用知识库应用API，检查返回结果中的图片地址是否仅包含相对路径。
4. 对比本地部署环境的API返回结果，确认图片地址是否拼接了完整BASE_URL。

## 解决与验证
在FastGPT的部署配置中启用图片地址的BASE_URL自动拼接功能，将知识库返回的相对路径补充为完整的访问地址。验证时，再次调用钉钉机器人的知识库API，检查返回的图片地址是否包含完整的BASE_URL，确认图片可以正常加载展示。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1145)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
