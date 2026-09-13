---
title: FastGPT V4.15.0-beta1版本升级操作与变化说明
slug: /zh/deploy/upgrade-v4-15-0-beta1
page_type: 版本解读
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41501
source_type: 官方文档
---

# FastGPT V4.15.0-beta1版本升级操作与变化说明

## 这个版本改了什么
本版本更新各服务镜像tag：fastgpt-app、fastgpt-pro为v4.15.0-beta1，fastgpt-plugin为v0.6.2，aiproxy为v0.5.6。新增循环节点，弃用旧的批量执行；全局变量输入框支持输入object类型数据。工具调用模式开启虚拟机功能时，用户对话框上传的文件会直接注入虚拟机。第三方知识库接入钉钉知识库，该功能为beta版，存在富文本获取异常问题。增加文件解析、HTML转Markdown、文本切块worker pool，可通过环境变量调整pool数量。新增模型思考配置，S3支持配置CDN，Rerank支持配置defaultConfig。优化内容包括：增加父子节点选中互斥功能，解决同时选中父子节点时移动节点出现抖动的问题；调整文件注入messages位置，从system调整至user，便于命中缓存；非管理员/访客触发余额不足时的提示优化；无创建权限时隐藏模板功能；加强第三方知识库请求的SSRF防护；codex-sandbox加强AST检查，防止绕过安全检查；优化站点同步限流错误提示，避免重复提示；加强IP检测，避免伪造绕过；图片处理线程支持配置是否转化成base64发送给模型。修复内容包括：修复Agent v2模式下模型响应报错导致step重复执行的问题；修复知识库源文件预览和下载时文本类型响应缺少charset的问题。代码优化包括：重新调整代码结构，升级Next.js最新版，切换至Turbopack构建以提高构建速度；升级容器默认Node.js至24；优化Agent tool声明和运行，统一所有tool的声明和运行方式；文件上传内容从system prompt中放到user message中，提高cache命中率；服务端env加载全部使用@t3-oss/env-core，增加更多类型检查；其余服务采用集中导出env的方式进行环境变量使用；升级项目工程化工具链版本，包括ESLint、Prettier、textlint和lint-staged工具。

## 升级前要确认的事
需确认fastgpt-app和fastgpt-pro包含以下必须的环境变量，且两个服务的密钥需一致：AES256_SECRET_KEY、FILE_TOKEN_KEY、INVOKE_TOKEN_SECRET。本次升级增加环境变量检测，需重点检查是否漏填必须项。可按需添加可选环境变量，包括PARSE_FILE_WORKERS=10、PARSE_FILE_TIMEOUT_SECONDS=600、HTML_TO_MARKDOWN_WORKERS=10、TEXT_TO_CHUNKS_WORKERS=10、SYNC_INDEX=true、TRUSTED_PROXY_ENABLE=false、TRUSTED_PROXY_IPS=（空白或逗号分隔）。

## 升级步骤（照做）
1. 更新各服务镜像tag：fastgpt-app、fastgpt-pro使用v4.15.0-beta1，fastgpt-plugin使用v0.6.2，aiproxy使用v0.5.6。2. 配置环境变量，确保必须的三个环境变量已正确配置且两个服务一致，按需添加可选环境变量。3. 启动更新后的服务。

## 升级后怎么验证
可通过以下方式验证升级效果：检查循环节点功能是否可用，确认旧的批量执行已被弃用；测试全局变量输入框输入object类型数据是否正常；测试工具调用模式下开启虚拟机功能时，上传的文件是否正确注入虚拟机；测试第三方知识库接入钉钉知识库的功能（注意beta版存在富文本获取异常问题）；验证知识库源文件预览和下载时文本类型响应包含charset；测试Agent v2模式下模型响应报错时step是否不再重复执行；检查环境变量配置是否生效，如文件解析并发线程数等。

> 来源: [FastGPT 官方文档与源码](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41501)
