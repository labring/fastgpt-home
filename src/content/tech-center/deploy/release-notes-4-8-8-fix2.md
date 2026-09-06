---
title: FastGPT v4.8.8-fix2版本升级修复内容与操作指引
slug: /zh/deploy/release-notes-4-8-8-fix2
page_type: 版本解读
source: https://github.com/labring/FastGPT/releases/tag/v4.8.8-fix2
source_type: 官方文档
---

# FastGPT v4.8.8-fix2版本升级修复内容与操作指引

## 这个版本改了什么
本版本共包含6项正式变更，其中5项缺陷修复与1项体验优化：1. 修复插件工作流无法正常使用的问题，官方附带的复盘文档链接为https://fael3z0zfze.feishu.cn/docx/I6mYdytImopdqVxqY8Sc5jeqnyg；2. 修复工作流中知识库问题显示异常的问题，对应PR#2210；3. 修复oneapi镜像版本号配置错误的问题；4. 优化运行详情弹窗的展示逻辑，对应PR#2192；5. 修复helm发布流程因版本处理逻辑异常导致失败的问题，对应PR#2199；6. 修复定时触发器开关状态不一致的问题，对应PR#2221。此外，本版本新增两位首次为项目贡献代码的开发者：@aopstudio和@torqueJY32，他们分别通过PR#2197和PR#2221完成首次贡献。

## 升级前要确认的事
升级前需确认当前运行的FastGPT版本为v4.8.8-fix之前的版本，确保升级路径正确。

## 升级步骤（照做）
升级步骤需将FastGPT部署版本更新至v4.8.8-fix2，具体操作参照官方标准部署流程。若使用helm部署方式，需更新helm release至对应版本；若使用其他部署方式，需更新对应镜像版本为v4.8.8-fix2。

## 升级后怎么验证
升级完成后，可通过以下方式验证修复与优化的内容是否生效：1. 新建或打开已有插件工作流，测试其是否可正常运行；2. 在工作流中添加知识库节点，检查其问题显示是否正常；3. 查看oneapi相关配置的镜像版本号是否正确；4. 点击运行详情弹窗，检查其展示逻辑是否正常；5. 测试helm发布流程是否可成功执行；6. 配置定时触发器，验证其开关状态是否一致。

> 来源: [FastGPT release notes](https://github.com/labring/FastGPT/releases/tag/v4.8.8-fix2)
