---
title: FastGPT V4.14.5.1版本升级脚本操作指南
slug: /zh/reference/fastgpt-v41451-upgrade-script
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/4-14/41451
source_type: 官方文档小节
---

# FastGPT V4.14.5.1版本升级脚本操作指南

## 结论
本页面针对FastGPT V4.14.5.1版本提供专用升级脚本操作指引。该版本自带升级脚本，可用于完成对应版本的快速升级操作。

## 具体怎么做
1. 确认当前FastGPT采用Docker Compose或Sealos部署模式
2. 下载V4.14.5.1版本配套的升级脚本文件
3. 运行升级脚本，按照脚本附带的官方指引完成执行流程
4. 升级完成后重启相关服务，等待系统正常启动

## 注意事项
1. 升级前需确认当前版本适配V4.14.5.1升级脚本，避免出现不兼容问题
2. 若系统涉及环境变量调整，需参考对应版本的变更说明完成配置
3. 升级过程中建议暂停业务访问，防止数据写入异常
4. 若升级过程中出现报错，可参考文档中的错误排查方式与存储桶问题排查指引
5. 升级完成后需检查模型配置、对象存储等核心功能是否正常

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/4-14/41451)
