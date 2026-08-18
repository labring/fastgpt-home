---
title: FastGPT修改存储配置导致页面无法打开的排错
slug: /zh/troubleshoot/fastgpt-storage-config-failed
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6253
source_type: GitHub issue
---

# FastGPT修改存储配置导致页面无法打开的排错

## 现象
用户在私有部署FastGPT 4.14.5版本并升级后，先出现插件无法下载的问题，按照指引更新存储相关配置后，FastGPT页面完全无法打开。FastGPT容器报错信息为：`Init system error TypeError: fetch failed`，报错堆栈涉及node:internal/deps/undici/undici、getProviders等服务调用流程，日志末尾截断为`at async Module.t (/app/pro`。

## 可能原因
本次问题由存储配置变更直接引发：用户将旧版S3_*开头的存储配置替换为新版STORAGE_*系列配置后，可能存在三类问题：一是新旧配置项混用导致系统识别冲突；二是STORAGE_EXTERNAL_ENDPOINT等参数值无效，如使用了本地回环地址无法被容器访问；三是配置项格式或参数值不符合系统要求，导致存储模块初始化失败，进而引发整体服务初始化异常，页面无法打开。

## 排查步骤
1.  确认当前使用的FastGPT版本为4.14.5私有部署版本，核对存储配置的变更范围，区分旧版S3_*配置与新版STORAGE_*配置，避免混用。
2.  检查STORAGE_EXTERNAL_ENDPOINT配置项，确认该地址为服务器和客户端均可访问的非本地回环地址，禁止使用127.0.0.1或localhost。
3.  核对所有STORAGE_*系列配置项的参数名称与值，确保与要求的配置格式一致，例如STORAGE_VENDOR需填写为`minio`，STORAGE_S3_ENDPOINT需包含正确的协议、域名或IP与端口。
4.  查看FastGPT容器的完整报错日志，确认fetch失败的具体关联请求目标，辅助定位配置错误点。

## 解决与验证
1.  移除所有旧版S3_*开头的存储配置项，仅保留新版STORAGE_*系列配置，避免配置冲突。
2.  修正STORAGE_EXTERNAL_ENDPOINT为符合要求的实际可访问地址，替换为宿主机IP或合法域名。
3.  重新启动FastGPT容器，等待初始化完成后访问页面，确认页面可以正常加载。
4.  验证插件下载功能恢复正常，确认存储相关功能可正常使用。

> 来源：[FastGPT GitHub Issue #6253](https://github.com/labring/FastGPT/issues/6253)
