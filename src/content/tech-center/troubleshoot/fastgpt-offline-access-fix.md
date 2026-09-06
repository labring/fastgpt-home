---
title: 解决FastGPT私有化部署后断网访问界面无响应的问题
slug: /zh/troubleshoot/fastgpt-offline-access-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1770
source_type: GitHub issue
---

# 解决FastGPT私有化部署后断网访问界面无响应的问题

## 现象
私有化部署FastGPT V4.8.3时，联网状态下可正常使用所有功能。断网后，访问localhost:3000出现界面无响应的情况。通过浏览器开发者工具查看网络请求，可发现访问首页时会发起指向https://api.github.com/repos/labring/FastGPT的请求。

## 可能原因
系统在访问首页时会发起指定GitHub API地址的请求，断网状态下该请求无法正常完成，导致界面加载异常。

## 排查步骤
1.  访问FastGPT首页，打开浏览器开发者工具，查看网络请求列表，确认是否存在指向https://api.github.com/repos/labring/FastGPT的请求。
2.  断开当前设备的网络连接，再次访问localhost:3000，观察界面是否出现无响应的情况。
3.  确认当前使用的FastGPT版本为V4.8.3。

## 解决与验证
该问题在后续版本调整中已修复，未联网环境下可正常使用FastGPT。若使用V4.8.3版本，需按实际环境确认局域网相关配置是否正确，此前版本需开启局域网访问以避免该问题。验证方法为：断开网络连接后，再次访问localhost:3000，确认界面可正常加载，无无响应情况。

> 来源: [FastGPT GitHub issue #1770](https://github.com/labring/FastGPT/issues/1770)
