---
title: FastGPT V4.8.1版本升级操作与注意事项
slug: /zh/deploy/fastgpt-v481-upgrade
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/481
source_type: 官方文档
---

# FastGPT V4.8.1版本升级操作与注意事项

## 升级前置说明
FastGPT V4.8.1版本升级需通过官方提供的初始化与脏数据清理脚本完成，由于过往版本集合名不规范，该版本涉及表名重置操作，存在数据冲突风险，需严格遵循前置准备与执行顺序。本次升级的核心操作依赖管理员权限的HTTP请求，需提前获取系统环境变量中的rootkey与FastGPT的访问域名。

## 正式升级操作步骤
1.  **执行初始化脚本**：在任意终端中发起POST请求，替换请求中的变量：将`{{rootkey}}`替换为系统环境变量内的rootkey，`{{host}}`替换为FastGPT的访问域名。执行命令如下：
    ```bash
    curl --location --request POST https://{{host}}/api/admin/initv481 \
    --header rootkey: {{rootkey}} \
    --header Content-Type: application/json
    ```
    注意：该初始化操作会重置表名，执行前必须确认`dataset.trainings`表无任何数据，且建议暂停所有正在运行的业务，避免出现数据冲突。
2.  **执行脏数据清理**：初始化完成后，可执行以下命令清理历史残留的脏数据：
    ```bash
    curl --location --request POST https://{{host}}/api/admin/clearInvalidData \
    --header rootkey: {{rootkey}} \
    --header Content-Type: application/json
    ```
    该步骤用于修复过往版本定时清理定时器的缺陷，手动补全未被自动清理的无效数据，仅需在初始化完成后执行一次。

## 版本更新细节
V4.8.1版本对Chat API接口进行了优化，新增了`event: updateVariables`事件，用于实现变量更新功能，使用该接口时需适配该新增事件的处理逻辑。如需查看完整升级说明，可点击官方链接跳转，也可在GitHub平台编辑该文档内容。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/481
