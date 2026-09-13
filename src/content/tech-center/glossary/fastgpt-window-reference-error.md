---
title: FastGPT启动时ReferenceError: window is not defined报错的修复方法
slug: /zh/glossary/fastgpt-window-reference-error
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/465
source_type: 官方文档
---

# FastGPT启动时ReferenceError: window is not defined报错的修复方法

## 一句话定义
ReferenceError: window is not defined是FastGPT启动或访问阶段出现的服务端渲染不兼容报错，提示服务端运行环境中未定义浏览器专属的全局对象window。

## 在FastGPT里怎么用（参数 / 位置 / 步骤）
该报错出现于FastGPT启动后访问环节，涉及的部署版本包括私有部署版本与公有云版本，部分场景下Node.js版本为18.18.2时会触发。复现路径为克隆代码后启动FastGPT并直接访问页面，启动后无需额外操作即可触发报错。该报错的触发场景不依赖特定的功能模块，仅与运行环境和启动流程相关。

## 容易搞错的地方
部分场景下用户会将该报错归因于密钥配置错误，实际该报错与密钥有效性无关。该报错由服务端渲染过程中尝试调用浏览器专属的window全局对象导致，未适配服务端运行环境。部分用户会忽略Node.js版本因素，未意识到高版本Node.js可能加剧该类不兼容问题。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/465)

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1303)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
