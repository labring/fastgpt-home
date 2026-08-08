---
title: 搭建FastGPT本地开发环境并完成调试流程
slug: /zh/deploy/fastgpt-local-development-setup
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/dev
source_type: 官方文档
---

# 搭建FastGPT本地开发环境并完成调试流程

## 前置开发环境要求
开发FastGPT需提前安装以下依赖：Git、Docker、Node.js=20（建议使用nvm管理版本）、pnpm 10.x，推荐在*nix环境（Linux、MacOS、Windows WSL）进行开发。

## 本地开发操作步骤
1. Fork并克隆仓库：先Fork官方FastGPT存储库，再克隆自己的GitHub仓库，执行命令：`git clone git@github.com:your_github_username/FastGPT.git`。
2. 启动开发依赖：切换到`FastGPT/deploy/dev`目录，执行`docker compose up -d`启动项目依赖；若无法获取镜像，使用国内镜像版本配置：`docker compose -f docker-compose.cn.yml up -d`。注意Mongo数据库连接需添加`directConnection=true`参数。
3. 初始化配置：在`projects/app`路径下，复制`.env.template`为`.env.local`，修改该文件生效环境变量；复制`data/config.json`为`data/config.local.json`，该文件多数情况无需修改，仅需关注`systemEnv`下的参数：`vectorMaxProcess`（向量生成最大进程，2c4g服务器建议10~15）、`qaMaxProcess`、`vlmMaxProcess`、`hnswEfSearch`（仅对PG和OB生效，值越大搜索精度越高但速度越慢）。
4. 安装依赖：在项目根目录执行`pnpm i`，若提示`isolate-vm`安装失败可参考：https://github.com/laverdet/isolated-vm?tab=readme-ov-file#requirements；若`postinstall.sh`无执行权限，可按环境处理。
5. 启动项目：进入`projects/app`目录，执行`pnpm dev`，默认运行在3000端口，访问`http://localhost:3000`即可。如需打包，可使用Docker执行构建命令：无代理时`docker build -f ./projects/app/Dockerfile -t fastgpt . --build-arg name=app`，使用淘宝代理时`docker build -f ./projects/app/Dockerfile -t fastgpt . --build-arg name=app --build-arg proxy=taobao`。

## 常见问题排查
1. 系统时间异常：若用户时区为`Asia/Shanghai`且非Linux环境，可将时区调整为UTC（+0）。
2. 数据库连接问题：连接远程数据库需检查端口是否开放；本地数据库可尝试将host改为`localhost`或`127.0.0.1`；Mongo连接需添加`directConnection=true`参数。
3. 依赖脚本权限问题：若`postinstall.sh`执行失败，Windows环境可使用Git Bash添加执行权限再执行脚本，Linux环境可先执行`chmod -R +x ./scripts/`再重新执行`pnpm i`。
4. 特定报错处理：若出现`TypeError: Cannot read properties of null (reading useMemo )`，可删除所有`node_modules`，使用Node18重新执行`pnpm i`。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/dev
