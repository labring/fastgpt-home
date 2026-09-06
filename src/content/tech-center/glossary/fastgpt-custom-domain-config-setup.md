---
title: FastGPT自定义域名的完整配置流程与注意事项
slug: /zh/glossary/fastgpt-custom-domain-config-setup
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/workspace/customDomain
source_type: 官方文档
---

# FastGPT自定义域名的完整配置流程与注意事项

## 一句话定义
自定义域名是指可用于访问FastGPT服务与调用FastGPT API的自有备案域名。

## 在 FastGPT 里怎么用
1. 准备已完成备案的域名，仅支持阿里云、腾讯云、火山引擎三家服务商的备案域名。
2. 进入对应配置页面，点击“编辑”按钮进入编辑状态。
3. 填入目标域名，例如www.example.com。
4. 在域名服务商的域名解析处，添加记录类型为CNAME的DNS记录，记录值为界面提示内容。
5. 添加解析记录后，点击“保存”按钮，系统将自动检查DNS解析情况，通常一分钟内可获取解析记录，未获取到可重试。
6. 待状态提示显示为“已生效”后，点击“确认”按钮完成配置。

## 容易搞错的地方
1. 域名必须提前完成备案，且仅支持阿里云、腾讯云、火山引擎三家服务商的备案域名。
2. DNS记录类型必须为CNAME，不可使用其他记录类型。
3. 解析记录添加后需等待系统检测生效，未及时获取记录可执行重试操作。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/workspace/customDomain)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
