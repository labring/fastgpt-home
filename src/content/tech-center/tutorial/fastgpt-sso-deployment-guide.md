---
title: 部署FastGPT SSO服务并完成对应对接配置的操作指南
slug: /zh/tutorial/fastgpt-sso-deployment-guide
page_type: 教程
source: https://doc.fastgpt.cn/zh-CN/guide/admin/sso
source_type: 官方文档
---

# 部署FastGPT SSO服务并完成对应对接配置的操作指南

## 部署FastGPT SSO服务
使用docker-compose部署FastGPT SSO服务是推荐的方式，标准部署配置片段如下：
```yaml
  fastgpt-sso:
    image: registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-sso-service:v4.14.16
    container_name: fastgpt-sso
    restart: always
    networks:
      - fastgpt
    environment:
      - SSO_PROVIDER=example
      - AUTH_TOKEN=xxxxx
      # 具体对接提供商的环境变量。
```
该配置中，镜像版本为v4.14.16，为当前官方发布的最新可用版本。容器名称固定为fastgpt-sso，重启策略设置为always以保障服务持续运行。配置项中，SSO_PROVIDER用于指定对接的单点登录提供商类型，AUTH_TOKEN为鉴权信息，仅在fastgpt-pro版本中需要使用。部署时需根据实际对接的提供商补充对应的专属环境变量。

## 支持的对接协议与功能
FastGPT SSO服务内置多种单点登录对接选项，不同协议、功能的支持情况如下表所示：
<table className="table-hover table-striped-columns">
  <thead>
    <tr>
      <th>协议/功能</th>
      <th>SSO</th>
      <th>成员同步支持</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>飞书</td>
      <td>是</td>
      <td>是</td>
    </tr>
    <tr>
      <td>企业微信</td>
      <td>是</td>
      <td>是</td>
    </tr>
    <tr>
      <td>钉钉</td>
      <td>是</td>
      <td>否</td>
    </tr>
    <tr>
      <td>Saml2.0</td>
      <td>是</td>
      <td>否</td>
    </tr>
    <tr>
      <td>Oauth2.0</td>
      <td>是</td>
      <td>否</td>
    </tr>
  </tbody>
</table>
表格中列出的所有协议均支持单点登录功能，其中飞书与企业微信同时支持成员同步功能，其余协议与钉钉仅支持单点登录，不提供成员同步能力。

## 对接配置说明
根据实际对接的单点登录提供商，需补充对应的专属环境变量。具体的环境变量参数需参考对应提供商的对接文档，将所需配置项添加至environment字段中，完成服务的完整配置。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/admin/sso)

## 适用性与版本范围

本页适用于官方来源记录的 教程 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
