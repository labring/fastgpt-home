---
title: FastGPT私有部署知识库导出unAuthorization报错的排查解决方法
slug: /zh/troubleshoot/fastgpt-export-unauthorization-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1146
source_type: GitHub issue
---

# FastGPT私有部署知识库导出unAuthorization报错的排查解决方法

## 现象
本地HTTP访问FastGPT私有部署版本时，进入知识库页面点击导出操作会触发报错。服务端日志显示报错信息为`[ERROR] 2024-04-08 08:49:30 export dataset error { message: 'unAuthorization', stack: undefined }`，预期可正常导出CSV文件。

## 可能原因
该报错提示未授权，结合已知类似问题的表现，推测问题与当前使用HTTP访问的部署配置相关，具体原因需按实际环境确认。

## 排查步骤
1. 确认FastGPT的访问协议，确认是否为HTTP访问模式。
2. 核对知识库导出操作的触发场景，确认操作时处于已登录状态。
3. 查看FastGPT服务端日志，检索是否存在`unAuthorization`相关报错。

## 解决与验证
可参考已知类似问题的解决方案，尝试配置SSL证书后重新访问验证。若需保留HTTP部署模式，需按实际环境调整授权相关配置。验证方式为进入知识库页面点击导出，确认无报错且可正常导出CSV文件。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1146)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
