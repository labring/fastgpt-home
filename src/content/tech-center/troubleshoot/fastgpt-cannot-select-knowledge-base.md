---
title: 解决FastGPT私有部署版本无法选中知识库的问题
slug: /zh/troubleshoot/fastgpt-cannot-select-knowledge-base
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/284
source_type: GitHub issue
---

# 解决FastGPT私有部署版本无法选中知识库的问题

## 现象
在FastGPT私有部署的最新版本中，进入应用配置页面选择知识库时，单击对应知识库选项后，该选项会直接消失，无法完成选中操作，导致无法关联知识库。

## 可能原因
该问题通常由FastGPT版本升级后，未执行官方升级文档中说明的额外操作引发，导致知识库关联的前端配置无法正常加载，进而出现选项消失无法选中的情况。

## 排查步骤
1. 登录FastGPT私有部署环境，进入应用配置页面，复现无法选中知识库的问题。
2. 确认近期是否执行过FastGPT的版本升级操作。
3. 查阅FastGPT官方升级文档，核对对应版本升级后需执行的额外操作是否已全部完成。

## 解决与验证
1. 访问FastGPT官方升级文档（链接：https://doc.fastgpt.run/docs/installation/upgrading/44/），查阅对应版本升级后的额外操作要求。
2. 按照文档要求执行必要操作，包括需按实际环境确认的POST请求，具体请求参数需结合当前部署环境确定。
3. 重启FastGPT相关服务，等待服务启动完成后，重新进入应用配置页面尝试选择知识库。
验证标准为：单击知识库选项后，选项不会消失，可正常完成选中并关联知识库的操作。

> 来源: [FastGPT GitHub issue #284](https://github.com/labring/FastGPT/issues/284)
