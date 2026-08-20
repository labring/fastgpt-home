---
title: 解决Linux ARM64架构下FastGPT原生模块加载失败问题
slug: /zh/troubleshoot/arm64-native-module-load-failed
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/7186
source_type: GitHub issue
---

# 解决Linux ARM64架构下FastGPT原生模块加载失败问题

## 现象
在Linux ARM64(aarch64)架构的系统上启动或编译FastGPT时，控制台会输出报错信息`Failed to load native module for linux-arm64. Ensure the correct optional dependency is installed.`，应用无法正常启动或完成编译，该报错会阻止`@llamaindex/liteparse`和Python沙箱原生库的加载。

## 可能原因
该问题源于FastGPT的平台包管理逻辑未正确适配ARM64架构，无法自动识别并加载对应ARM64架构的原生二进制依赖包，进而导致`@llamaindex/liteparse`和Python沙箱原生库加载失败。涉及的相关配置包括项目的平台包管理脚本、Docker多架构构建配置以及Python沙箱配置文件。

## 排查步骤
1. 执行`uname -m`命令，确认当前系统的架构输出是否为`aarch64`或`arm64`。
2. 执行`ldd --version`命令，确认当前系统的Libc类型（glibc或musl）。
3. 检查已安装的依赖包，确认是否存在针对ARM64架构的`@llamaindex/liteparse-linux-arm64-musl`或对应glibc版本的原生依赖包。
4. 查看项目中`projects/app/scripts/build-workers.ts`、`projects/code-sandbox/Dockerfile`、`projects/code-sandbox/src/isolated/python-isolation-config.ts`这三个文件，确认是否存在适配ARM64架构的逻辑。

## 解决与验证
根据实际系统的Libc类型，手动安装对应ARM64架构的原生依赖包，例如针对musl Libc的系统安装`@llamaindex/liteparse-linux-arm64-musl`；随后重新执行`pnpm install`安装依赖，再执行`pnpm dev`或`pnpm build`启动或编译应用，确认报错信息消失，应用可正常启动或完成编译。若为Docker部署方式，需确认镜像构建过程适配了ARM64架构。具体调整细节需按实际环境确认。

> 来源：[FastGPT GitHub Issue #7186](https://github.com/labring/FastGPT/issues/7186)
