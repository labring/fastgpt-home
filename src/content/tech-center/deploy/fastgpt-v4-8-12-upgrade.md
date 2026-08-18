---
title: FastGPT V4.8.12版本升级操作与更新内容说明
slug: /zh/deploy/fastgpt-v4-8-12-upgrade
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4812
source_type: 官方文档
---

# FastGPT V4.8.12版本升级操作与更新内容说明

### 升级前置说明
执行升级前需完成全量数据备份，避免数据丢失。本次升级需更新FastGPT核心镜像与管理端镜像：FastGPT镜像tag设置为`v4.8.12-fix`，管理端（fastgpt-pro）镜像tag设置为`v4.8.12`；Sandbox镜像无需更新。

### 升级执行步骤
1. 商业版初始化：从任意终端发起HTTP请求，将`{{rootkey}}`替换为环境变量中的rootkey，`{{host}}`替换为FastGPT域名：
```bash
curl --location --request POST https://{{host}}/api/admin/init/4812 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
该请求将初始化应用和知识库的成员组数据。
2. 重构Milvus数据：仅使用Milvus或Zilliz的用户需执行此步骤（PG用户可跳过），需先检查`dataset_datas`表中`indexes`字段的`dataId`是否存在末尾精度丢失问题。发起如下HTTP请求完成重构：
```bash
curl --location --request POST https://{{host}}/api/admin/resetMilvus \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```

### 更新内容与注意事项
本次升级新增多项功能：全局变量支持数字类型并可配置默认值与输入框参数；插件支持自定义输入组件（文本、数字、选择框、开关）并可作为变量引用；新增`FE_DOMAIN`环境变量，配置后上传文件/图片可补全完整地址，解决docx文件图片链接被伪造域名的问题；工具调用支持交互节点，Debug模式可输入全局变量；新增chat OpenAPI文档、wiki搜索插件、Google搜索插件、数据库连接操作插件、Cookie隐私协议提示，HTTP节点支持JSONPath表达式，应用和知识库支持成员组权限配置。
优化内容包括循环节点支持选择外部节点变量，Docx文件读取的HTML转Markdown逻辑优化，提升速度并降低内存消耗。
修复的问题包括文件后缀判断逻辑、AI响应为空时的历史记录合并异常、用户交互节点未阻塞流程、新建APP时的空指针报错、多循环节点错误运行、循环变量传递失效、非stream模式下子应用响应获取失败、数据分块策略优化等。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4812)
