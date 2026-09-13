---
title: 解决FastGPT修改OpenAPI导入HTTP插件路由名称丢失编排的问题
slug: /zh/troubleshoot/fastgpt-openapi-plugin-routing-name-loss
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1309
source_type: GitHub issue
---

# 解决FastGPT修改OpenAPI导入HTTP插件路由名称丢失编排的问题

## 现象
在私有部署V4.8-preview2版本的FastGPT中，用户执行以下操作后会出现编排丢失问题：新建HTTP插件，填写任意名称并填入OpenAPI Schema后点击创建，成功生成包含具体action的插件文件夹；进入插件文件夹内编辑任意action的名称，点击确认更新后，再次进入该action时，原本编排的路由方法被清空。同时服务端或浏览器控制台会出现指定警告日志：`Warning: data for page "/plugin/edit" (path "/plugin/edit?pluginId=662c9ca7cf4394583d321829") is 132 kB which exceeds the threshold of 128 kB, this amount of data can reduce performance.`

## 可能原因
结合日志中提示的插件编辑页面数据量超限的警告，推测该问题可能与插件配置数据量过大（132kB）超过128kB阈值有关，导致数据在传输、序列化或存储过程中出现异常，进而引发编排内容丢失。具体的技术根因需结合实际部署环境进一步确认。

## 排查步骤
1. 确认当前使用的FastGPT版本为私有部署V4.8-preview2。
2. 按照流程复现问题：依次执行新建HTTP插件、填入OpenAPI Schema并完成创建、在插件文件夹内编辑任意action的名称并确认更新、进入该action查看内部编排内容。
3. 查看服务端运行日志或浏览器F12控制台的网络请求日志，确认是否存在与`/plugin/edit`页面数据量超限相关的警告信息。
4. 对比修改名称前后的插件配置数据，确认编排路由方法是否被异常清空。

## 解决与验证
目前暂无官方公开的修复方案。若需临时规避该问题，可暂不修改从OpenAPI Schema导入的HTTP插件的路由名称。若必须修改路由名称，可先尝试优化导入的OpenAPI Schema内容，减少冗余数据以降低插件编辑页面的整体数据量；同时需检查FastGPT的部署环境配置，确认是否存在数据传输或存储的限制。验证修改是否生效时，需在更新插件名称后再次进入action页面，确认编排路由方法未被清空。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1309)
