---
title: 解决FastGPT调用部署自签发证书服务的证书报错问题
slug: /zh/troubleshoot/fastgpt-self-signed-cert-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1830
source_type: GitHub issue
---

# 解决FastGPT调用部署自签发证书服务的证书报错问题

## 现象
调用外部部署自签发证书的应用时，触发如下报错：
```json
{
  "error": {
    "message": "self-signed certificate in certificate chain",
    "name": "Error",
    "method": "post",
    "baseURL": "http://fastgpt-xxxxxx:3000",
    "url": "https://awx.apps.os.xxxxxx.com/api/v2/job_templates/116/launch/",
    "code": "SELF_SIGNED_CERT_IN_CHAIN"
  }
}
```

## 可能原因
FastGPT发送HTTPS请求时，默认仅信任公开可信证书颁发机构签发的SSL证书，无法验证目标服务的自签发证书，导致证书链验证失败。

## 排查步骤
1. 提取目标服务的自签发SSL证书根文件，格式为.crt或.pem。
2. 确认FastGPT运行环境的信任证书配置目录，需按实际环境确认。
3. 检查FastGPT调用外部服务的相关配置参数，需按实际环境确认。

## 解决与验证
将目标服务的自签发根证书添加到FastGPT运行环境的信任证书列表中。若使用容器部署FastGPT，需将证书文件挂载至容器内的信任证书目录，具体操作需按实际环境确认。重新发起调用，确认不再出现`SELF_SIGNED_CERT_IN_CHAIN`报错。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1830)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
