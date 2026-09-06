---
title: 解决FastGPT基于Vercel部署的数据库选型问题
slug: /zh/troubleshoot/fastgpt-vercel-database-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/37
source_type: GitHub issue
---

# 解决FastGPT基于Vercel部署的数据库选型问题

## 现象
用户尝试在Vercel部署基于Next.js的FastGPT，需规划数据存储方案，同时考虑是否将现有MongoDB数据库与PostgreSQL合并，且发现知识库数据使用PostgreSQL。

## 可能原因
1. 对FastGPT的数据库选型规则不明确
2. 不清楚Vercel部署FastGPT的数据库适配方式
3. 存在是否合并不同类型数据库的疑问

## 排查步骤
1. 查看项目代码，确认当前FastGPT使用的数据库类型
2. 了解Vercel部署FastGPT的数据库适配要求，可通过编写相关脚本完成适配
3. 明确自身业务的数据库存储需求，评估不同方案的可行性

## 解决与验证
数据库不会合并，偏好MongoDB的轻便灵活。Vercel部署FastGPT仅需编写相关脚本即可完成适配。若需处理SQL相关内容，可协助编写。MongoDB在临时存储等场景下无需额外依赖。完成部署后，确认数据库连接正常、业务功能运行无误，即为验证通过。

> 来源: [FastGPT GitHub issue #37](https://github.com/labring/FastGPT/issues/37)
