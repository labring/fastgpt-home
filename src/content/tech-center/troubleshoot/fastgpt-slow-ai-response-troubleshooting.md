---
title: FastGPT单次AI提问响应超时的排查与优化方法
slug: /zh/troubleshoot/fastgpt-slow-ai-response-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1018
source_type: GitHub issue
---

# FastGPT单次AI提问响应超时的排查与优化方法

## 现象
部署环境为Rocky 9系统，配备40核CPU、128G内存、400G SSD磁盘的独占物理主机。部署FastGPT v4.6.8，搭配one-api 0.6.1、ollama 0.1.27、registry.cn-hangzhou.aliyuncs.com/fastgpt_docker/m3e-large-api:latest镜像，使用gemma-2b大语言模型。单人操作时，单次AI提问响应需50秒以上。

## 可能原因
1. 所用大语言模型本身存在性能限制；
2. 部署环境未配备GPU，无法高效运行大语言模型。

## 排查步骤
1. 检查部署主机的GPU硬件配置情况；
2. 确认所用大语言模型的硬件运行要求；
3. 核对各关联组件的版本匹配性，需按实际环境确认。

## 解决与验证
若部署环境未配备GPU，需添加GPU以支持高效运行大语言模型。若问题源于大语言模型本身的性能限制，需更换符合硬件要求的大语言模型。完成调整后，测试单次AI提问的响应时间，确认是否恢复至正常范围。

> 来源: [FastGPT GitHub issue #1018](https://github.com/labring/FastGPT/issues/1018)
