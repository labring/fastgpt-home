---
title: FastGPT V4.8.22版本升级脚本操作指南
slug: /zh/reference/fastgpt-v4822-upgrade-script
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/4822
source_type: 官方文档小节
---

# FastGPT V4.8.22版本升级脚本操作指南

## 结论
FastGPT V4.8.22版本的自部署升级需使用该版本专属的升级脚本完成。该升级流程属于FastGPT官方自部署版本升级体系中的标准脚本操作范畴，可完成从低版本到V4.8.22的版本更新。
## 具体怎么做
1. 确认当前FastGPT部署方式为Docker Compose或官方支持的自部署模式
2. 前往FastGPT官方文档对应版本页面下载V4.8.22专属升级脚本
3. 将下载好的升级脚本上传至自部署服务器的FastGPT项目目录
4. 为升级脚本添加执行权限后运行，按照脚本提示完成全部升级步骤
## 注意事项
1. 升级前需参考官方迁移&备份文档完成FastGPT数据的备份操作，避免出现数据丢失问题
2. 该升级脚本仅适配V4.8.22版本的升级，请勿用于其他版本的FastGPT升级操作
3. 执行升级脚本前，需确认当前部署环境的配置参数符合FastGPT官方的环境变量说明要求
4. 升级过程中请勿中断服务器或相关容器的运行，以免导致部署异常或版本升级失败
> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/4822)
