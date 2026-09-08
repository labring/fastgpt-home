---
title: FastGPT 容器与编排 问题清单
slug: /zh/guide/container-orchestration-issues
page_type: 问题清单聚合页
source: https://github.com/labring/FastGPT
source_type: 官方文档
meta_title: FastGPT 容器与编排 问题清单｜FastGPT 技术中心
meta_description: 查阅容器与编排 问题清单，按症状与技术对象定位相关配置、排查步骤和已发布文档，结合版本边界确认适用条件。
schema_type: TechArticle
date_published: 2026-09-08
date_modified: 2026-09-08
source_file: 程序化技术页-第6批/中文-fastgpt.cn/guide/container-orchestration-issues.md
source_sha256: 40604e0df15bed8bb5aaaa45df36337e891f33a43326115c615c65d058bebcee
source_verified: 2026-09-07
publication_batch: Week08
---

# FastGPT 容器与编排 问题清单

本页汇总站内已发布的 146 篇容器运行、编排与平台化部署环节的问题，按症状分组列出，可按报错表现直接定位到对应文档。

## 属于这一环节的三类典型症状

1. 容器或编排组件启动后状态异常
2. 编排文件中的服务依赖与网络配置不生效
3. 平台化部署环境与自建环境行为不一致

若症状与上述三类都不匹配，可返回[部署与环境问题全景](/zh/guide/deployment-issue-landscape)重新分流。

## 排查这一环节的通用顺序

1. 取后端服务日志中与该环节组件相关的完整报错，包括组件名与错误码
2. 在部署环境内验证该组件是否可独立访问，排除网络与权限因素
3. 核对该组件的版本与主服务版本的对应关系
4. 按下方清单中症状最接近的条目执行，完成后重新验证同一操作

## 已发布的文档清单（146 篇）

