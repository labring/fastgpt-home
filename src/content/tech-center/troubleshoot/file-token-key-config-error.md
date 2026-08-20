---
title: FastGPT 4.14.12版本FILE_TOKEN_KEY配置异常的排错方法
slug: /zh/troubleshoot/file-token-key-config-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6786
source_type: GitHub issue
---

# FastGPT 4.14.12版本FILE_TOKEN_KEY配置异常的排错方法

## 现象
将FastGPT 4.14.12版本的`.env.template`复制为`.env.local`后，存在两种异常情况：
1.  未配置`FILE_TOKEN_KEY`环境变量时，执行`pnpm dev`启动服务，会触发系统初始化失败报错，报错文本为`System initialization failed Error: Invalid environment variables. Please check: FILE_TOKEN_KEY`，同时终端会显示`HTTP_PROXY: undefined`等代理变量均未配置的提示。
2.  若在`.env.local`中配置`FILE_TOKEN_KEY=filetokenkey`后启动服务，虽可正常登录9000、9001端口，但上传附件时会提示网络错误。

## 可能原因
1.  未配置`FILE_TOKEN_KEY`环境变量，触发了服务的环境变量校验逻辑，导致服务启动失败。
2.  配置`FILE_TOKEN_KEY`后，附件上传请求因密钥校验规则不匹配、关联服务配置异常等问题，触发网络错误提示。

## 排查步骤
1.  确认已将项目根目录下的`.env.template`文件复制为`.env.local`配置文件。
2.  打开`.env.local`文件，检查是否存在`FILE_TOKEN_KEY`配置项，若缺失则添加该配置项。
3.  执行`pnpm dev`启动服务，查看终端报错日志，确认是否存在`Invalid environment variables. Please check: FILE_TOKEN_KEY`的提示。
4.  完成`FILE_TOKEN_KEY`配置后，重新启动服务，访问9000或9001端口测试登录功能。
5.  尝试上传附件，排查是否仍存在网络错误提示。

## 解决与验证
### 解决未配置导致的启动失败
在`.env.local`文件中添加`FILE_TOKEN_KEY=自定义密钥`（例如示例中的`filetokenkey`），保存后重新执行`pnpm dev`启动服务，即可解决环境变量校验失败的问题。
### 解决配置后上传附件网络错误
若配置`FILE_TOKEN_KEY`后仍出现附件上传网络错误，需按实际环境确认附件上传相关服务的配置，同时验证该密钥是否符合服务端的校验要求。
### 验证效果
启动服务时无环境变量报错，可正常登录9000、9001端口，且附件上传功能可正常完成。

> 来源：[FastGPT GitHub Issue #6786](https://github.com/labring/FastGPT/issues/6786)
