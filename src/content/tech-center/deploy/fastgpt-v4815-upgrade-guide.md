---
title: FastGPT V4.8.15版本升级操作及更新内容说明
slug: /zh/deploy/fastgpt-v4815-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4815
source_type: 官方文档
---

# FastGPT V4.8.15版本升级操作及更新内容说明

## 版本更新概览
V4.8.15是FastGPT带升级脚本的版本，本次更新包含多项新增功能、优化项与bug修复。新增功能包括API知识库（外部文件库将被弃用）、工具箱页面、Markdown内HTML代码渲染支持、自定义系统级文件解析服务、集合参数直接调整无需重新导入，以及商业版后台侧边栏跳转链接配置能力。同时优化了base64图片截取、i18n cookie判断、字符串变量替换等逻辑，修复了分享链接点赞鉴权、工作流编辑记录存储等多个问题。

## 升级操作步骤
首先更新对应镜像：FastGPT社区版镜像tag为`v4.8.15-fix3`，商业版`fastgpt-pro`镜像tag为`v4.8.15`，Sandbox镜像可选择不更新。随后执行以下两个升级脚本请求：
1.  重置应用定时执行字段：在任意终端发起POST请求，替换`{{rootkey}}`为环境变量中的rootkey，`{{host}}`为FastGPT域名：
    ```bash
    curl --location --request POST https://{{host}}/api/admin/initv4815 \
    --header rootkey: {{rootkey}} \
    --header Content-Type: application/json
    ```
    该请求会将应用定时执行字段的null值移除，减少索引大小。
2.  重新计算免费用户时长：同样在任意终端发起POST请求，替换对应参数：
    ```bash
    curl --location --request POST https://{{host}}/api/admin/init/refreshFreeUser \
    --header rootkey: {{rootkey}} \
    --header Content-Type: application/json
    ```
    该请求用于修复此前版本升级未重新计算免费用户时长导致的误发通知问题。

## 升级注意事项
本次更新后，外部文件库将逐步被API知识库替代，建议尽快完成相关资源迁移。此外，全局变量默认值将在API调用中生效，自定义变量也支持配置默认值，可根据业务需求调整相关配置。工作流相关修复包括移除本地存储、新增异常离开自动保存，以及修复$开头字符串无法替换的问题。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4815)
