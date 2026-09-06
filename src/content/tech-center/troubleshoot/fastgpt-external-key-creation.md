---
title: FastGPT外部调用创建独立密钥的问题排查方法
slug: /zh/troubleshoot/fastgpt-external-key-creation
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4029
source_type: GitHub issue
---

# FastGPT外部调用创建独立密钥的问题排查方法

## 现象
集成FastGPT的多用户系统无法为每个用户分配独立密钥，导致对话及对话记录共享，需提供外部接口供系统调用创建并绑定密钥。

## 可能原因
未开放外部系统可调用的密钥创建及绑定接口，无法自动为不同用户生成独立密钥并完成绑定，具体原因需按实际环境确认。

## 排查步骤
1. 确认FastGPT是否支持外部调用创建并绑定密钥的功能；
2. 检查集成系统的调用逻辑是否匹配相关功能的规范要求；
3. 核对密钥绑定配置是否适配多用户独立使用的场景，具体细节需按实际环境确认。

## 解决与验证
当前线程未提供明确的配置或命令类解法。若该问题仍需解决，可重新打开对应issue并补充相关集成场景信息，验证步骤需按实际环境确认。

> 来源: [FastGPT GitHub issue #4029](https://github.com/labring/FastGPT/issues/4029)
