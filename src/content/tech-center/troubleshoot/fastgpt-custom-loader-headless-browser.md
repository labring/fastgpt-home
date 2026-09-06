---
title: 解决FastGPT无头浏览器与自定义加载器相关使用问题
slug: /zh/troubleshoot/fastgpt-custom-loader-headless-browser
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1117
source_type: GitHub issue
---

# 解决FastGPT无头浏览器与自定义加载器相关使用问题

## 现象
使用FastGPT时，需通过无头浏览器读取完整网站内容，同时希望支持如JSON格式等多样的自定义加载器，以覆盖更广泛的内容读取场景。此前计划使用pyppeteer类库实现相关功能，但未达到预期效果，无法直接通过该类库完成对应需求。

## 可能原因
FastGPT官方未内置pyppeteer相关的无头浏览器支持能力，当前内置的加载器未覆盖JSON等自定义格式的需求，直接调用pyppeteer类库无法适配FastGPT的现有架构，因此无法实现对应功能，需通过定制开发或扩展机制完成需求。

## 排查步骤
1. 明确业务场景是否需要无头浏览器读取完整网站内容，或需要非内置格式的自定义加载器。
2. 核对当前FastGPT版本的内置加载器支持范围，确认是否已覆盖目标读取格式或功能需求。
3. 确认是否存在官方已发布的扩展方案，可满足当前的无头浏览器或自定义加载器需求。

## 解决与验证
无法直接通过pyppeteer类库实现FastGPT中的无头浏览器相关功能，需通过二次开发FastGPT的代码逻辑实现对应能力。若需新增自定义格式的加载器，可提交PR进行扩展，当前FastGPT已通过#1118 PR新增支持excel和ppt格式的加载器。完成二次开发或PR合并并部署更新后的FastGPT版本后，可测试对应无头浏览器或自定义加载器功能是否正常生效，验证读取完整网站内容或自定义格式加载的效果。

> 来源: [FastGPT GitHub issue #1117](https://github.com/labring/FastGPT/issues/1117)
