---
title: 解决COW连接FastGPT API后语音不可用与知识库访问问题
slug: /zh/troubleshoot/fastgpt-cow-voice-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1645
source_type: GitHub issue
---

# 解决COW连接FastGPT API后语音不可用与知识库访问问题

## 现象
当通过COW连接FastGPT的API后，会出现OpenAI语音功能无法使用的问题，同时无法通过该连接访问FastGPT的私有知识库与应用的API接口。

## 可能原因
直接将COW与FastGPT的API进行对接时，无法同时覆盖语音功能调用与私有知识库的访问需求，导致两类功能无法正常生效。

## 排查步骤
1. 梳理当前COW与FastGPT的连接链路，确认是否为直接对接FastGPT的原生API。
2. 检查语音功能的调用配置是否存在适配缺失，确认是否需要通过中间层转发请求。
3. 验证私有知识库的访问接口权限与调用路径是否符合FastGPT的配置要求。

## 解决与验证
将FastGPT先接入oneapi，再将oneapi接入COW，即可让COW调用语音模型。FastGPT的密钥可直接调用对应应用，与模型类型无关，通过该配置可正常访问FastGPT的私有知识库。完成配置后，测试COW的语音功能是否可以正常启动与使用，同时使用FastGPT的密钥调用私有知识库的相关接口，确认访问功能正常生效。

> 来源: [FastGPT GitHub issue #1645](https://github.com/labring/FastGPT/issues/1645)
