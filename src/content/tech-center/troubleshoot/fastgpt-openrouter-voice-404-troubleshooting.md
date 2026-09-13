---
title: FastGPT使用OpenRouter Key时语音播报失败的排查方法
slug: /zh/troubleshoot/fastgpt-openrouter-voice-404-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1170
source_type: GitHub issue
---

# FastGPT使用OpenRouter Key时语音播报失败的排查方法

## 现象
用户使用OpenRouter的Key可正常输出文本内容，但无法使用FastGPT内置的语音播报功能，仅浏览器自带播报功能可用。同时浏览器控制台出现404报错，返回的HTML内容包含`/_next/static/`相关的前端静态资源路径片段。

## 可能原因
结合报错信息与使用场景，可能的原因包括：前端静态资源路径配置错误，导致`/_next/static/`相关资源无法正常加载；反向代理未正确转发静态资源请求，无法访问FastGPT的前端静态文件；语音播报功能依赖的后端接口配置异常，无法正常调用语音相关服务。

## 排查步骤
1.  查看浏览器开发者工具的控制台面板，记录完整的404报错信息，确认报错的资源路径是否包含`/_next/static/`前缀。
2.  检查当前部署的反向代理配置，确认是否配置了针对`/_next/static/`路径的转发规则，确保静态资源可以被正常访问。
3.  验证浏览器自带语音播报功能正常运行，确认浏览器环境无语音播放相关的限制。
4.  检查FastGPT中语音播报功能的相关配置，确认是否正确关联了OpenRouter的语音服务权限或接口配置。

## 解决与验证
如果是静态资源加载问题：修正反向代理配置，添加`/_next/static/`路径的转发规则，将请求指向FastGPT前端的静态资源目录，重启代理服务后重新测试。
如果是接口配置问题：按实际部署环境检查语音播报相关的配置项，确认参数填写正确后重启FastGPT服务。
验证方法：发送文本内容触发语音播报，确认不再出现404报错，且内置语音播报功能可以正常播放语音。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1170)
