---
title: FastGPT 离线或内网部署页面无响应问题排错
slug: /zh/troubleshoot/fastgpt-offline-intranet-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1434
source_type: GitHub issue
---

# FastGPT 离线或内网部署页面无响应问题排错

## 现象
私有化部署后，断网或内网环境下访问页面无响应。浏览器开发者工具显示页面请求了`https://api.github.com/repos/labring/FastGPT`，该请求无法完成导致访问失败。部分用户配置`show_git`后仍出现配置不生效的情况，同时存在`WeakRef is not defined`的控制台报错。

## 可能原因
系统内置了加载GitHub仓库星标的逻辑，默认会向`https://api.github.com/repos/labring/FastGPT`发起请求。离线或内网环境下该请求无法正常完成，导致页面阻塞。部分用户的配置未正确加载，导致`show_git`配置项未生效。

## 排查步骤
1. 打开浏览器开发者工具，查看控制台报错与网络请求列表，确认是否存在`https://api.github.com/repos/labring/FastGPT`的失败请求。
2. 检查项目的config.json配置文件，确认`feConfigs`字段下是否存在`"show_git": false`配置。
3. 重启部署服务，查看终端日志，确认配置项是否成功加载。
4. 若存在`WeakRef is not defined`报错，需按实际环境确认相关依赖的加载情况。

## 解决与验证
在项目的config.json文件中添加或修改`feConfigs`配置：
```json
"feConfigs": {
  "show_git": false
}
```
重启部署服务后，将不再发起GitHub API请求。若配置未生效，需确认config.json的加载路径正确，重新执行docker compose up等部署命令加载配置。
验证方法：断网后访问页面，确认页面可正常加载，无阻塞情况。

> 来源: [FastGPT GitHub issue #1434](https://github.com/labring/FastGPT/issues/1434)
