---
title: FastGPT V4.14.3版本升级内容与操作验证说明
slug: /zh/deploy/upgrade-v4-14-3
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4143
source_type: 官方文档
---

# FastGPT V4.14.3版本升级内容与操作验证说明

## 这个版本改了什么
新增内容包括：知识库文件迁移至S3，全部使用文件的地方均已完成迁移；全局变量支持文件上传；表单输入节点新增密码、开关、时间点、时间范围、文件上传、对话模型选择类型；插件输入支持多选、时间点、时间范围、内部变量；系统插件与插件市场将提示是否有新版本，并提供更新按键；新增工作流运行QPM限制。
优化内容包括：工作流工具的文件上传输入UX优化；添加权限表校验中间件，增强权限表鲁棒性。
修复内容包括：修复工作流调试预览窗口重新渲染导致输入丢失的问题；修复S3服务与主服务相同Origin的域名导致文件请求URL错误替换，产生404报错的问题。
插件相关更新包括：工具更新逻辑改为通过计算的version值判断更新；微信公众号工具集新增同时上传多篇文档到草稿箱的功能；修复工具缓存未正确刷新的问题；修复开发模式下刷新缓存导致静态文件重新上传的问题；修复上传pkg后图片未正确上传的问题。

## 升级前要确认的事
需要确认需更新的镜像版本：FastGPT镜像tag为v4.14.3，FastGPT商业版镜像tag为v4.14.3，fastgpt-plugin镜像tag为v0.3.3；mcp_server、Sandbox、AIProxy无需更新。同时需准备好环境变量中的rootkey，以及FastGPT的域名，迁移操作仅针对MongoDB GridFS中的知识库文本数据集与图片数据集，不包括.docx等文档解析出的图片。

## 升级步骤（照做）
第一步为更新对应镜像，按要求更新指定镜像的tag。第二步执行升级脚本：从任意终端发起HTTP POST请求，执行以下命令：
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv4143' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
其中{{rootkey}}需替换为环境变量中的rootkey，{{host}}需替换为FastGPT的域名。该请求将完成MongoDB GridFS中知识库文件向S3的迁移。

## 升级后怎么验证
可通过以下方式验证升级是否成功：确认系统插件与插件市场显示新版本更新提示；测试工作流调试预览窗口，输入内容不会因重新渲染丢失；访问知识库文件，确认无404报错；测试全局变量、表单输入节点的文件上传功能正常；确认工作流运行QPM限制生效。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4143)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
