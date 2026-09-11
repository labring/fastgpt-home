---
title: 解决FastGPT私有部署pnpm安装时的脚本缺失报错
slug: /zh/troubleshoot/fastgpt-pnpm-install-script-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1499
source_type: GitHub issue
---

# 解决FastGPT私有部署pnpm安装时的脚本缺失报错

## 现象
在FastGPT私有部署版本4.8（20240515更新的主线版本）中，执行根目录下的`pnpm i`命令安装依赖时，大部分依赖包下载完成后，在执行postinstall脚本环节出现报错。具体报错信息为：` ERR_PNPM_NO_SCRIPT  Missing script: gen:theme-typings`，同时提示`Command "gen:theme-typings" not found. Did you mean "pnpm run gen:theme-typings"?`。此外日志中还显示有4个已废弃的子依赖，以及canvas包的postinstall脚本执行耗时较长。

## 可能原因
1. 项目的package.json配置文件中未定义`gen:theme-typings`脚本命令；
2. 部分依赖包的postinstall脚本尝试调用了该未定义的命令；
3. 该版本的FastGPT私有部署包存在脚本配置缺失的问题。

## 排查步骤
1. 打开项目根目录下的package.json文件，检查`scripts`字段中是否包含`gen:theme-typings`配置项；
2. 确认当前使用的FastGPT私有部署版本为4.8（20240515更新的主线版本），核对版本与报错环境是否一致；
3. 检查pnpm工具的版本是否符合项目部署要求，若未明确要求，需按实际环境确认；
4. 查看所有依赖包的postinstall脚本内容，确认是否存在调用`gen:theme-typings`的逻辑。

## 解决与验证
### 解决方法
1. 若为项目脚本配置缺失，可在package.json的`scripts`字段中补充`gen:theme-typings`命令，具体命令需按FastGPT官方部署文档的要求配置；
2. 执行`pnpm clean`命令清理现有node_modules目录和pnpm缓存，再重新执行`pnpm i`命令安装依赖。
### 验证方式
执行`pnpm run gen:theme-typings`无报错，且后续FastGPT启动流程可正常执行。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1499)
