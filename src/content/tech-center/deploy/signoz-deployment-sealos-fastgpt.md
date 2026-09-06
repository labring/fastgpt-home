---
title: 在Sealos上部署Signoz并对接FastGPT的配置方法
slug: /zh/deploy/signoz-deployment-sealos-fastgpt
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/config/signoz
source_type: 官方文档
---

# 在Sealos上部署Signoz并对接FastGPT的配置方法

可使用SigNoz官方云服务，或进行私有部署。本文介绍在Sealos上快速部署Signoz的完整流程，帮助完成FastGPT的对接配置。

## 快速部署与配置步骤
1. 一键部署Signoz。点击下方的部署卡片，即可完成一键部署。
[![](../../../public/imgs/Deploy-on-Sealos.svg)](https://hzh.sealos.run/?uid=fnWRt09fZP&openapp=system-template%3FtemplateName%3Dsignoz)

2. 开启外网访问。部署完成后，点击P1中的详情进入应用详情页，点击右上角的变更选项，开启4318端口的外网地址。如果仅使用内网服务，可跳过该步骤。相关操作图示如下：
| 步骤图示1 | 步骤图示2 | 步骤图示3 |
| --- | --- | --- |
| ![alt text](../../../public/imgs/image-112.png) | ![alt text](../../../public/imgs/image-110.png) | ![alt text](../../../public/imgs/image-111.png) |

3. 获取并配置访问地址。变更完成后，等待公网地址就绪，复制该地址填入FastGPT中。如果使用内网服务，直接复制4318端口的内网地址即可。对应的地址获取图示如下：
![alt text](../../../public/imgs/image-113.png)

完成上述配置后，即可完成Signoz与FastGPT的对接，满足服务连接需求。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/config/signoz)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
