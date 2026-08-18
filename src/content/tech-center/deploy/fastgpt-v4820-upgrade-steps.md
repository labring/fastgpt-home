---
title: FastGPT V4.8.20版本升级与配置变更说明
slug: /zh/deploy/fastgpt-v4820-upgrade-steps
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4820
source_type: 官方文档
---

# FastGPT V4.8.20版本升级与配置变更说明

## 版本升级前置说明
FastGPT V4.8.20版本包含环境变量变更与专属升级脚本，升级需遵循官方流程，前置需先完成数据库备份，再依次执行配置更新、镜像升级与脚本运行操作。该版本对模型配置逻辑、功能实现均有调整，升级后需同步适配新版配置规则。

## 标准升级操作步骤
1. 完成数据库备份：升级前需执行数据库备份操作，避免数据丢失。
2. 更新环境变量：若此前配置过`ONEAPI_URL`，需统一替换为`OPENAI_BASE_URL`。
3. 更新镜像：将`fastgpt`与`fastgpt-pro`商业版镜像的tag更新为`v4.8.20-fix2`；`Sandbox`镜像无需执行更新。
4. 运行升级脚本：在任意终端执行以下curl命令，将`{{rootkey}}`替换为环境变量中的rootkey值，`{{host}}`替换为FastGPT的访问域名：
```bash
curl --location --request POST https://{{host}}/api/admin/initv4820 \
--header "rootkey": {{rootkey}} \
--header "Content-Type": application/json
```
脚本将自动将原配置文件中的模型加载至新版模型配置体系中。

## 版本新增与优化修复
该版本新增多项功能与优化项：新增可视化模型参数配置，可替代原配置文件的模型配置方式，预设超100个模型配置且支持一键测试；新增DeepSeek resoner模型的思考过程输出；新增使用记录导出与仪表盘功能；新增markdown音视频代码块（`audio`与`video`）支持；调整`max_tokens`计算逻辑，优先保证配置值，超出上下文时自动缩减历史记录。同时优化了上下文过滤、页面组件抽离、全文检索大小写忽略、问答生成与增强索引的流输出逻辑，自动给assistant空content补充null并合并连续的text assistant内容避免模型报错；调整图片Host，取消上传时补充`FE_DOMAIN`，改为发送对话前补充，避免替换域名后原图片失效。此外修复了部分场景成员列表无法触底加载、工作流递归执行异常等问题。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4820)
