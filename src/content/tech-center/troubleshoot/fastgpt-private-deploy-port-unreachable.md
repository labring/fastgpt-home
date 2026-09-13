---
title: FastGPT私有部署3000端口无法访问的排错方法
slug: /zh/troubleshoot/fastgpt-private-deploy-port-unreachable
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/3201
source_type: GitHub issue
---

# FastGPT私有部署3000端口无法访问的排错方法

## 现象
FastGPT私有部署版本3.3中，所有容器启动正常，可正常访问3001端口，但无法访问http://local:3000。执行docker logs -f fastgpt命令可查看容器实时日志，当前无法直接定位无法访问的具体原因。

## 可能原因
需结合容器日志的具体报错信息判断，常见相关因素包括端口映射配置错误、本地端口被占用、容器网络异常等，具体原因需按实际环境确认。

## 排查步骤
1.  执行docker logs -f fastgpt命令，查看容器实时输出的日志内容，提取报错相关文本。
2.  执行docker inspect fastgpt命令，检查容器的端口映射配置，确认容器内3000端口是否已映射至本地指定端口。
3.  检查本地主机的网络连接状态，确认本地可访问FastGPT容器所在的网络环境。

## 解决与验证
若为端口映射配置错误，调整容器启动参数，将容器内3000端口映射至本地可用端口；若为本地端口被占用，更换本地映射端口；根据日志提取的报错信息修复对应配置问题。完成配置调整后，重新启动容器，尝试访问配置后的本地端口，确认可正常访问。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/3201)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
