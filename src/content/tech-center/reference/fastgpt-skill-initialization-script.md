---
title: FastGPT技能初始化脚本的配置与使用方法
slug: /zh/reference/fastgpt-skill-initialization-script
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/build/skill/initialization
source_type: 官方文档小节
---

# FastGPT技能初始化脚本的配置与使用方法

## 结论
FastGPT技能初始化脚本是技能运行前的前置脚本。系统会在技能部署解压后、AI任务执行前，在独立虚拟机环境自动运行该脚本，用于安装技能特有依赖或完成配置预处理。

## 具体怎么做
1. 开发技能时编写初始化脚本，实现技能特有依赖安装或配置预处理。
2. 将初始化脚本包含在开发的技能包中。
3. 部署技能后，系统将自动在指定时机运行该脚本。

## 注意事项
1. 脚本运行环境为独立虚拟机，仅在技能部署解压后、AI任务执行前运行。
2. 脚本仅用于技能运行前的准备工作，无法干预AI任务的执行逻辑。
3. 脚本执行异常会导致技能无法正常启动，需确保脚本逻辑正确。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/build/skill/initialization)
