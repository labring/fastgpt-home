---
title: 解决FastGPT调用localFile上传接口parentid参数不生效问题
slug: /zh/troubleshoot/fastgpt-localfile-upload-parentid-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6364
source_type: GitHub issue
---

# 解决FastGPT调用localFile上传接口parentid参数不生效问题

## 现象
调用`/api/core/dataset/collection/create/localFile`上传接口时，无论如何设置入参data中的parentid字段，最终上传的文件都会被放置在根目录下。

## 可能原因
目前无明确的官方说明，潜在可能的原因包括入参parentid的传递格式不符合接口解析要求、接口后端逻辑未正确处理该参数，具体需按实际环境排查确认。

## 排查步骤
1.  检查上传请求入参data中的parentid字段取值是否为合法的目录ID，格式需符合接口要求（需按实际环境确认）。
2.  确认传入的parentid对应的父目录已存在于当前操作的数据集内。
3.  查看接口请求的完整日志，确认parentid参数是否被正确传递到后端服务。

## 解决与验证
若排查后确认parentid参数格式合法且已正确传递，可联系相关开发人员确认接口后端对该参数的解析逻辑是否存在问题。验证方式为重新发起携带正确parentid参数的上传请求，查看上传后的文件是否被放置在指定的父目录下，而非根目录。

> 来源：https://github.com/labring/FastGPT/issues/6364
