---
title: Windows环境下FastGPT本地部署的系统选型与Docker配置指引
slug: /zh/troubleshoot/fastgpt-windows-deployment-setup
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1409
source_type: GitHub issue
---

# Windows环境下FastGPT本地部署的系统选型与Docker配置指引

## 现象
计划本地部署FastGPT，使用Windows系统时，不确定部署所需的系统环境，以及是否需要通过WSL 2后端安装Docker Desktop。

## 可能原因
部署FastGPT的环境适配与部署场景相关，不同场景的环境要求存在差异。Windows系统下Docker的运行依赖特定后端配置，导致对环境选型和Docker配置产生疑问。

## 排查步骤
1. 明确当前部署场景，区分本地开发环境与服务器部署环境。
2. 检查Windows系统中Docker Desktop的后端配置状态。
3. 结合场景确认对应的环境适配方式，需按实际环境确认细节。

## 解决与验证
服务器部署优先选择Ubuntu系统，可减少适配问题。本地开发环境可使用任意系统。Windows系统下进行本地部署时，通过WSL 2后端安装Docker Desktop即可完成基础运行环境配置。完成对应配置后，可启动Docker Desktop并运行基础容器测试环境可用性，需按实际部署进度验证最终适配效果。

> 来源: [FastGPT GitHub issue #1409](https://github.com/labring/FastGPT/issues/1409)
