---
title: 配置与运行FastGPT技能初始化脚本的操作指南
slug: /zh/tutorial/fastgpt-skill-initialization-script
page_type: 教程/部署
source: https://doc.fastgpt.cn/zh-CN/guide/build/skill/initialization
source_type: 官方文档
---

# 配置与运行FastGPT技能初始化脚本的操作指南

## 脚本作用与基础配置
技能初始化脚本是FastGPT技能开发者提供的前置脚本，用于在技能代码执行前自动完成环境准备工作。当引用该技能的应用被运行时，系统会先将技能包部署并解压到虚拟机的`./projects/versionId/`目录下，随后在独立虚拟机环境中自动执行该脚本，完成第三方依赖安装或必要的配置预处理。若要为技能添加初始化脚本，只需在技能压缩包的根目录下放置一个名为`entrypoint.sh`的Shell脚本即可。

## 智能去重与执行约束
系统为初始化脚本设计了智能去重机制，避免重复执行导致的延迟问题。去重状态记录在虚拟机内的`~/.fastgpt/agent-skill-entrypoints/state.json`状态文件中：系统会记录已成功运行过的技能`versionId`，当同一个虚拟机实例后续被复用时，若对应`versionId`已执行过脚本，则直接跳过运行，实现秒级热启动；若技能发布了新版本，无论对话窗口新旧，下次对话触发时系统会重新部署技能并执行新版本的初始化脚本。

同时脚本执行需遵循固定约束：脚本超时时间默认30秒，执行报错或超时不会阻断主流程，且日志输出会被截断为8KB，规则与应用启动脚本完全一致。在技能的编辑模式下，虚拟机不会自动执行`entrypoint.sh`脚本，若需验证脚本效果，需在侧边栏调试区的控制台终端中手动执行相关命令。

## 快速配置步骤
1. 在技能开发项目的根目录下，创建名为`entrypoint.sh`的Shell脚本文件。
2. 编写脚本内容，例如安装技能所需的第三方依赖：
```bash
#!/bin/bash
# 安装技能依赖包示例
pip install -r requirements.txt
```
3. 将该脚本与技能其他代码文件一同打包为技能压缩包。
4. 发布技能版本，当引用该技能的应用首次运行时，系统会自动执行该初始化脚本。

> 来源：https://doc.fastgpt.cn/zh-CN/guide/build/skill/initialization
