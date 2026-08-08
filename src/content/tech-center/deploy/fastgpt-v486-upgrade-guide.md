---
title: FastGPT V4.8.6版本升级操作与更新内容说明
slug: /zh/deploy/fastgpt-v486-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/486
source_type: 官方文档
---

# FastGPT V4.8.6版本升级操作与更新内容说明

### V4.8.6版本更新详情
本版本包含多项新增功能、体验优化与问题修复：
新增功能包括：应用权限继承能力；知识库支持单个集合禁用功能；系统插件模式完成变更，新增链接读取与数学计算器两款插件；新增代码沙盒运行参数配置项；AI对话界面支持隐藏头部，适配移动端展示需求。
优化内容涵盖：文件读取流程优化，Mongo数据库默认使用从节点以减轻主节点压力；提示词模板逻辑优化；Mongo model重复加载问题优化，提升系统稳定性。
修复的问题包括：创建链接集合未返回id的异常；文档接口说明不规范问题；api system提示合并异常；团队插件目录内内容无法加载的问题；知识库集合目录面包屑无法加载的问题；Markdown导出对话内容异常；提示模板结束标签错误；文档描述信息异常。

### V4.8.6版本升级操作步骤
请严格按照以下顺序完成升级操作：
1. 提前做好数据库备份，避免升级过程中出现数据丢失问题。
2. 修改镜像标签：将fastgpt、fastgpt-sandbox以及商业版镜像的tag统一修改为v4.8.6。
3. 执行初始化配置命令：通过任意终端发起HTTP POST请求，替换命令中的两个占位符：将`{{rootkey}}`替换为环境变量内配置的rootkey值，`{{host}}`替换为FastGPT的访问域名。完整命令如下：
```
curl --location --request POST https://{{host}}/api/admin/initv486 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
该请求将自动初始化应用的继承权限，完成版本升级后的核心配置步骤。

### 升级补充说明
本版本的升级操作依托专属初始化接口完成，无需手动执行复杂的数据库脚本，仅需按照上述步骤操作即可完成升级。升级过程中请确保网络连接稳定，避免中断请求导致配置不完整。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/486
