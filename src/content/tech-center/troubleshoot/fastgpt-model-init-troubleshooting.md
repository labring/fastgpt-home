---
title: 解决FastGPT部署后模型配置与初始化异常问题
slug: /zh/troubleshoot/fastgpt-model-init-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3711
source_type: GitHub issue
---

# 解决FastGPT部署后模型配置与初始化异常问题

## 现象
使用Docker Compose拉取FastGPT 4.8.20-fix2版本并清空MongoDB数据库所有集合后，出现模型相关异常。使用Sealos部署FastGPT时，出现配置相关异常，页面提示配置文件存在问题。

## 可能原因
1. 未为知识库启用至少一个所需模型
2. 未执行FastGPT 4.8.20版本的初始化升级脚本
3. FastGPT配置文件配置错误

## 排查步骤
1. 检查是否已为知识库启用至少一个模型
2. 确认FastGPT配置文件的配置内容是否正确
3. 检查是否已执行4.8.20版本的初始化升级脚本
4. 若配置文件修改正确仍存在异常，尝试在FastGPT页面直接配置模型

## 解决与验证
若未启用模型，为知识库启用至少一个模型即可恢复正常。若未执行初始化升级脚本，执行以下命令：
```
curl --location --request POST 'https://{{host}}/api/admin/initv4820' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
执行命令后，验证异常是否消失。若配置文件存在错误，修正配置文件后重启FastGPT服务即可。

> 来源: [FastGPT GitHub issue #3711](https://github.com/labring/FastGPT/issues/3711)
