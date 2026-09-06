---
title: 解决FastGPT调用第三方服务的自签证书报错问题
slug: /zh/troubleshoot/fastgpt-self-signed-cert-error-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1837
source_type: GitHub issue
---

# 解决FastGPT调用第三方服务的自签证书报错问题

## 现象
在FastGPT的HTTP模块调用第三方API时，目标服务使用自签发SSL证书，且已在FastGPT所在环境部署对应根证书，但调用仍返回如下报错信息：
```json
{
"error": {
"message": "self-signed certificate in certificate chain",
"name": "Error",
"method": "post",
"baseURL": "http://fastgpt-xxxxxx:3000/",
"url": "https://awx.apps.os.xxxxxx.com/api/v2/job_templates/116/launch/",
"code": "SELF_SIGNED_CERT_IN_CHAIN"
}
}
```

## 可能原因
目标第三方服务使用自签发SSL证书，虽已在FastGPT所在环境部署对应根证书，但HTTPS请求的证书链验证逻辑未正确识别该证书，触发`SELF_SIGNED_CERT_IN_CHAIN`错误。

## 排查步骤
1. 确认目标服务的SSL证书类型，确认其为自签发证书，并获取对应的根证书文件。
2. 检查FastGPT部署环境中已部署的根证书是否完整、有效，确认证书导入路径正确。
3. 核对FastGPT HTTP模块的请求配置，确认是否关联了信任的证书列表。
4. 测试目标服务的HTTPS连通性，确认证书信任状态是否正常。

## 解决与验证
### 解决方法
1. 将目标服务的自签根证书添加到FastGPT的信任证书体系中，确保HTTP请求时可以通过证书链验证。
2. 若仅需临时测试，可配置HTTP请求跳过证书验证（生产环境需谨慎）。
### 验证方式
重新发起FastGPT的HTTP模块调用，确认不再返回`SELF_SIGNED_CERT_IN_CHAIN`错误，请求可正常执行。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1837)
