---
title: 解决FastGPT升级至4.14.8.1后新上传图片显示为errimg.png的问题
slug: /zh/troubleshoot/fastgpt-upgrade-errimg-image
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6618
source_type: GitHub issue
---

# 解决FastGPT升级至4.14.8.1后新上传图片显示为errimg.png的问题

## 现象
用户将FastGPT私有部署版本升级至4.14.8.1后，新上传的附件内的图片链接全部显示为errimg.png，此前已上传的图片可正常加载显示。用户提供的截图显示页面中图片位置被errimg.png占位。

## 可能原因
该问题仅在升级至4.14.8.1版本后出现，目前可推测的关联方向包括：新版本中附件存储或图片链接生成的逻辑发生变更、私有部署环境的存储服务配置出现异常、资源链接的映射规则未同步适配新版本。具体需结合实际部署环境确认。

## 排查步骤
1.  确认当前FastGPT私有部署版本为4.14.8.1，核对完整的升级操作流程，确认升级过程中未遗漏配置项变更。
2.  对比新上传与历史上传图片的存储路径、链接生成格式，检查errimg.png指向的实际资源是否存在于存储路径中。
3.  查看FastGPT服务的运行日志，检索与图片上传、资源链接生成、存储访问相关的报错信息。
4.  核对私有部署环境中存储服务的读写权限与配置，确认是否允许新上传资源的正常读取与访问。

## 解决与验证
若排查发现为新版本逻辑适配问题，需按照FastGPT官方文档的私有部署附件配置要求完成对应调整；若为存储权限或路径配置异常，需修正对应的存储配置项。验证方式为：重新上传一张图片附件，检查其链接不再显示为errimg.png，且可正常加载预览。

> 来源：[FastGPT GitHub Issue #6618](https://github.com/labring/FastGPT/issues/6618)
