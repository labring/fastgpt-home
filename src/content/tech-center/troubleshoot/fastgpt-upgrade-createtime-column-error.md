---
title: 解决FastGPT 4.7.1升级至4.8.1时createtime列不存在报错
slug: /zh/troubleshoot/fastgpt-upgrade-createtime-column-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1745
source_type: GitHub issue
---

# 解决FastGPT 4.7.1升级至4.8.1时createtime列不存在报错

## 现象
用户按照升级步骤运行指定的curl命令，返回{"code":200,"statusText":"","message":"success","data":null}，但FastGPT服务日志出现报错：2024-06-12 13:27:20 init pg error error: column "createtime" does not exist，附带PostgreSQL错误代码42703，报错指向indexcmds.c第1848行。此时界面观察功能正常，但存在该报错日志。

## 可能原因
该报错源于PostgreSQL数据库查询时无法找到createtime列，属于4.7.1升级至4.8.1的数据库迁移流程未正确创建该列，或原有数据库结构未包含该字段。

## 排查步骤
1. 确认执行的升级命令与官方步骤一致，检查请求头中的rootkey是否与部署配置的root_key匹配。
2. 查看FastGPT服务的完整运行日志，定位到column "createtime" does not exist的报错上下文，确认报错源于数据库初始化或迁移流程。
3. 连接到FastGPT使用的PostgreSQL数据库，查询对应表的结构，确认是否存在createtime列，具体表名需按实际环境确认。
4. 核对FastGPT 4.8.1版本的数据库迁移文档，确认是否包含创建createtime列的相关语句。

## 解决与验证
1. 若确认数据库缺少createtime列，执行FastGPT官方提供的4.8.1版本数据库迁移语句，创建缺失的列。
2. 重新运行升级命令：
```
curl --location --request POST 'http://localhost:3000/api/admin/initv481' \
--header 'rootkey: root_key' \
--header 'Content-Type: application/json'
```
3. 查看服务日志，确认不再出现column "createtime" does not exist的报错。
4. 访问FastGPT前端界面，验证各项功能是否正常运行。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1745)
