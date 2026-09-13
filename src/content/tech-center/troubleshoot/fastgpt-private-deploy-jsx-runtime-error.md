---
title: 解决FastGPT私有部署时react/jsx-runtime命名导出的报错问题
slug: /zh/troubleshoot/fastgpt-private-deploy-jsx-runtime-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/442
source_type: GitHub issue
---

# 解决FastGPT私有部署时react/jsx-runtime命名导出的报错问题

## 现象
部署FastGPT私有部署版本时，执行启动命令`node projects/app/server.js`后出现语法错误报错。具体报错信息如下：
```
✓ Ready in 214ms
⨯ file:///home/FastGPT/node_modules/.pnpm/registry.npmmirror.com+@chakra-ui+css-reset@2.3.0_@emotion+react@11.11.1_react@18.2.0/node_modules/@chakra-ui/css-reset/dist/chunk-B4LBJQ3X.mjs:5
import { jsx } from "react/jsx-runtime";
         ^^^
SyntaxError: Named export 'jsx' not found. The requested module 'react/jsx-runtime' is a CommonJS module, which may not support all module.exports as named exports.
CommonJS modules can always be imported via the default export, for example using:

import pkg from 'react/jsx-runtime';
const { jsx } = pkg;
```
当前使用的Node.js版本为v20.9.0，Next.js版本为14.0.0。

## 可能原因
该报错源于@chakra-ui/css-reset模块的代码逻辑，其尝试以命名导出的方式从react/jsx-runtime导入jsx函数。但在当前环境中，react/jsx-runtime属于CommonJS模块，无法直接通过命名导出的方式进行导入，因此触发了SyntaxError语法错误。

## 排查步骤
1. 确认当前使用的Node.js版本为v20.9.0，Next.js版本为14.0.0，与issue中提及的环境参数一致。
2. 根据报错信息定位到对应的文件路径，查看@chakra-ui/css-reset模块中导入react/jsx-runtime的代码内容。
3. 验证react/jsx-runtime模块的导出类型，确认其为CommonJS模块，无法直接使用命名导出方式导入。

## 解决与验证
解决该问题的方法是修改@chakra-ui/css-reset模块中的导入代码，将原代码`import { jsx } from "react/jsx-runtime";`替换为报错提示中的标准写法：`import pkg from 'react/jsx-runtime'; const { jsx } = pkg;`。
完成修改后，重新执行启动命令`node projects/app/server.js`，确认不再出现该SyntaxError报错，服务即可正常启动。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/442)
