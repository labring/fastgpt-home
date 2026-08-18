---
title: FastGPT V4.12.4版本升级操作说明
slug: /zh/deploy/fastgpt-v4124-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-12/4124
source_type: 官方文档
---

# FastGPT V4.12.4版本升级操作说明

## 版本基本信息
本页面为FastGPT V4.12.4版本的官方升级文档，该版本发布于2025年9月15日。本次升级需更新指定镜像：FastGPT官方镜像、商业版镜像的tag均为v4.12.4；fastgpt-plugin镜像tag为v0.1.13；Sandbox镜像tag为v4.12.4。mcp_server与AIProxy无需更新。

## 升级操作步骤
该升级脚本仅商业版用户需执行，具体操作步骤如下：
1. 完成上述对应镜像的更新配置；
2. 在任意终端发起以下HTTP请求，需将`{{rootkey}}`替换为环境变量中的rootkey，`{{host}}`替换为FastGPT的访问域名：
```
curl --location --request POST https://{{host}}/api/admin/initv4124 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
该脚本的核心功能为补充所有资源的owner权限。

## 本次更新内容
### 新增功能
商业版支持企微发布渠道；新增用户选择UI功能。
### 优化项
权限继承逻辑优化，当子资源权限高于父级时，不会强制打断继承模式；Prompt编辑器支持列表渲染；数据页返回知识库列表时保持分页逻辑；知识库上传文件成功后，返回对应上传目录；删除应用操作减少事务执行次数。
### 修复问题
修复HTTP工具空指针导致无法编辑的问题；修复Python代码运行时入参无法为布尔值的问题。
### 插件更新
本次升级涉及fastgpt-plugin镜像更新，其他插件无强制更新要求。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-12/4124)
