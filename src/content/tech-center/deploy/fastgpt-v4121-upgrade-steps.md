---
title: FastGPT V4.12.1版本升级操作及更新内容说明
slug: /zh/deploy/fastgpt-v4121-upgrade-steps
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-12/4121
source_type: 官方文档
---

# FastGPT V4.12.1版本升级操作及更新内容说明

### 版本基本信息与镜像更新要求
FastGPT V4.12.1发布于2025年8月18日，本次升级需更新指定镜像标签：FastGPT官方镜像tag为v4.12.1-fix，商业版镜像tag为v4.12.1，fastgpt-plugin镜像tag为v0.1.10；mcp_server、Sandbox、AIProxy无需执行更新操作。

### 升级操作步骤
仅商业版用户需执行本次升级脚本。在任意终端发起如下HTTP POST请求，需替换两个自定义参数：将`{{rootkey}}`替换为环境变量中配置的rootkey，将`{{host}}`替换为FastGPT的访问域名。完整请求命令如下：
```
curl --location --request POST https://{{host}}/api/admin/initv4121 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
该脚本的核心功能为将历史对话日志整理为新的日志看板数据。

### 更新核心变更内容
#### 新增内容
1. 支持Prompt自动生成和优化功能；
2. 新增`SIGNOZ_STORE_LEVEL`参数，可用于控制Signoz日志的存储级别。
#### 优化内容
1. 优化工作流响应逻辑，主动指定响应值进入历史记录，而非仅根据key判断；
2. 规避工作流中变量替换引发的死循环或深度递归风险；
3. 调整对话日志导出规则，固定导出对话详情；
4. 优化分页器的UI展示效果。
#### 修复内容
1. 修复工具密钥输入时，boolean值无法通过form校验的问题；
2. 修复对话页pane切换可能导致的数据异常问题；
3. 修复对话日志看板数据表索引不正确的问题。
#### 工具更新
支持对系统工具单独配置Tool description，帮助模型更好地理解工具用途。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-12/4121
