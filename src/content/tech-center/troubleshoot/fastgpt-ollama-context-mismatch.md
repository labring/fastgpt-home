---
title: 解决FastGPT调用ollama时上下文参数不匹配的问题
slug: /zh/troubleshoot/fastgpt-ollama-context-mismatch
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2770
source_type: GitHub issue
---

# 解决FastGPT调用ollama时上下文参数不匹配的问题

## 现象
用户使用FastGPT 4.8.10-fix搭配oneapi 0.6.7调用glm4:9b模型时出现异常。1000字符以内的小文档可正常回复文档内容，但9576字符的大文档场景下，AI无法正确引用文档内容；AI能通过文档解析模块获取文档内容，但回复时提示无内容引用，无输入问题时可正常输出文档总结。查看ollama启动日志，发现启动参数使用默认的上下文窗口2048令牌，与FastGPT配置的maxContext、maxResponse参数不匹配。

## 可能原因
FastGPT配置的maxContext、maxResponse参数未正确映射到ollama的对应配置项；ollama启动时使用默认的num_ctx（2048）和num_predict（128）参数，未匹配FastGPT的配置值；该问题可能与模型的stop参数相关。

## 排查步骤
1. 查看ollama启动日志，确认启动时的ctx-size、parallel等参数配置；
2. 打开FastGPT的config.json文件，提取maxContext、maxResponse的配置值；
3. 对照ollama官方文档，确认maxContext对应ollama的num_ctx参数，maxResponse对应ollama的num_predict参数；
4. 检查模型调用流程中参数传递是否正确。

## 解决与验证
将FastGPT配置中的maxContext映射为ollama的num_ctx参数，maxResponse映射为ollama的num_predict参数。重启相关服务后，查看ollama启动日志，确认启动参数已匹配FastGPT的配置值。使用9576字符的文档进行测试，确认AI可正确引用文档内容；验证小文档场景仍可正常工作，无输入问题时可正常输出文档总结。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2770)
