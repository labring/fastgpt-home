---
title: FastGPT V4.8.19版本自部署升级步骤说明
slug: /zh/deploy/fastgpt-v4819-upgrade-steps-2
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4819
source_type: 官方文档
---

# FastGPT V4.8.19版本自部署升级步骤说明

本文档面向FastGPT自部署用户，详细说明V4.8.19版本的升级流程、更新内容及注意事项，帮助用户完成版本升级并适配新功能。

## 升级操作步骤
1.  更新镜像：将fastgpt基础镜像的tag更新为v4.8.19-beta，商业版fastgpt-pro镜像的tag同样设置为v4.8.19-beta，Sandbox镜像无需执行更新操作。
2.  运行升级脚本：在任意终端发起HTTP POST请求，需将命令中的`{{rootkey}}`替换为环境变量内配置的rootkey值，`{{host}}`替换为FastGPT的域名地址。完整执行命令如下：
```bash
curl --location --request POST https://{{host}}/api/admin/initv4819 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
该脚本将完成用户表头像数据到成员表的迁移工作。

## 更新内容与注意事项
本次更新包含多项新增功能、优化项与修复内容：新增工作流知识库检索按知识库权限过滤、飞书/语雀知识库查看原文、流程等待插件（可等待指定毫秒后继续执行流程）、私有化部署飞书机器人接入；优化成员列表分页加载逻辑、统一分页加载代码、对话页面独立页面配置能力，完成成员头像数据从用户表到成员表的迁移；修复语雀文件库导入嵌套文件无法展开、工作流编排中LLM参数无法关闭、代码运行节点还原模板异常、HTTP接口对象字符串解析适配、API上传文件（localFile）接口图片过期标记未清除、工作流导入编排时number input类型无法覆盖、部分模型提供商logo无法正常显示等多个问题。
需注意的易错点：执行升级脚本前需确保FastGPT服务正常运行，rootkey属于敏感配置需妥善保管避免泄露，Sandbox镜像无需更新请勿误操作。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4819
