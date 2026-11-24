---
title: 快速准备FastGPT自部署所需的Docker和Docker-compose运行环境
slug: /zh/reference/fastgpt-deploy-docker-compose-env
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/deploy/docker
source_type: 官方文档小节
---

# 快速准备FastGPT自部署所需的Docker和Docker-compose运行环境

# 快速准备FastGPT自部署所需的Docker和Docker-compose运行环境

## 结论
完成Docker和Docker-compose的正确安装配置，是FastGPT自部署的前置基础步骤。部署FastGPT前需完成该环境的搭建，按照官方指引操作可快速完成，安装后可通过版本验证确认配置生效。

## 具体怎么做
1. 安装Docker：执行命令`curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun`，随后执行`systemctl enable --now docker`启动并设置开机自启（启用Docker服务）。
2. 安装docker-compose：执行命令`curl -L https://github.com/docker/compose/releases/download/v2.20.3/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose`，然后执行`chmod +x /usr/local/bin/docker-compose`赋予执行权限。
3. 验证安装：分别执行`docker -v`和`docker compose -v`，查看对应版本信息确认安装成功。

## 注意事项
- 若安装过程出现失效情况，可自行查找对应解决方案、自行排查解决。
- 推荐并可选择使用Orbstack，通过Homebrew执行`brew install orbstack`安装，或直接下载安装包完成安装。
- 在Windows环境中，将源代码和其他数据绑定到Linux容器时，建议存储在Linux文件系统中。
- Windows环境下可使用WSL 2后端安装Docker Desktop，或直接在WSL 2中安装命令行版本的Docker；也可选择使用WSL 2后端安装Docker Desktop，或在WSL 2中安装命令行版本的Docker。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/deploy/docker)
> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host)
