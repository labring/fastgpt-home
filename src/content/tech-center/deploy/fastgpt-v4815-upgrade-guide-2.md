---
title: FastGPT V4.8.15版本升级操作与更新内容说明
slug: /zh/deploy/fastgpt-v4815-upgrade-guide-2
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4815
source_type: 官方文档
---

# FastGPT V4.8.15版本升级操作与更新内容说明

## 版本更新概览
V4.8.15是FastGPT的带升级脚本版本，本次更新包含多项新功能、优化项与bug修复。新增功能包括API知识库（外部文件库将被弃用）、工具箱页面、Markdown中HTML代码渲染支持、自定义系统级文件解析服务、集合参数直接调整功能，以及商业版后台侧边栏跳转链接配置。同时优化了base64图片截取、i18n cookie判断、Markdown文本分割等多项逻辑，修复了分享链接点赞鉴权、工作流编辑记录存储等多个问题。

## 升级操作步骤
完成镜像更新后，需执行两个HTTP请求完成升级：
1.  重置应用定时执行字段，移除null值以减小索引大小：
    ```bash
    curl --location --request POST https://{{host}}/api/admin/initv4815 \
    --header rootkey: {{rootkey}} \
    --header Content-Type: application/json
    ```
    其中`{{rootkey}}`需替换为环境变量中的rootkey，`{{host}}`替换为FastGPT的域名。
2.  重新计算免费版用户使用时长，修复此前升级未重新计算导致的误发通知问题：
    ```bash
    curl --location --request POST https://{{host}}/api/admin/init/refreshFreeUser \
    --header rootkey: {{rootkey}} \
    --header Content-Type: application/json
    ```
    注意Sandbox镜像无需更新，官方镜像tag分别为`fastgpt:v4.8.15-fix3`与`fastgpt-pro:v4.8.15`。

## 使用注意事项
使用过程中需注意以下边界与易错点：Markdown中的HTML代码仅可在预览模式下展示，会自动限制script脚本执行；集合调整参数无需删除后重新导入，但需确保操作权限合规；API知识库将替代外部文件库，建议尽快完成迁移；升级操作需使用rootkey权限，请勿泄露该密钥以避免未授权操作。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4815
