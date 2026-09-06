---
title: 解决FastGPT知识库引用参数类型配置异常问题
slug: /zh/troubleshoot/fastgpt-knowledge-ref-type-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4052
source_type: GitHub issue
---

# 解决FastGPT知识库引用参数类型配置异常问题

## 现象
在使用FastGPT知识库引用功能时出现异常，无法正常完成知识库关联或调用操作。具体异常表现需按实际环境确认。

## 可能原因
核心原因为知识库引用参数的格式与元素类型不符合系统要求。FastGPT要求知识库引用参数必须为数组类型，且数组内仅支持string、number类型的元素，object类型的元素无法被系统正常识别与处理，进而引发功能异常。

## 排查步骤
1. 打开知识库引用参数的配置界面，查看当前参数的整体结构与单个元素的类型；
2. 确认参数是否为数组格式，若当前参数为非数组的其他类型，需调整为数组结构；
3. 遍历数组内的每一个元素，检查其数据类型是否为string或number，移除或替换其中的object类型元素。

## 解决与验证
将知识库引用参数调整为符合要求的数组结构，仅保留string或number类型的元素作为数组项。配置完成后，重新触发知识库引用相关的操作，验证功能是否正常生效。若仍存在异常，可将鼠标悬停在参数配置区域，查看系统给出的具体结构说明，进一步确认参数格式要求。

> 来源: [FastGPT GitHub issue #4052](https://github.com/labring/FastGPT/issues/4052)