| 文档 | 类型 |
| --- | --- |
| [Docker-compose部署FastGPT的PgVector版本升级操作步骤](/zh/reference/docker-compose-fastgpt-pgvector-upgrade) | 技术速查 |
| [FastGPT 4.6.9 Windows Docker部署异常排查](/zh/troubleshoot/fastgpt-windows-docker-troubleshooting) | 排错/错误码 |
| [FastGPT Docker Compose部署的配置与操作说明](/zh/tutorial/fastgpt-docker-compose-deploy) | 教程/部署 |
| [FastGPT Docker Compose部署的配置方法与操作步骤](/zh/deploy/fastgpt-docker-compose-deploy) | 部署场景 |
| [FastGPT Docker版本部署配置与三种部署方法](/zh/tutorial/fastgpt-docker-deployment-methods) | 教程/部署 |
| [FastGPT Docker环境MongoDB数据恢复与迁移操作](/zh/reference/fastgpt-docker-mongo-restore-migration) | 技术速查 |
| [FastGPT Docker部署场景下常见问题的排查与解决指南](/zh/reference/fastgpt-docker-deploy-common-issues) | 技术速查 |
| [FastGPT Docker部署环境的数据库备份与迁移操作方法](/zh/deploy/fastgpt-docker-db-migration-2) | 部署场景 |
| [FastGPT docker compose部署新增agent-sandbox配置指南](/zh/reference/fastgpt-docker-compose-add-agent-sandbox-config) | 技术速查 |
| [FastGPT docker-compose部署初始化脚本相关问题排查](/zh/troubleshoot/fastgpt-docker-compose-init-script-troubleshooting) | 排错/错误码 |
| [FastGPT sandbox容器重启与工作流超时问题的排查与解决](/zh/troubleshoot/fastgpt-sandbox-restart-timeout) | 排错/错误码 |
| [FastGPT使用Helm方式部署的相关说明与注意事项](/zh/glossary/fastgpt-helm-deployment-guide) | 术语速查 |
| [FastGPT升级到4.8.4后数据库容器无法启动的排查方法](/zh/troubleshoot/fastgpt-upgrade-db-start-troubleshooting) | 排错/错误码 |
| [FastGPT基于Docker的MongoDB数据迁移备份恢复操作](/zh/deploy/fastgpt-docker-mongo-migration) | 部署场景 |
| [FastGPT容器restart: always自动重启参数配置速查](/zh/glossary/fastgpt-container-restart-always-config) | 术语速查 |
| [FastGPT知识库操作导致容器卡死无法重启的排错指南](/zh/troubleshoot/fastgpt-container-crash-troubleshooting) | 排错/错误码 |
| [FastGPT私有部署Dockerfile部署缺失依赖包的排错方法](/zh/troubleshoot/fastgpt-dockerfile-missing-deps) | 排错/错误码 |
| [FastGPT私有部署Docker升级问题排查与解决方法](/zh/troubleshoot/fastgpt-docker-upgrade-pitfalls) | 排错/错误码 |
| [FastGPT私有部署Docker打包网络错误问题排查指南](/zh/troubleshoot/fastgpt-private-deploy-docker-network-error) | 排错/错误码 |
| [FastGPT私有部署容器内API渠道调用失败的排错方法](/zh/troubleshoot/fastgpt-private-deploy-api-call-error) | 排错/错误码 |
| [FastGPT私有部署重启容器后创建模型网络错误的排查方法](/zh/troubleshoot/fastgpt-private-deployment-network-error) | 排错/错误码 |
| [FastGPT部署Milvus后容器崩溃的排查与解决方法](/zh/troubleshoot/fastgpt-milvus-crash-troubleshooting) | 排错/错误码 |
| [Sealos环境下FastGPT 4.10.0版本更新操作指南](/zh/reference/fastgpt-sealos-4100-upgrade) | 技术速查 |
| [Sealos环境下FastGPT的版本升级操作说明](/zh/deploy/fastgpt-sealos-upgrade-guide) | 部署场景 |
| [Windows Docker部署FastGPT问题排查与解决方法](/zh/troubleshoot/windows-docker-fastgpt-troubleshooting) | 排错/错误码 |
| [Windows环境下FastGPT本地部署的系统选型与Docker配置指引](/zh/troubleshoot/fastgpt-windows-deployment-setup) | 排错/错误码 |
| [优化Docker部署的FastGPT知识库检索速度](/zh/troubleshoot/fastgpt-docker-knowledge-retrieval-speed) | 排错/错误码 |
| [使用Docker Compose部署FastGPT的完整操作步骤与配置说明](/zh/tutorial/fastgpt-docker-compose-deploy-2) | 教程/部署 |
| [使用Docker启动FastGPT本地开发环境的操作指引](/zh/deploy/start-fastgpt-local-dev-docker) | 部署场景 |
| [使用Docker部署适配FastGPT所需的BGE重排序模型服务](/zh/reference/docker-deploy-bge-rerank-fastgpt) | 技术速查 |
| [使用Sealos一键部署FastGPT的详细操作与配置指南](/zh/deploy/sealos-one-click-fastgpt-deploy) | 部署场景 |
| [使用Sealos部署FastGPT及相关配置、升级的完整流程](/zh/deploy/fastgpt-sealos-deployment-guide) | 部署场景 |
| [使用mongodump模式完成FastGPT的Docker环境MongoDB数据库迁移](/zh/deploy/fastgpt-docker-mongo-dump-migration) | 部署场景 |
| [修改FastGPT配置文件后无需重启容器的排错方法](/zh/troubleshoot/fastgpt-config-reload-without-restart) | 排错/错误码 |
| [在FastGPT Docker环境中实现基于LLM的PDF格式优化转换功能](/zh/troubleshoot/fastgpt-docker-llm-pdf-conversion) | 排错/错误码 |
| [在Sealos上部署Signoz并对接FastGPT的配置方法](/zh/deploy/signoz-deployment-sealos-fastgpt) | 部署场景 |
| [在Sealos部署的FastGPT中完成PgVector数据库升级的具体步骤](/zh/reference/sealos-fastgpt-pgvector-upgrade) | 技术速查 |
| [完成Docker部署FastGPT的Mongo数据库手动更新](/zh/reference/fastgpt-docker-mongo-manual-update) | 技术速查 |
| [完成FastGPT Docker部署的数据库备份与迁移操作](/zh/deploy/fastgpt-docker-db-migration) | 部署场景 |
| [快速准备FastGPT自部署所需的Docker和Docker-compose运行环境](/zh/reference/fastgpt-deploy-docker-compose-env) | 技术速查 |
| [指导通过Sealos一键部署FastGPT服务的具体操作流程](/zh/deploy/fastgpt-sealos-one-click-deploy) | 部署场景 |
| [排查FastGPT私有部署的docker-compose配置格式错误问题](/zh/glossary/fastgpt-private-deploy-compose-format-error) | 术语速查 |
| [统一FastGPT容器命名规则优化运维排查与脚本编写效率](/zh/troubleshoot/fastgpt-container-naming-unify) | 排错/错误码 |
| [解决Docker Compose部署FastGPT新建应用超时问题](/zh/troubleshoot/fastgpt-docker-compose-timeout-error) | 排错/错误码 |
| [解决Docker Swarm部署FastGPT后端口无法访问的问题](/zh/troubleshoot/fastgpt-docker-swarm-port-unreachable) | 排错/错误码 |
| [解决Docker部署FastGPT创建知识库时页面崩溃的问题](/zh/troubleshoot/fastgpt-docker-kb-creation-crash) | 排错/错误码 |
| [解决Docker部署FastGPT后OneAPI无端口映射无法访问的问题](/zh/troubleshoot/fastgpt-docker-oneapi-port-mapping) | 排错/错误码 |
| [解决Docker部署FastGPT后修改静态图片不生效的问题](/zh/troubleshoot/fastgpt-docker-static-image-updated) | 排错/错误码 |
| [解决Docker部署FastGPT后无操作时硬盘高频写入的排查修复问题](/zh/troubleshoot/fastgpt-docker-disk-write-issue) | 排错/错误码 |
| [解决Docker部署FastGPT对接本地大模型的网络访问异常问题](/zh/troubleshoot/fastgpt-docker-local-model-network-error) | 排错/错误码 |
| [解决Docker部署FastGPT日志无报错但前端无法访问的问题](/zh/troubleshoot/fastgpt-docker-frontend-unreachable) | 排错/错误码 |
| [解决Docker部署FastGPT时jieba原生绑定加载失败的问题](/zh/troubleshoot/fastgpt-docker-jieba-binding-error) | 排错/错误码 |
| [解决Docker部署FastGPT时找不到API配置项的问题](/zh/troubleshoot/fastgpt-docker-api-config-troubleshooting) | 排错/错误码 |
| [解决Docker部署FastGPT时账号密码重复配置的问题](/zh/troubleshoot/fastgpt-docker-env-credential-management) | 排错/错误码 |
| [解决Docker部署FastGPT的扩展、HTTP调用与环境配置问题](/zh/troubleshoot/fastgpt-docker-deployment-troubleshooting) | 排错/错误码 |
| [解决Docker部署OneAPI后重复重启无法访问的问题](/zh/troubleshoot/fastgpt-oneapi-docker-restart-troubleshoot) | 排错/错误码 |
| [解决FastGPT 3.8.14版本Docker启动缺失schema.proto文件的问题](/zh/troubleshoot/fastgpt-3814-docker-missing-proto-file) | 排错/错误码 |
| [解决FastGPT 4.6.8私有部署版本地Docker构建后启动报错问题](/zh/troubleshoot/fastgpt-local-docker-build-error) | 排错/错误码 |
| [解决FastGPT 4.7.1-fix版本Docker构建中断问题](/zh/troubleshoot/fastgpt-docker-build-interruption-troubleshooting) | 排错/错误码 |
| [解决FastGPT 4.8.1私有部署容器启动时MongoDB无法连接的问题](/zh/troubleshoot/fastgpt-mongodb-connection-failure) | 排错/错误码 |
| [解决FastGPT 4.8.22 Docker版本调用qwen-vl-max时出现的url error问题](/zh/troubleshoot/fastgpt-qwen-vl-max-url-error) | 排错/错误码 |
| [解决FastGPT Docker Compose配置文件服务命名不统一的问题](/zh/troubleshoot/fastgpt-docker-compose-service-naming) | 排错/错误码 |
| [解决FastGPT Docker部署上传大文件时出现502错误的问题](/zh/troubleshoot/fastgpt-docker-large-file-502-error) | 排错/错误码 |
| [解决FastGPT Docker部署中的目录缺失与头像更换问题](/zh/troubleshoot/fastgpt-docker-dir-avatar-fix) | 排错/错误码 |
| [解决FastGPT Docker部署修改指定端口后无法访问的问题](/zh/troubleshoot/fastgpt-docker-modified-port-unreachable) | 排错/错误码 |
| [解决FastGPT Docker部署后创建知识库的model读取报错](/zh/glossary/fastgpt-docker-model-read-error) | 术语速查 |
| [解决FastGPT Docker部署后创建知识库页面崩溃问题](/zh/troubleshoot/fastgpt-docker-kb-crash-error) | 排错/错误码 |
| [解决FastGPT Docker部署后挂载证书仍无法调用验证型API的问题](/zh/troubleshoot/fastgpt-docker-cert-api-connection-error) | 排错/错误码 |
| [解决FastGPT Docker部署后无法新建知识库的问题](/zh/troubleshoot/fastgpt-docker-new-knowledge-base-fix) | 排错/错误码 |
| [解决FastGPT Docker部署后的接口连接异常及403、429报错](/zh/troubleshoot/fastgpt-docker-api-error-troubleshooting) | 排错/错误码 |
| [解决FastGPT K8s部署pluginTemplates目录缺失问题](/zh/troubleshoot/fastgpt-k8s-plugin-templates-fix) | 排错/错误码 |
| [解决FastGPT PDF maker v2 Docker部署的GPU与知识库显示异常问题](/zh/troubleshoot/fastgpt-pdf-maker-kb-gpu-issue) | 排错/错误码 |
| [解决FastGPT V4.8系列版本的Docker部署运行报错问题](/zh/troubleshoot/fastgpt-v4-series-docker-run-error) | 排错/错误码 |
| [解决FastGPT v4.8.1 Docker版登录无限重定向问题](/zh/troubleshoot/fastgpt-v481-login-redirect) | 排错/错误码 |
| [解决FastGPT与One-API容器间网络连接不通的问题](/zh/troubleshoot/fastgpt-oneapi-network-troubleshooting) | 排错/错误码 |
| [解决FastGPT中S3自定义地址未正确生成docker-compose配置的问题](/zh/troubleshoot/s3-custom-address-docker-compose) | 排错/错误码 |
| [解决FastGPT中bge-rerank容器启动后报错重启的问题](/zh/troubleshoot/fastgpt-rerank-container-error-restart) | 排错/错误码 |
| [解决FastGPT中reRank模型Docker日志无显示的问题及排查方法](/zh/troubleshoot/fastgpt-rerank-docker-log-missing) | 排错/错误码 |
| [解决FastGPT中服务卡住且fastgpt_fastgpt网络容器异常的问题](/zh/troubleshoot/fastgpt-network-container-created-error) | 排错/错误码 |
| [解决FastGPT使用Sealos Nginx代理的自签名证书报错问题](/zh/troubleshoot/fastgpt-sealos-nginx-cert-error) | 排错/错误码 |
| [解决FastGPT修改docker-compose配置项FE_DOMAIN和标题不生效的问题](/zh/troubleshoot/fastgpt-modify-docker-config-failed) | 排错/错误码 |
| [解决FastGPT在Helm部署时挂载配置文件的兼容性问题](/zh/troubleshoot/fastgpt-helm-config-mount) | 排错/错误码 |
| [解决FastGPT容器挂载config.json文件启动失败的问题](/zh/troubleshoot/fastgpt-config-json-mount-error) | 排错/错误码 |
| [解决FastGPT容器指定GPU后进程池不可用报错问题](/zh/troubleshoot/fastgpt-container-gpu-process-error) | 排错/错误码 |
| [解决FastGPT容器部署后请求无响应且未走代理的问题](/zh/troubleshoot/fastgpt-container-proxy-issue) | 排错/错误码 |
| [解决FastGPT更新后m3e容器接口返回422错误的问题](/zh/troubleshoot/fastgpt-m3e-container-422-error) | 排错/错误码 |
| [解决FastGPT本地可运行但Docker打包后依赖缺失问题](/zh/troubleshoot/fastgpt-docker-missing-deps) | 排错/错误码 |
| [解决FastGPT本地开发docker compose的权限报错问题](/zh/troubleshoot/fastgpt-local-dev-permission-error) | 排错/错误码 |
| [解决FastGPT本地正常但Docker打包部署后运行失败的问题](/zh/troubleshoot/fastgpt-docker-dependency-missing) | 排错/错误码 |
| [解决FastGPT本地部署修改Docker映射端口后登录报错问题](/zh/troubleshoot/fastgpt-docker-port-mapping-error) | 排错/错误码 |
| [解决FastGPT私有Docker部署内网无网络连接异常问题](/zh/troubleshoot/fastgpt-private-deployment-intranet-error) | 排错/错误码 |
| [解决FastGPT私有部署4.8.22版OneAPI容器持续重启问题](/zh/troubleshoot/fastgpt-oneapi-container-restart-troubleshoot) | 排错/错误码 |
| [解决FastGPT私有部署Docker打包时node:url模块构建失败问题](/zh/troubleshoot/fastgpt-docker-node-url-build-error) | 排错/错误码 |
| [解决FastGPT私有部署Docker构建pnpm安装依赖超时问题](/zh/troubleshoot/fastgpt-docker-pnpm-timeout-fix) | 排错/错误码 |
| [解决FastGPT私有部署Docker构建时tar文件模式未知报错](/zh/troubleshoot/fastgpt-docker-build-tar-error) | 排错/错误码 |
| [解决FastGPT私有部署Docker流程中Mongo启动失败问题](/zh/troubleshoot/fastgpt-private-docker-mongo-fail) | 排错/错误码 |
| [解决FastGPT私有部署Docker环境上传文件大小超限问题](/zh/troubleshoot/fastgpt-docker-upload-size-limit) | 排错/错误码 |
| [解决FastGPT私有部署PostgreSQL容器启动报错问题](/zh/troubleshoot/troubleshoot-fastgpt-pg-container) | 排错/错误码 |
| [解决FastGPT私有部署aiproxy容器GPT令牌编码器获取失败问题](/zh/troubleshoot/fastgpt-aiproxy-tiktoken-failure) | 排错/错误码 |
| [解决FastGPT私有部署aiproxy容器健康检查异常问题](/zh/troubleshoot/fastgpt-aiproxy-healthcheck-fix) | 排错/错误码 |
| [解决FastGPT私有部署docker build加载上下文超时问题](/zh/troubleshoot/fastgpt-private-deploy-docker-build-fix) | 排错/错误码 |
| [解决FastGPT私有部署docker build时canvas包编译报错问题](/zh/troubleshoot/fastgpt-docker-build-canvas-error) | 排错/错误码 |
| [解决FastGPT私有部署docker build时pnpm构建报错问题](/zh/troubleshoot/fastgpt-docker-build-pnpm-error) | 排错/错误码 |
| [解决FastGPT私有部署docker build时的文件缺失报错](/zh/troubleshoot/fastgpt-private-deploy-docker-build-error) | 排错/错误码 |
| [解决FastGPT私有部署docker compose场景下知识库链接读取无响应问题](/zh/troubleshoot/fastgpt-docker-compose-link-read-fix) | 排错/错误码 |
| [解决FastGPT私有部署docker打包后上传知识库内容报错问题](/zh/troubleshoot/fastgpt-private-deploy-upload-error) | 排错/错误码 |
| [解决FastGPT私有部署docker打包时apk依赖拉取失败问题](/zh/troubleshoot/fastgpt-docker-build-apk-failure) | 排错/错误码 |
| [解决FastGPT私有部署docker版本RT异常的排查与修复](/zh/troubleshoot/fastgpt-private-deploy-rt-fix) | 排错/错误码 |
| [解决FastGPT私有部署中Milvus容器周期性异常退出问题](/zh/troubleshoot/fastgpt-milvus-periodic-exit) | 排错/错误码 |
| [解决FastGPT私有部署中MySQL容器启动失败的问题](/zh/troubleshoot/fastgpt-mysql-start-fix) | 排错/错误码 |
| [解决FastGPT私有部署中OneAPI容器持续重启的问题](/zh/troubleshoot/fastgpt-oneapi-container-restart-fix) | 排错/错误码 |
| [解决FastGPT私有部署后容器重启模型需重新测试的问题](/zh/troubleshoot/fastgpt-private-deploy-restart-model-test) | 排错/错误码 |
| [解决FastGPT私有部署版Plugin容器启动失败的S3配置问题](/zh/troubleshoot/fastgpt-plugin-s3-startup-error) | 排错/错误码 |
| [解决FastGPT私有部署版单知识库测试卡死容器重启问题](/zh/troubleshoot/fastgpt-private-kb-freeze-restart) | 排错/错误码 |
| [解决FastGPT私有部署版本容器启动无日志无法启动问题](/zh/troubleshoot/fastgpt-private-deployment-log-start-failure) | 排错/错误码 |
| [解决FastGPT私有部署环境下docker-compose启动失败问题](/zh/troubleshoot/fastgpt-private-deploy-docker-up-fail) | 排错/错误码 |
| [解决FastGPT私有部署编译Dockerfile无法通过的问题](/zh/troubleshoot/fastgpt-private-docker-build-fail) | 排错/错误码 |
| [解决FastGPT私有部署过程中出现的docker build failed to solve报错](/zh/glossary/fastgpt-docker-build-failed-solve) | 术语速查 |
| [解决FastGPT通过Docker Compose部署后接入LLM出现连接错误的问题](/zh/troubleshoot/fastgpt-docker-llm-connection-error) | 排错/错误码 |
| [解决FastGPT通过docker compose启动时config.json挂载失败的问题](/zh/troubleshoot/fastgpt-docker-compose-config-mount-fix) | 排错/错误码 |
| [解决FastGPT部署后OneAPI容器反复重启无法访问问题](/zh/troubleshoot/fastgpt-oneapi-restart-troubleshooting) | 排错/错误码 |
| [解决FastGPT部署后openapi容器出现panic赋值报错的问题](/zh/troubleshoot/fastgpt-openapi-panic-error) | 排错/错误码 |
| [解决FastGPT部署后pg、aiproxy容器启动失败反复重启问题](/zh/troubleshoot/fastgpt-container-restart-fix) | 排错/错误码 |
| [解决FastGPT部署时OceanBase容器健康检查失败的问题](/zh/troubleshoot/fastgpt-oceanbase-health-check-failure) | 排错/错误码 |
| [解决FastGPT配套M3E模型API容器启动异常问题](/zh/troubleshoot/fastgpt-m3e-api-start-error) | 排错/错误码 |
| [解决FastGPT非Host模式Docker部署数据库连接失败问题](/zh/troubleshoot/fastgpt-nonhost-docker-db-fix) | 排错/错误码 |
| [解决Helm部署FastGPT缺失pluginTemplates目录导致主容器退出问题](/zh/troubleshoot/fastgpt-helm-missing-plugintemplates) | 排错/错误码 |
| [解决K8s部署FastGPT时Ingress无法访问内部网络地址问题](/zh/troubleshoot/fastgpt-k8s-ingress-network-fix) | 排错/错误码 |
| [解决Linux无Docker用pnpm部署FastGPT的端口修改与启动报错问题](/zh/troubleshoot/fastgpt-pnpm-nodocker-port-fix) | 排错/错误码 |
| [解决Mac Mini M4部署FastGPT时PostgreSQL容器反复启动报错问题](/zh/troubleshoot/fastgpt-mac-postgres-startup-error) | 排错/错误码 |
| [解决MacOS环境下FastGPT Docker部署的数据库报错问题](/zh/troubleshoot/fastgpt-macos-docker-db-errors) | 排错/错误码 |
| [解决Ubuntu Docker部署FastGPT后知识库操作触发404报错问题](/zh/troubleshoot/fastgpt-docker-ubuntu-404-troubleshooting) | 排错/错误码 |
| [解决WSL2+Docker环境下FastGPT源码连接容器数据库异常](/zh/troubleshoot/fastgpt-wsl2-docker-db-config) | 排错/错误码 |
| [解决m3e-large-api Docker部署加载模型失败的问题](/zh/troubleshoot/m3e-large-api-docker-model-error) | 排错/错误码 |
| [解决本地FastGPT前端连接Docker内数据库失败问题](/zh/troubleshoot/fastgpt-local-db-docker-connect-fix) | 排错/错误码 |
| [解决阿里云PAI平台非Docker部署FastGPT的相关问题](/zh/troubleshoot/alibaba-pai-non-docker-fastgpt-troubleshooting) | 排错/错误码 |
| [详细介绍FastGPT SSO服务的docker-compose具体部署配置方法](/zh/glossary/fastgpt-sso-docker-deploy) | 术语速查 |
| [说明FastGPT中Sealos相关的开源协议与依赖源配置](/zh/glossary/fastgpt-sealos-config-protocol) | 术语速查 |
| [说明FastGPT无需Docker环境的部署相关问题](/zh/glossary/fastgpt-dockerless-deployment) | 术语速查 |
| [说明FastGPT自定义模型的Docker部署与文件配置](/zh/glossary/fastgpt-custom-model-docker-deploy) | 术语速查 |
| [说明FastGPT通过Helm Chart部署的相关配置与操作方法](/zh/glossary/fastgpt-helm-chart-install) | 术语速查 |
| [通过Docker安装Ollama并配置FastGPT可正常访问的服务](/zh/deploy/deploy-ollama-docker-fastgpt) | 部署场景 |
| [配置FastGPT Compose部署以使用外部数据库并移除内置应用](/zh/troubleshoot/fastgpt-compose-remove-builtin-services) | 排错/错误码 |
| [配置FastGPT使用Sealos Devbox作为Agent沙盒的相关环境变量](/zh/reference/fastgpt-sealos-devbox-env-config) | 技术速查 |
| [配置FastGPT集成Sealos Devbox沙盒服务的详细配置工作](/zh/deploy/fastgpt-sealos-devbox-config) | 部署场景 |
| [配置Sealos Devbox沙盒为FastGPT启用Agent Sandbox服务](/zh/deploy/sealos-devbox-fastgpt-sandbox-config) | 部署场景 |

