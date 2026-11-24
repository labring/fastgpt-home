---
title: FastGPT代码结构与DDD领域划分规则说明
slug: /zh/reference/fastgpt-code-structure-ddd
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/dev
source_type: 官方文档小节
---

# FastGPT代码结构与DDD领域划分规则说明

## 结论
FastGPT 采用DDD思想划分代码模块，核心分为core、support、common三个领域。整体项目具备标准化的目录结构，开发者可通过目录层级快速定位对应功能的代码。

## 具体怎么做
1. 领域模块划分：
   - core：承载知识库、工作流、应用、对话核心功能
   - support：提供用户体系、计费、鉴权等支撑功能
   - common：实现日志管理、文件读写等基础功能
2. 项目目录结构：
   顶层目录包含.github、.husky、document、files、packages、projects、python、scripts等子目录。其中packages下包含global（前后端通用子包）、plugins（工作流插件开发目录）、service（后端子包）、web（前端子包）；projects下包含app（FastGPT主项目）。
   顶层文件包含icon目录、postinstall.sh、package.json、pnpm-lock.yaml、pnpm-workspace.yaml、Dockerfile、LICENSE、README.md等。scripts目录存放自动化脚本，可通过pnpm initIcon或pnpm previewIcon执行icon相关操作。

## 注意事项
1. python目录存放的模型代码与FastGPT本身无关，请勿在其中编写业务代码。
2. 自定义工作流插件需在packages/plugins目录下开发。
3. 顶层采用monorepo规范，请勿直接修改非业务目录的配置文件。
4. 主项目代码位于projects/app目录下，请勿随意修改通用子包代码。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/dev)
