---
title: 介绍FastGPT团队邀请链接的创建配置与使用流程
slug: /zh/glossary/fastgpt-team-invitation-link
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/guide/workspace/team/invitation_link
source_type: 官方文档
---

# 介绍FastGPT团队邀请链接的创建配置与使用流程

## 一句话定义
FastGPT团队邀请链接是团队管理员用于邀请用户加入对应团队的专属访问链接，支持配置链接描述、有效期与有效人数参数。

## 在FastGPT里怎么用
1. 管理员进入团队管理页面，点击「邀请成员」按钮打开邀请成员弹窗；
2. 在邀请成员弹窗中点击「创建邀请链接」按钮，生成专属邀请链接；
3. 配置链接描述（创建后不可修改），选择有效期（可选30分钟、7天、1年）与有效人数（可选1人、无限制）；
4. 复制生成的链接并发送给受邀用户；
5. 受邀用户访问链接后，未登录或未注册则跳转至登录页面，登录后进入团队页面，可选择接受加入团队或忽略邀请。邀请链接格式为fastgpt.cn/account/team?invitelinkid=xxxx。

## 容易搞错的地方
1. 仅团队管理员可创建邀请链接，普通用户无对应操作权限；
2. 链接描述在创建完成后无法进行修改；
3. 有效期与有效人数仅支持预设的可选值，无法自定义配置；
4. 未登录的受邀用户需先完成登录，才能处理邀请请求；
5. 忽略邀请后，再次访问原邀请链接仍可重新选择是否加入团队。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/workspace/team/invitation_link)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
