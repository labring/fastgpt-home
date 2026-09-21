---
title: FastGPT V4.8.18版本升级步骤与更新内容说明
slug: /zh/deploy/fastgpt-v4818-upgrade
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4818
source_type: 官方文档
---

# FastGPT V4.8.18版本升级步骤与更新内容说明

## 版本升级前提
V4.8.18版本需通过专用升级脚本完成升级，升级过程中会迁移全文检索表，迁移持续时间较长，期间全文检索功能将暂时失效，系统运行日志会打印已完成迁移的数据长度。执行升级操作前，需提前获取环境变量中的rootkey以及FastGPT的访问域名。

## 升级操作步骤
1.  更新镜像：将fastgpt镜像tag更新为v4.8.18-fix，商业版fastgpt-pro镜像tag更新为v4.8.18-fix，Sandbox镜像无需执行更新操作。
2.  运行升级脚本：在任意终端发起HTTP请求，替换命令中的{{rootkey}}为环境变量内的rootkey，{{host}}为FastGPT访问域名，执行以下命令：
```bash
curl --location --request POST https://{{host}}/api/admin/initv4818 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```

## 版本更新内容
本次版本包含多项新增、优化与修复内容：
### 新增功能
1.  支持通过JSON配置直接创建应用
2.  支持通过CURL脚本快速创建HTTP插件
3.  商业版支持部门架构权限模式
4.  支持配置自定义跨域安全策略，默认策略为全开
5.  补充私有部署模型问题排查文档
### 优化项
1.  对HTTP Body增加特殊处理，解决字符串变量携带换行时无法解析的问题
2.  为分享链接随机生成用户头像
3.  新增图片上传安全校验，同时增加头像图片唯一存储，避免累计存储占用
4.  分离Mongo全文索引表
5.  合并知识库检索查询语句，减少数据库查询次数
6.  优化文件编码检测逻辑，降低CSV文件出现乱码的概率
7.  采用异步方式读取文件内容，减少进程阻塞情况
8.  调整文件阅读逻辑，HTML文件直接下载，不支持在线阅读
### 修复问题
1.  修复HTML文件上传时，base64格式图片无法自动转换为图片链接的问题
2.  修复插件计费错误的问题

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4818)
