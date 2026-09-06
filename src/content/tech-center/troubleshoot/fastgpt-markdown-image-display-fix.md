---
title: FastGPT知识库Markdown格式图片无法显示的解决方法
slug: /zh/troubleshoot/fastgpt-markdown-image-display-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1894
source_type: GitHub issue
---

# FastGPT知识库Markdown格式图片无法显示的解决方法

## 现象
FastGPT私有部署最新版中，手动添加至知识库的Markdown格式图片无法正常显示，但同知识库中的Markdown格式URL可以正常使用，调试场景下可正常回复URL内容但无法回复图片内容。

## 可能原因
需按实际环境确认。

## 排查步骤
1. 确认当前使用的FastGPT版本为私有部署最新版。
2. 检查知识库中添加的Markdown图片内容是否采用了标准格式。
3. 对比可正常显示的Markdown URL格式内容与无法显示的图片格式内容，排查格式差异。
4. 确认已使用的密钥可正常工作，且密钥配置无误。

## 解决与验证
使用标准Markdown图片格式`![]()`，将其手动添加至知识库中。在确认密钥正常可用的前提下，验证调整格式后的图片是否可正常显示，同时确认在可正常回复URL的调试环境中，该格式图片可正常展示。

> 来源: [FastGPT GitHub issue #1894](https://github.com/labring/FastGPT/issues/1894)
