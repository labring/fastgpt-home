---
title: FastGPT V4.14.19版本升级操作与更新说明
slug: /zh/deploy/fastgpt-v4-14-19-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41419
source_type: 官方文档
---

# FastGPT V4.14.19版本升级操作与更新说明

## 版本更新详情
FastGPT V4.14.19属于FastGPT 4.14.x系列的维护迭代版本，主要聚焦于浏览器兼容性与功能细节的优化修复。本次更新的优化项为兼容更低版本内核的浏览器，可覆盖更多老旧浏览器环境。修复的两个细节问题分别为：一是表单输入文件类型时未过滤icon资源，导致请求体体积过大；二是分享链接未正确展示虚拟机文件入口，影响相关资源的正常访问。

## 升级操作步骤
本次升级操作仅需更新对应服务的镜像标签即可完成，无需执行额外的脚本或配置变更，具体步骤如下：
1.  针对FastGPT主服务`fastgpt-app`，将其镜像tag更新为`v4.14.19`；
2.  针对FastGPT商业版服务`fastgpt-pro`，将其镜像tag更新为`v4.14.19`。

## 版本升级适配说明
本次V4.14.19版本未涉及环境变量变更，升级过程不会对现有系统的配置、数据与业务运行造成影响，用户可按照上述步骤安全完成版本升级。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41419
