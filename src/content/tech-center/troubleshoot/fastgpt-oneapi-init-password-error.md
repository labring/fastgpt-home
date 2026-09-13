---
title: 解决FastGPT私有部署中OneAPI初始化密码不匹配的问题
slug: /zh/troubleshoot/fastgpt-oneapi-init-password-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3049
source_type: GitHub issue
---

# 解决FastGPT私有部署中OneAPI初始化密码不匹配的问题

## 现象
用户在私有部署FastGPT v4.8.11版本时，通过Docker Compose配置OneAPI服务，在`environment`字段中设置了`INITIAL_ROOT_TOKEN=fastgpt`作为初始化管理员密码。但使用该配置值无法登录系统，最终使用123456成功登录。本次部署使用的OneAPI镜像版本为`ghcr.io/songquanpeng/one-api:v0.6.7`。

## 可能原因
该部署场景中，OneAPI的`INITIAL_ROOT_TOKEN`环境变量未按预期生效，实际登录时使用了OneAPI内置的默认管理员密码123456。

## 排查步骤
1. 检查OneAPI服务的Docker Compose配置文件，确认`environment`字段下的`INITIAL_ROOT_TOKEN`参数配置值。
2. 尝试使用配置的`INITIAL_ROOT_TOKEN`值和123456分别进行登录，核对可成功登录的密码。
3. 查看OneAPI容器的启动日志，确认`INITIAL_ROOT_TOKEN`环境变量是否被正确加载到容器中。
4. 确认部署的OneAPI镜像版本是否与配置的`ghcr.io/songquanpeng/one-api:v0.6.7`一致。

## 解决与验证
如果需要使用自定义的初始化管理员密码，需确保`INITIAL_ROOT_TOKEN`环境变量配置正确并被容器正常加载。若当前无法使用配置的密码登录，可尝试使用123456进行登录。登录成功后，可进入OneAPI的管理界面修改管理员密码，避免使用初始密码带来的安全风险。验证时，使用修改后的管理员密码即可正常登录系统。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3049)
