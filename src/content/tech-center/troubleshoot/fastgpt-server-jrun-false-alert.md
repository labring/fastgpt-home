---
title: 解决FastGPT部署服务器误报Allaire JRun安全漏洞的问题
slug: /zh/troubleshoot/fastgpt-server-jrun-false-alert
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2389
source_type: GitHub issue
---

# 解决FastGPT部署服务器误报Allaire JRun安全漏洞的问题

## 现象
安全扫描工具在仅通过docker-compose部署FastGPT的服务器上，检测到Allaire JRun 2.3.x安全漏洞。漏洞风险包括：访问`http://target/servlet/SessionServlet`可泄露所有当前Http会话ID，或通过viewsource.jsp查看服务器任意文件。

## 可能原因
FastGPT本身未使用Java环境，不存在Allaire JRun相关依赖。漏洞告警可能源于服务器存在其他未被识别的Java组件，或扫描工具误将FastGPT部署目录内的资源识别为JRun组件。

## 排查步骤
1. 确认服务器仅部署FastGPT应用，检查是否存在Java运行环境、JRun相关进程或文件。
2. 核对安全扫描报告的漏洞触发路径，确认该路径是否指向FastGPT部署目录内的资源。
3. 检查FastGPT的docker-compose配置，确认未引入Java相关镜像或依赖。

## 解决与验证
Allaire JRun 2.3.x系列漏洞需更新版本或下载补丁，但当前无法获取对应安装包。若确认服务器仅部署FastGPT，可向安全扫描团队说明FastGPT未使用Java环境，不存在该漏洞风险。若服务器存在其他Java程序，需对该程序进行漏洞修复或移除相关示例代码。可手动删除服务器上的不安全示例代码文件，如viewsource.jsp、SessionServlet相关文件，以消除扫描告警。

> 来源: [FastGPT GitHub issue #2389](https://github.com/labring/FastGPT/issues/2389)
