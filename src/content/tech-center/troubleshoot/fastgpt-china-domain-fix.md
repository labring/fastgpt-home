---
title: 解决FastGPT国内无法访问官方.run域名的问题
slug: /zh/troubleshoot/fastgpt-china-domain-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/413
source_type: GitHub issue
---

# 解决FastGPT国内无法访问官方.run域名的问题

## 现象
使用FastGPT时，无法正常访问fastgpt.run域名。国内环境下执行ping命令访问该域名，会返回全球随机IP，无法建立正常的网络连接。

## 可能原因
fastgpt.run域名被GFW屏蔽，国内无法直接访问该域名。

## 排查步骤
1. 尝试访问fastgpt.run相关服务，确认无法正常加载。
2. 在终端执行`ping fastgpt.run`命令，查看返回的IP是否为全球随机IP，验证域名访问异常。
3. 确认当前处于国内网络环境。
4. 需按实际环境确认是否存在其他网络配置限制。

## 解决与验证
国内可临时使用`https://ai.fastgpt.in`替代原`fastgpt.run`域名进行访问。验证时，访问该替代域名，确认可以正常加载FastGPT相关服务。

> 来源: [FastGPT GitHub issue #413](https://github.com/labring/FastGPT/issues/413)
