---
title: 解决FastGPT 4.11.1私有部署pnpm dev启动的模型URL解析报错问题
slug: /zh/troubleshoot/fastgpt-pnpm-dev-model-url-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5390
source_type: GitHub issue
---

# 解决FastGPT 4.11.1私有部署pnpm dev启动的模型URL解析报错问题

## 现象
使用pnpm dev命令启动FastGPT 4.11.1私有部署版本时，编译完成后会打印加载各数据库表的日志，随后显示MongoDB连接成功的信息，最终抛出加载模型错误。具体报错文本为`TypeError: Failed to parse URL from /model/list`，调用栈涉及`tsRestFetchApi`、`loadSystemModels`等函数，最终指向`instrumentation.ts`中的注册逻辑。

## 可能原因
该报错的核心原因是请求模型列表接口时，无法解析相对路径的`/model/list`。由于未正确配置模型接口的基础访问地址，导致程序无法将相对路径拼接为完整的可访问URL，从而触发URL解析失败的错误。

## 排查步骤
1. 确认当前使用的FastGPT版本为4.11.1，核对项目依赖的`@fastgpt-sdk/plugin`版本是否与该版本匹配。
2. 检查启动前的环境配置，确认是否正确设置了模型接口的基础访问地址，避免仅使用相对路径作为请求地址。
3. 查看报错指向的代码文件，如`packages/service/core/ai/config/utils.ts`中的`loadSystemModels`函数，确认请求URL的拼接逻辑是否正确。
4. 测试当前终端环境的网络连通性，确认可以正常访问配置的模型接口地址。

## 解决与验证
根据排查结果修正配置：将模型接口的相对路径替换为完整的可访问URL，或确保启动环境可以正确解析相对路径的基础地址。重新执行`pnpm dev`启动命令，观察日志是否不再出现`Load models error TypeError: Failed to parse URL from /model/list`的报错，同时确认MongoDB连接正常、系统模型列表加载成功，即可验证问题解决。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/5390)
