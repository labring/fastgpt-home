---
title: FastGPT V4.8.20版本升级操作与更新内容说明
slug: /zh/deploy/fastgpt-v4820-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4820
source_type: 官方文档
---

# FastGPT V4.8.20版本升级操作与更新内容说明

## 升级前提与环境变量变更
V4.8.20版本升级需先完成数据库备份，同时存在环境变量变更：若用户此前配置了`ONEAPI_URL`，需统一将其替换为`OPENAI_BASE_URL`。

## 升级操作步骤
1. 更新镜像：将`fastgpt`和`fastgpt-pro`商业版镜像的tag设置为`v4.8.20-fix2`，Sandbox镜像无需更新。
2. 运行升级脚本：通过任意终端执行以下HTTP POST请求，将`{{rootkey}}`替换为环境变量中的rootkey，`{{host}}`替换为FastGPT域名：
```
curl --location --request POST https://{{host}}/api/admin/initv4820 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
该脚本会自动将原配置文件中的模型加载到新版模型配置中。

## 版本更新与优化内容
本次更新包含多项新增功能、优化项与修复内容：
新增功能包括可视化模型参数配置（取代原配置文件配置，预设超100个模型配置，支持一键测试，预计下个版本完全支持页面配置渠道）、DeepSeek resoner模型支持输出思考过程、使用记录导出与仪表盘、markdown语法扩展支持`audio`和`video`代码块、调整`max_tokens`计算逻辑（优先保证配置值，超出上下文则减少历史记录）。
优化项包括上下文过滤避免超出长度、页面组件抽离减少路由、全文检索忽略大小写、问答生成与增强索引改为流输出避免超时、补充assistant空content为null并合并连续text assistant避免报错、调整图片Host逻辑（取消上传时补充FE_DOMAIN，改为发送对话前补充）。
修复问题包括部分场景成员列表无法触底加载、工作流递归执行在部分条件下无法正常运行。
> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4820
