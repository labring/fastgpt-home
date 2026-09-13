---
title: FastGPT创建知识库后上传文件报错的排错方法
slug: /zh/troubleshoot/fastgpt-upload-file-error-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6064
source_type: GitHub issue
---

# FastGPT创建知识库后上传文件报错的排错方法

## 现象
用户使用bash <(curl -fsSL https://doc.fastgpt.cn/deploy/install.sh) --region=cn --vector=pg命令安装FastGPT，执行docker compose up -d启动容器后，创建知识库时上传文件出现报错，附带两张报错截图。

## 可能原因
由于未获取到具体报错文本，可能的相关因素包括部署配置异常、容器运行状态异常，需结合实际运行日志与环境信息确认。

## 排查步骤
1.  执行docker compose ps命令，查看所有服务容器的运行状态，确认所有容器均处于running状态。
2.  查看FastGPT及相关服务的运行日志，排查是否存在连接失败或配置错误的提示。
3.  确认上传文件的格式、大小符合系统要求，需按实际环境确认具体限制。
4.  核对部署脚本的参数与实际运行环境的匹配性，确认--vector=pg参数对应的配置正常生效。

## 解决与验证
若排查发现容器未正常运行，可执行docker compose restart命令重启所有容器。若为向量数据库连接异常，需确认部署配置与实际环境匹配。验证方式为重新创建知识库并上传文件，确认上传操作不再报错。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/6064)
