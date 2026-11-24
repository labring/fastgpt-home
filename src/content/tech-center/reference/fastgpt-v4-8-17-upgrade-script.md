---
title: FastGPT V4.8.17版本升级操作速查
slug: /zh/reference/fastgpt-v4-8-17-upgrade-script
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/4817
source_type: 官方文档小节
---

# FastGPT V4.8.17版本升级操作速查

## 结论
FastGPT V4.8.17版本升级需使用官方提供的专属升级脚本完成。该升级流程属于4.12.0之前版本的升级范畴，仅面向自部署FastGPT的技术用户，可帮助完成从低版本到V4.8.17的版本更新。

## 具体怎么做
1. 访问FastGPT官方自部署升级文档的<4.12.0版本分类页面
2. 在分类列表中找到V4.8.17（升级脚本）条目，获取对应升级脚本文件
3. 登录FastGPT的自部署环境，支持Docker Compose部署或本地开发环境
4. 按照文档中的操作指引，在对应环境中执行该升级脚本
5. 等待脚本执行完成，验证FastGPT版本是否更新至V4.8.17

## 注意事项
1. 该升级脚本仅适配V4.8.17版本升级，不可用于其他FastGPT版本的更新操作
2. 仅可用于版本低于4.12.0的FastGPT实例升级，不符合版本要求的实例无法使用该脚本
3. 执行脚本前需确认当前环境已正确配置FastGPT的运行依赖与权限
4. 升级过程中请勿中断脚本执行，避免导致部署环境异常
5. 升级完成后需检查系统插件与配置是否正常生效

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/4817)
