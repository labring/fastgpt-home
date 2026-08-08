---
title: FastGPT V4.8.4版本升级操作与更新说明
slug: /zh/deploy/fastgpt-4-8-4-upgrade
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/484
source_type: 官方文档
---

# FastGPT V4.8.4版本升级操作与更新说明

## 版本更新核心内容
本次V4.8.4版本包含多项功能新增、优化与修复。新增功能包括应用使用新权限系统、应用支持文件夹；优化项为文本分割增加连续换行、制表符清除，可避免大文本场景下的性能问题。
重要修复内容包括修复系统插件运行池数据污染问题（原逻辑从内存获取数据导致全局污染）、修复Debug模式下相同source和target内容导致的连线显示异常、修复定时执行初始化错误、修复应用调用传参异常、修复ctrl+cv复制复杂节点时nodeId错误的问题，同时调整了组件库全局主题样式。

## 升级操作步骤
### 1. 修改镜像标签
将部署使用的`fastgpt`镜像tag修改为`v4.8.4`；`fastgpt-sandbox`镜像tag可同步修改为`v4.8.4`（无功能变更，可选操作）；商业版镜像tag同样修改为`v4.8.4`。
### 2. 商业版用户执行初始化请求
从任意可访问FastGPT商业版域名的终端，发起如下HTTP POST请求：
```bash
curl --location --request POST https://{{host}}/api/admin/init/484 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
请将`{{rootkey}}`替换为部署环境中配置的rootkey环境变量值，`{{host}}`替换为FastGPT商业版的访问域名。

## 升级注意事项
非商业版用户无需执行初始化请求步骤，仅需完成镜像标签修改即可。执行初始化请求前，请确认已正确获取rootkey并保护好该密钥，避免泄露。发起请求时需确保终端网络可以正常访问配置的`{{host}}`域名，否则请求会失败。若部署过程中出现版本不一致的报错，需检查所有相关镜像的tag是否均已同步修改为`v4.8.4`。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/484
