---
title: FastGPT V4.8.18版本升级操作与更新内容说明
slug: /zh/deploy/upgrade-v4-8-18
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4818
source_type: 官方文档
---

# FastGPT V4.8.18版本升级操作与更新内容说明

## 这个版本改了什么
本版本包含新增功能、体验优化与问题修复。新增功能包括支持通过JSON配置直接创建应用，支持通过CURL脚本快速创建HTTP插件，商业版支持部门架构权限模式，支持配置自定义跨域安全策略，默认全开，补充私有部署与模型问题排查文档。体验优化包括HTTP Body增加特殊处理以解决字符串变量带换行时无法解析的问题，分享链接随机生成用户头像，图片上传安全校验与头像图片唯一存储，Mongo全文索引表分离，知识库检索查询语句合并以减少查库数量，文件编码检测以降低CSV文件乱码概率，异步读取文件内容以减少进程阻塞，文件阅读调整为HTML直接下载，不允许在线阅读。问题修复包括HTML文件上传时base64图片无法自动转换为图片链接，插件计费错误。
## 升级前要确认的事
升级前需确认以下内容：1. 已获取环境变量中的rootkey，以及FastGPT的部署域名。2. 仅需更新fastgpt与fastgpt-pro商业版镜像至tag v4.8.18-fix，Sandbox镜像无需更新。3. 知晓全文检索表迁移过程耗时较长，期间全文检索功能将暂时失效。
## 升级步骤（照做）
1. 更新镜像：将fastgpt镜像tag设置为v4.8.18-fix，将fastgpt-pro商业版镜像tag设置为v4.8.18-fix，Sandbox镜像无需更新。2. 运行升级脚本：从任意终端发起如下HTTP POST请求：
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv4818' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
请求中需将{{rootkey}}替换为环境变量中的rootkey，{{host}}替换为FastGPT域名。请求执行后将迁移全文检索表，日志会打印已迁移的数据长度。
## 升级后怎么验证
升级完成后可通过以下方式验证功能正常：1. 确认全文检索功能恢复正常。2. 测试通过JSON配置创建应用、通过CURL脚本创建HTTP插件功能。3. 商业版用户确认部门架构权限模式可正常配置使用。4. 上传HTML文件，验证base64图片可自动转换为图片链接。5. 上传CSV文件，验证乱码问题已解决。6. 测试分享链接生成随机用户头像功能。7. 检查插件计费逻辑正常。
> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4818)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
