---
title: FastGPT使用Ollama的主机安装与监听配置方法
slug: /zh/reference/fastgpt-ollama-host-install-config
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/custom-models/ollama
source_type: 官方文档小节
---

# FastGPT使用Ollama的主机安装与监听配置方法

## 结论
本文提供非Docker方式的Ollama主机安装流程，以及适配FastGPT的监听配置方法。完成安装后可通过http://localhost:11434验证Ollama是否正常运行。

## 具体怎么做
### 主机安装步骤
1. MacOS：已安装Homebrew的前提下，执行`brew install ollama`，安装完成后运行`ollama serve`启动服务。
2. Linux（以Ubuntu为例）：执行`curl https://ollama.com/install.sh | sh`下载并执行官方安装脚本，完成后运行`ollama serve`启动服务。
3. Windows：从Ollama官方网站下载Windows安装程序，按向导完成安装，在命令提示符或PowerShell中运行`ollama serve`启动服务。

### 监听0.0.0.0配置
1. Linux：执行`sudo systemctl edit ollama.service`，在[Service]部分添加`Environment="OLLAMA_HOST=0.0.0.0"`，保存退出后执行`sudo systemctl daemon-reload`和`sudo systemctl restart ollama`生效配置。
2. MacOS：执行`launchctl setenv ollama_host "0.0.0.0"`，重启Ollama应用使配置生效。
3. Windows：打开“编辑系统环境变量”，在系统变量中新建`OLLAMA_HOST`变量，值设为`0.0.0.0`，保存后重启Ollama应用。

## 注意事项
仅使用主机安装Ollama时，必须配置监听0.0.0.0才能被FastGPT正常访问。不同操作系统的配置方式存在差异，需严格按照对应系统的步骤操作。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/custom-models/ollama)
