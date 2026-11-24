---
title: 查询FastGPT各组件及部署源的官方标准镜像地址
slug: /zh/reference/fastgpt-official-mirror-addresses
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/upgrade-intruction
source_type: 官方文档小节
---

# 查询FastGPT各组件及部署源的官方标准镜像地址

## 结论
FastGPT的官方镜像分为Git版和阿里云镜像源两类，覆盖主程序、插件、代码沙箱、MCP服务器及商业版等组件。所有镜像地址均来自官方标准配置，可直接用于部署或升级操作。

## 具体怎么做
1. 镜像命名格式：镜像地址 + 冒号 + 版本Tag，例如 `registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt:v4.6.1`
2. Git版官方镜像地址：
   - FastGPT主镜像: `ghcr.io/labring/fastgpt:latest`
   - Plugin 镜像: `ghcr.io/labring/fastgpt-plugin`
   - 代码沙箱镜像: `ghcr.io/labring/fastgpt-code-sandbox`
   - MCP SSE setver 镜像: `ghcr.io/labring/fastgpt-mcp_server`
   - 商业版镜像: `ghcr.io/c121914yu/fastgpt-pro:latest`
3. 阿里云官方镜像地址：
   - FastGPT主镜像: `registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt`
   - Plugin 镜像: `registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-plugin`
   - 代码沙箱镜像: `registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-code-sandbox`
   - MCP SSE setver 镜像: `registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-mcp_server`
   - 商业版镜像: `ghcr:registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-pro`

## 注意事项
1. 镜像的版本Tag需对应实际部署版本，具体版本Tag可查询Docker Hub或GitHub仓库获取。
2. 注意区分Git版与阿里云版的商业版镜像地址，避免配置错误。
3. 官方文档中“MCP SSE setver”为原文拼写，使用时需保持一致。
4. 阿里云商业版镜像地址包含前缀`ghcr:`，请勿遗漏或修改。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/upgrade-intruction)
