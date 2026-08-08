---
title: FastGPT免登录窗口发布的配置、参数及使用说明
slug: /zh/integration/fastgpt-guest-link-config
page_type: 集成与发布渠道
source: https://doc.fastgpt.cn/zh-CN/guide/build/publish/link
source_type: 官方文档
---

# FastGPT免登录窗口发布的配置、参数及使用说明

## 功能与使用限制
免登录窗口可生成临时可访问地址，任意互联网用户可通过该地址使用应用，产生的费用由应用归属团队承担，请勿随意分享。系统会为每个用户生成localId标识用户，从云端拉取对话记录，但仅支持同一设备同一浏览器保留对话记录，切换设备或清空浏览器缓存会丢失记录，且仅允许拉取近30天内的20条对话记录。

## 基础配置与参数说明
1. 创建链接：进入应用详情-发布渠道-免登录窗口页面，点击创建新链接，填写仅用于记录展示的名称后即可完成创建。
2. 复制链接：点击开始使用打开使用链接，复制后即可直接使用。
可配置的参数（部分仅商业版支持）包括：名称（仅用于记录展示）、过期时间（超过该时间后链接无法使用）、QPM（每个用户每分钟最大访问次数）、积分上限（该链接产生的最大计费数据）、身份验证（用于第三方系统身份认证与对话回调，商业版支持）、实时运行状态（是否展示当前运行节点）、查看引用片段、查看引用全文、下载/打开来源原文。

## 身份验证配置（商业版）
该功能仅商业版支持，用于将免登录对话框快速接入现有系统。需配置POST请求的根地址，分享链接的初始化、开始对话以及对话结束都会向该地址的特定接口发送请求。接口统一响应格式为`{ success: true, message: 错误提示, msg: 同message, data: { uid: 用户唯一凭证 } }`，其中success为布尔值，message与msg等效，success为false时会展示对应错误提示。uid需为不包含|、/、“、\\字符、长度≤255字节的字符串，否则会返回`Invalid UID`错误，且uid将用于拉取和保存对话记录。
最小配置示例步骤：1. 配置身份校验根地址，无需填写完整请求路径；2. 在分享链接中添加`authToken`参数，例如将原始链接`https://share.fastgpt.io/chat/share?shareId=648aaf5ae121349a16d62192`修改为`https://share.fastgpt.io/chat/share?shareId=648aaf5ae121349a16d62192&authToken=userid12345`；3. 实现三个接口：`/shareAuth/init`（聊天初始化校验）、`/shareAuth/start`（对话前校验）、`/shareAuth/finish`（可选对话结果上报），其中前两个接口需返回校验结果，第三个接口无强制返回格式要求。

> 来源：https://doc.fastgpt.cn/zh-CN/guide/build/publish/link
