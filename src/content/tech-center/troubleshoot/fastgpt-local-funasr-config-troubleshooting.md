---
title: 本地部署FastGPT接入阿里FunASR的配置问题排错指南
slug: /zh/troubleshoot/fastgpt-local-funasr-config-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2201
source_type: GitHub issue
---

# 本地部署FastGPT接入阿里FunASR的配置问题排错指南

## 现象
本地部署FastGPT后，尝试接入阿里FunASR语音服务时，配置相关参数后多次测试均不通过，无法正常完成服务接入，需明确config.json与OneAPI的正确配置方式。

## 可能原因
结合配置场景与测试失败的现象，可能的配置错误包括OneAPI服务地址填写有误、模型标识配置错误，或config.json中的关联配置项未正确设置。由于未获取到具体报错文本，需按实际环境确认具体错误点。

## 排查步骤
1. 确认OneAPI服务的部署地址，确保部署环境可正常访问该地址。
2. 核对OneAPI中配置的模型标识，需使用whisper-1。
3. 检查config.json中的相关配置项，确保正确关联FunASR服务。
4. 重新提交配置后执行接入测试，验证配置是否生效。

## 解决与验证
直接在OneAPI中填写FunASR的服务地址，将模型标识设置为whisper-1。完成配置后重新执行接入测试，若测试通过则表示配置生效。若仍存在问题，需结合实际报错信息进一步排查config.json的配置项。

> 来源: [FastGPT GitHub issue #2201](https://github.com/labring/FastGPT/issues/2201)
