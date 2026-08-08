---
title: FastGPT V4.6版本升级操作与功能更新说明
slug: /zh/deploy/fastgpt-v46-upgrade-steps
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/46
source_type: 官方文档
---

# FastGPT V4.6版本升级操作与功能更新说明

### 升级前置说明
FastGPT V4.6版本新增团队管理功能，支持邀请其他用户参与资源管理，但该版本升级存在两个关键限制：升级后无法执行旧版本的升级脚本，且无法回退到之前的版本。在部署更新前，需将应用镜像更新至latest或v4.6版本；若使用商业版镜像，需更新至V0.2.1版本。同时，旧版config.json配置说明已不再维护，当前版本的配置需参考官方的模型配置方案和环境变量说明文档，商业镜像的配置文件也需更新为最新版本的参考文档。

### 升级操作步骤
1.  更新镜像与配置文件：将部署的应用镜像替换为指定版本，并同步更新配置文件至最新规范。
2.  执行初始化API：需发起两个HTTP POST请求，将`{{rootkey}}`替换为环境变量中的rootkey，`{{host}}`替换为部署的域名。
    第一个初始化请求：
    ```bash
    curl --location --request POST https://{{host}}/api/admin/initv46 \
    --header "rootkey: {{rootkey}}" \
    --header "Content-Type: application/json"
    ```
    第二个初始化请求：
    ```bash
    curl --location --request POST https://{{host}}/api/admin/initv46-2 \
    --header "rootkey: {{rootkey}}" \
    --header "Content-Type: application/json"
    ```
    初始化接口可能执行较慢，若返回超时无需处理，只需关注部署日志即可，需确保`initv46`执行成功后再执行`initv46-2`。本次初始化操作包含创建默认团队、初始化MongoDB所有资源的团队字段、初始化Pg数据库字段、初始化MongoDB数据等内容。
    若出现旧版本4.6的文件导入知识库数据无法显示的问题，可执行修复脚本：
    ```bash
    curl --location --request POST https://{{host}}/api/admin/initv46-fix \
    --header "rootkey: {{rootkey}}" \
    --header "Content-Type: application/json"
    ```

### 功能与修复说明
该版本新增多项核心功能：团队空间功能，支持多用户协作管理资源；多路向量功能，支持多个向量映射一组数据；TTS语音功能；支持知识库配置文本预处理模型；线上环境新增ReRank向量召回，可提高召回精度。同时优化了知识库导出功能，支持直接触发流下载，无需等待转码完成。另外修复了旧版4.6版本因缺少字段导致的文件导入知识库数据无法显示的问题，可通过上述修复脚本解决。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/46
