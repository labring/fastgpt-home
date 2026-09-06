---
title: 解决FastGPT中发送图片链接提示无法访问外部链接的问题
slug: /zh/troubleshoot/fastgpt-fix-external-image-link-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1534
source_type: GitHub issue
---

# 解决FastGPT中发送图片链接提示无法访问外部链接的问题

## 现象
本地上传的图片可被识别，但发送图片链接给GPT时，系统提示无法访问外部链接。

## 可能原因
该问题源于输入框文本转换为API参数的逻辑异常。图片链接未被正确转换为适配视觉模型的参数，且不同FastGPT版本的处理机制存在差异，部分版本直接输入链接会被当作普通文本处理，不会触发图片识别流程。此外，输入格式需遵循官方指定的markdown代码块拦截规则。

## 排查步骤
1. 查看系统提示的详情，了解图片链接的实际转换流程。
2. 确认当前部署的FastGPT版本，核对版本对应的参数转换逻辑。
3. 检查输入的图片链接格式是否符合官方要求的拦截规则。
4. 参考源码文件FastGPT/packages/service/core/chat/utils.ts第124行的逻辑，核对当前输入格式是否匹配。

## 解决与验证
1. 按照官方指定的markdown代码块格式输入图片链接，确保链接被正确拦截并转换为API参数。
2. 若使用v4.6.9版本，可直接按手动输入格式触发自动图片显示；若为新版，需调整输入格式以匹配当前版本的参数转换规则。
3. 完成格式调整后，验证系统是否正常处理图片链接，GPT能否访问并识别对应图片。若仍无效，可参考源码逻辑按需修改转换规则。

> 来源: [FastGPT GitHub issue #1534](https://github.com/labring/FastGPT/issues/1534)
