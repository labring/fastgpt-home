---
title: 解决FastGPT指定本地文件夹为知识库及更新的相关问题
slug: /zh/troubleshoot/fastgpt-local-folder-knowledge-base
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/602
source_type: GitHub issue
---

# 解决FastGPT指定本地文件夹为知识库及更新的相关问题

## 现象
用户提出明确需求，希望直接指定本地文件夹作为FastGPT的知识库，且当本地文件夹内的文件发生修改时，知识库可自动更新或支持手动更新，经用户确认现有FastGPT版本无法满足该需求。

## 可能原因
当前FastGPT的官方功能未覆盖直接绑定本地文件夹作为知识库的场景，也未提供本地文件修改后知识库自动或手动同步更新的相关能力，无法匹配用户的需求。

## 排查步骤
无官方明确发布的排查步骤指引，需按照实际的FastGPT部署环境，确认是否存在相关配置项或功能支持该需求。

## 解决与验证
暂未获取到FastGPT官方支持的配置方法，需等待官方功能更新，或根据实际的部署环境探索相关的配置逻辑以实现需求。

> 来源: [FastGPT GitHub issue #602](https://github.com/labring/FastGPT/issues/602)
