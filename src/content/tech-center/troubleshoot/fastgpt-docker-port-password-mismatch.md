---
title: 解决FastGPT私有部署端口与默认密码和文档不符的问题
slug: /zh/troubleshoot/fastgpt-docker-port-password-mismatch
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/2453
source_type: GitHub issue
---

# 解决FastGPT私有部署端口与默认密码和文档不符的问题

## 现象
使用Docker Compose部署FastGPT V4.8.9私有部署版本时，出现官方文档标注的默认端口、默认登录密码与实际部署后的参数不一致的情况。文档记载默认端口为3001、默认密码为123456，但实际访问时默认端口为3000，默认登录密码为1234。

## 可能原因
该问题源于FastGPT V4.8.9私有部署版本的实际默认配置参数，与对应版本的官方部署文档描述未保持同步。

## 排查步骤
1.  确认当前部署的FastGPT私有版本号为V4.8.9。
2.  查看Docker Compose部署生成的容器配置，确认实际对外暴露的端口。
3.  登录FastGPT系统后台，核对实际生效的默认登录密码。
4.  将实际获取的参数与官方部署文档记载的参数进行对比。

## 解决与验证
可通过两种方式处理该问题。第一种方式直接使用实际部署后的参数进行访问，即使用端口3000与密码1234登录。第二种方式修改Docker Compose配置文件，将端口与密码调整为官方文档记载的3001与123456，重新部署容器后生效。验证时，使用调整后的参数尝试访问并登录系统，确认功能正常。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2453)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
