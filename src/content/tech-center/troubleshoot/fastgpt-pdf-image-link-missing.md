---
title: 解决FastGPT带图片PDF增强解析后图片链接未生成问题
slug: /zh/troubleshoot/fastgpt-pdf-image-link-missing
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4906
source_type: GitHub issue
---

# 解决FastGPT带图片PDF增强解析后图片链接未生成问题

## 现象
知识库上传带图片的PDF文件，开启PDF增强解析功能后，进入知识库分块查看页面，图片未正确生成有效链接，仅识别出base64编码内容。该问题出现在v4.9.10私有部署版本，此前版本未出现同类异常。

## 可能原因
暂未明确具体触发原因，仅可知该问题仅在v4.9.10私有部署版本出现，此前版本无此异常，需结合实际部署环境进一步排查。

## 排查步骤
1. 确认当前FastGPT部署版本为v4.9.10私有部署版本。
2. 重新上传包含图片的PDF文件，确保已开启PDF增强解析功能。
3. 进入对应知识库的分块查看页面，检查图片内容是否生成有效链接，或仅存在base64编码片段。
4. 对比此前可正常解析图片的FastGPT版本，确认异常仅出现在当前v4.9.10版本。

## 解决与验证
该问题可通过回退至此前无异常的FastGPT版本解决。验证步骤为：上传带图片的PDF文件并开启PDF增强解析功能，进入知识库分块查看页面，确认图片生成有效链接，无仅识别base64编码的异常情况。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4906)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
