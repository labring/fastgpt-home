---
title: 解决FastGPT私有部署4.7版本初始化脚本连接被拒绝问题
slug: /zh/troubleshoot/fastgpt-private-deploy-init-connect-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1102
source_type: GitHub issue
---

# 解决FastGPT私有部署4.7版本初始化脚本连接被拒绝问题

## 现象
执行`docker-compose pull`与`docker-compose up -d`完成FastGPT私有部署4.7版本初始化准备后，调用初始化接口：
```
sudo curl --location --request POST 'https://10.122.92.2/api/admin/initv47' --header 'rootkey: root_key' --header 'Content-Type: application/json'
```
返回报错：
```
curl: (7) Failed to connect to 10.122.92.2 port 443 after 0 ms: 连接被拒绝
```

## 可能原因
需按实际环境确认，无明确预设排查原因。

## 排查步骤
1. 执行`docker-compose ps`命令，确认所有容器处于正常运行状态。
2. 登录部署服务器，执行端口监听相关命令，确认443端口是否正常监听。
3. 确认调用初始化接口时使用的IP地址、`rootkey`参数与部署配置匹配。
4. 检查执行curl命令的主机与目标服务器的网络连通性，确认无访问限制。

## 解决与验证
根据排查结果修复对应问题后，重新执行初始化接口命令，确认无连接被拒绝报错，完成初始化流程。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1102)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
