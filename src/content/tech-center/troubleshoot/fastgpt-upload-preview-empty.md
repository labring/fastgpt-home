---
title: 解决FastGPT私有部署版本上传文件预览后入库为空的问题
slug: /zh/troubleshoot/fastgpt-upload-preview-empty
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1435
source_type: GitHub issue
---

# 解决FastGPT私有部署版本上传文件预览后入库为空的问题

## 现象
用户使用FastGPT v4.8-alpha3私有部署版本时，出现两类异常：其一，上传文件预览环节显示正常，但预览完成后将文件上传至知识库，知识库中显示的内容为空；其二，不经过预览直接上传文件，入库成功但内容并非Markdown格式。

## 可能原因
暂未明确具体触发原因，需结合实际部署环境、文件格式与操作流程进一步确认。

## 排查步骤
1.  复现问题流程：分别执行「预览后上传文件」与「不预览直接上传文件」两种操作，对比两次入库后的内容显示结果，确认问题是否可复现。
2.  核对部署版本：确认当前使用的FastGPT私有部署版本为v4.8-alpha3，确保版本信息与问题场景匹配。
3.  核对上传文件：确认待上传文件的原始格式，确认是否为Markdown格式文件。
4.  查看运行日志：查看FastGPT私有部署的运行日志，排查上传流程中的异常信息。

## 解决与验证
目前暂无公开的标准化解决方法，可按以下步骤尝试验证：
1.  针对「不预览直接上传」的场景，尝试上传非Markdown格式文件，验证入库结果是否符合预期。
2.  针对「预览后上传入库为空」的场景，尝试跳过预览环节上传Markdown格式文件，验证入库内容是否正常。
3.  若上述操作仍无法解决问题，需结合实际部署环境与运行日志进一步排查。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1435)
