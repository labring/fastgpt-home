---
title: FastGPT V4.15.7版本升级流程与注意事项速查
slug: /zh/reference/fastgpt-v4157-upgrade-quickref
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/4-15/4157
source_type: 官方文档小节
---

# FastGPT V4.15.7版本升级流程与注意事项速查

## 结论
FastGPT V4.15.7属于4.15.x系列升级版本。该版本的升级操作需结合前置版本的变更情况执行对应流程。

## 具体怎么做
1. 进入4.15.x系列版本升级页面，定位到V4.15.7升级文档。
2. 核查当前版本与V4.15.7之间的版本差异：
   - 前置版本为V4.15.0及所有beta版、V4.15.1、V4.15.2、V4.15.4时，需执行对应升级脚本并调整环境变量。
   - 其他4.15.x版本可直接按原部署流程升级。
3. 按照原部署方式（Docker Compose/Sealos/本地开发）完成版本升级。

## 注意事项
1. 部分4.15.x前置版本存在环境变量变更，升级时需严格执行对应升级脚本。
2. 升级前可参考官方文档的迁移与备份指引完成数据备份。
3. 升级过程中需核对环境变量配置，避免遗漏变更项。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/4-15/4157)
