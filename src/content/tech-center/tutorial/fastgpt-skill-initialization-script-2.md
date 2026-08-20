---
title: FastGPT技能初始化脚本的配置、运行与约束说明
slug: /zh/tutorial/fastgpt-skill-initialization-script-2
page_type: 教程/部署
source: https://doc.fastgpt.cn/zh-CN/guide/build/skill/initialization
source_type: 官方文档
---

# FastGPT技能初始化脚本的配置、运行与约束说明

## 功能与执行时机
技能初始化脚本是技能开发者提供的前置脚本，用于在技能代码执行前，自动安装专属第三方依赖或完成必要的配置预处理。当应用成功部署并解压技能包后，系统会在独立虚拟机环境中，于实际执行AI任务前自动运行该脚本。技能包会被解压到虚拟机的`./projects/versionId/`目录下，执行的脚本为该目录根目录下的`entrypoint.sh`。

## 快速配置与调试步骤
要为技能添加初始化脚本，只需在技能压缩包的根目录放置名为`entrypoint.sh`的Shell脚本即可。当用户运行引用该技能的应用时，系统会自动完成技能包的部署解压，并执行该初始化脚本。需要注意调试限制：在技能的编辑模式下，虚拟机不会自动执行`entrypoint.sh`脚本，若需验证脚本效果，开发者可直接在侧边栏调试区的Workspace Terminal中手动执行相关命令。

## 约束与去重机制
系统为初始化脚本设计了智能去重机制，去重状态记录在虚拟机内的`~/.fastgpt/agent-skill-entrypoints/state.json`状态文件中。系统会记录当前虚拟机中已成功运行过的技能`versionId`，当同一个虚拟机实例在后续对话中被复用时，只要对应的`versionId`已经成功执行过，系统就会直接跳过脚本运行，实现秒级热启动；若技能发布了新版本，无论在旧还是新的对话窗口，下次对话触发时，系统都会重新部署该技能并自动运行新版本的初始化脚本。

同时，技能初始化脚本需遵循执行约束与容错规则：脚本的超时时间限制为默认30秒，执行报错或超时不会阻断主流程，且日志输出会被截断为8KB，相关规则与应用启动脚本保持一致。若技能无额外依赖或配置需求，无需添加该初始化脚本。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/guide/build/skill/initialization)
