---
title: 解决FastGPT调用上传本地文件接口时parentid参数不生效问题
slug: /zh/troubleshoot/fastgpt-localfile-upload-parentid-invalid
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6364
source_type: GitHub issue
---

# 解决FastGPT调用上传本地文件接口时parentid参数不生效问题

## 现象
调用`/api/core/dataset/collection/create/localFile`上传本地文件接口时，无论入参data中的parentid字段设置为何值，最终上传的文件都会被放置在根目录，parentid参数未按预期生效。

## 可能原因
目前无公开的明确触发原因说明，需结合实际的部署环境与代码调用逻辑进行确认。

## 排查步骤
1.  检查调用接口时的入参data结构，确认parentid字段已正确传入，且参数值为合法的数据集目录ID。
2.  核对传入的parentid字段对应的目录是否真实存在于目标数据集中。
3.  需按实际环境确认其他关联配置是否正常。

## 解决与验证
若确认parentid参数已正确传入且对应目录真实存在，可重新发起接口调用，验证文件是否被正确上传至目标目录。若问题仍未解决，可查看接口返回的详细信息，确认是否存在与参数校验相关的报错提示。后续需按实际环境进一步排查代码调用逻辑或接口内部的处理逻辑。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/6364)
