---
title: 为FastGPT沙盒配置npm、Python及apt的自定义依赖源
slug: /zh/deploy/fastgpt-sandbox-custom-dependency-sources
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/config/sandbox/opensandbox
source_type: 官方文档
---

# 为FastGPT沙盒配置npm、Python及apt的自定义依赖源

## 场景说明
当FastGPT沙盒需要安装npm、Python或apt依赖时，可通过配置环境变量自定义依赖源，优化依赖安装流程。

## 配置参数与操作步骤
可通过在`fastgpt-app`和`fastgpt-pro`中配置以下环境变量实现自定义依赖源：
```dotenv
AGENT_SANDBOX_NPM_REGISTRY=https://registry.npmmirror.com
AGENT_SANDBOX_PYPI_INDEX_URL=https://pypi.tuna.tsinghua.edu.cn/simple
# Ubuntu amd64 示例；Ubuntu arm64 请按下方说明配置 ubuntu-ports
AGENT_SANDBOX_APT_MIRROR=https://mirrors.tuna.tsinghua.edu.cn/ubuntu
```
各参数说明如下：
- `AGENT_SANDBOX_NPM_REGISTRY`：配置npm依赖源，适用于所有运行态镜像。
- `AGENT_SANDBOX_PYPI_INDEX_URL`：配置Python PyPI源，适用于所有运行态镜像。
- `AGENT_SANDBOX_APT_MIRROR`：配置apt依赖源，仅对root权限的Agent沙箱有效，需填写apt仓库根地址，不可指向`dists`或具体版本目录。
不同架构的Ubuntu需对应不同仓库路径：
  - Ubuntu amd64 / x86_64：`AGENT_SANDBOX_APT_MIRROR=https://mirrors.tuna.tsinghua.edu.cn/ubuntu`
  - Ubuntu arm64 / aarch64：`AGENT_SANDBOX_APT_MIRROR=https://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports`
可参考清华镜像站的Ubuntu镜像帮助和Ubuntu Ports镜像帮助确认其他Ubuntu版本的路径，使用其他镜像站时需选择对应仓库的普通或Ports路径。

## 配置生效机制
配置后，FastGPT会读取沙盒的`/etc/os-release`，根据Ubuntu版本和codename生成并覆盖`/etc/apt/sources.list.d/ubuntu.sources`，写入主仓库、updates、backports和security。修改配置前，已有sources文件会备份为`.copy`；删除环境变量后，有备份的文件会恢复，没有备份的文件保持不变。初始化阶段不会执行`apt-get update`。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/config/sandbox/opensandbox)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
