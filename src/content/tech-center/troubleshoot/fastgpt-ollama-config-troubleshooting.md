---
title: FastGPT配置Ollama时找不到配置入口的排障方法
slug: /zh/troubleshoot/fastgpt-ollama-config-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/938
source_type: GitHub issue
---

# FastGPT配置Ollama时找不到配置入口的排障方法

## 现象
在FastGPT中配置Ollama服务时，无法找到对应的配置入口，无法完成配置流程；部分场景下完成配置后，配合数据库运行速度较慢。

## 可能原因
无法找到配置入口的原因可能为未定位到FastGPT内置的Ollama配置模块；配置后运行速度较慢的原因需按实际环境确认。

## 排查步骤
1. 确认已将FastGPT升级至最新版本。
2. 查找FastGPT内置的第三方模型接入配置模块，定位Ollama相关配置入口。
3. 完成Ollama服务的基础配置后，测试模型调用流程。
4. 若出现运行速度较慢的情况，需检查数据库连接配置是否合理。

## 解决与验证
FastGPT已原生支持Ollama服务，可直接在第三方模型接入模块中找到Ollama配置入口，填写对应服务地址等参数完成配置。配置完成后，若出现运行速度较慢的情况，需按实际部署环境调整相关参数。验证方式为发起模型调用测试，确认流程正常。

> 来源: [FastGPT GitHub issue #938](https://github.com/labring/FastGPT/issues/938)
