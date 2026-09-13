---
title: 解决FastGPT经OneAPI接入GLM-4-9B工具调用400错问题
slug: /zh/troubleshoot/fastgpt-oneapi-glm4-toolcall-400-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1823
source_type: GitHub issue
---

# 解决FastGPT经OneAPI接入GLM-4-9B工具调用400错问题

## 现象
用户使用私有部署的FastGPT 4.8.4-fix版本，通过OneAPI 0.6.6接入部署在Xinference 0.12.2上的GLM-4-9B-chat模型。使用普通对话功能时运行正常，但使用工具调用功能时返回400错误。OneAPI报错日志包含`model ratio not found: glm-4-9b`、`relay error happen, status code is 400`；FastGPT报错日志显示`400 bad response status code 400`。

## 可能原因
根据OneAPI的报错日志`model ratio not found: glm-4-9b`，核心触发原因是OneAPI中未配置该模型的比例映射，无法识别请求携带的模型名称，从而返回400错误。本次issue中FastGPT的模型配置里`toolChoice`和`functionCall`均为开启状态，排除了FastGPT配置未启用工具调用的问题。

## 排查步骤
1.  查看OneAPI的系统日志，确认是否存在`model ratio not found`相关报错信息。
2.  登录OneAPI管理后台，进入模型管理页面，检查是否已添加`glm-4-9b`模型的比例配置。
3.  核对FastGPT中配置的模型名称`glm-4-9b`与OneAPI中配置的模型名称是否完全一致。
4.  重启OneAPI服务，使新的模型配置生效。
5.  重新发起工具调用请求，观察是否仍返回400错误。

## 解决与验证
解决方法：在OneAPI中添加`glm-4-9b`模型的比例映射配置，确保模型名称与FastGPT中配置的名称完全一致。验证步骤：1.  完成OneAPI的模型比例配置后，重启OneAPI服务。2.  重新测试工具调用功能，确认无400错误返回。3.  检查OneAPI与FastGPT的日志，无新的报错信息。

> [FastGPT GitHub issue 1823](https://github.com/labring/FastGPT/issues/1823)
