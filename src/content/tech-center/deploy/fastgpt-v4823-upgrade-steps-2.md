---
title: FastGPT V4.8.23版本升级操作与更新说明
slug: /zh/deploy/fastgpt-v4823-upgrade-steps-2
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4823
source_type: 官方文档
---

# FastGPT V4.8.23版本升级操作与更新说明

### 版本适配与前置说明
FastGPT V4.8.23为自带升级脚本的版本，仅适用于对应历史版本的升级操作。执行升级前必须完成数据库备份，且Sandbox镜像无需执行更新操作。本次升级脚本将清理知识库中的多余全文索引这类脏数据，优化后续知识库的使用效率。

### 升级操作步骤
1. 完成数据库备份；
2. 更新镜像：将fastgpt镜像的tag修改为`v4.8.23-fix`，商业版fastgpt-pro镜像同样使用该tag，Sandbox镜像无需更新；
3. 运行升级脚本：在任意终端发起HTTP POST请求，替换命令中的`{{rootkey}}`为环境变量中的rootkey值，`{{host}}`为FastGPT的域名：
```bash
curl --location --request POST https://{{host}}/api/admin/initv4823 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```

### 更新内容与注意事项
本次更新新增默认“知识库文本理解模型”配置、AI proxy V1版以及工单入口支持；优化了模型配置表单的必填项校验、集合列表大数据量统计性能、Latex格式数学公式转义、大尺寸文档图片自动忽略逻辑、时间选择器的默认时间设置，同时升级了mongoose库版本依赖。修复了标签过滤时子文件夹未生效、离开团队未刷新成员列表、PPTX解析编码错误、知识库单条数据删除后全文索引未同步删除、Mongo Dataset text索引查询失效等问题。需要注意，本次暂时移除了md阅读优化功能以避免链接分割错误，请勿自行恢复该功能。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4823
