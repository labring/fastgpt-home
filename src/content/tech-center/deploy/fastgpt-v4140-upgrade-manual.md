---
title: FastGPT V4.14.0版本升级操作与功能变更说明
slug: /zh/deploy/fastgpt-v4140-upgrade-manual
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4140
source_type: 官方文档
---

# FastGPT V4.14.0版本升级操作与功能变更说明

## 版本核心变更概述
FastGPT V4.14.0版本对插件系统、文件存储、变量配置等模块进行了更新。本次版本移除了自定义插件分组，仅保留自定义标签，新增插件市场支持统一安装系统工具；对话框上传文件迁移至S3存储，不再自动过期，删除对话记录时同步清理文件，且预览链接有效期调整为1小时，安全性提升；全局变量新增时间点、时间范围、对话模型选择类型，插件输入支持密码类型。此外，从V4.14.0开始，fastgpt-plugin镜像仅提供运行环境，不再预装系统插件，需手动安装。

## 正式升级操作步骤
1.  **更新镜像**：将FastGPT官方镜像tag更新为`v4.14.0`，商业版镜像同步更新为`v4.14.0`，fastgpt-plugin镜像tag更新为`v0.3.0`，mcp_server、Sandbox、AIProxy无需执行更新操作。
2.  **执行升级脚本**：仅使用过自定义系统工具的商业版用户需执行此步骤。在任意终端发起HTTP POST请求，替换`{{rootkey}}`为环境变量中的rootkey，`{{host}}`为FastGPT域名：
    ```bash
    curl --location --request POST https://{{host}}/api/admin/initv4140 \
    --header rootkey: {{rootkey}} \
    --header Content-Type: application/json
    ```
    该请求会将原系统工具迁移至最新的数据表中。
3.  **安装系统插件**：手动安装系统插件，可通过插件市场默认访问公开的FastGPT Marketplace获取安装包；若无法访问市场，可先手动下载`.pkg`文件，再通过文件导入方式安装。多租户系统的团队管理员可在插件库激活对应工具，开源版的root团队默认激活所有系统工具，同时支持对工具进行排序、设置默认安装、管理标签等操作。

## 注意事项与优化修复
本次版本需注意，原先手动安装的js插件包将失效，需重新打包安装。插件市场后续将支持工作流触发器、数据源解析方式、数据分块、索引增强策略等更多插件类型。本次优化包括提升Markdown中Base64图片正则匹配性能，调整团队成员接受邀请后的默认成员名为成员账户名。修复的问题包括：Prompt编辑器特殊语法无法正确解析、Claude工具调用下标从1开始时参数异常、S3删除头像时key为空导致流程阻塞、工作流前置IO变更时依赖未及时刷新、导出对话日志缺少反馈记录、工作流欢迎语输入时光标偏移、存在交互节点和连续批量执行时工作流逻辑错误、Redo操作后编辑记录无法推送快照、HTTP自定义输入丢失等。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4140)
