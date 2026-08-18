---
title: 使用Sealos部署FastGPT及相关配置、升级的完整流程
slug: /zh/deploy/fastgpt-sealos-deployment-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/deploy/sealos
source_type: 官方文档
---

# 使用Sealos部署FastGPT及相关配置、升级的完整流程

### 部署基础说明
FastGPT 使用 one-api 项目管理模型池，可兼容多种模型类型。Sealos 部署无需采购服务器与域名，支持高并发动态伸缩，数据库采用 kubeblocks 数据库，IO 性能优于普通 Docker 容器部署。部署分为新加坡区与北京区：新加坡区服务器位于国外，可直接访问 OpenAI，但国内用户需额外工具才能访问；北京区由火山云提供服务，国内用户可稳定访问，但无法访问境外服务，价格约为新加坡区的 1/4。部署需等待 2~4 分钟，默认使用最低配置，首次访问速度较慢，采用按量计费方式，按申请的 CPU、内存、磁盘资源计费，具体标准可在 Sealos 控制面板的费用中心查看。商业版包含 fastgpt、fastgpt-plus 两个应用与两个数据库，使用多 API Key 时需额外安装 OneAPI（一个应用和一个数据库），总计 3 个应用与 3 个数据库。

### 一键部署与登录步骤
1. 选择对应区域的部署按键，点击后跳转至配置页面，输入 root_password 以及 openai/oneapi 的地址和密钥。
2. 部署完成后跳转到应用管理页面，点击名称为 fastgpt-xxxx 的主应用右侧的详情按键。
3. 在部署管理页面点击外网访问地址链接，即可打开 FastGPT 服务。
4. 登录时用户名固定为 root，密码为部署时设置的 root_password。
5. 务必先配置至少一组模型，否则系统无法正常使用，可点击查看模型配置教程。如需绑定自定义域名或修改部署参数，可点击右上角变更并按 Sealos 指引操作。

### 后续配置与升级操作
在 Sealos 应用管理中可查看部署的 FastGPT 应用与对应数据库，暂停或删除服务时需同步操作数据库。修改环境变量或配置文件时，选中 FastGPT 应用点击变更即可操作。如需更新 FastGPT，需先查看更新文档确认目标版本，避免跨版本升级：在应用管理中找到对应应用（fastgpt、fastgpt-pro），点击右侧三点或详情页右上角的变更，修改镜像版本号后点击变更/重启，自动拉取最新镜像更新，若目标版本需要初始化则执行对应脚本。此外，可通过修改环境变量调整系统名称、描述与 favicon，挂载 logo 需新增挂载文件 /app/projects/app/public/icon/logo.svg 并填入对应 SVG 内容。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/deploy/sealos)
