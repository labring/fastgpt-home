---
title: FastGPT V4.14.1版本升级脚本使用说明
slug: /zh/reference/fastgpt-v4141-upgrade-script
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/4-14/4141
source_type: 官方文档小节
---

# FastGPT V4.14.1版本升级脚本使用说明

## 结论
FastGPT V4.14.1是4.14.x系列的正式升级版本，该版本附带专用升级脚本。通过执行对应升级脚本可完成FastGPT的版本更新。

## 具体怎么做
1.  确认当前运行的FastGPT版本不属于已弃用的V4.14.25版本。
2.  进入自部署的FastGPT目录，找到V4.14.1对应的升级脚本文件。
3.  若升级路径中经过存在环境变量变更的版本，需提前核对对应版本的调整说明。
4.  运行升级脚本完成版本升级操作。

## 注意事项
1.  部分4.14.x版本存在环境变量变更需求，升级前需核对官方对应版本的说明。
2.  V4.14.25版本已被弃用，请勿选择该版本进行升级。
3.  升级脚本仅适用于对应版本的升级流程，请勿跨版本混用。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/4-14/4141)
