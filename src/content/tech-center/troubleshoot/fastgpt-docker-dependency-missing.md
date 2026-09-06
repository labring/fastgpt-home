---
title: 解决FastGPT本地正常但Docker打包部署后运行失败的问题
slug: /zh/troubleshoot/fastgpt-docker-dependency-missing
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/2157
source_type: GitHub issue
---

# 解决FastGPT本地正常但Docker打包部署后运行失败的问题

## 现象
用户已确认自身密钥可正常使用，FastGPT本地部署后可正常运行，使用Docker打包部署后无法正常运行，系统提示缺少依赖，该问题仅出现在Docker打包部署环节。

## 可能原因
本地部署环境中安装的依赖未被正确打包进Docker镜像，导致镜像运行时无法找到所需的依赖包。由于本地环境与Docker镜像内的运行环境不一致，本地已安装的依赖未被纳入Docker镜像的文件系统中，进而引发运行时依赖缺失的问题。

## 排查步骤
1. 检查Docker镜像构建脚本或相关配置文件，确认是否包含了本地部署时安装的所有依赖项，未遗漏任何必要的依赖。
2. 查看Docker镜像构建过程中的完整日志，确认依赖安装环节是否完整执行，未出现安装失败或跳过的情况。
3. 进入运行中的Docker容器，通过对应系统命令手动检查所需依赖是否存在，确认缺失的具体依赖类型。
4. 对比本地部署环境与Docker镜像内的环境配置，需按实际环境确认两者的差异，例如依赖版本是否匹配。

## 解决与验证
确保Docker镜像构建时，完整安装本地部署时使用的所有依赖项，重新执行Docker镜像构建流程，确保依赖安装步骤完整且无异常报错。完成镜像构建后，运行Docker容器并验证FastGPT的运行状态，确认运行时不再提示缺少依赖，即可验证问题解决。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2157)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
