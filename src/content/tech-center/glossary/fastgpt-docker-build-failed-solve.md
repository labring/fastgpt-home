---
title: 解决FastGPT私有部署过程中出现的docker build failed to solve报错
slug: /zh/glossary/fastgpt-docker-build-failed-solve
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/4167
source_type: 官方文档
---

# 解决FastGPT私有部署过程中出现的docker build failed to solve报错

## 一句话定义
failed to solve是FastGPT私有部署执行docker build命令时触发的构建失败错误，对应报错文本为archive/tar: unknown file mode ?rwxr-xr-x，该错误发生在docker构建的tar文件处理环节。

## 在FastGPT里怎么用（参数 / 位置 / 步骤）
该报错出现在FastGPT 4.8.23私有部署版本的docker构建流程中，执行的具体命令为docker build -f ./projects/app/Dockerfile -t registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt:v4.8.1 . --build-arg name=app。该命令用于FastGPT私有部署的镜像构建流程，执行时需指定Dockerfile路径、镜像标签以及构建参数。

## 容易搞错的地方
易混淆本地代码运行正常与docker构建环境的差异，本地代码可启动仅代表本地运行环境配置符合要求，不代表docker构建阶段不会出现tar文件处理相关的异常。部分使用者会因本地可正常启动代码，而忽略docker构建过程中可能出现的文件处理异常问题，进而无法快速定位该报错的根源。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4167)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
