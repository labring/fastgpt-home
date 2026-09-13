---
title: 解决FastGPT添加联网搜索功能的配置与排错问题
slug: /zh/troubleshoot/fastgpt-network-search-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2679
source_type: GitHub issue
---

# 解决FastGPT添加联网搜索功能的配置与排错问题

## 现象
本地部署FastGPT后，尝试为模型添加联网搜索功能。用户尝试使用dockdockgo本地部署搜索工具时，出现RuntimeError报错，提示网络访问不通。同时存在配置的搜索参数无法正常生效的情况，且应用场景需注重隐私数据保护。

## 可能原因
一是本地部署的搜索工具网络访问配置异常，导致运行时出现报错；二是所使用的接口平台的自定义搜索参数存在生效异常的问题，无法按配置正常启用搜索功能。

## 排查步骤
1. 确认是否使用支持内置搜索的模型，例如可直接启用内置搜索功能的模型。
2. 若使用自定义搜索工具，检查本地部署的搜索工具网络配置，确认网络访问正常，排查RuntimeError报错原因。
3. 若通过配置自定义参数实现搜索，修改FastGPT的config.json配置文件，添加对应自定义参数。
4. 确认所使用的接口平台是否存在参数生效异常的情况，需按实际环境确认适配方式。

## 解决与验证
1. 若使用百度模型，可直接启用内置百度搜索功能，无需额外配置。
2. 若通过插件实现联网搜索，无需依赖特定模型，可直接配置对应插件完成联网功能。
3. 若使用qwen-max模型，可在FastGPT的config.json文件中添加自定义参数enable_search: true，启用搜索功能。
4. 若使用相关接口平台，需注意该平台的enable_search参数可能无法生效，需按实际环境确认适配方案。
5. 部署本地搜索工具后，验证网络访问是否正常，解决RuntimeError报错问题，确保搜索功能可用。

> 来源: [FastGPT GitHub issue #2679](https://github.com/labring/FastGPT/issues/2679)
