---
title: FastGPT V4.14.6版本升级操作参考
slug: /zh/reference/fastgpt-v4146-upgrade-reference
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/4-14/4146
source_type: 官方文档小节
---

# FastGPT V4.14.6版本升级操作参考

## 结论
本内容为FastGPT V4.14.6版本的升级参考信息，属于4.14.x系列升级分支的官方文档。该页面汇总了4.14.x系列各版本的升级特殊要求。
## 具体怎么做
1. 确认待升级的FastGPT版本属于4.14.x系列分支。
2. 若升级前版本带有「升级脚本」备注（如V4.14.0、V4.14.1、V4.14.3至V4.14.5、V4.14.7等），需执行官方提供的升级脚本。
3. 若升级前版本带有「环境变量变更」备注（如V4.14.8至V4.14.11等），需提前调整对应环境变量配置。
4. 按照Docker Compose部署的官方流程完成版本升级。
## 注意事项
1. 本参考仅适用于FastGPT 4.14.x系列版本的升级操作。
2. 带有「环境变量变更」备注的版本，升级前必须完成对应环境变量的配置调整。
3. 带有「升级脚本」备注的版本，需严格执行官方提供的升级脚本。
4. 不宜跨大版本升级（如从4.13.x直接升级至V4.14.6）。
> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/4-14/4146)
