---
title: 解决FastGPT私有部署自定义插件环境变量获取失败问题
slug: /zh/troubleshoot/fastgpt-custom-plugin-env-undefined
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/2441
source_type: GitHub issue
---

# 解决FastGPT私有部署自定义插件环境变量获取失败问题

## 现象
在FastGPT私有部署场景中，自定义插件内通过process.env获取配置的环境变量时，返回值为undefined。例如在私有部署最新main源码的FastGPT中，自定义创建test插件并配置TEST_ENV=xxxx后，调用process.env.TEST_ENV得到的结果为undefined，即使已通过export TEST_ENV=xxxx配置系统环境变量，且在.env.local中写入了相同配置。

## 可能原因
环境变量未在插件运行的进程上下文中正确加载，或配置的环境变量未被有效读取。具体触发因素需按实际运行环境确认。

## 排查步骤
1. 确认系统环境变量的配置执行时机，检查export TEST_ENV=xxxx的执行是否早于FastGPT插件的启动流程。
2. 检查项目根目录下的.env.local文件，确认是否正确写入TEST_ENV=xxxx的配置项。
3. 确认自定义插件的代码中，调用process.env.TEST_ENV的变量名无拼写错误。
4. 检查插件运行的上下文是否继承了系统环境变量与.env.local的配置。

## 解决与验证
确保环境变量在FastGPT插件启动前完成配置，且.env.local文件的配置被正确加载。完成配置后，重新启动FastGPT服务与自定义插件，调用process.env.TEST_ENV即可获取到配置的xxxx值，验证结果符合预期。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2441)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
