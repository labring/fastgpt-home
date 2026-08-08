---
title: FastGPT V4.12.3版本升级操作及更新内容说明
slug: /zh/deploy/fastgpt-4-12-3-upgrade
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-12/4123
source_type: 官方文档
---

# FastGPT V4.12.3版本升级操作及更新内容说明

FastGPT V4.12.3版本于2025年9月8日发布，本次升级需更新指定镜像组件，其中FastGPT官方镜像、商业版镜像的tag需更新为v4.12.3，fastgpt-plugin镜像tag需更新为v0.1.12；mcp_server、Sandbox、AIProxy无需执行更新操作。

### 升级操作步骤
按照官方指引完成升级的核心操作仅需更新对应镜像：将部署环境中的FastGPT官方镜像tag替换为v4.12.3，商业版镜像tag同样调整为v4.12.3，fastgpt-plugin镜像tag更新为v0.1.12，其余组件mcp_server、Sandbox、AIProxy保持原有配置无需改动。

### 本次更新详情
#### 新增内容
提示词编辑器支持列表、tab渲染等部分富文本交互；应用新增全局变量，包含密码、多选类型，以及站内对话不会显示的内部变量。
#### 优化内容
纠正RRF权重合并算法，改用标准RRF权重公式；多选组件支持动态宽度计算，可适配可见tag的展示需求；变量更新组件渲染优化，与全局变量渲染保持一致性。
#### 修复内容
修复单团队模式下用户离开后无法重新进入团队的问题；修复工作流文件上传默认打开但输入侧未添加文件输出的问题；修复连续用户选择场景下分支无法正常运行的问题；修复工作流变量更新时数组选择器异常的问题；修复应用评测仅获取首个输出文本、未获取所有输出文本的问题。
#### 插件更新
系统工具类型迁移至plugin；模型提供商配置移动至plugin，支持热更新；应用模板移动至plugin。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-12/4123
