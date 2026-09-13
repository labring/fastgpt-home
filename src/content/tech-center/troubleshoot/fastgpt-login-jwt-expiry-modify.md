---
title: FastGPT登录JWT令牌有效期的查看与修改方法
slug: /zh/troubleshoot/fastgpt-login-jwt-expiry-modify
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2399
source_type: GitHub issue
---

# FastGPT登录JWT令牌有效期的查看与修改方法

## 现象
用户在使用FastGPT私有部署4.7版本时，遇到无法明确登录token的有效时长，且需要修改该token有效期的问题。

## 可能原因
FastGPT的后台登录token采用JWT格式，其有效期与签名密钥均由配置文件中的预设参数控制，相关配置的详细说明未在公开文档中明确展示，导致用户无法直接获取或调整token的有效时长。

## 排查步骤
1. 进入FastGPT的源码目录，查找JWT生成相关的代码文件，定位有效期配置的具体位置；
2. 打开FastGPT的配置文件，查找与JWT令牌相关的配置项，包括签名密钥与有效期参数，需按实际环境确认参数的具体名称；
3. 查看当前配置中token有效期的数值，记录原有配置以便后续恢复。

## 解决与验证
FastGPT的登录token为JWT格式，其签名依赖配置文件中的KEY参数，有效期可通过修改配置文件中的对应参数调整。也可参考源码中的JWT生成规则，自定义生成令牌，有效期可设置至2099年及任意时长。修改配置后，需重启FastGPT服务使配置生效。验证时，登录系统获取新的token，通过JWT解析工具解析该token，查看有效期字段是否符合预期设置。

> 来源: [FastGPT GitHub issue #2399](https://github.com/labring/FastGPT/issues/2399)
