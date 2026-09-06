---
title: 解决FastGPT上传PDF时提示最多支持10个文件的问题
slug: /zh/troubleshoot/fastgpt-pdf-upload-limit-prompt
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/633
source_type: GitHub issue
---

# 解决FastGPT上传PDF时提示最多支持10个文件的问题

## 现象
上传8M大小的PDF文件时，系统弹出提示"最多只支持10个文件"。另有用户反馈上传非标准格式的PDF文件时，也会触发该提示。

## 可能原因
一是上传的PDF文件格式不符合标准规范；二是网关未配置足够大的文件上传大小限制，导致大文件上传时出现异常提示。

## 排查步骤
1. 尝试使用标准格式的PDF文件进行上传测试，对比是否仍出现相同提示。
2. 检查网关的文件上传大小配置，确认是否允许大于8M的文件上传。
3. 收集上传操作的截图或录屏，用于辅助问题定位。

## 解决与验证
若为PDF格式非标准问题，将文件转换为标准PDF格式后重新上传即可。若为网关配置问题，调整网关的文件上传大小限制至符合需求，测试上传100M以内的PDF文件，确认提示不再出现。若提示仍存在，可提供相关截图或录屏进一步排查。

> 来源: [FastGPT GitHub issue #633](https://github.com/labring/FastGPT/issues/633)
