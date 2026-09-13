---
title: FastGPT V4.14.5.1版本升级内容与操作指引
slug: /zh/deploy/upgrade-v4-14-5-1
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41451
source_type: 官方文档
---

# FastGPT V4.14.5.1版本升级内容与操作指引

## 这个版本改了什么
本版本新增Markdown表格导出csv功能。优化内容包括工作流触摸板移动时遇输入框将被强制阻拦，工作流粘贴节点可按鼠标位置精确粘贴，移除请求LLM时多余系统字段以避免部分模型接口报错，以及使用path.extname从URL获取文件扩展名。修复问题包括系统工具工具集设置系统密钥后子工具无法读取密钥，密码类型全局变量必填规则校验错误，时间类型全局变量选择月份被遮挡，手动复制弹窗换行丢失，未传入文件上传类型变量时对话接口报错。

## 升级前要确认的事
升级前需确认各组件镜像更新要求：FastGPT镜像需更新至tag v4.14.5.1，商业版镜像需更新至tag v4.14.5.1，fastgpt-plugin镜像需更新至tag v0.4.0；mcp_server、Sandbox、AIProxy、mongo无需更新。同时需准备环境变量中的rootkey以及FastGPT域名信息。

## 升级步骤（照做）
从任意终端执行以下HTTP请求，将{{rootkey}}替换为环境变量中的rootkey，将{{host}}替换为FastGPT域名：
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv41451' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
执行完成后完成系统工具的系统密钥配置迁移。

## 升级后怎么验证
升级完成后可通过以下方式验证：1. 打开Markdown表格，确认存在导出csv的功能；2. 测试工作流触摸板移动、粘贴节点操作是否符合优化后的规则；3. 配置系统工具工具集的系统密钥，确认子工具可正常读取密钥；4. 创建密码类型、时间类型的全局变量，验证必填校验与月份选择功能正常；5. 测试手动复制弹窗，确认换行未丢失；6. 发起未传入文件上传类型变量的对话请求，确认接口无报错。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41451)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
