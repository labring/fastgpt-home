---
title: 解决FastGPT私有部署版超级管理员密码重启后重置问题
slug: /zh/troubleshoot/fastgpt-private-deploy-password-reset
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/383
source_type: GitHub issue
---

# 解决FastGPT私有部署版超级管理员密码重启后重置问题

## 现象
在FastGPT私有部署版本中，修改超级管理员密码后，每次重启服务，密码都会被重置为初始状态。该问题未在公有云版本中出现，仅影响私有部署的FastGPT实例。用户已完成例行检查，确认无类似issue，已查阅项目README与相关文档，且自身使用的密钥可正常工作，但仍出现该异常。

## 可能原因
目前无明确公开的原因说明，需结合具体部署环境与服务配置开展排查，无法直接通过现有信息确定具体诱因。

## 排查步骤
1. 核对私有部署环境下的服务启动相关配置，确认配置加载逻辑
2. 检查系统中密码存储相关的配置项，确认存储机制
3. 验证重启服务后，系统配置是否持久化生效

## 解决与验证
需结合排查结果调整相关配置，确保密码存储配置在服务重启后持久生效。调整完成后，重启服务并验证密码是否保持修改后的状态，确认问题是否得到解决。若排查后仍无法解决，需结合具体部署日志进一步确认问题根源。

> 来源: [FastGPT GitHub issue #383](https://github.com/labring/FastGPT/issues/383)
