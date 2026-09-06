---
title: 说明使用Nginx代理FastGPT发布后应用的方法
slug: /zh/glossary/nginx-proxy-fastgpt-deployed-apps
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/1024
source_type: 官方文档
---

# 说明使用Nginx代理FastGPT发布后应用的方法

## 一句话定义
Nginx代理FastGPT发布后应用指通过Nginx反向转发FastGPT发布后的应用访问地址，实现对外暴露访问的配置操作。

## 在 FastGPT 里怎么用
首先获取FastGPT发布后的本地访问地址，例如示例中的http://172.10.0.xxx:3020/chat/share?shareId=xxx。编辑Nginx的配置文件，添加反向代理规则，将对外访问的对应路径请求转发至该本地地址，保留shareId等查询参数。完成配置后，重载Nginx服务使配置生效，即可通过代理地址访问FastGPT发布后的应用。

## 容易搞错的地方
未保留shareId等查询参数，导致无法正常识别分享链接的唯一标识，无法加载对应分享页面。代理路径配置错误，未匹配到/chat/share相关的路径，导致请求无法被正确转发至FastGPT服务。未正确配置代理请求头，导致FastGPT服务无法获取正确的客户端访问信息，引发访问异常。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1024)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
