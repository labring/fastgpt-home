---
title: FastGPT V4.14.5.1版本自部署升级操作说明
slug: /zh/deploy/fastgpt-41451-self-upgrade
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41451
source_type: 官方文档
---

# FastGPT V4.14.5.1版本自部署升级操作说明

## 版本升级概述
本页面为FastGPT 4.14.x分支下V4.14.5.1版本的自部署升级指南，适用于已部署FastGPT的技术人员进行版本更新操作。该版本包含功能优化、问题修复以及新增特性，需按照指定步骤完成镜像更新与脚本执行。

## 升级操作步骤
### 1. 更新镜像
需更新的镜像及对应版本如下：
- FastGPT 官方镜像tag：`v4.14.5.1`
- FastGPT 商业版镜像tag：`v4.14.5.1`
- fastgpt-plugin 镜像tag：`v0.4.0`
其余组件mcp_server、Sandbox、AIProxy、mongo无需执行更新操作。

### 2. 执行升级脚本
从任意终端发起HTTP POST请求，替换命令中的占位符后执行：
```bash
curl --location --request POST https://{{host}}/api/admin/initv41451 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
其中`{{host}}`需替换为FastGPT的域名，`{{rootkey}}`需替换为环境变量中配置的rootkey值。

## 版本更新详情
### 新增内容
支持Markdown表格导出为CSV格式。
### 优化内容
1. 工作流触摸板移动时，遇到输入框后会被强制阻拦
2. 工作流粘贴节点可精确按鼠标位置粘贴
3. 移除请求LLM时多余的系统字段，避免部分模型接口报错
4. 使用`path.extname`从URL获取文件扩展名
### 修复内容
1. 系统工具工具集设置系统密钥后，子工具无法读取配置的系统密钥
2. 密码类型的全局变量，必填规则校验错误
3. 时间类型的全局变量，选择月份被遮挡
4. 手动复制弹窗，换行丢失
5. 未传入文件上传类型变量时，对话接口报错

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41451)
