---
title: 解决FastGPT 4.7.1私有部署WSL环境数据卷丢失问题
slug: /zh/troubleshoot/fastgpt-private-wsl-data-volume-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1238
source_type: GitHub issue
---

# 解决FastGPT 4.7.1私有部署WSL环境数据卷丢失问题

## 现象
在FastGPT 4.7.1私有部署场景中，当Docker默认以WSL作为启动引擎时，容器的数据卷无法正常加载，会出现知识库和应用设置丢失的问题。仅通过改用PowerShell启动Docker并重新加载docker compose.yml文件，才能恢复配置，每次WSL启动Docker都会复现该问题。

## 可能原因
该问题的可能诱因是docker compose.yml文件中配置的容器卷路径，与WSL环境的路径规则不兼容，导致WSL下的Docker无法正确映射并加载数据卷文件。

## 排查步骤
1. 确认当前Docker的默认启动引擎为WSL。
2. 打开当前部署使用的docker compose.yml文件，查看fastgpt容器的volume配置项，记录现有的路径映射规则。
3. 对比PowerShell环境与WSL环境下Docker数据卷的实际存储路径，确认路径格式差异。

## 解决与验证
调整docker compose.yml文件中的容器volume路径配置，使其适配WSL环境的路径格式。修改完成后，使用WSL启动Docker并重新运行docker compose.yml文件，验证知识库和应用设置是否正常加载，重启Docker后确认配置不会再次丢失。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1238)
