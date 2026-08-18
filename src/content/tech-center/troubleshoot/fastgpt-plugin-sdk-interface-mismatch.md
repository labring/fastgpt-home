---
title: 解决FastGPT插件SDK与v0.6.3版本上传接口不匹配问题
slug: /zh/troubleshoot/fastgpt-plugin-sdk-interface-mismatch
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/7075
source_type: GitHub issue
---

# 解决FastGPT插件SDK与v0.6.3版本上传接口不匹配问题

## 现象
使用@fastgpt-plugin/sdk-client@0.0.1-alpha.9调用插件上传相关功能时，出现接口路径不匹配的报错。SDK默认调用的上传接口为POST /api/plugin/upload，但fastgpt-plugin:v0.6.3版本实际提供的OpenAPI接口为/api/tools/upload/presign-tool-put-url、/api/tools/upload/parse-uploaded-tool、/api/tools/upload/confirm、/api/tools/upload/install，无法正常完成插件上传流程。

## 可能原因
当前官方npm仓库发布的最新@fastgpt-plugin/sdk-client（版本0.0.1-alpha.9）未适配fastgpt-plugin:v0.6.3版本的新上传路由，导致SDK调用的接口与实际部署的插件接口不一致，引发调用失败。

## 排查步骤
1. 确认当前部署的fastgpt-plugin版本为v0.6.3，以及项目中使用的@fastgpt-plugin/sdk-client版本为0.0.1-alpha.9。
2. 查看SDK调用上传功能时的请求路径，确认是否为默认的/api/plugin/upload。
3. 对比fastgpt-plugin:v0.6.3的OpenAPI接口列表与SDK调用的接口路径，确认存在不匹配情况。

## 解决与验证
有两种可行方向：
### 临时快速恢复方案
1. 绕过SDK自带的`uploadPlugin`/`confirmPlugin`/`installPlugins`方法，直接调用fastgpt-plugin:v0.6.3的官方上传接口：
   - 先调用`/api/tools/upload/presign-tool-put-url`获取预签名URL，上传文件到对象存储；
   - 调用`/api/tools/upload/parse-uploaded-tool`处理已上传的文件；
   - 调用`/api/tools/upload/confirm`并传入`toolIds: string[]`数组完成上传确认；
   - 按需调用`/api/tools/upload/install`完成插件安装。
2. 验证：执行上述流程后，插件上传流程正常完成，无404接口不存在或参数错误等报错。

### 长期适配方案
等待官方发布适配fastgpt-plugin:v0.6.3的@fastgpt-plugin/sdk-client新版本，或从fastgpt-plugin仓库源码/未发布分支获取已适配的版本后，重新构建应用并部署。

> 来源：[FastGPT GitHub Issue #7075](https://github.com/labring/FastGPT/issues/7075)
