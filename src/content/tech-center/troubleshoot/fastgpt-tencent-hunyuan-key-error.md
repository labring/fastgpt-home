---
title: 解决FastGPT接入腾讯混元模型密钥校验报错问题
slug: /zh/troubleshoot/fastgpt-tencent-hunyuan-key-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4185
source_type: GitHub issue
---

# 解决FastGPT接入腾讯混元模型密钥校验报错问题

## 现象
在FastGPT私有部署4.9.1-alapha2版本中，使用AiProxy接入腾讯混元模型时，系统提示key不正确。此前以AppId|SecretId|SecretKey的方式访问该模型可正常运行，且用户确认当前填写的密钥参数无误。

## 可能原因
目前存在两种潜在可能性，一是AiProxy对腾讯混元模型的配置参数格式与此前的接入方式存在差异，二是当前AiProxy暂未支持AppId|SecretId|SecretKey形式的鉴权配置。

## 排查步骤
1. 确认FastGPT私有部署版本为4.9.1-alapha2，核对已填写的AppId、SecretId、SecretKey参数与此前接入时使用的完全一致。
2. 查阅AiProxy相关配置说明，确认腾讯混元模型的鉴权参数填写格式是否与此前的接入方式一致。
3. 查看AiProxy的运行日志，获取密钥校验失败的详细报错信息，辅助定位问题。
4. 确认当前AiProxy版本是否支持腾讯混元的AppId|SecretId|SecretKey鉴权方式，需按实际环境确认。

## 解决与验证
如果配置格式存在差异，按照AiProxy要求的格式调整参数填写内容。如果当前AiProxy暂不支持该鉴权方式，可暂时切换回此前的接入方式，或等待后续版本更新支持。调整配置后重新发起模型调用，验证是否不再提示密钥不正确，且模型调用流程正常完成。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4185)
