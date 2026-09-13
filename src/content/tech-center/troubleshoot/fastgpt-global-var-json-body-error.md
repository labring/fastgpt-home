---
title: 解决FastGPT全局变量未初始化导致的HTTP插件JSON body报错问题
slug: /zh/troubleshoot/fastgpt-global-var-json-body-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2589
source_type: GitHub issue
---

# 解决FastGPT全局变量未初始化导致的HTTP插件JSON body报错问题

## 现象
用户在FastGPT私有部署环境中配置了全局变量`data`（计划为数组类型），并在HTTP插件的body中按`{"data": {{data}}}`的格式引用该变量。首次调用插件时，由于全局变量未初始化，生成的实际JSON body变为`{"data": }`，触发报错`message: 'Invalid JSON body`。用户预期的正确JSON body应为`{"data": []}`。

## 可能原因
全局变量未配置默认值，在未初始化的情况下，模板渲染引擎会输出空的变量占位符内容，导致生成的JSON语法不完整，缺少变量值部分，最终触发无效JSON的报错。

## 排查步骤
1.  查看当前配置的全局变量，确认是否未设置默认值
2.  检查HTTP插件的body模板，确认变量引用语法为`{{变量名}}`格式，无语法错误
3.  执行插件调用，获取返回的报错信息，确认报错内容包含`Invalid JSON body`
4.  核对首次调用时全局变量的初始状态，确认未被提前赋值或初始化

## 解决与验证
解决方法为给全局变量配置默认值。例如将数组类型的`data`变量默认值设置为`[]`。配置时需确认变量类型与预期使用的类型一致，避免再次出现语法错误。验证步骤为：重新配置全局变量的默认值，再次执行插件调用，确认生成的JSON body为`{"data": []}`，且插件不再返回`Invalid JSON body`的报错。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2589)
