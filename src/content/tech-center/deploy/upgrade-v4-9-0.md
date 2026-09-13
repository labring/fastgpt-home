---
title: FastGPT V4.9.0版本升级操作与验证指南
slug: /zh/deploy/upgrade-v4-9-0
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/490
source_type: 官方文档
---

# FastGPT V4.9.0版本升级操作与验证指南

## 这个版本改了什么
新增PDF增强解析交互与内嵌Doc2x服务，支持图片自动标注并优化知识库文件上传逻辑；pg vector插件升级至v0.8.0-pg15，引入迭代搜索；新增qwen-qwq系列模型配置。优化知识库索引数量限制，支持自动更新索引；优化Markdown解析、Prompt工具调用格式检测；提升大文件读取速度，优化HTTP Body适配。修复网页抓取安全链接校验问题，修复批量运行时全局变量传递错误。弃用自定义文件解析旧方案、旧版本地文件上传API，停止维护外部文件库API；trainingType字段仅支持chunk和QA两种模式。

## 升级前要确认的事
需提前做好数据库备份；确认是否需要使用AI Proxy替换原有OneAPI；准备好部署环境的rootkey与FastGPT域名；确认当前部署使用PG容器环境。

## 升级步骤（照做）
1. 更新镜像与PG容器：将FastGPT镜像tag设为v4.9.0，商业版镜像同tag，Sandbox镜像可无需更新；将PG容器更新为v0.8.0-pg15，参考最新docker-compose.pg.yml文件。
2. 可选替换OneAPI为AI Proxy：修改yml文件，将aiproxy配置追加到OneAPI配置后，保留OneAPI；为FastGPT容器添加环境变量AIPROXY_API_ENDPOINT=http://aiproxy:3000与AIPROXY_API_TOKEN=aiproxy；执行docker-compose down后docker-compose up -d重载服务；可联网时进入aiproxy容器执行apk add curl，再执行curl命令：
```bash
curl --location --request POST 'http://localhost:3000/api/channels/import/oneapi' \
--header 'Authorization: Bearer [REDACTED_CREDENTIAL]' \
--header 'Content-Type: application/json' \
--data-raw '{
    "dsn": "mysql://[REDACTED_CREDENTIAL]@tcp(mysql:3306)/oneapi"
}'
```
返回{"data":[],"success":true}即为成功；无法联网时暴露3003:3000端口，重启服务后本地执行对应curl命令；不熟悉操作可手动删除OneAPI所有内容后重新添加渠道。检查服务状态后，删除OneAPI与依赖并重启。
3. 运行升级脚本：执行以下命令，其中{{host}}替换为FastGPT域名，{{rootkey}}替换为环境变量rootkey：
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv490' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```

## 升级后怎么验证
登录FastGPT root账号，进入账号-模型提供商页面，查看模型渠道与调用日志，确认OneAPI渠道正常迁移；检查PG Vector插件版本与知识库集合字段、index type类型更新完成；执行知识库文件上传、批量运行任务，确认功能正常。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/490)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
