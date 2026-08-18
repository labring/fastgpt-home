---
title: FastGPT V4.6.4版本升级步骤与功能变更说明
slug: /zh/deploy/fastgpt-v464-upgrade-notes
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/464
source_type: 官方文档
---

# FastGPT V4.6.4版本升级步骤与功能变更说明

本文档针对FastGPT V4.6.4版本的升级流程与功能变更进行说明，适用于需要将FastGPT部署实例升级至该版本的技术人员。该版本包含多项功能优化与问题修复，升级前需按照指定步骤完成数据库初始化操作。

### 升级初始化操作
执行以下HTTP POST请求完成初始化，需替换命令中的占位参数：将`{{rootkey}}`替换为部署环境变量中的rootkey值，`{{host}}`替换为你的FastGPT部署域名。完整命令如下：
```bash
curl --location --request POST https://{{host}}/api/admin/initv464 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
该初始化请求会完成两项数据库配置更新：初始化PostgreSQL的createTime字段，以及Mongo数据库中chat集合的feedback字段。

### V4.6.4功能变更与优化
该版本包含多项核心更新：重写分享链接身份逻辑，采用localID记录用户ID；商业版新增分享链接SSO鉴权方案，通过身份鉴权地址，仅需3个接口即可完全接入已有用户系统，具体可参考分享链接身份鉴权相关文档；新增分享链接更多嵌入方式提示，支持更多自定义DIY配置；优化历史记录模块，弃用旧版历史记录模块，直接在对应位置填写配置数值即可；调整知识库搜索模块的topk逻辑，采用MaxToken计算方式，兼容不同长度的文本块；调整鉴权顺序，提高apikey的鉴权优先级，避免cookie抢占apikey的鉴权结果；链接读取支持多选择器，具体可参考Web站点同步用法；修复了分享链接图片上传鉴权问题、Mongo连接池未释放问题、Dataset Intro无法更新问题、md代码块显示问题以及root权限相关问题；同时优化了Dockerfile配置文件。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/464)
