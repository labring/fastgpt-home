---
title: 解决本地部署FastGPT后共享应用仅本机可访问的问题
slug: /zh/troubleshoot/fastgpt-local-share-access-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/954
source_type: GitHub issue
---

# 解决本地部署FastGPT后共享应用仅本机可访问的问题

## 现象
本地部署FastGPT后，新建自定义对话应用，使用平台提供的发布应用功能生成免登录访问窗口，得到的访问网址为http://localhost:3020/chat/share?shareId=16wngsrbtpw2ph18fheuwbg1。该网址仅能在部署FastGPT的本机上正常打开，使用其他设备连接同一网络或外部网络时，无法加载该共享应用页面。

## 可能原因
FastGPT默认部署时，服务绑定本地回环地址，仅接收来自本机的请求，且生成的访问网址使用localhost作为域名，该域名仅在本机系统内可解析为本地回环地址，无法被其他设备识别访问，因此仅本机可使用该链接。

## 排查步骤
1. 复制免登录窗口生成的访问网址，确认网址中包含localhost:3020的字段，明确当前访问地址绑定本机回环地址。
2. 通过系统命令或网络工具获取当前设备的公网IP或局域网IP地址，具体操作需按实际环境确认。
3. 记录获取到的IP地址，准备替换原访问网址中的localhost字段。

## 解决与验证
将原访问网址中的localhost替换为获取到的公网IP或局域网IP，生成新的访问地址，格式为http://[IP地址]:3020/chat/share?shareId=16wngsrbtpw2ph18fheuwbg1。使用其他设备连接与部署FastGPT的本机相同的网络，输入新生成的访问地址，即可正常加载共享的对话应用页面。若需外部网络访问，需确保使用公网IP并完成对应网络配置，具体配置需按实际环境确认。

> 来源: [FastGPT GitHub issue #954](https://github.com/labring/FastGPT/issues/954)
