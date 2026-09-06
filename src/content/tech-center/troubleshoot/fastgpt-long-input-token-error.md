---
title: 解决FastGPT长输入无token限制场景下的报错问题
slug: /zh/troubleshoot/fastgpt-long-input-token-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/811
source_type: GitHub issue
---

# 解决FastGPT长输入无token限制场景下的报错问题

## 现象
当输入的问题较长，且问题补全过程未设置token限制时，FastGPT会触发报错，具体报错文本需结合实际部署日志确认。

## 可能原因
未明确标注具体触发原因，需结合实际部署环境、配置项与运行日志进一步确认。

## 排查步骤
1. 复现报错场景：输入长度超出常规短文本的问题，确认问题补全过程未配置token限制，观察是否触发报错。
2. 登录FastGPT部署环境，查看系统运行时的报错日志，记录报错相关信息。
3. 核对当前使用的密钥是否可正常调用对应模型服务。

## 解决与验证
该问题已通过代码修改完成修复，部署包含修复代码的FastGPT版本即可解决该报错。

> 来源: [FastGPT GitHub issue #811](https://github.com/labring/FastGPT/issues/811)
