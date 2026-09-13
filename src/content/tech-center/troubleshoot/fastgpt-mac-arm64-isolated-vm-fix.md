---
title: 解决Mac ARM64环境下FastGPT依赖isolated-vm编译失败的问题
slug: /zh/troubleshoot/fastgpt-mac-arm64-isolated-vm-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1738
source_type: GitHub issue
---

# 解决Mac ARM64环境下FastGPT依赖isolated-vm编译失败的问题

## 现象
用户在部署或安装FastGPT时，依赖包`isolated-vm@4.7.2`的安装脚本执行失败。完整报错日志显示：首先`prebuild-install`提示找不到对应预编译二进制文件，内容为`prebuild-install warn install No prebuilt binaries found (target=20.14.0 runtime=node arch=arm64 libc= platform=darwin)`；随后尝试通过`node-gyp`编译原生模块时，出现`No receipt for 'com.apple.pkg.CLTools_Executables' found at '/'`等找不到Apple开发工具包的错误，最终编译中断。

## 可能原因
结合报错信息，存在两个核心原因：第一，`isolated-vm@4.7.2`未针对当前Node.js 20.14.0版本、ARM64架构的Darwin系统提供预编译二进制文件，无法直接复用预编译包；第二，本地未安装Apple Command Line Tools开发环境，缺少编译原生Node.js模块所需的工具链，无法完成手动编译。

## 排查步骤
1.  执行`node -v`命令确认当前Node.js版本为20.14.0，执行`uname -m`和`uname -s`分别验证系统架构为arm64、系统平台为darwin。
2.  执行`pkgutil --pkg-info com.apple.pkg.CLTools_Executables`命令，检查是否已安装Apple Command Line Tools。若未安装，会提示找不到对应包。
3.  清理当前项目的依赖缓存，执行`pnpm clean`命令，再重新执行`pnpm install`安装依赖。

## 解决与验证
1.  安装Apple Command Line Tools：执行`xcode-select --install`，按照弹窗提示完成工具安装。
2.  重新执行`pnpm install`命令，等待`isolated-vm`编译或加载预编译包完成。
验证方式：确认依赖安装过程无报错，启动FastGPT服务，验证核心功能正常运行。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1738)
