---
title: FastGPT V4.8.18版本自部署升级操作说明
slug: /zh/deploy/fastgpt-v4818-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4818
source_type: 官方文档
---

# FastGPT V4.8.18版本自部署升级操作说明

## 版本更新概述
FastGPT V4.8.18为自带升级脚本的自部署版本，仅适用于需要升级到该版本的自部署用户。本次更新覆盖功能新增、体验优化与问题修复三大类。新增功能包括支持通过JSON配置直接创建应用、通过CURL脚本快速创建HTTP插件，商业版新增部门架构权限模式，支持配置自定义跨域安全策略（默认全放开），同时补充了私有部署场景下的模型问题排查文档。优化内容涵盖HTTP Body特殊处理（解决字符串变量带换行时无法解析的问题）、分享链接随机生成用户头像、图片上传安全校验与头像唯一存储、Mongo全文索引表分离、知识库检索查询语句合并减少查库次数、文件编码检测降低CSV乱码概率、异步读取文件减少进程阻塞，以及HTML文件直接下载而非在线阅读。修复问题包括HTML文件上传时base64图片无法自动转换为图片链接、插件计费错误。需注意，本次升级会迁移全文检索表，迁移期间全文检索功能将暂时失效，日志会实时打印已迁移的数据长度。

## 升级操作步骤
1.  **更新镜像**：将fastgpt镜像tag更新为`v4.8.18-fix`，商业版fastgpt-pro镜像tag同样更新为`v4.8.18-fix`，Sandbox镜像无需更新。
2.  **运行升级脚本**：在任意终端执行以下HTTP请求，需替换`{{rootkey}}`为环境变量中的rootkey，`{{host}}`为FastGPT域名：
    ```bash
    curl --location --request POST https://{{host}}/api/admin/initv4818 \
    --header rootkey: {{rootkey}} \
    --header Content-Type: application/json
    ```
    脚本执行期间会自动迁移全文检索表，迁移过程耗时较长，请等待执行完成。

## 升级注意事项
本次升级后，系统默认开启全量跨域访问，如需自定义跨域安全策略可通过对应配置项调整。文件上传与阅读逻辑已优化，HTML文件将直接下载而非在线阅读，CSV文件乱码概率有所降低。迁移全文检索表期间，请勿执行与全文检索相关的操作，确保数据迁移完整。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4818)
