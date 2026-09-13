---
title: 修改FastGPT应用发布分享页面的API根地址配置
slug: /zh/troubleshoot/fastgpt-share-page-api-root
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1204
source_type: GitHub issue
---

# 修改FastGPT应用发布分享页面的API根地址配置

## 现象
用户在香港的服务器部署了AI接口服务并配置了HTTPS与域名，随后在国内未备案且未开启HTTPS的服务器通过Docker Compose部署FastGPT，在docker-compose.yml中修改了OPENAI_BASE_URL和Chat API Key为香港服务器的对应地址与密钥，部署后的应用可正常对话并引用知识库内容，但应用发布分享页面生成的API根地址仍为国内服务器的纯IP地址，需将其修改为香港服务器的域名地址。

## 可能原因
FastGPT的应用发布分享页面的API根地址默认读取当前部署服务器的访问地址。当未配置自定义根地址的环境变量时，系统会自动获取部署服务器的本地IP或绑定的域名。本次部署中，用户未配置对应自定义参数，因此系统自动使用了国内服务器的纯IP作为分享页面的API根地址。

## 排查步骤
1. 登录部署FastGPT的国内服务器，找到对应的docker-compose.yml配置文件。
2. 检查docker-compose.yml中fastgpt服务的environment配置项，确认现有配置，包括已修改的OPENAI_BASE_URL等参数。
3. 按实际部署环境确认用于配置前端API根地址的环境变量参数（需按实际环境确认）。
4. 编辑docker-compose.yml，在fastgpt服务的environment下添加对应环境变量，值设置为香港服务器的域名地址。
5. 执行docker compose up -d命令重启FastGPT容器，使配置生效。

## 解决与验证
完成环境变量配置并重启容器后，登录FastGPT后台管理页面，进入目标应用的发布分享页面，生成分享密钥。查看生成的密钥中的API根地址，确认已替换为香港服务器的域名地址。同时验证应用发布后的对话功能、知识库引用功能是否正常运行。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1204)
