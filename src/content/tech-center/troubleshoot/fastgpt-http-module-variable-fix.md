---
title: 解决FastGPT私有部署中HTTP模块无法使用传入模块变量的问题
slug: /zh/troubleshoot/fastgpt-http-module-variable-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1016
source_type: GitHub issue
---

# 解决FastGPT私有部署中HTTP模块无法使用传入模块变量的问题

## 现象
用户在私有部署的FastGPT流程中定义了模块变量，在HTTP模块中直接填写该变量名称，但变量未被替换为预设值，变量内容原样展示在请求参数中。

## 可能原因
仅基于当前现象可推断，可能的原因包括引用变量时未使用正确的模板占位符语法，变量名称拼写与定义不一致，或者引用位置超出变量的作用域范围。

## 排查步骤
1. 核对模块变量的定义名称与HTTP模块中填写的名称，确保拼写、大小写完全一致。
2. 确认HTTP模块中引用变量时使用了正确的模板语法格式，需添加标准的变量占位符包裹。
3. 检查变量的定义位置与引用位置的流程作用域，确保引用处于变量可访问的节点范围内。
4. 检查是否存在其他配置项覆盖了该模块变量的预设取值。

## 解决与验证
使用标准的FastGPT模板变量语法`{{变量名称}}`替换直接填写的变量名，其中变量名称与之前定义的模块变量名完全一致。保存流程配置后发起测试调用，即可看到变量被正确替换为预设的取值。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1016)
