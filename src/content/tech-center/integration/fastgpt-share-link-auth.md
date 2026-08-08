---
title: 配置FastGPT免登录分享链接及身份验证流程
slug: /zh/integration/fastgpt-share-link-auth
page_type: 集成与发布渠道
source: https://doc.fastgpt.cn/zh-CN/guide/build/publish/link
source_type: 官方文档
---

# 配置FastGPT免登录分享链接及身份验证流程

### 功能概述与边界
免登录窗口可生成临时可访问的应用地址，任意互联网用户可直接使用，产生的费用由应用归属团队承担，请勿随意分享。系统会为每个用户生成localId标识会话，仅支持同一设备同一浏览器保留对话记录，且仅能拉取近30天内的20条对话记录，切换设备或清空缓存将丢失记录。部分配置参数仅商业版支持。

### 配置与使用流程
1. 创建链接：进入「应用详情-发布渠道-免登录窗口」页面，点击创建新链接，填写仅用于展示的名称后完成创建。
2. 获取链接：点击「开始使用」打开分享链接，复制后即可直接使用。
3. 商业版身份验证配置（可选）：
   - 填写POST请求根地址作为身份验证地址；
   - 在分享链接后追加`authToken`参数，格式如`https://share.fastgpt.io/chat/share?shareId=xxx&authToken=userid12345`；
   - 需实现3个接口：
     1. `/shareAuth/init`：初始化校验，请求体携带`token=[authToken]`，响应需包含`{"success": true, "data": {"uid": "用户唯一凭证"}}`，`uid`不能包含`|`、`/`、`“`、`\`字符，且长度≤255字节，否则返回`Invalid UID`错误；
     2. `/shareAuth/start`：对话前校验，请求体携带`token`和`question`，响应格式同上；
     3. `/shareAuth/finish`（可选）：对话结果上报，无强制返回格式，可上报总消耗积分等数据。

### 参数与注意事项
可配置的商业版参数包括：名称（仅展示用）、过期时间（链接失效时间）、QPM（每个用户每分钟最大访问次数）、积分上限（链接最大计费数据）、实时运行状态展示、引用片段/全文查看、来源原文下载/打开。身份验证失败时会返回对应`message`提示，如`身份错误`、`存在违规词`等。

> 来源：https://doc.fastgpt.cn/zh-CN/guide/build/publish/link
