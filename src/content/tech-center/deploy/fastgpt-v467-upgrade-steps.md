---
title: FastGPT V4.6.7版本升级步骤与更新内容说明
slug: /zh/deploy/fastgpt-v467-upgrade-steps
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/467
source_type: 官方文档
---

# FastGPT V4.6.7版本升级步骤与更新内容说明

## 版本更新详情
FastGPT V4.6.7版本针对知识库、对话功能及部分已知问题进行了优化与修复。具体更新内容包括：修改知识库UI界面及新的导入交互方式；优化知识库和对话的数据索引流程；新增知识库OpenAPI接口，支持通过API操作知识库；新增输入框变量提示功能，输入{号后将获取可用变量提示，官方计划在2月份的后续版本中优化变量内容，支持模块局部变量及更多全局变量写入；优化团队切换逻辑，切换团队后会保存记录，下次登录时优先登录该团队；修复API对话时chatId冲突问题；修复Iframe嵌入网页可能导致的window.onLoad冲突问题。

## 升级操作步骤
本版本需执行初始化API完成升级配置，具体操作如下：
1. 替换请求中的占位参数：将`{{rootkey}}`替换为环境变量中配置的rootkey值，`{{host}}`替换为部署FastGPT的域名。
2. 发起POST请求，使用如下curl命令：
```bash
curl --location --request POST https://{{host}}/api/admin/initv467 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
本次初始化操作将完成两项核心任务：将images重新关联到数据集，设置pg表的null值。

## 升级补充说明
本版本为专属升级脚本版本，需严格按照上述步骤执行初始化操作，确保升级后功能正常生效。执行过程中需确保环境变量配置正确，避免因参数错误导致初始化流程异常。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/467
