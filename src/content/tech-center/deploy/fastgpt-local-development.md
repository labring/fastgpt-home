---
title: FastGPT本地开发环境搭建与调试流程说明
slug: /zh/deploy/fastgpt-local-development
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/dev
source_type: 官方文档
---

# FastGPT本地开发环境搭建与调试流程说明

本文档用于指导完成FastGPT的本地开发调试，搭建开发环境前需提前安装配置Git、Docker、Node.js=20（建议通过nvm管理版本）、pnpm 10.x，推荐在Linux、MacOS或Windows WSL等*nix环境开展开发工作。

## 本地开发操作步骤
1.  Fork FastGPT官方存储库并克隆到本地，执行命令`git clone git@github.com:your_github_username/FastGPT.git`。
2.  启动开发依赖：切换至`FastGPT/deploy/dev`目录，执行`docker compose up -d`启动依赖服务；若无法获取镜像，可使用国内镜像版本的配置文件，执行`docker compose -f docker-compose.cn.yml up -d`。
3.  完成初始配置：在`projects/app`路径下，复制`.env.template`为`.env.local`，复制`data/config.json`为`data/config.local.json`。若未修改docker-compose.yaml中的变量，可直接使用默认配置，否则需保证变量与yaml文件保持一致。`config.local.json`中需关注`systemEnv`下的参数，包括向量生成最大进程`vectorMaxProcess`、QA生成最大进程`qaMaxProcess`、图片理解模型最大进程`vlmMaxProcess`以及仅对PG和OB生效的向量搜索参数`hnswEfSearch`。
4.  安装依赖并启动服务：在项目根目录执行`pnpm i`安装所有依赖，进入`projects/app`目录后执行`pnpm dev`，默认将在3000端口启动服务，访问`http://localhost:3000`即可进入本地开发环境。

## 常见问题排查
若出现端口冲突，需先关闭本地已启动的FastGPT服务；连接Mongo数据库时，需在连接地址中添加`directConnection=true`参数以适配副本集。若执行`pnpm i`后`postinstall.sh`脚本无权限，可先执行`chmod -R +x ./scripts/`后重新执行`pnpm i`，仍无法解决可手动执行脚本内的内容。若遇到`TypeError: Cannot read properties of null (reading 'useMemo')`报错，可删除所有`node_modules`目录，使用Node.js 18版本重新执行安装流程。当用户时区为Asia/Shanghai且处于非Linux环境时，会出现系统时间获取异常，需将本地时区调整为UTC（+0）。连接远程数据库时需检查端口是否开放，本地运行的数据库可尝试将host修改为localhost或127.0.0.1。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/dev
