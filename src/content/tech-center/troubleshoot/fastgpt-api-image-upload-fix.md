---
title: FastGPT API调用场景下图片上传功能异常排查与修复指南
slug: /zh/troubleshoot/fastgpt-api-image-upload-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1201
source_type: GitHub issue
---

# FastGPT API调用场景下图片上传功能异常排查与修复指南

## 现象
通过OpenAPI调用FastGPT对话接口时，无法上传图片。FastGPT页面端已支持图片上传功能，但API调用场景下该能力未生效，无法满足扩展更多使用场景的需求。

## 可能原因
当前使用的FastGPT版本未包含API调用图片上传的修复补丁，未支持该功能。

## 排查步骤
1. 确认当前部署的FastGPT版本号。
2. 核对修复版本信息，确认目标修复版本为v4.7.2。
3. 检查API调用的相关配置是否符合要求，需按实际环境确认。

## 解决与验证
该API图片上传功能的修复对应PR#1217，已在v4.7.2版本中发布。将FastGPT升级至v4.7.2及以上版本即可修复该问题。验证方式为发起OpenAPI对话接口请求并携带图片上传参数，确认接口可正常处理图片上传请求。

> 来源: [FastGPT GitHub issue #1201](https://github.com/labring/FastGPT/issues/1201)
