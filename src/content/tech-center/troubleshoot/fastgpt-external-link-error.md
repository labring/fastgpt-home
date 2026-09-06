---
title: 解决FastGPT应用外链分享页面打开后报错的问题
slug: /zh/troubleshoot/fastgpt-external-link-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/400
source_type: GitHub issue
---

# 解决FastGPT应用外链分享页面打开后报错的问题

## 现象
正常部署FastGPT后，创建应用并使用Markdown加载测试文档，通过外链分享该应用，打开分享链接后出现报错。

## 可能原因
因信息有限，需按实际环境确认，可能涉及部署配置、分享权限、文档加载逻辑或网络访问限制等。

## 排查步骤
1. 确认FastGPT应用的部署状态正常，无启动相关报错日志。
2. 检查应用外链分享的配置是否正确开启。
3. 核对加载的Markdown测试文档内容是否符合格式要求。
4. 打开分享链接后，记录页面显示的具体报错信息。

## 解决与验证
根据排查步骤获取的具体报错信息，针对性处理对应问题。若无法定位具体原因，需结合部署环境的日志进一步确认。验证方式为重新生成外链分享链接，打开后确认无报错且可正常访问加载的测试文档。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/400)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
