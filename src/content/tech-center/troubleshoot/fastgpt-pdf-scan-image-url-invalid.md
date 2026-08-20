---
title: 解决FastGPT对话日志中PDF扫描图片URL无效的问题
slug: /zh/troubleshoot/fastgpt-pdf-scan-image-url-invalid
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6249
source_type: GitHub issue
---

# 解决FastGPT对话日志中PDF扫描图片URL无效的问题

## 现象
用户在配置了`FE_DOMAIN=https://ai.xxxxcom:4431`的FastGPT环境中，上传包含扫描图片的PDF附件后，在对话日志中查看该附件时，图片的URL未携带有效域名前缀，无法正常加载显示图片。

## 可能原因
该问题的可能原因为FastGPT系统生成图片URL时，未正确拼接配置的`FE_DOMAIN`参数，导致生成的URL仅保留了相对路径部分，未添加有效的域名前缀。具体的配置加载校验逻辑与URL生成的底层实现需按实际环境确认。

## 排查步骤
1.  核对当前环境中的`FE_DOMAIN`配置项，确认其值为`https://ai.xxxxcom:4431`，无拼写错误或格式问题。
2.  查看系统启动或运行时的配置加载日志，确认`FE_DOMAIN`参数是否被成功读取并应用到服务中。
3.  重新上传包含扫描图片的PDF附件，进入对话日志页面复制图片URL，检查是否仍缺失域名前缀。
4.  需按实际环境确认其他关联配置项是否存在异常，影响URL生成逻辑。

## 解决与验证
首先修正`FE_DOMAIN`的配置（若存在拼写错误或格式问题），确保配置值准确无误，随后重启相关服务使新配置生效。验证时，重新上传包含扫描图片的PDF附件，进入对话日志查看图片URL，确认URL已正确拼接`FE_DOMAIN`的域名前缀，图片可正常加载显示。

> 来源：[FastGPT GitHub Issue #6249](https://github.com/labring/FastGPT/issues/6249)
