---
title: 私有部署FastGPT无法识别插件与获取插件效果的排错方法
slug: /zh/troubleshoot/fastgpt-private-plugin-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2260
source_type: GitHub issue
---

# 私有部署FastGPT无法识别插件与获取插件效果的排错方法

## 现象
用户通过docker-compose方式私有部署FastGPT，使用qwen2:1.5b模型时，出现无法识别插件、无法获取插件效果的问题。该功能在线上版本可正常使用，私有部署版本存在异常。

## 可能原因
目前无明确的已知根因，需结合私有部署的实际配置与运行环境排查。潜在相关方向包括插件配置同步异常、模型调用链路问题、部署环境的权限或网络限制（需按实际环境确认）。

## 排查步骤
1.  确认当前FastGPT的部署方式为docker-compose，且为私有部署版本。
2.  核对当前使用的模型为qwen2:1.5b，检查模型的调用配置是否正确。
3.  对比线上版本与私有部署版本的插件配置，确认插件的导入状态、启用开关是否一致。
4.  获取私有部署的运行日志，排查是否存在插件加载、调用相关的报错信息（需按实际环境操作）。
5.  检查部署环境的网络与权限设置，确认是否存在影响插件通信的限制（需按实际环境确认）。

## 解决与验证
根据排查结果修复对应问题后，重新启动FastGPT服务。进入对话界面测试插件功能，若插件可正常被识别并生效，且效果与线上版本一致，则问题解决。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2260)
