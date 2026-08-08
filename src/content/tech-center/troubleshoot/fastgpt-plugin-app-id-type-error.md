---
title: 解决FastGPT引用添加的现有应用插件时的_id类型转换报错问题
slug: /zh/troubleshoot/fastgpt-plugin-app-id-type-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6785
source_type: GitHub issue
---

# 解决FastGPT引用添加的现有应用插件时的_id类型转换报错问题

## 现象
用户在FastGPT私有部署版本v4.14.10的插件库通过“添加插件”→“选择现有应用”的方式添加插件后，在工作流编排界面引用“系统工具”分类下该新增插件执行时，抛出报错：`Cast to ObjectId failed for value "tw9gGZciTZ6O" (type string) at path "_id" for model "apps"`。

## 可能原因
结合报错信息，核心问题是传入的应用_id为字符串类型，但数据库模型`apps`要求该字段为ObjectId类型，导致类型校验失败。其余可能的配置疏漏需按实际环境确认。

## 排查步骤
1.  记录报错信息中的字符串`tw9gGZciTZ6O`，核对该值是否为目标应用的正确标识。
2.  检查插件添加流程中“选择现有应用”的步骤，确认是否正确关联了对应应用。
3.  确认工作流编排界面引用该插件时，是否正确传递了应用的_id参数。
4.  需按实际环境确认系统工具插件的配置是否存在参数传递错误。

## 解决与验证
解决方法为将传入的字符串形式的应用_id转换为数据库支持的ObjectId类型，修正插件引用时的参数传递格式。验证方式为：重新在工作流中引用该新增插件执行，确认不再出现该_id类型转换报错，且能正常返回对应工具的执行结果。

> 来源：https://github.com/labring/FastGPT/issues/6785
