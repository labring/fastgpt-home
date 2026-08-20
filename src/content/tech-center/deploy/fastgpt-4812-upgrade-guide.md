---
title: FastGPT V4.8.12版本升级流程与更新内容说明
slug: /zh/deploy/fastgpt-4812-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4812
source_type: 官方文档
---

# FastGPT V4.8.12版本升级流程与更新内容说明

## 版本更新内容
本页面针对FastGPT V4.8.12版本的更新与升级进行说明。本次更新包含多项新增功能、优化项与问题修复：新增全局变量支持数字类型及默认值配置，插件可使用文本/数字输入框、选择框、开关等自定义输入组件作为变量引用；新增FE_DOMAIN环境变量，配置后可补全上传文件/图片的完整访问地址，解决docx文件中图片链接被伪造域名的问题；新增工具调用交互节点、Debug模式全局变量输入、chat OpenAPI文档、wiki搜索插件、Google搜索插件、数据库连接与操作插件，以及Cookie隐私协议提示，HTTP节点支持JSONPath表达式，应用和知识库支持成员组权限配置。优化项包括循环节点支持选择外部节点变量，Docx文件读取的HTML转Markdown流程优化，提升速度并降低内存消耗。修复了文件后缀判断、AI响应空时历史记录合并、交互节点未阻塞流程、新建APP空指针报错、多循环节点错误运行、循环变量无法传递、非stream模式下子应用响应获取失败、数据分块策略等多项问题。

## 升级操作步骤
1. 提前做好全量数据备份，避免升级过程中出现数据丢失问题。
2. 更新镜像：将FastGPT基础镜像tag设置为`v4.8.12-fix`，管理端镜像（fastgpt-pro）tag设置为`v4.8.12`，Sandbox镜像可选择不更新。
3. 商业版执行初始化操作：在任意终端发起HTTP请求，将`{{rootkey}}`替换为环境变量中的rootkey，`{{host}}`替换为FastGPT域名，执行以下命令：
```
curl --location --request POST https://{{host}}/api/admin/init/4812 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
该请求将初始化应用和知识库的成员组数据。
4. 重构Milvus数据：如果您的部署使用了Milvus或Zilliz，且存在dataset_datas表中indexes字段的dataId末尾精度丢失问题，需执行以下HTTP请求：
```
curl --location --request POST https://{{host}}/api/admin/resetMilvus \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
使用PG数据库的用户无需执行此步骤。

## 升级注意事项
升级完成后，建议验证各项功能是否正常运行，尤其是配置了FE_DOMAIN环境变量的场景，可通过上传docx文件检查图片链接是否正确补全。若之前遇到过本次更新修复的各类问题，升级后相关异常将得到解决。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4812)
