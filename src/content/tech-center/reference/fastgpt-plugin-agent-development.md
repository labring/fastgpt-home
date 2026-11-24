---
title: 使用Agent工具开发FastGPT官方插件的完整操作流程
slug: /zh/reference/fastgpt-plugin-agent-development
page_type: 技术速查
source: https://doc.fastgpt.cn/plugin/system-tool-development
source_type: 官方文档小节
---

# 使用Agent工具开发FastGPT官方插件的完整操作流程

## 结论
使用Agent工具可快速完成FastGPT官方插件开发，需遵循官方Skill文档的标准流程。开发完成后需按要求完成验证与打包，输出符合规范的插件相关文件。

## 具体怎么做
1. 复制官方提供的Agent开发提示词，读取并理解指定的Skill文档（https://raw.githubusercontent.com/labring/fastgpt-official-plugins/refs/heads/main/.agents/skills/develop-fastgpt-plugin/SKILL.md），后续开发流程以此为准。
2. 收集插件名称、插件类型、中英文名称与描述、输入输出、密钥、外部API、预期行为、错误处理和测试样例。
3. 若需求缺失，最多提出3个关键问题；可合理默认的需说明假设后继续推进。
4. 使用`@fastgpt-plugin/cli`创建插件骨架，优先遵循仓库内已有插件的结构、命名、测试和构建方式。
5. 若在fastgpt-plugin仓库内开发或维护SDK/CLI，可参考本地Skill文件：sdk/factory/skills/fastgpt-plugin-development/SKILL.md、sdk/factory/skills/fastgpt-system-tool-development/SKILL.md、sdk/factory/skills/fastgpt-sdk-factory/SKILL.md。
6. 实现完成后运行必要验证，包括测试、构建、插件检查和打包；无法验证的项目需说明原因。
7. 最终输出变更文件、验证结果、剩余假设和需要人工确认的外部API行为。

## 注意事项
1. 必须严格遵循读取后的Skill文档执行开发流程，不得擅自调整。
2. 仅可使用原文提及的工具、命令和参考文件，不得自行补充未明确说明的内容。
3. 若需求信息不完整，最多提出3个关键问题，不得额外索要更多信息。
4. 无法验证的项目需明确说明原因，不得臆造验证结果。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/plugin/system-tool-development)
