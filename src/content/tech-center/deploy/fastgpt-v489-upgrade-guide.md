---
title: FastGPT V4.8.9自部署版本升级操作与更新说明
slug: /zh/deploy/fastgpt-v489-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/489
source_type: 官方文档
---

# FastGPT V4.8.9自部署版本升级操作与更新说明

## 版本更新概述
FastGPT V4.8.9版本包含多项功能新增、优化与问题修复。功能新增方面，支持通过系统配置决定文件上传是否允许图片，不再依赖视觉模型判断；AI对话节点与工具调用可开启图片识别，自动获取对话框上传图片及用户问题中的图片链接；新增文档解析节点。商业版新增团队通知账号绑定、知识库集合标签管理、知识库搜索节点的标签与创建时间过滤、转移App owner权限，同时支持删除所有对话引导内容。QA拆分可自定义chunk大小，优化了gpt4o-mini拆分时chunk过大导致生成内容过少的问题。此外还优化了对话框信息懒加载以减少网络传输，修复了知识库上传进度异常、删除应用后跳转错误、插件动态变量默认值不显示、工具调用温度和最大回复参数不生效等多项问题。

## 升级操作步骤
自部署用户升级至V4.8.9需按以下步骤操作：
1. 提前做好数据库备份，避免升级过程中数据丢失。
2. 更新镜像：将FastGPT官方镜像tag修改为`v4.8.9`，商业版镜像同样使用`v4.8.9`，Sandbox镜像可选择不更新。
3. 商业版执行初始化：在任意终端发起HTTP请求，需将`{{rootkey}}`替换为环境变量中的rootkey，`{{host}}`替换为FastGPT域名，请求命令为：
```bash
curl --location --request POST https://{{host}}/api/admin/init/489 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
注意：仅内部使用的部署无需执行该初始化请求。

## 升级注意事项
本次升级存在几个需要关注的边界与易错点：一是文件上传配置逻辑已变更，需通过系统配置管控图片上传权限，不再依赖视觉模型；二是函数调用（FC）模式已弃用，当前基本改用ToolChoice模式，使用FC模式时需注意GPT模型必须传入content参数；三是知识库rebuilding时页面会自动刷新至第一页，属于正常行为；四是分享链接的新对话反馈功能已修复，可正常使用。此外，升级前务必完成数据库备份，防止意外情况导致数据损坏。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/489
