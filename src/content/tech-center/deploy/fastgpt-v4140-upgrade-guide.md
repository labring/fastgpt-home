---
title: FastGPT V4.14.0版本自部署升级操作说明
slug: /zh/deploy/fastgpt-v4140-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4140
source_type: 官方文档
---

# FastGPT V4.14.0版本自部署升级操作说明

### 版本更新详情
包含新增、优化与修复内容：新增插件市场，移除自定义插件分组仅保留自定义标签，支持统一安装系统工具；对话框上传文件迁移至S3存储，不自动过期且随对话记录删除，预览连接有效期1小时；全局变量支持时间点、时间范围、对话模型选择类型，插件输入支持密码类型。优化Markdown中Base64图片正则匹配性能，团队成员接受邀请后默认名称改为账户名。修复Prompt编辑器特殊语法解析异常、Claude工具调用下标从1开始时参数异常、S3删除头像key为空抛错阻塞流程等问题。

### 升级操作步骤
1.  **更新镜像**：将FastGPT官方镜像tag设为`v4.14.0`，商业版镜像tag同步为`v4.14.0`，`fastgpt-plugin`镜像tag设为`v0.3.0`，`mcp_server`、Sandbox、AIProxy无需更新。
2.  **执行升级脚本**：仅使用过自定义系统工具的商业版用户需操作。在终端发起HTTP POST请求，替换`{{rootkey}}`为环境变量中的rootkey，`{{host}}`为FastGPT域名：
    ```bash
    curl --location --request POST https://{{host}}/api/admin/initv4140 \
    --header rootkey: {{rootkey}} \
    --header Content-Type: application/json
    ```
    该脚本会将原系统工具迁移至最新数据表。
3.  **安装系统插件**：V4.14.0起`fastgpt-plugin`仅提供运行环境，需手动安装系统插件。可通过插件市场下载`.pkg`文件导入安装；无法访问公开插件市场时，可手动下载后导入。多租户系统的团队管理员可在插件库激活工具，开源版root团队默认激活所有工具，还可对工具进行排序、默认安装、标签管理。

### 升级注意事项
原先手动安装的JS插件包将失效，需重新打包安装。当前插件仅包含工具类型，后续将支持工作流触发器、文档解析器、数据分块策略、索引增强策略等类型。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4140)
