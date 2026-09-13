---
title: FastGPT多知识库配置下点击详情页触发页面崩溃的排错指南
slug: /zh/troubleshoot/fastgpt-kb-detail-crash-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3671
source_type: GitHub issue
---

# FastGPT多知识库配置下点击详情页触发页面崩溃的排错指南

## 现象
FastGPT 4.8.19版本在Chrome浏览器中，当流程配置了三种检索模式的知识库节点后，点击对话日志-查看详情-完整响应-查看知识库，或运行预览-查看详情-知识库时，随机点击第二个或第三个知识库会触发页面崩溃。即使简化流程至仅保留必要节点，该崩溃问题仍会出现。

## 可能原因
1.  私有部署场景下配置文件配置不正确；
2.  浏览器不兼容FastGPT相关API；
3.  浏览器内置翻译功能干扰页面运行，导致崩溃；
4.  控制台报错显示`Minified React error #310`，属于React框架相关的渲染错误。

## 排查步骤
1.  关闭浏览器的翻译功能，重启浏览器后重新测试是否仍触发页面崩溃。
2.  更换浏览器类型，验证是否仍出现崩溃问题。
3.  打开浏览器控制台的Console面板，记录具体报错信息，如`Minified React error #310`这类内容。
4.  若报错包含`xxx undefined`字样，检查FastGPT的配置文件是否存在配置错误。
5.  私有部署环境下，重新核对配置文件的各项参数是否符合要求。

## 解决与验证
若因浏览器翻译功能导致崩溃，关闭该功能后即可恢复正常。若因浏览器兼容问题，更换兼容的浏览器即可解决。若因配置文件错误，修正配置文件后重启FastGPT服务，再重新验证。若为React框架相关报错，需结合控制台完整报错信息进一步排查。验证方式为重新点击知识库详情页，确认不再触发页面崩溃。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3671)
