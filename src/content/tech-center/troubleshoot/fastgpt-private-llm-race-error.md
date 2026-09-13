---
title: 解决FastGPT私有部署v4.12.2-fix3的LLM请求偶发竞态报错问题
slug: /zh/troubleshoot/fastgpt-private-llm-race-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5806
source_type: GitHub issue
---

# 解决FastGPT私有部署v4.12.2-fix3的LLM请求偶发竞态报错问题

## 现象
在FastGPT私有部署v4.12.2-fix3版本运行过程中，会偶发出现LLM请求报错问题。该问题发生时，系统同时存在模型更新日志，且期间未对模型配置进行过任何变更。

## 可能原因
模型更新时的执行流程为：清空全局模型→异步循环所有模型填充global.llmModelMap。当LLM请求刚好发生在清空全局模型后、新模型填充完成前的时间段，就会因无法在global.llmModelMap中找到所需模型而报错，属于典型的竞态条件问题。

## 排查步骤
1. 定位LLM请求报错的具体发生时间。
2. 查看该时间点前后的系统日志，确认是否存在模型更新相关日志。
3. 确认在报错发生期间，未对模型配置进行过任何变更。
4. 参考packages/service/core/ai/config/utils.ts文件中的模型更新逻辑，核对竞态条件触发的可能性。

## 解决与验证
解决该问题需采用原子更新的方式更新模型映射：先构建完整的新模型映射关系，完成构建后再替换全局的global.llmModelMap。验证时，先按照该逻辑修改对应代码文件，重启FastGPT服务后模拟模型更新操作，多次触发LLM请求，确认不再出现偶发的LLM请求报错问题。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/5806)
