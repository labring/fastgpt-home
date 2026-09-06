---
title: FastGPT系统插件开发完成后的提交验证检查指南
slug: /zh/model/fastgpt-plugin-submit-validation
page_type: 模型接入
source: https://doc.fastgpt.cn/zh-CN/plugin/system-tool-development
source_type: 官方文档
---

# FastGPT系统插件开发完成后的提交验证检查指南

该文档为FastGPT系统插件提交前的合规检查参考，覆盖代码规范、配置项、测试环节等多维度验证项，帮助开发人员快速完成插件提交前的准备工作，避免因遗漏项导致部署失败。

## 核心验证项清单
- 检查`index.ts`文件默认导出是否正确。
- 确认`manifest.pluginId`、`manifest.version`、中英文名称和描述信息完整。
- 确保工具集的`children[].id`字段稳定且无重复值。
- 验证`inputSchema`覆盖全部用户输入项，并配置必要的类型与范围约束。
- 核对`outputSchema`与handler函数的返回值保持一致。
- 检查`secretSchema`覆盖全部密钥配置项，敏感字段需设置`isSecret: true`。
- 处理外部API的成功、失败、空响应、超时及鉴权失败等各类场景。
- 确保错误信息可定位具体问题，且不会泄露密钥或敏感响应内容。
- 运行`pnpm run test`命令并通过测试，或明确标注无法测试的具体原因。
- 确认`build`、`check`、`pack`命令执行无报错。
- 检查`dist/manifest.json`文件中的图标与schema配置符合预期。
- 完成远程调试的测试环境真实调用，或明确说明无需远程调试的原因。
- 验证`.pkg`安装包可在测试环境中正常安装并完成真实调用。

## 验证执行要求
开发人员需按照上述清单逐一完成检查，对于未通过的验证项需优先修复问题，对于明确无需执行的检查项需标注具体原因，确保所有验证项符合要求后再提交插件。

> 来源: [FastGPT 官方文档与源码](https://doc.fastgpt.cn/zh-CN/plugin/system-tool-development)
