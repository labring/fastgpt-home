---
title: 解决FastGPT对接Whisper的配置与运行模式排错
slug: /zh/troubleshoot/fastgpt-whisper-config-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2039
source_type: GitHub issue
---

# 解决FastGPT对接Whisper的配置与运行模式排错

## 现象
本地安装Whisper对接相关服务后运行正常，Docker部署时可指定CPU或GPU运行模式，但非Docker模式下无法完成运行模式设置。本地安装的Whisper需更改ACCESS_TOKEN，但不清楚具体配置方式。Docker环境下执行`docker run -itd --name whisper-api -p 3003:3003 -e ACCESS_TOKEN=12341234 --gpus all --restart=always whisper`命令设置ACCESS_TOKEN后，仍使用默认值，配置不生效。

## 可能原因
非Docker模式下，Whisper的运行模式未在代码中显式配置。ACCESS_TOKEN的配置规则与部署环境绑定，未按对应环境的要求完成配置。Docker部署时，环境变量参数传递存在错误或未重启服务，导致配置未被加载。

## 排查步骤
1. 确认部署环境类型为本地非Docker或Docker，明确需要配置的内容。
2. 针对本地非Docker环境，查看Whisper代码中的运行模式配置项与ACCESS_TOKEN配置位置。
3. 针对Docker环境，检查启动命令中的环境变量参数是否正确，确认参数格式符合容器读取规则。
4. 验证配置修改后是否重新启动了对应服务。

## 解决与验证
### 非Docker模式
运行模式需在Whisper的代码中显式配置。ACCESS_TOKEN需按代码中的配置逻辑设置，或新增verify_token函数后加载ACCESS_TOKEN环境变量。
### Docker环境
执行启动命令时，正确添加`-e ACCESS_TOKEN=目标TOKEN`参数，例如`docker run -itd --name whisper-api -p 3003:3003 -e ACCESS_TOKEN=12341234 --gpus all --restart=always whisper`。若配置不生效，需重启容器或重新部署服务使配置加载。可新增verify_token函数，在运行模型时加载配置好的ACCESS_TOKEN环境变量。

> 来源: [FastGPT GitHub issue #2039](https://github.com/labring/FastGPT/issues/2039)
