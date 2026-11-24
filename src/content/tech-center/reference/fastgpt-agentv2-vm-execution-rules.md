---
title: FastGPT AgentV2虚拟机脚本执行限制与容错机制说明
slug: /zh/reference/fastgpt-agentv2-vm-execution-rules
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/build/agentv2/vm
source_type: 官方文档小节
---

# FastGPT AgentV2虚拟机脚本执行限制与容错机制说明

## 结论
FastGPT AgentV2虚拟机启动脚本运行受系统规则约束，包含字符长度、超时等多项执行限制。系统容错机制不会阻断主对话流程，AI仍会继续执行后续工作流，但脚本异常可能因缺少依赖抛出异常。

## 具体怎么做
1.  字符长度限制：启动脚本最大支持16,384个字符（约16KB），超出长度的脚本在保存时会被自动截断。
2.  超时终止配置：通过系统环境变量`AGENT_SANDBOX_ENTRYPOINT_TIMEOUT_SECONDS`控制脚本执行超时时间，默认值为30秒，取值范围为1秒到600秒。
3.  日志输出规则：启动脚本的标准输出与标准错误输出，系统会将其截断至4,000个字符后记录，最大日志输出量约8KB。

## 注意事项
1.  复杂初始化逻辑建议编写在单独的技能入口脚本中，或在启动脚本中拉取远程脚本执行，避免超出字符长度限制。
2.  脚本执行报错、超时终止或状态文件读写异常时，不会阻断主对话流程，但可能因缺少特定依赖导致后续代码运行抛出异常。
3.  排查脚本问题可通过调试预览的日志或虚拟机文件管理器查看相关信息。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/build/agentv2/vm)
