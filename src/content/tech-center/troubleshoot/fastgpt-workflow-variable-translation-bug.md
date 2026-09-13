---
title: 解决FastGPT工作流全局变量名被自动翻译的问题
slug: /zh/troubleshoot/fastgpt-workflow-variable-translation-bug
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4061
source_type: GitHub issue
---

# 解决FastGPT工作流全局变量名被自动翻译的问题

## 现象
在FastGPT中国境内云端V4.9.0版本中，当工作流的全局变量设置名称为`classification`时，变量更新页面会将该变量名显示为`分类`，与用户设置的原始英文名称`classification`不一致，自定义变量名被自动转换为中文表述。

## 可能原因
暂未明确官方给出的具体原因，结合现象推测为系统内置的英文变量名自动本地化翻译逻辑，将设置的英文变量名转换为了对应的中文表述。

## 排查步骤
1. 确认当前使用的FastGPT版本为中国境内云端V4.9.0版本。
2. 进入工作流的全局变量配置界面，创建或编辑一个名称为`classification`的全局变量。
3. 进入变量更新页面，查看该变量的名称显示内容。
4. 对比设置的原始变量名与页面实际显示的名称。

## 解决与验证
若需保留自定义变量的原始英文名称，可暂时使用不易被自动翻译的变量命名方式，或等待官方修复该自动翻译逻辑。验证方式为：重新设置变量为非易被翻译的英文标识后，查看变量更新页面的显示内容是否与设置的原始名称一致。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4061)
