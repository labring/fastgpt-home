---
title: 解决FastGPT通过API创建本地文件集合后图片两小时过期的问题
slug: /zh/troubleshoot/fastgpt-localfile-collection-expiry
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3630
source_type: GitHub issue
---

# 解决FastGPT通过API创建本地文件集合后图片两小时过期的问题

## 现象
在FastGPT 4.8.15私有部署版本中，调用`/core/dataset/collection/create/localFile`接口创建本地文件集合时，生成的关联图片内容会在两小时后消失。使用手动上传方式创建的文件集合，则不会出现该过期问题，符合用户预期的无过期时长限制的效果。

## 可能原因
目前仅能确认该异常仅出现在通过API创建本地文件集合的场景，手动上传流程未触发该问题。具体技术原因未在当前issue中明确，需结合FastGPT的文件存储、临时缓存逻辑进行确认，相关参数配置需按实际部署环境核对。

## 排查步骤
1. 确认当前使用的FastGPT版本为4.8.15私有部署版本，核对发起请求的接口为`/core/dataset/collection/create/localFile`。
2. 分别执行手动上传和API调用创建本地文件集合的操作，对比两者的图片留存时长，确认仅API调用场景存在两小时后图片消失的问题。
3. 检查API请求的完整参数列表，确认未添加可能导致文件自动过期的相关配置项，相关参数需结合系统文档核对。
4. 查看FastGPT系统的运行日志，检索是否存在与文件存储路径、临时文件过期规则相关的报错或警告信息。

## 解决与验证
若排查发现API请求中存在未正确配置的过期时间参数，调整参数至无限制或匹配手动上传的配置即可。验证时，重新调用`/core/dataset/collection/create/localFile`接口创建本地文件集合，等待两小时后检查图片内容是否仍正常展示，对比手动上传的文件集合确认异常已修复。若未找到明确的参数或配置问题，需联系项目维护人员，结合系统底层存储逻辑进一步排查定位。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3630)
