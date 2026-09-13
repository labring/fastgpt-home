---
title: 说明FastGPT运行时no such file or directory: 'config'报错的排查方法
slug: /zh/glossary/fastgpt-config-directory-error
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/1141
source_type: 官方文档
---

# 说明FastGPT运行时no such file or directory: 'config'报错的排查方法

## 一句话定义
directory是FastGPT运行环境中用于指代系统文件存储路径的术语，报错error: [errno 2] no such file or directory: 'config'表示系统无法找到名为config的目录或文件。

## 在 FastGPT 里怎么用
启动FastGPT开发环境前，需确保系统文件目录结构符合要求。运行sudo npm run dev启动FastGPT开发环境时，需保证系统当前工作目录下存在名为config的目录或文件，否则会触发报错error: [errno 2] no such file or directory: 'config'。

## 容易搞错的地方
一是可能将该报错误认为与npm依赖包安装缺失相关，实际触发原因是系统中缺少config目录或文件。二是未注意到该报错出现在FastGPT最新版本的sudo npm run dev启动流程中。三是误以为需修改代码中的目录路径配置，实际仅需补充缺失的config目录或文件即可解决该报错。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1141)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
