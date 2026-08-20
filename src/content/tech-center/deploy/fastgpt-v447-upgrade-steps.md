---
title: FastGPT V4.4.7版本升级操作与功能说明
slug: /zh/deploy/fastgpt-v447-upgrade-steps
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/447
source_type: 官方文档
---

# FastGPT V4.4.7版本升级操作与功能说明

## 版本核心优化
FastGPT V4.4.7版本包含专属升级初始化操作，用于完成数据库索引初始化与数据格式转换。该版本的核心优化包括：优化数据库文件CRUD操作、兼容链接读取作为数据源、区分手动录入与标注数据并支持追溯至指定文件，同时升级了OpenAI SDK以适配最新接口规范。

## 升级初始化操作步骤
执行升级初始化需发起1个HTTP POST请求，需将请求示例中的`{{rootkey}}`替换为部署环境中的rootkey变量值，`{{host}}`替换为自身部署的域名。完整的curl请求示例如下：
```bash
curl --location --request POST https://{{host}}/api/admin/initv447 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
该请求会完成PG索引初始化，并将file_id字段中的空对象转换为manual对象。若部署实例的数据量较大，初始化过程可能耗时较长，可通过查看系统日志确认执行进度。

## 注意事项与边界说明
该初始化操作仅适用于FastGPT V4.4.7版本的升级流程，不可用于其他版本的升级操作。请勿在初始化请求执行过程中断开请求或重启服务，否则可能导致数据库索引异常或数据格式转换不完整。若请求执行失败，需检查rootkey变量是否正确、`{{host}}`是否匹配实际部署域名，以及网络是否可正常访问该API端点。该版本的优化仅对完成初始化后的实例生效，未执行初始化的旧版本数据无法直接适配新的数据库操作逻辑。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/447)
