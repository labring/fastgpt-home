---
title: FastGPT V4.15.0-beta1版本升级与环境变量配置说明
slug: /zh/deploy/fastgpt-v4-15-beta1-upgrade-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41501
source_type: 官方文档
---

# FastGPT V4.15.0-beta1版本升级与环境变量配置说明

## 版本更新与环境变量说明
首先说明该版本的镜像更新内容：需将fastgpt-app、fastgpt-pro的镜像tag更新为v4.15.0-beta1，fastgpt-plugin更新为v0.6.2，aiproxy更新为v0.5.6。同时该版本新增了环境变量检测机制，需重点检查fastgpt-app和fastgpt-pro是否包含三个必填环境变量：AES256_SECRET_KEY、FILE_TOKEN_KEY、INVOKE_TOKEN_SECRET，且这三个变量在两个服务中需保持一致，其中INVOKE_TOKEN_SECRET长度至少为32位。此外该版本还调整了部分现有环境变量的格式，例如SYNC_INDEX需使用boolean字符串值（如true/false）替代原有的0和1。

## 可执行配置步骤
1.  更新各服务镜像标签：将fastgpt-app、fastgpt-pro的镜像tag设置为v4.15.0-beta1，fastgpt-plugin设置为v0.6.2，aiproxy设置为v0.5.6。
2.  配置必填环境变量，示例如下：
```env
AES256_SECRET_KEY=your-custom-secret-key
FILE_TOKEN_KEY=your-file-token-key
INVOKE_TOKEN_SECRET=your-at-least-32-characters-secret
```
3.  按需配置可选环境变量，例如调整文件解析相关并发数与超时时间：
```env
PARSE_FILE_WORKERS=10
PARSE_FILE_TIMEOUT_SECONDS=600
HTML_TO_MARKDOWN_WORKERS=10
TEXT_TO_CHUNKS_WORKERS=10
SYNC_INDEX=true
TRUSTED_PROXY_ENABLE=false
```

## 新增、优化与修复内容
该版本新增循环节点并弃用旧的批量执行功能，全局变量输入框支持输入object类型数据，工具调用开启虚拟机时用户上传的文件会直接注入虚拟机，新增第三方知识库钉钉接入（beta版，存在富文本获取异常问题），同时增加文件解析、HTML转Markdown、文本切块的worker pool，可通过环境变量调整池数量，还新增模型思考配置、S3 CDN配置以及Rerank defaultConfig配置。优化内容包括父子节点选中互斥功能、调整文件注入messages位置以提升缓存命中率、优化余额不足提示、隐藏无创建权限的模板功能、加强SSRF与IP检测防护等。修复了Agent v2模式下模型响应报错导致step重复执行的问题，以及知识库源文件预览和下载时文本类型响应缺少charset的问题。此外还进行了代码结构调整、构建工具升级等优化。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41501
