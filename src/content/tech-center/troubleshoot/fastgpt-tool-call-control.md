---
title: 解决FastGPT工具调用结果控制与强制调用配置问题
slug: /zh/troubleshoot/fastgpt-tool-call-control
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5036
source_type: GitHub issue
---

# 解决FastGPT工具调用结果控制与强制调用配置问题

## 现象
工具调用需经过多流程时，无法精确控制每一步流程。无需大模型根据调用结果生成回复时，无法直接返回调用结果，且缺少tool_choice字段支持以强制要求模型调用工具。
## 可能原因
现有配置未适配工具调用结果直接返回的需求，且未支持tool_choice字段相关的强制调用配置。需按实际环境确认。
## 排查步骤
1. 确认当前工具调用的配置项是否包含结果直接返回相关设置
2. 检查是否存在tool_choice字段相关的强制调用配置选项
3. 核对工具调用流程的参数设置是否符合预期需求
## 解决与验证
暂未获取到该场景的具体解决配置与操作步骤，需按实际环境确认后调整。
> 来源: [FastGPT GitHub issue #5036](https://github.com/labring/FastGPT/issues/5036)
