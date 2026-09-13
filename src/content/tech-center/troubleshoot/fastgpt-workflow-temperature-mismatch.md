---
title: 解决FastGPT中config.json温度上限与工作流温度范围不符的问题
slug: /zh/troubleshoot/fastgpt-workflow-temperature-mismatch
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3045
source_type: GitHub issue
---

# 解决FastGPT中config.json温度上限与工作流温度范围不符的问题

## 现象
在FastGPT中，用户在config.json中配置temperature最大上限为1.2，但在FastGPT工作流的AI模块内，temperature参数的可选范围为1-10，出现配置范围不一致的现象。

## 可能原因
FastGPT工作流内的temperature参数不作为直接使用的配置值，仅作为比例参数。该参数会先除以10，再与config.json中设置的maxTemperature相乘，得到最终发送到模型的实际temperature值。同时工作流模块未对该参数的转换逻辑添加说明，导致配置范围看起来不一致。

## 排查步骤
1.  查看config.json配置文件，获取已配置的maxTemperature参数值。
2.  进入FastGPT工作流，找到对应AI模块的temperature参数，记录其设置的数值。
3.  通过公式计算实际生效的temperature值：实际温度 = config.json中的maxTemperature × (工作流设置的temperature数值 / 10)。

## 解决与验证
该现象属于正常设计。如果需要调整实际生效的温度，可通过调整工作流中的temperature参数实现。验证方式：设置工作流中的temperature参数，结合config中的maxTemperature计算实际值，确认与模型返回的生成效果匹配。可参考代码路径packages/service/core/ai/utils.ts#L42查看具体实现逻辑。不同模型的温度可用范围存在差异，不宜将maxTemperature设置过高，避免模型生成内容不可用。

> 来源: [FastGPT GitHub issue #3045](https://github.com/labring/FastGPT/issues/3045)
