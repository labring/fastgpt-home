---
title: FastGPT V4.9.10版本升级的操作指引
slug: /zh/reference/fastgpt-v4910-upgrade-guide
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/4910
source_type: 官方文档小节
---

# FastGPT V4.9.10版本升级的操作指引

## 结论
FastGPT V4.9.10版本属于<4.12.0的升级分类，需遵循对应版本升级流程完成部署更新。升级前需完成现有配置与数据的备份，确保升级过程不会影响业务运行。

## 具体怎么做
1. 登录FastGPT自部署管理后台，进入版本升级模块
2. 在版本列表中找到<4.12.0分类下的V4.9.10升级选项
3. 根据自身部署方式，选择Docker Compose或Sealos对应的升级执行流程
4. 按照页面提示完成升级操作，等待系统服务重新启动
5. 升级完成后，核对系统配置与原有业务逻辑的兼容性

## 注意事项
- 该版本升级未明确标注环境变量变更，仍需提前核对当前系统的环境变量配置，避免出现配置错误
- 升级过程中请勿中断服务，以免导致数据异常或部署失败
- 建议在业务低峰时段执行升级，减少对用户使用的影响
- 若升级后出现异常问题，可参考FastGPT官方文档的故障排查、通用问题排查模块进行定位解决

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/4910)
