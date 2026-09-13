---
title: FastGPT插件开发提交前验证事项说明
slug: /zh/glossary/fastgpt-plugin-dev-validation
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/plugin/system-tool-development
source_type: 官方文档
---

# FastGPT插件开发提交前验证事项说明

## 一句话定义
FastGPT插件开发提交前需完成的一系列合规检查项，用于确保插件符合平台规范且功能正常。
## 在FastGPT里怎么用
插件开发完成后，需对照验证清单逐一确认。具体需确认的内容包括：index.ts默认导出正确；manifest.pluginId、manifest.version、中英文名称和描述完整；工具集的children[].id稳定且无重复；inputSchema覆盖所有用户输入并设置必要类型和范围约束；outputSchema与handler返回值一致；secretSchema覆盖全部密钥配置，敏感字段设置isSecret: true；外部API的成功、失败、空响应、超时和鉴权失败都有处理；错误信息可定位问题且不泄露密钥或敏感响应；pnpm run test通过或说明无法测试原因；build、check、pack通过；dist/manifest.json中图标和schema符合预期；使用远程调试完成测试环境真实调用或说明无需远程调试的原因；.pkg能在测试环境中安装并完成真实调用。此外，配置反向代理时，建议只暴露Gateway WebSocket入口，对Gateway internal HTTP API保持内网访问，Nginx示例配置为location /connection-gateway/v1 { proxy_pass http://connection-gateway:3001; proxy_http_version 1.1; proxy_set_header Upgrade $http_upgrade; proxy_set_header Connection "upgrade"; proxy_set_header Host $host; proxy_read_timeout 3600s; }，且/internal/*、/metrics和Gateway HTTP端口不应直接暴露到公网。
## 容易搞错的地方
容易遗漏对secretSchema的敏感字段设置isSecret: true；容易误将Gateway internal HTTP API暴露到公网；容易忽略对外部API超时、鉴权失败等异常场景的处理；可能未确认pnpm run test、build等命令的执行结果。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/plugin/system-tool-development)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
