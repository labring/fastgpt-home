---
title: 解决FastGPT升级后版本号显示异常与功能不匹配问题
slug: /zh/troubleshoot/fastgpt-upgrade-version-display-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3262
source_type: GitHub issue
---

# 解决FastGPT升级后版本号显示异常与功能不匹配问题

## 现象
用户升级FastGPT到4.8.14版本后，页面显示的版本号仍为13，分享链接对应的功能与版本描述的功能不匹配，怀疑升级步骤存在错误。

## 可能原因
升级操作未正确执行，导致实际运行的镜像版本未更新，或容器未加载新版本的系统配置文件。

## 排查步骤
1. 执行`docker logs fastgpt`命令查看FastGPT容器的运行日志
2. 在日志内容中查找`System Version`字段，确认容器实际加载的版本号
3. 检查本地镜像拉取记录，确认是否成功拉取目标版本的Docker镜像

## 解决与验证
1. 若容器日志中`System Version`与目标升级版本一致，重新构建并部署前端容器以更新静态资源
2. 若容器日志中`System Version`未匹配目标版本，重新拉取对应版本的Docker镜像，重启fastgpt容器
3. 重启容器后，再次执行`docker logs fastgpt`确认`System Version`正确，访问页面验证版本号与功能匹配

> 来源: [FastGPT GitHub issue #3262](https://github.com/labring/FastGPT/issues/3262)
