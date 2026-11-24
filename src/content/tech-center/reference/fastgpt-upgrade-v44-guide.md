---
title: FastGPT从旧版本升级到V4.4的操作指南
slug: /zh/reference/fastgpt-upgrade-v44-guide
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/44
source_type: 官方文档小节
---

# FastGPT从旧版本升级到V4.4的操作指南

## 结论
FastGPT从旧版本升级到V4.4需使用专属升级脚本完成。该升级路径仅支持版本低于4.12.0的FastGPT实例，是官方明确的标准升级方案。

## 具体怎么做
1. 确认当前FastGPT的版本号，确保其低于4.12.0；
2. 从FastGPT官方文档获取对应V4.4版本的升级脚本；
3. 在部署FastGPT的环境中运行该升级脚本；
4. 等待脚本执行完成后，验证FastGPT服务是否正常启动。

## 注意事项
该升级流程仅支持版本低于4.12.0的FastGPT实例；需使用官方提供的V4.4专属升级脚本，不可混用其他版本的升级脚本；升级前建议参考官方迁移备份文档完成数据备份。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/44)