## 这份清单的适用范围

清单中的条目来自可公开复现的情形，按症状归组。以下情形需要另行确认：

- 同一症状由多个原因共同导致时，需按上述顺序逐项排除
- 商业版特有配置项引发的同类症状
- 与具体基础设施环境耦合、无法在标准部署下复现的情形

## 继续阅读

- [FastGPT 部署与环境问题全景](/zh/guide/deployment-issue-landscape)
- [FastGPT 版本升级 问题清单](/zh/guide/version-upgrade-issues)
- [FastGPT 数据库与对象存储 问题清单](/zh/guide/database-storage-issues)

## 参考资料

- [FastGPT Docker Compose 部署](https://doc.fastgpt.cn/zh-CN/self-host/deploy/docker)
- [FastGPT 环境变量](https://doc.fastgpt.cn/zh-CN/self-host/config/env)

## 问题仍未定位时

上述条目覆盖的是可依据公开信息复现与排查的情形。若问题涉及具体部署环境的配置细节、或需要结合运行日志逐项确认，可通过商务咨询获取部署阶段的技术支持；云服务形态可直接开始使用，不需要处理部署环节的环境依赖。

- [商务咨询](/zh/contact)： 获取私有部署与升级阶段的技术支持
- [立即开始](/zh/start)： 使用云服务形态，跳过环境准备
- [定价](/zh/price)： 对比云服务与私有部署两种形态的适用范围
