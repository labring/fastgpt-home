---
title: 解决FastGPT升级后的数据库连接与模型渠道异常问题
slug: /zh/troubleshoot/fastgpt-upgrade-troubleshooting-guide
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/216
source_type: GitHub issue
---

# 解决FastGPT升级后的数据库连接与模型渠道异常问题

## 现象
FastGPT版本从4.0升级至4.2后，使用docker compose部署且未修改配置文件的场景下，访问知识库时出现`connect ECONNREFUSED 127.0.0.1:5432`报错。同时使用免费Token时，出现"当前分组 default 下对于模型 text-embedding-ada-002 无可用渠道"的报错。

## 可能原因
1.  数据库连接的环境变量未按新版本部署要求更新。
2.  目标模型text-embedding-ada-002未添加至当前分组，或密钥无该模型的调用权限；免费Token可能存在对应模型的渠道限制。

## 排查步骤
1.  核对当前docker compose配置文件中的数据库连接相关环境变量，确认是否匹配新版本部署要求。
2.  检查当前分组default中是否已添加text-embedding-ada-002模型。
3.  验证当前使用的密钥是否拥有text-embedding-ada-002模型的调用权限。
4.  确认当前使用的Token是否支持text-embedding-ada-002模型的调用渠道。

## 解决与验证
1.  数据库连接问题：参考最新部署文档更新数据库连接环境变量，官方部署文档链接为https://doc.fastgpt.run/docs/installation/docker/。更新完成后重启服务，验证`connect ECONNREFUSED 127.0.0.1:5432`报错是否消失。
2.  模型渠道问题：先将text-embedding-ada-002模型添加至当前分组default，再检查密钥是否具备该模型的调用权限。官方密钥默认具备该权限，若无权限则需确认Token渠道合法性。完成配置后重新调用模型，验证"当前分组 default 下对于模型 text-embedding-ada-002 无可用渠道"报错是否消失。

> 来源: [FastGPT GitHub issue #216](https://github.com/labring/FastGPT/issues/216)
