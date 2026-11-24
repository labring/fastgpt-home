---
title: 配置FastGPT商业版的单点登录及成员同步功能
slug: /zh/reference/fastgpt-pro-sso-member-sync
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/admin/sso
source_type: 官方文档小节
---

# 配置FastGPT商业版的单点登录及成员同步功能

## 结论
完成FastGPT商业版单点登录系统的配置，可实现外部系统单点登录FastGPT。按需开启成员同步功能，可同步外部系统的成员数据至平台。

## 具体怎么做
1. 配置基础环境变量：添加以下两个环境变量：
   - `EXTERNAL_USER_SYSTEM_BASE_URL=http://fastgpt-sso:3000`（内网地址示例）
   - `EXTERNAL_USER_SYSTEM_AUTH_TOKEN=xxxxx`
2. 在商业版后台配置单点登录按钮的文字、图标等，支持企业微信、钉钉、飞书场景。
3. 开启成员同步（可选）：如需同步外部系统成员，可开启该功能，具体团队模式配置参考对应文档。
4. 配置自动定时成员同步（可选）：添加环境变量`SYNC_MEMBER_CRON="0 0 * * *"`，使用UTC时区的Cron表达式。例如需北京时间12点执行同步，需配置为`SYNC_MEMBER_CRON="0 4 * * *"`。

## 注意事项
1. `EXTERNAL_USER_SYSTEM_BASE_URL`需使用内网地址，不可使用公网访问地址。
2. 自动同步的Cron表达式需以UTC时区为准，需根据本地时区完成转换。
3. 成员同步功能的前置配置需参考团队模式说明文档完成。
4. 环境变量的参数值需使用双引号包裹，确保格式正确。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/admin/sso)
