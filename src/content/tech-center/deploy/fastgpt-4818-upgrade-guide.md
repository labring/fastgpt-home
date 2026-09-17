---
title: FastGPT V4.8.18版本升级步骤与更新说明
slug: /zh/deploy/fastgpt-4818-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4818
source_type: 官方文档
---

# FastGPT V4.8.18版本升级步骤与更新说明

## 版本更新详情
V4.8.18版本包含多项功能新增、体验优化与问题修复。新增功能包括支持通过JSON配置直接创建应用、通过CURL脚本快速创建HTTP插件，商业版支持部门架构权限模式，可配置自定义跨域安全策略且默认全开，补充私有部署模型问题排查文档。优化内容涵盖HTTP Body特殊处理以解决字符串变量带换行的解析问题、分享链接随机生成用户头像、图片上传安全校验与头像图片唯一存储、Mongo全文索引表分离、知识库检索查询语句合并减少查库数量、CSV文件编码检测降低乱码概率、异步读取文件减少进程阻塞、HTML文件直接下载不允许在线阅读。修复问题包括HTML文件上传时base64图片无法自动转换为图片链接、插件计费错误。

## 升级操作步骤
1. 更新镜像：将fastgpt镜像的tag更新为v4.8.18-fix，商业版fastgpt-pro镜像的tag更新为v4.8.18-fix，Sandbox镜像无需更新。
2. 运行升级脚本：在任意终端执行以下HTTP请求命令，将`{{rootkey}}`替换为环境变量中的rootkey，`{{host}}`替换为FastGPT域名：
```bash
curl --location --request POST https://{{host}}/api/admin/initv4818 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
该命令会迁移全文检索表，迁移过程中全文检索功能会失效，日志中将打印已迁移的数据长度。

## 升级相关说明
本次升级仅需更新指定镜像并执行上述升级脚本即可完成版本切换，无需额外修改配置文件。全文检索表迁移完成后，系统将恢复正常功能。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4818)
