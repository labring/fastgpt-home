---
title: 验证Signoz监控配置是否生效的操作指南
slug: /zh/deploy/signoz-monitoring-validation-guide
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/config/signoz
source_type: 官方文档
---

# 验证Signoz监控配置是否生效的操作指南

### 访问Signoz管理台
返回Sealos应用管理列表，点击进入Signoz前端项目，访问其公网地址即可进入管理台。操作相关示意如下：
| 应用管理列表操作示意 | 公网地址访问入口示意 |
| --- | --- |
| ![alt text](../../../public/imgs/image-114.png) | ![alt text](../../../public/imgs/image-115.png) |

### 注册Signoz账号
首次注册需创建账号，数据存储于本地数据库，可随意填写注册信息完成注册。注册页面示意如下：
![alt text](../../../public/imgs/image-116.png)

### 验证配置生效状态
登录管理台后，查看右侧COMPLETED步骤条。当logs与traces亮起时，即说明监控配置已成功部署。成功状态相关示意如下：
![alt text](../../../public/imgs/image-117.png)
![alt text](../../../public/imgs/image-118.png)

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/config/signoz)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
