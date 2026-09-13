---
title: FastGPT私有部署4.14.22版本插件导入失败的排障方法
slug: /zh/troubleshoot/fastgpt-private-deploy-plugin-import-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/7601
source_type: GitHub issue
---

# FastGPT私有部署4.14.22版本插件导入失败的排障方法

## 现象
本地部署FastGPT 4.14.22版本时，从https://v2.marketplace.fastgpt.cn下载的插件导入失败，报错信息为`Cannot find package '@fastgpt-plugin/sdk-factory' imported from /tmp/fastgpt-plugin/tools/35db532d78ebc494/index.js`；从https://marketplace.fastgpt.cn下载的插件可正常导入，且同一插件在两个市场的下载大小存在差异。

## 可能原因
目前无明确结论，相关线索为不同插件市场的插件包存在差异，且导入失败提示缺少@fastgpt-plugin/sdk-factory依赖包，需按实际部署环境进一步排查。

## 排查步骤
1. 确认当前配置的插件市场地址，区分https://marketplace.fastgpt.cn与https://v2.marketplace.fastgpt.cn。
2. 对比同一插件在两个市场的下载大小，确认插件包的完整性。
3. 查看插件导入失败时的日志，核对是否出现`Cannot find package '@fastgpt-plugin/sdk-factory' imported from /tmp/fastgpt-plugin/tools/35db532d78ebc494/index.js`的报错信息。

## 解决与验证
目前无公开的标准解决方案，需基于排查结果调整。若需临时恢复正常插件导入，可切换至https://marketplace.fastgpt.cn下载插件；若需使用v2插件市场，需按实际环境确认适配方式。

> 来源: [FastGPT GitHub issue #7601](https://github.com/labring/FastGPT/issues/7601)
