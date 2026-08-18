---
title: FastGPT V4.6.7版本升级步骤与更新内容说明
slug: /zh/deploy/fastgpt-v467-upgrade-steps-2
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/467
source_type: 官方文档
---

# FastGPT V4.6.7版本升级步骤与更新内容说明

## V4.6.7版本更新概述
FastGPT V4.6.7版本围绕知识库功能、对话交互及系统稳定性进行了多维度优化。具体更新内容包括：重构知识库UI界面与导入交互方式，提升知识库管理的便捷性；优化知识库与对话的数据索引逻辑，加快数据加载与查询效率；新增知识库OpenAPI接口，支持通过API完成知识库的相关操作；新增输入框变量提示功能，当用户输入{号时可自动获取可用变量列表，官方基于社区高级编排的反馈，计划在2月份的版本中进一步优化变量内容，支持模块局部变量及更多全局变量写入；优化团队切换记录功能，切换团队后会保存当前记录，下次登录时将优先进入该团队；修复了API对话时chatId冲突的问题，以及Iframe嵌入网页可能引发的window.onLoad冲突问题。

## 升级操作步骤
执行初始化API是本次升级的必要操作，需发起1个HTTP POST请求，将`{{rootkey}}`替换为环境变量中配置的rootkey，`{{host}}`替换为自身部署的域名。具体的curl命令如下：
```bash
curl --location --request POST https://{{host}}/api/admin/initv467 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
本次初始化操作的核心作用为：将images重新关联到数据集，同时设置pg表中的null值，确保数据库表结构与新版本适配。

## 升级注意事项
本次升级脚本仅适用于V4.6.7版本的升级流程，需确认当前运行的FastGPT版本符合前置升级要求，避免跨版本直接执行该脚本导致异常。操作前需确保环境变量中已正确配置rootkey，若参数填写错误将导致初始化请求失败。升级完成后，建议检查知识库配置、对话功能及团队切换功能是否正常运行，确认更新后的交互与功能符合使用预期。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/467)
