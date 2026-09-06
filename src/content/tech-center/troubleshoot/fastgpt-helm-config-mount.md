---
title: 解决FastGPT在Helm部署时挂载配置文件的兼容性问题
slug: /zh/troubleshoot/fastgpt-helm-config-mount
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1025
source_type: GitHub issue
---

# 解决FastGPT在Helm部署时挂载配置文件的兼容性问题

## 现象
使用Helm部署FastGPT时，将配置文件挂载至容器后，容器内配置与Helm定义的配置不一致；新增模型配置后，需重启容器才能使配置生效。

## 可能原因
FastGPT仅支持读取JSON格式的配置文件，若Helm挂载的配置文件格式不符合要求，会导致配置加载异常，无法正确匹配Helm中定义的配置内容；同时FastGPT的配置变更未实现自动生效机制，新增模型配置后需手动重启容器才能加载新配置。

## 排查步骤
1. 确认FastGPT支持的配置文件格式
2. 检查Helm部署时挂载的配置文件格式是否为JSON格式
3. 查看FastGPT运行日志，确认配置加载过程中是否存在格式相关的异常报错
4. 验证新增模型配置后，是否需要重启容器才能使配置生效

## 解决与验证
将Helm挂载的配置文件转换为FastGPT支持的JSON格式，确保配置格式完全匹配FastGPT的加载要求；验证配置加载正常后，新增模型配置无需重启容器即可生效。若需调整FastGPT的配置加载规则，需按实际环境确认具体配置参数。

> 来源: [FastGPT GitHub issue #1025](https://github.com/labring/FastGPT/issues/1025)
