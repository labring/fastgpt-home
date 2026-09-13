---
title: FastGPT V4.8.12版本升级操作与功能变更说明
slug: /zh/deploy/upgrade-v4-8-12
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4812
source_type: 官方文档
---

# FastGPT V4.8.12版本升级操作与功能变更说明

## 这个版本改了什么
本次版本新增多项功能：全局变量支持数字类型并可配置默认值与部分输入框参数；插件支持自定义文本、数字、选择框、开关输入并作为变量引用；新增FE_DOMAIN环境变量，用于补全上传文件/图片的完整链接；新增工具调用交互节点、Debug模式全局变量输入、chat OpenAPI文档、wiki搜索插件、Google搜索插件、数据库连接和操作插件、Cookie隐私协议提示、HTTP节点JSONPath表达式、应用与知识库成员组权限配置。
优化内容包括：循环节点支持选择外部节点的变量；Docx文件读取的HTML转Markdown流程优化，提升速度并降低内存消耗。
修复的问题包括：文件后缀判断受query参数影响、AI响应为空时导致LLM历史记录合并、用户交互节点未阻塞流程、新建应用偶发空指针报错、多循环节点错误运行、循环节点修改变量无法传递、非stream模式下嵌套子应用/插件无法获取响应、数据分块策略优化并支持Markdown独立分块等。

## 升级前要确认的事
需提前做好数据备份。使用Milvus或Zilliz的用户，需检查dataset_datas表中indexes字段内的dataId是否存在末尾精度丢失问题；使用PG的用户无需执行后续Milvus重构步骤。Sandbox镜像无需更新。需准备好环境变量中的rootkey以及FastGPT域名。

## 升级步骤（照做）
1. 做好数据备份。
2. 修改镜像：将FastGPT镜像tag更新为v4.8.12-fix，FastGPT管理端镜像tag更新为v4.8.12（fastgpt-pro镜像），Sandbox镜像不更新。
3. 商业版执行初始化：从任意终端发起以下HTTP请求，替换{{rootkey}}为环境变量中的rootkey，{{host}}为FastGPT域名：
```bash
curl --location --request POST 'https://{{host}}/api/admin/init/4812' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
该请求用于初始化应用和知识库的成员组数据。
4. 重构Milvus数据（仅适用于使用Milvus或Zilliz且存在数据精度丢失问题的用户）：从任意终端发起以下HTTP请求，替换参数同上：
```bash
curl --location --request POST 'https://{{host}}/api/admin/resetMilvus' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```

## 升级后怎么验证
可通过访问FastGPT域名查看系统版本是否为V4.8.12。验证FE_DOMAIN环境变量配置后，上传的文件/图片链接可补全为完整地址。测试新建应用、配置全局变量、使用插件节点、循环节点、Docx文件读取等功能是否无报错。使用Milvus的用户可再次检查dataset_datas表的indexes.dataId无精度丢失问题。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4812)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
