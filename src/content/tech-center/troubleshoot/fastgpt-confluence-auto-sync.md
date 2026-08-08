---
title: 解决FastGPT直接接入企业Confluence的自动同步配置问题
slug: /zh/troubleshoot/fastgpt-confluence-auto-sync
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6577
source_type: GitHub issue
---

# 解决FastGPT直接接入企业Confluence的自动同步配置问题

## 现象
用户需求为FastGPT直接接入企业Confluence，无需人工手动处理知识库的上传与更新，但当前无法实现该自动同步功能，需手动完成知识库内容的上传与更新操作。

## 可能原因
1. FastGPT未内置原生支持企业Confluence的直接接入适配；
2. 未配置企业Confluence的访问权限、认证参数等基础配置；
3. 未设置知识库自动同步的相关规则，无法自动拉取Confluence的内容更新；
4. 需依赖额外扩展或插件才能实现Confluence接入，当前未安装相关组件（需按实际环境确认）。

## 排查步骤
1. 确认当前使用的FastGPT版本是否内置企业Confluence的接入适配，需按实际环境确认；
2. 检查FastGPT知识库管理页面是否存在Confluence数据源的配置入口；
3. 核对企业Confluence的访问地址、账号权限、认证密钥等参数是否配置正确；
4. 查看是否需要安装额外插件或扩展来实现Confluence与FastGPT的对接。

## 解决与验证
目前FastGPT暂无原生内置的企业Confluence直接接入方案，可按以下方式尝试解决：
1. 参考FastGPT官方文档配置自定义数据源，对接企业Confluence的开放接口；
2. 配置Confluence的访问权限与认证信息，确保FastGPT可正常获取知识库内容；
3. 设置自动同步规则，调整同步频率，验证知识库是否可自动从Confluence拉取更新内容；
4. 对比Confluence与FastGPT知识库的内容，确认无需手动上传即可完成同步。

> 来源：https://github.com/labring/FastGPT/issues/6577
