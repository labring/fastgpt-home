---
title: FastGPT系统插件本地调试的操作方法与边界规则
slug: /zh/reference/fastgpt-plugin-local-debug
page_type: 技术速查
source: https://doc.fastgpt.cn/plugin/system-tool-development
source_type: 官方文档小节
---

# FastGPT系统插件本地调试的操作方法与边界规则

## 结论
FastGPT插件本地调试可快速验证插件逻辑与配置schema，需通过官方CLI工具完成操作。本地调试无法完全模拟生产环境，上架官方插件前需完成端到端测试。

## 具体怎么做
1. 进入插件目录安装依赖：
```bash
cd packages/tools/my-tool
pnpm install
```
2. 查看插件和可调试工具信息：
```bash
pnpx @fastgpt-plugin/cli debug .
```
3. 执行单工具调试（传入输入与密钥）：
```bash
pnpx @fastgpt-plugin/cli debug . --run --input '{"query":"hello"}' --secrets '{"apiKey":"test"}'
```
4. 执行工具集中的指定子工具：
```bash
pnpx @fastgpt-plugin/cli debug . --run --tool search --input '{"query":"hello"}' --secrets '{"apiKey":"test"}'
```
5. 大体积参数使用文件传入：
```bash
pnpx @fastgpt-plugin/cli debug . --run --input-file input.json --secrets-file secrets.json --system-var-file system-var.json
```

## 注意事项
- ctx.invoke.uploadFile() 使用本地虚拟实现，默认输出到 .fastgpt-plugin-debug/uploads。
- 本地调试仅用于快速验证插件逻辑和配置schema。
- 本地调试无法模拟生产子进程池、真实Node.js IPC、网络环境、服务端超时和队列调度。
- 上架官方插件前仍需在测试环境中手动安装插件并完成端到端测试。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/plugin/system-tool-development)
