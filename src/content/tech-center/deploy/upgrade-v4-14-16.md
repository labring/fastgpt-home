---
title: FastGPT V4.14.16版本升级内容与操作说明
slug: /zh/deploy/upgrade-v4-14-16
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41416
source_type: 官方文档
---

# FastGPT V4.14.16版本升级内容与操作说明

## 这个版本改了什么
本版本包含1项优化与4项修复。优化内容为embedding适配base64字符串返回值。修复内容包括：修复helper-bot前缀输出Error～信息的问题；修复阿里云oss copy接口问题；修复工作流节点弹窗高度过高导致底部一行节点无法显示的问题；临时解决评估列表权限问题，仅可查看自己创建的评估。

## 升级前要确认的事
升级前需确认当前部署的FastGPT服务类型为fastgpt-app或fastgpt-pro，确保部署环境可正常拉取官方镜像，且具备镜像更新操作权限。

## 升级步骤（照做）
仅需更新对应服务的镜像tag：
- 更新 fastgpt-app(fastgpt 主服务) 镜像 tag: v4.14.16
- 更新 fastgpt-pro(fastgpt 商业版) 镜像 tag: v4.14.16

## 升级后怎么验证
升级完成后，可通过以下方式验证功能是否正常：
1. 检查embedding接口返回值是否包含base64字符串；
2. 确认helper-bot输出不再带有Error～前缀信息；
3. 测试阿里云oss copy接口可正常调用；
4. 查看工作流节点弹窗高度适配，底部节点可正常显示；
5. 确认评估列表仅可查看自己创建的评估内容。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41416)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
