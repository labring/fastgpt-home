---
title: FastGPT V4.8.10版本升级操作与更新说明
slug: /zh/deploy/fastgpt-v4810-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4810
source_type: 官方文档
---

# FastGPT V4.8.10版本升级操作与更新说明

## 版本更新概述
FastGPT V4.8.10版本包含环境变量变更与专属升级脚本，本次更新覆盖多项核心功能新增与体验优化。新增功能包括模板市场、工作流节点自动对齐吸附、用户选择节点（Debug模式暂不支持）、工作流uid全局变量、撤销重做功能、编辑记录取代自动保存、工作流版本重命名、弃用原“应用调用”节点并迁移为独立插件式节点、插件使用说明配置与单选框自定义输入、HTTP节点text/plain模式、HTTP模块超时与更多Body类型支持、工作流导出导入JSON文件、发送验证码安全校验等。商业版同步新增飞书机器人接入、公众号接入、自助开票申请、SSO定制等功能。同时优化了工作流循环校验、嵌套执行参数污染、全局变量类型约束等场景，修复了十余项功能异常问题。

## 升级操作步骤
1. 提前完成系统数据备份，避免升级过程中数据丢失。
2. 修改镜像环境变量：为`fastgpt-pro`镜像添加沙盒环境变量`SANDBOX_URL=http://xxxxx:3000`；同时为`fastgpt-pro`和`fastgpt`镜像添加日志存储相关环境变量`LOG_LEVEL=debug`和`STORE_LOG_LEVEL=warn`。
3. 更新镜像标签：将FastGPT官方镜像与商业版镜像的tag均修改为`v4.8.10`，Sandbox镜像无需执行更新操作。
4. 执行初始化脚本：通过任意终端发起POST请求，将`{{rootkey}}`替换为环境变量中配置的rootkey，`{{host}}`替换为FastGPT的访问域名，执行以下命令：
```bash
curl --location --request POST https://{{host}}/api/admin/initv4810 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```

## 升级注意事项
执行初始化操作前需确认所有配置的环境变量均正确无误，否则可能导致初始化失败。若此前存在Milvus部署场景下无法导出知识库、Prompt模式stream=false时携带异常`0:`开头标记、对话日志仅管理员无法查看详情等问题，升级至本版本可完成修复。需注意，原工作流“应用调用”节点已弃用，需迁移至与插件使用方式一致的独立节点；用户选择节点暂不支持Debug调试模式。此外，Sandbox镜像无需跟随主镜像同步更新，可保留原有版本运行。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4810)
