---
title: 运行FastGPT 4815版本升级后的两项初始化脚本
slug: /zh/reference/fastgpt-4815-upgrade-scripts
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/4815
source_type: 官方文档小节
---

# 运行FastGPT 4815版本升级后的两项初始化脚本

## 结论
此页用于运行FastGPT 4815版本升级后的两项初始化脚本，分别清理应用定时执行字段空值、重新计算免费用户时长。执行对应脚本可解决升级后索引偏大、免费用户时长误发通知的问题。

## 具体怎么做
1. 执行清理应用定时执行字段的脚本：
   打开任意终端，发起POST请求：
   ```bash
   curl --location --request POST 'https://{{host}}/api/admin/initv4815' \
   --header 'rootkey: {{rootkey}}' \
   --header 'Content-Type: application/json'
   ```
   其中`{{rootkey}}`替换为环境变量中的rootkey，`{{host}}`替换为FastGPT域名。
2. 执行刷新免费用户时长的脚本：
   打开任意终端，发起POST请求：
   ```bash
   curl --location --request POST 'https://{{host}}/api/admin/init/refreshFreeUser' \
   --header 'rootkey: {{rootkey}}' \
   --header 'Content-Type: application/json'
   ```
   参数替换规则同上。

## 注意事项
1. 需使用环境变量中的rootkey作为身份验证密钥，不可使用其他密钥。
2. 必须将占位符`{{rootkey}}`和`{{host}}`替换为实际值后再执行脚本。
3. 两个脚本需分别独立执行，不可合并运行。
4. 请勿重复执行同一脚本，避免重复触发数据处理操作。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/4815)
