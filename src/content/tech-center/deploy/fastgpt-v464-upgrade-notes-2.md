---
title: FastGPT V4.6.4版本升级步骤与功能更新说明
slug: /zh/deploy/fastgpt-v464-upgrade-notes-2
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/464
source_type: 官方文档
---

# FastGPT V4.6.4版本升级步骤与功能更新说明

## 升级操作步骤
需先执行初始化API请求，将`{{rootkey}}`替换为环境变量中的rootkey，`{{host}}`替换为部署的访问域名。完整请求命令如下：
```bash
curl --location --request POST https://{{host}}/api/admin/initv464 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
该操作会完成PG数据库的`createTime`字段初始化，以及Mongo数据库中`chat`集合的`feedback`字段初始化，仅需执行一次即可。

## 功能变更与优化内容
V4.6.4版本对核心功能进行了多项调整：重写分享链接身份逻辑，改用`localID`记录用户ID；商业版新增分享链接SSO方案，可通过身份鉴权地址接入已有用户系统；新增分享链接更多嵌入方式的DIY提示；弃用旧的历史记录模块，改为直接在对应位置填写数值；调整知识库搜索模块的`topk`逻辑，采用`MaxToken`计算以兼容不同长度的文本块；调整鉴权顺序，提升`apikey`的鉴权优先级，避免cookie抢占`apikey`的鉴权结果；链接读取支持多选择器，可参考Web站点同步用法。同时修复了分享链接图片上传鉴权、Mongo连接池未释放、`Dataset Intro`无法更新、md代码块、root权限等问题，并优化了dockerfile。

## 注意事项
该初始化步骤仅适用于从旧版本升级至V4.6.4的场景，未执行该步骤可能导致数据库字段缺失，引发功能异常。执行请求时需确保环境变量中的`rootkey`正确，且`host`配置与部署的访问域名一致，否则会触发鉴权失败或请求无法到达的问题。部分功能（如分享链接SSO方案）仅商业版支持，开源版本无法使用该功能。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/464)
