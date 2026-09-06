---
title: 说明在FastGPT智能体应用中绑定技能的完整操作流程
slug: /zh/tutorial/fastgpt-agent-skill-binding
page_type: 教程
source: https://doc.fastgpt.cn/zh-CN/guide/build/skill/integration
source_type: 官方文档
---

# 说明在FastGPT智能体应用中绑定技能的完整操作流程

当前FastGPT平台中，仅智能体（Agent）应用支持直接绑定技能，简易应用及工作流暂不支持该配置操作。若需为智能体应用添加技能，需先进入对应智能体应用的编辑页面，再开展后续的配置流程。

## 技能绑定操作步骤
进入需要集成技能的智能体应用的编辑页面，这是开展技能绑定操作的第一个步骤。在该页面的左侧配置面板中，可以找到“关联Skill”配置项，该配置项是实现技能绑定的核心入口。点击该配置项右侧的“选择”按钮，此时会弹出一个专门的选择窗口，在该窗口中勾选已经发布好的正式版本技能，即可完成技能的绑定流程。配置过程可参考配套的关联Skill与虚拟机示意图。

技能代码需要在安全隔离的环境中运行。关联技能时，系统会自动开启虚拟机。已关联技能的状态下，无法关闭虚拟机。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/build/skill/integration)

## 适用性与版本范围

本页适用于官方来源记录的 教程 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
