---
title: 配置FastGPT Agent沙箱的自定义软件依赖源
slug: /zh/deploy/fastgpt-sandbox-custom-deps
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/config/sandbox/sealosdevbox
source_type: 官方文档
---

# 配置FastGPT Agent沙箱的自定义软件依赖源

自定义依赖源配置适用于FastGPT的Agent沙箱环境，OpenSandbox与Sealos Devbox共享该配置逻辑，其中apt类型的镜像仅在root权限的Agent沙箱中生效。

### 配置环境变量示例
```dotenv
AGENT_SANDBOX_NPM_REGISTRY=https://registry.npmmirror.com
AGENT_SANDBOX_PYPI_INDEX_URL=https://pypi.tuna.tsinghua.edu.cn/simple
AGENT_SANDBOX_APT_MIRROR=https://mirrors.tuna.tsinghua.edu.cn/debian
```
其中AGENT_SANDBOX_NPM_REGISTRY用于配置npm包管理的镜像源，AGENT_SANDBOX_PYPI_INDEX_URL用于配置Python包管理的PyPI镜像源，AGENT_SANDBOX_APT_MIRROR用于配置Debian/Ubuntu系统的apt软件包镜像源。

### 配置生效与恢复规则
对于root权限的Agent沙箱，系统会根据发行版生成并覆盖标准的Ubuntu或Debian的.sources系统文件，在覆盖原有文件前，会自动创建带有.copy后缀的备份文件。如果后续删除对应的环境变量，系统会尝试恢复配置：带有.copy备份的文件将被还原至初始状态，没有备份的文件则不会执行任何恢复操作。初始化阶段不会自动执行apt-get update命令。如果运行环境为arm64架构，需确保配置的镜像源提供对应架构的软件包，否则可能无法正常安装依赖。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/config/sandbox/sealosdevbox)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
