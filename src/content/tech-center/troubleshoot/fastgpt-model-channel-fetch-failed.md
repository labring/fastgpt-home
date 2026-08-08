---
title: FastGPT私有部署后模型渠道fetch failed与测试404的排错指南
slug: /zh/troubleshoot/fastgpt-model-channel-fetch-failed
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6525
source_type: GitHub issue
---

# FastGPT私有部署后模型渠道fetch failed与测试404的排错指南

## 现象
私有部署main版本的FastGPT，登录后台点击模型渠道时出现`fetch failed`异常返回；使用官方请求地址与官方密钥测试模型渠道时，返回404错误。

## 可能原因
1.  部署FastGPT的服务器节点无法连通配置的模型请求地址，导致请求失败；
2.  模型渠道配置的请求地址格式存在拼写错误或多余拼接，触发404错误；
3.  配置的密钥信息不符合官方要求的格式；
4.  FastGPT服务端的请求转发配置存在异常，需按实际环境确认。

## 排查步骤
1.  在部署FastGPT的服务器节点，执行`curl [配置的模型请求地址]`命令，测试节点与目标地址的连通性，查看是否能正常获取响应内容。
2.  检查模型渠道配置页面的请求地址，修正拼写错误或多余的路径拼接，确保符合官方地址格式。
3.  核对配置的密钥信息，确认与官方要求的密钥格式一致，无额外修改。
4.  查看FastGPT服务的后台日志，定位`fetch failed`的具体报错细节，需按实际环境确认日志路径与内容。

## 解决与验证
若节点无法连通目标地址，需配置网络代理或开放对应端口的访问权限；若请求地址格式错误，修正为官方标准请求地址。完成调整后，重新进入模型渠道配置页面保存设置，点击测试按钮，确认不再出现`fetch failed`或404错误，即可验证问题解决。若问题仍存在，需按实际环境进一步排查服务端的请求转发相关配置。

> 来源：https://github.com/labring/FastGPT/issues/6525
