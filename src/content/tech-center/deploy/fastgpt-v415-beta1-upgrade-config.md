---
title: FastGPT V4.15.0-beta1版本升级与环境变量配置说明
slug: /zh/deploy/fastgpt-v415-beta1-upgrade-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41501
source_type: 官方文档
---

# FastGPT V4.15.0-beta1版本升级与环境变量配置说明

**版本更新与镜像调整**
本版本针对FastGPT核心服务镜像进行了统一更新：fastgpt-app、fastgpt-pro的镜像tag调整为v4.15.0-beta1，fastgpt-plugin镜像tag改为v0.6.2，aiproxy镜像tag调整为v0.5.6。同时对环境变量体系进行了多处调整与新增，例如将SYNC_INDEX从原0/1的数值格式改为布尔字符串格式，新增文件解析并发数、HTML转Markdown并发数、文本切块并发数等worker池配置参数，以及可信反向代理客户端IP校验相关的配置项。

**必填环境变量检查步骤**
本次升级新增了环境变量检测机制，需重点检查fastgpt-app和fastgpt-pro是否包含以下必填密钥类环境变量，且两个服务的对应参数值必须保持一致：`AES256_SECRET_KEY`（密钥加密密钥）、`FILE_TOKEN_KEY`（文件token密钥）、`INVOKE_TOKEN_SECRET`（Invoke反向调用JWT密钥，该参数长度至少需32位）。此外可按需配置可选环境变量，如文件解析并发数`PARSE_FILE_WORKERS`（默认值10）、文件解析超时时间`PARSE_FILE_TIMEOUT_SECONDS`（默认600秒）、HTML_TO_MARKDOWN_WORKERS（默认值10）、TEXT_TO_CHUNKS_WORKERS（默认值10），以及可信反向代理相关的`TRUSTED_PROXY_ENABLE`和`TRUSTED_PROXY_IPS`参数。

**功能优化与使用边界**
本版本新增循环节点功能并弃用旧的批量执行功能，全局变量输入框支持输入object类型数据，工具调用开启虚拟机功能时，用户对话框上传的文件会直接注入到虚拟机中，同时新增第三方知识库钉钉接入（beta版，存在富文本获取异常问题）。优化内容包括父子节点选中互斥功能，解决了同时选中父子节点时移动节点出现抖动的问题；将文件注入的messages位置从system调整至user，提升缓存命中率；优化非管理员/访客触发余额不足时的提示内容，无创建权限时隐藏模板功能，加强第三方知识库请求的SSRF防护，优化codex-sandbox的AST检查以防止绕过安全检测，调整站点同步限流的错误提示避免重复弹出，加强IP检测防止伪造绕过，同时支持配置图片处理线程是否转换为base64发送给模型。修复了Agent v2模式下模型响应报错导致step重复执行、知识库源文件预览和下载时文本类型响应缺少charset的问题。代码层面重新调整了项目结构，升级Next.js至最新版并切换至Turbopack构建以提升构建速度，将容器默认Node.js版本升级至24，统一了Agent tool的声明和运行逻辑，将文件上传内容从system prompt移至user message以提升cache命中率，服务端env加载全部使用@t3-oss/env-core以增加类型检查，同时升级了项目工程化工具链版本。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41501)
