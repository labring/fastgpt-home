---
title: 指导通过Sealos一键部署FastGPT服务的具体操作流程
slug: /zh/deploy/fastgpt-sealos-one-click-deploy
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/deploy/sealos
source_type: 官方文档
---

# 指导通过Sealos一键部署FastGPT服务的具体操作流程

部署FastGPT服务需依赖数据库组件，部署完成后需等待2~4分钟才可正常访问。由于默认采用最低配置规格，首次访问FastGPT服务时可能会出现速度较慢的情况。

## 一键部署操作步骤
首先，根据部署界面的提示输入`root_password`，以及openai或oneapi的地址与密钥。该步骤的操作界面可参考文档配套的第一张截图。
其次，点击部署按钮，系统将自动跳转至应用管理页面。
随后，在应用管理页面中找到fastgpt主应用右侧名称为fastgpt-xxxx的详情按键并点击。
最后，跳转至FastGPT部署管理页面后，点击外网访问地址对应的链接，即可成功打开FastGPT服务。该步骤的操作界面可参考文档配套的第二张截图。

如需绑定自定义域名或修改部署参数，可点击页面右上角的变更按钮，按照系统指引完成相关配置调整。该配置调整的操作界面可参考文档配套的第三张截图。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/deploy/sealos)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
