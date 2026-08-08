---
title: FastGPT V4.4.7版本升级操作与功能说明
slug: /zh/deploy/fastgpt-v447-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/447
source_type: 官方文档
---

# FastGPT V4.4.7版本升级操作与功能说明

### 版本功能与适配说明
本页面针对FastGPT V4.4.7版本的升级操作与该版本的功能优化进行说明，该版本附带专属升级脚本。该版本优化了数据库文件的CRUD操作，新增了链接读取作为数据源的兼容能力，区分了手动录入与标注数据的分类，支持将数据追踪至指定文件，同时完成了OpenAI SDK的版本升级。

### 升级执行步骤
完成该版本升级需执行初始化API请求，具体操作如下：发起一个POST HTTP请求，将`{{rootkey}}`替换为部署环境中的rootkey环境变量值，`{{host}}`替换为自身部署的域名。完整的curl请求命令为：
```bash
curl --location --request POST "https://{{host}}/api/admin/initv447" \
--header "rootkey: {{rootkey}}" \
--header "Content-Type: application/json"
```
该请求会初始化PG数据库索引，并将file_id字段中的空对象转换为manual对象。若部署环境中的数据量较大，该操作可能需要较长时间，可通过系统日志查看执行进度。

### 升级注意事项
该版本属于FastGPT历史升级路径中的条目，执行升级前需严格按照该页面给出的步骤操作，避免因操作不当引发数据异常。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/447
