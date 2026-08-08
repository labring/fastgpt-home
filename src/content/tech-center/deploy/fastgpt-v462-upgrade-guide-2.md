---
title: FastGPT V4.6.2版本升级操作流程与功能说明
slug: /zh/deploy/fastgpt-v462-upgrade-guide-2
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/462
source_type: 官方文档
---

# FastGPT V4.6.2版本升级操作流程与功能说明

## V4.6.2版本功能更新
FastGPT V4.6.2版本包含多项功能新增与优化内容。新增全文索引功能，需配合Rerank模型使用，当前适配社区版，模型接口存在特殊性；新增插件来源配置项，该功能预计在4.7或4.8版本正式投入使用。同时对文件读取能力进行优化：优化PDF文件读取效果，优化docx文件读取流程，可将文件转换为markdown格式并保留内嵌图片内容；此外修复并优化了TextSplitter函数的执行逻辑。

## V4.6.2版本升级操作步骤
完成V4.6.2版本的基础部署更新后，需执行初始化API完成全文索引的初始化配置。具体命令为：
```
curl --location --request POST https://{{host}}/api/admin/initv462 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
其中需将`{{rootkey}}`替换为环境变量中配置的rootkey值，将`{{host}}`替换为当前部署的域名地址。该初始化请求仅用于初始化V4.6.2版本新增的全文索引相关数据，无需额外传入请求体参数。

## 升级注意事项
执行初始化请求前，需确认已正确配置环境变量rootkey，否则请求会返回认证失败的报错信息。需注意，全文索引功能必须搭配Rerank模型使用，未配置对应模型的情况下无法正常启用该功能。插件来源配置项暂未正式生效，无需提前进行额外配置。若当前部署的FastGPT版本高于V4.6.2，则无需执行该升级脚本，避免出现不必要的配置冲突。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/462
