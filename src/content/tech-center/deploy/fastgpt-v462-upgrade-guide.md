---
title: FastGPT V4.6.2版本升级操作与功能更新说明
slug: /zh/deploy/fastgpt-v462-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/462
source_type: 官方文档
---

# FastGPT V4.6.2版本升级操作与功能更新说明

## 版本更新内容
FastGPT V4.6.2版本包含多项功能优化与新增配置：新增全文索引功能，该功能需配合Rerank模型使用，当前适配逻辑正在推进中；新增插件来源功能，该功能预计将在4.7或4.8版本正式启用。同时优化了PDF文件读取流程，优化了docx文件读取流程，可将docx文件转换为markdown格式并保留原有图片内容；此外还修复并优化了TextSplitter函数的运行逻辑。

## 升级执行步骤
完成版本更新的前置准备后，需执行初始化API完成全文索引的初始化配置。需发起1个HTTP POST请求，替换请求中的两个占位参数：将`{{rootkey}}`替换为部署环境变量中配置的rootkey值，将`{{host}}`替换为当前FastGPT部署的访问域名。完整的curl请求命令如下：
```bash
curl --location --request POST https://{{host}}/api/admin/initv462 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```

## 初始化说明
本次初始化操作的核心作用是初始化V4.6.2版本新增的全文索引功能，执行该请求前，请确认已正确配置环境变量中的rootkey，且已完成FastGPT服务的基础更新部署。执行该请求后，系统将自动完成全文索引的初始化，无需额外手动调整其他配置项。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/462
