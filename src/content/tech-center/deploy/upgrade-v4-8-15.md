---
title: FastGPT V4.8.15版本升级说明与操作指南
slug: /zh/deploy/upgrade-v4-8-15
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4815
source_type: 官方文档
---

# FastGPT V4.8.15版本升级说明与操作指南

## 这个版本改了什么
新增API知识库，外部文件库将被弃用；新增工具箱页面，商业版后台可便捷配置系统插件与自定义分类；支持Markdown中HTML代码渲染，可选择预览模式并限制脚本仅做展示；新增自定义系统级文件解析服务；支持集合直接调整参数无需删除后导入；商业版后台支持配置侧边栏跳转链接。优化内容包括base64图片截取判断、i18n cookie判断、Markdown文本分割仅含标题无内容的情况、字符串变量替换逻辑、全局变量默认值在API生效且自定义变量支持默认值、HTTP Body的JSON解析处理、定时执行增加运行日志与重试机制。修复内容包括分享链接点赞鉴权、对话页面切换自动执行应用时的误触发、语言播放鉴权、插件应用知识库引用上限、工作流编辑记录存储、工作流特殊变量替换等问题。

## 升级前要确认的事
确认当前部署的FastGPT版本低于V4.8.15；准备好环境变量中的rootkey与FastGPT域名；更新fastgpt镜像为v4.8.15-fix3，更新fastgpt-pro商业版镜像为v4.8.15，Sandbox镜像无需更新。

## 升级步骤（照做）
从任意终端发起第一个HTTP请求，将{{rootkey}}替换为环境变量中的rootkey，{{host}}替换为FastGPT域名：
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv4815' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
该请求用于重置应用定时执行的字段，去掉null以减少索引大小。
从任意终端发起第二个HTTP请求，替换参数与上述一致：
```bash
curl --location --request POST 'https://{{host}}/api/admin/init/refreshFreeUser' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
该请求用于重新计算免费版用户的时长，修复之前版本升级未重新计算导致的误发通知问题。

## 升级后怎么验证
确认服务容器镜像版本为fastgpt:v4.8.15-fix3与fastgpt-pro:v4.8.15；访问FastGPT后台，查看是否新增API知识库与工具箱页面；测试Markdown内容中嵌入HTML代码，确认预览模式可正常展示且脚本被拦截；发起测试请求调用API知识库相关接口，确认功能正常；检查免费用户时长计算逻辑，确认无误发通知情况。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4815)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
