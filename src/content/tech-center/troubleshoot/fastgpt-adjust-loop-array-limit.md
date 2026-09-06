---
title: 调整FastGPT工作流循环数组最大长度限制的方法
slug: /zh/troubleshoot/fastgpt-adjust-loop-array-limit
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5031
source_type: GitHub issue
---

# 调整FastGPT工作流循环数组最大长度限制的方法

## 现象
使用FastGPT V4.9.7版本的批量执行工具时，输入数组长度超过50会触发报错，报错文本为`Input array length cannot be greater than 50`。

## 可能原因
工作流循环执行的数组长度限制默认设置为50，该限制通过环境变量配置，未自定义配置时使用默认值。

## 排查步骤
1. 确认当前使用的FastGPT版本为V4.9.7；
2. 定位到工作流循环执行的核心代码文件`FastGPT/packages/service/core/workflow/dispatch/loop/runLoop.ts`，查看长度限制的逻辑实现；
3. 确认用于调整该限制的环境变量名称为`WORKFLOW_MAX_LOOP_TIMES`。

## 解决与验证
该环境变量未配置时，系统将默认使用50作为最大数组长度。通过配置环境变量`WORKFLOW_MAX_LOOP_TIMES`自定义最大数组长度。具体操作：在部署FastGPT的环境中设置该环境变量，将其值设置为所需的正整数，重启FastGPT服务后配置生效。验证时，输入超过默认50长度的数组，确认不再触发预设报错。

> 来源: [FastGPT GitHub issue #5031](https://github.com/labring/FastGPT/issues/5031)
