---
title: FastGPT插件的构建、检查与打包操作速查
slug: /zh/reference/fastgpt-plugin-build-check-pack
page_type: 技术速查
source: https://doc.fastgpt.cn/plugin/system-tool-development
source_type: 官方文档小节
---

# FastGPT插件的构建、检查与打包操作速查

## 结论
使用FastGPT官方提供的CLI工具，可以完成插件的构建、代码检查与打包流程。本地开发时可直接在插件根目录执行预设命令快速完成全流程操作，最终生成可用的打包产物。

## 具体怎么做
### 默认插件目录操作
1.  运行测试：`pnpm run test`
2.  执行构建：`pnpm run build`
3.  代码检查：`pnpx @fastgpt-plugin/cli check --entry . --output ./dist`
4.  完成打包：`pnpm run pack`

### 自定义目录操作
如需指定插件路径，可使用以下命令：
- 自定义构建：`pnpx @fastgpt-plugin/cli build --entry packages/tools/my-tool --output packages/tools/my-tool/dist --minify`
- 自定义代码检查：`pnpx @fastgpt-plugin/cli check --entry packages/tools/my-tool --output packages/tools/my-tool/dist`
- 自定义打包：`pnpx @fastgpt-plugin/cli pack --entry packages/tools/my-tool --dist ./dist --output packages/tools/my-tool/out`

合格的构建产物需包含：`dist/index.js`、`dist/manifest.json`、图标文件，可选包含`README.md`和`assets/**`目录。

## 注意事项
1.  打包后生成的`.pkg`文件是插件上传、安装和上架的唯一可用文件。
2.  必须确保构建产物包含要求的核心文件，遗漏会导致插件无法正常使用。
3.  自定义命令中的参数名（如`--entry`、`--output`、`--dist`）不可随意修改，需按实际路径填写对应参数值。
4.  `--minify`参数仅在自定义构建命令中支持，用于开启代码压缩。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/plugin/system-tool-development)
