---
title: 解决FastGPT高级编排模块局限与数据引用异常问题
slug: /zh/troubleshoot/fastgpt-orchestration-module-solution
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/356
source_type: GitHub issue
---

# 解决FastGPT高级编排模块局限与数据引用异常问题

## 现象
使用FastGPT高级编排功能时，http模块返回的数据无法被AI对话模块解析并用于回复用户。现有编排模块存在局限，缺少支持编排赋值的变量模块与数据判断模块，无法完成将http返回结果赋值存储、基于数据进行分支判断且不消耗token的操作。部分场景下，因无法直接传递http返回结果至AI对话模块，导致无法通过系统提示词引用数据完成精准回复。

## 可能原因
现有FastGPT版本未内置支持编排赋值的变量模块与数据判断模块，且原限定词功能移除后，无法直接将http模块返回结果传递至AI对话模块，导致无法通过系统提示词引用数据完成用户回复。同时，缺少无需消耗token的数据判断模块，无法实现基于数据的分支跳转逻辑。

## 排查步骤
1. 确认当前使用的FastGPT版本号，对比官方发布的版本信息，查看是否存在版本过低的情况。
2. 进入高级编排配置页面，检查是否存在变量赋值模块与数据判断模块。
3. 尝试配置http模块获取测试数据，直接在AI对话模块中引用该数据，验证是否无法正常解析并完成回复。

## 解决与验证
1. 访问FastGPT官方release页面，下载并部署v4.6.5-alpha版本。
2. 进入高级编排功能页面，确认已新增支持编排赋值的变量模块与数据判断模块。
3. 配置http模块获取返回数据，将结果赋值至变量模块，在AI对话的系统提示词中引用该变量，验证是否可正常解析数据并完成用户回复。
4. 配置数据判断模块，基于http模块或变量模块的数据设置分支条件，验证是否无需消耗token即可完成分支跳转操作。

> 来源: [FastGPT GitHub issue #356](https://github.com/labring/FastGPT/issues/356)
