---
title: 解决FastGPT安装过程中拉取quay.io镜像失败的问题
slug: /zh/troubleshoot/fastgpt-quay-image-pull-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2400
source_type: GitHub issue
---

# 解决FastGPT安装过程中拉取quay.io镜像失败的问题

## 现象
安装FastGPT时出现镜像拉取失败的报错，完整报错文本为：`error pulling image configuration: download failed after attempts=6: dialing cdn03.quay.io:443 container via direct connection because app settings has no HTTPS proxy: connecting to 104.18.37.147:443: dial tcp 104.18.37.147:443: connectex: No connection could be made because the target machine actively refused it.`，涉及的目标镜像为`quay.io/coreos/etcd:v3.5.5`，安装流程无法继续推进，需解决镜像拉取问题才能完成安装。

## 可能原因
从报错信息可知，系统无法直接连接目标镜像仓库的443端口，且未配置HTTPS代理，导致镜像拉取请求被目标机器主动拒绝，无法完成镜像配置的下载操作，最终引发FastGPT安装失败。

## 排查步骤（有序列表，每步可照做）
1.  检查当前环境是否配置了Docker镜像拉取的HTTPS代理，确认是否存在代理配置缺失的情况。
2.  核对目标镜像`quay.io/coreos/etcd:v3.5.5`的拉取权限与当前环境的网络连通性。
3.  若确认未配置代理，需按照Docker代理配置流程完成相关设置。

## 解决与验证
配置Docker Hub代理即可解决该镜像拉取失败问题，具体配置可参考公开的Docker代理配置指南。完成代理配置后，重新执行FastGPT的安装流程，验证镜像是否可以正常拉取，确认安装过程不再出现指定的报错信息，即可完成后续安装步骤。

> 来源: [FastGPT GitHub issue #2400](https://github.com/labring/FastGPT/issues/2400)
