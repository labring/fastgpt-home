---
title: 解决FastGPT私有部署中自定义模型调用端口未更新的问题
slug: /zh/troubleshoot/fastgpt-model-port-config-not-refreshed
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4477
source_type: GitHub issue
---

# 解决FastGPT私有部署中自定义模型调用端口未更新的问题

## 现象
在FastGPT V4.9.1私有部署版本中，用户成功部署bge-m3、bge-reranker-large模型，且通过模型渠道添加配置正常，但点击模型测试时出现报错。其中bge-reranker-large的配置端口已更新为8090，但实际调用时仍使用旧端口8087，即使更新配置后仍无法切换端口。代理地址设置为http://服务器IP:端口号 或 http://服务器IP:端口号/v1 均无法调通模型。

## 可能原因
结合问题场景，核心原因为FastGPT的模型配置缓存保留了旧的端口信息，或修改配置后未触发配置重载，导致系统仍调用旧的端口地址。

## 排查步骤
1.  进入FastGPT私有部署的模型管理页面，找到bge-reranker-large等对应模型的配置项，再次确认代理地址与端口的填写内容是否为最新的8090。
2.  检查FastGPT运行环境的配置文件，确认模型相关的端口配置已同步更新为新地址。
3.  重启FastGPT的相关服务进程，触发配置重载以清除缓存的旧配置。
4.  返回模型测试页面，使用更新后的配置发起测试，验证端口调用是否正常。

## 解决与验证
完成配置确认与服务重载后，再次点击模型测试按钮。若调用端口为新配置的8090，且测试请求可正常连通模型服务，则问题解决。需确保代理地址格式正确，可使用http://服务器IP:新端口号 或 http://服务器IP:新端口号/v1 完成配置。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4477)
