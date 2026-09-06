---
title: FastGPT使用Nginx代理chat/share路径的排错指南
slug: /zh/troubleshoot/fastgpt-nginx-chat-share-proxy-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1024
source_type: GitHub issue
---

# FastGPT使用Nginx代理chat/share路径的排错指南

## 现象
尝试使用Nginx代理FastGPT的chat/share路径，访问http://ip:80后直接打开Nginx报错界面，无法正常完成代理。

## 可能原因
1. Nginx的location匹配规则配置不当，例如仅匹配根路径/；
2. 直接代理chat/share路径无法解决登录验证问题，存在非法用户访问的风险；
3. 代理转发的相关参数未按实际环境正确配置。

## 排查步骤
1. 检查Nginx配置文件中的location匹配规则，确认是否仅配置了根路径/的匹配；
2. 核对代理转发的目标地址，确保指向FastGPT部署的实际地址；
3. 查看Nginx错误日志，获取具体的报错信息；
4. 确认Nginx配置已正确加载。

## 解决与验证
调整Nginx配置，将location匹配规则从根路径/改为匹配/chat/share路径。重新加载Nginx配置后，访问代理地址，确认不再出现Nginx报错界面。需注意，该代理方式无法解决登录验证问题，可能导致非法用户访问，需结合实际业务场景补充权限控制。

> 来源: [FastGPT GitHub issue #1024](https://github.com/labring/FastGPT/issues/1024)
