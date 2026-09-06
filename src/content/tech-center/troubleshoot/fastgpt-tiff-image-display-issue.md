---
title: FastGPT中tiff格式图片无法显示的排错方法
slug: /zh/troubleshoot/fastgpt-tiff-image-display-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2703
source_type: GitHub issue
---

# FastGPT中tiff格式图片无法显示的排错方法

## 现象
在FastGPT 4.8.10-fix版本中，tiff格式的图片（如/api/system/img/66b5d094d2d615e78b7c61b6.tiff）在知识库文档内无法正常显示。用户询问该现象是否正常，以及FastGPT支持的图片格式范围。

## 可能原因
当前无明确公开的官方说明，需按实际部署环境确认，可能涉及格式支持范围、部署配置或资源加载相关问题。

## 排查步骤
1. 确认当前使用的FastGPT版本为4.8.10-fix。
2. 检查tiff格式图片的访问路径是否符合/api/system/img/xxx.tiff的格式规范。
3. 测试其他格式图片在知识库文档中的显示状态，确认是否为tiff格式专属问题。

## 解决与验证
当前无公开的官方解决方案。若需解决该问题，可补充相关部署与使用信息后重新发起反馈，或结合实际部署环境排查相关配置。

> 来源: [FastGPT GitHub issue #2703](https://github.com/labring/FastGPT/issues/2703)
