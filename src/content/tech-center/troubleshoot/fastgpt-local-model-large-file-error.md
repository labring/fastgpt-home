---
title: 解决FastGPT大文件上传后本地模型调用失败的问题
slug: /zh/troubleshoot/fastgpt-local-model-large-file-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2896
source_type: GitHub issue
---

# 解决FastGPT大文件上传后本地模型调用失败的问题

## 现象
在FastGPT 4.8.11-fix版本中，上传小文件（如合同2.pdf）时，调用本地模型可正常完成内容总结。上传大文件（如60007.pdf，约2万个字符）时，AI提示"请提供具体的内容"。查看AI对话日志可知，文档解析模块已成功提取大文件内容并填充至SYSTEM--CONTENT字段，但模型调用仍失败。此外，直接将大文件内容复制到对话框时，本地模型可正常处理该内容。本次测试中，AI Tokens消耗为76038，上下文总长度为3，最大响应tokens为1900。

## 可能原因
暂未明确根因，推测可能与系统提示词承载大文件内容时的上下文处理逻辑相关。已知本地模型已调整最大上下文参数且生效，且直接复制大文件内容可正常调用模型，说明模型本身支持该长度的内容。

## 排查步骤
1. 确认FastGPT版本为4.8.11-fix，区分测试文件的字符量，验证小文件可正常调用、大文件触发异常的现象。
2. 查看AI对话日志，确认文档解析模块已成功提取大文件内容并填充至SYSTEM--CONTENT字段。
3. 测试直接复制大文件内容到对话框，验证本地模型可正常处理该内容，排除模型本身的上下文限制问题。
4. 检查上下文总长度、最大响应tokens等配置参数，确认参数配置符合当前测试需求。

## 解决与验证
可尝试调整prompt拼接逻辑，将原本放入SYSTEM--CONTENT的文档解析内容、系统提示词转移至用户（human）对话块中。调整后重新上传大文件测试，确认模型可正常识别并处理内容。需注意，该调整可能影响原有的知识库引用提示词配置，需同步匹配相关提示词逻辑。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2896)
