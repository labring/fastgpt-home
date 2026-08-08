---
title: FastGPT代码沙箱环境变量名不一致问题排查
slug: /zh/troubleshoot/fastgpt-code-sandbox-env-name-conflict
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6689
source_type: GitHub issue
---

# FastGPT代码沙箱环境变量名不一致问题排查

## 现象
用户在部署FastGPT私有部署v4.14.10版本时，发现代码沙箱相关环境变量存在命名混淆：官方提及的变量名为`CODE_SANDBOX_TOKEN`，但部署配置文件（如yml）中使用的是`SANDBOX_TOKEN`，同时疑问fastgpt主程序与fastgpt-code-sandbox组件的环境变量名是否不一致。

## 可能原因
两个组件的环境变量配置要求存在差异，fastgpt主程序与fastgpt-code-sandbox组件分别使用不同的环境变量名，用户未明确区分两者的配置规则，导致误用变量名，引发配置不生效的问题。

## 排查步骤
1. 确认当前使用的FastGPT私有部署版本为v4.14.10，核对部署配置文件中配置的环境变量名。
2. 分别查阅对应组件的官方配置说明，明确fastgpt主程序与fastgpt-code-sandbox组件各自要求的环境变量名，需按实际环境确认。
3. 检查代码沙箱服务的启动配置，确认其使用的变量名是否与主程序配置的变量名匹配。
4. 排查环境变量是否正确加载到对应组件的运行环境中，无遗漏或被其他配置覆盖。

## 解决与验证
针对该问题，需分别为两个组件配置正确的环境变量：fastgpt主程序使用`CODE_SANDBOX_TOKEN`，fastgpt-code-sandbox组件使用`SANDBOX_TOKEN`。
验证步骤：
1. 修改对应组件的环境变量配置为正确的变量名，重启相关服务。
2. 检查FastGPT与代码沙箱的连接日志，确认无连接报错。
3. 测试代码沙箱相关功能（如代码执行）是否正常生效。

> 来源：https://github.com/labring/FastGPT/issues/6689
