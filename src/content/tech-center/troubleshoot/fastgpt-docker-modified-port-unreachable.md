---
title: 解决FastGPT Docker部署修改指定端口后无法访问的问题
slug: /zh/troubleshoot/fastgpt-docker-modified-port-unreachable
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/426
source_type: GitHub issue
---

# 解决FastGPT Docker部署修改指定端口后无法访问的问题

## 现象
使用Docker部署FastGPT，修改默认端口后服务正常启动，但通过IP地址加修改后的端口7031无法访问FastGPT服务。

## 可能原因
1. Docker容器的端口映射配置存在错误，未将主机端口7031正确映射至容器内部端口。
2. FastGPT服务的监听端口未同步修改，仍使用默认端口。
3. 部署环境的防火墙或安全组拦截了7031端口的访问请求。

## 排查步骤
1. 检查Docker启动命令或配置文件中的端口映射参数，确认主机端口7031已正确映射至容器内部端口。
2. 确认FastGPT服务的监听端口与容器映射端口保持一致。
3. 检查部署环境的防火墙或安全组规则，确认7031端口未被拦截。

## 解决与验证
根据排查结果修正对应问题：若端口映射配置错误，修改启动命令或配置文件后重启容器；若服务监听端口未同步，更新FastGPT端口配置后重启容器；若端口被拦截，开放7031端口后重新测试。验证时，使用浏览器或curl工具访问http://[部署服务器IP]:7031，确认可以正常加载FastGPT的访问页面。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/426)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
