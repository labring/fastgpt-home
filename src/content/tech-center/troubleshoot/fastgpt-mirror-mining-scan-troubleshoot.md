---
title: FastGPT私有部署镜像被扫描为挖矿程序的排查与解决
slug: /zh/troubleshoot/fastgpt-mirror-mining-scan-troubleshoot
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4648
source_type: GitHub issue
---

# FastGPT私有部署镜像被扫描为挖矿程序的排查与解决

## 现象
在阿里云ECS环境中，部署registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt:v4.8.12镜像时，安全扫描工具识别该镜像包含挖矿程序。

## 可能原因
目前无FastGPT官方的明确说明，可能为安全扫描工具的误判，或镜像中存在被误识别为挖矿程序的文件。具体原因需结合实际扫描日志、镜像文件内容进一步确认。

## 排查步骤
1.  提取安全扫描工具返回的具体识别结果，记录被标记为挖矿程序的文件路径、特征信息与扫描规则描述。
2.  拉取对应版本的FastGPT官方镜像，在本地环境执行文件扫描，对比扫描标记的文件内容与官方代码库的对应文件。
3.  核对镜像的官方来源地址与哈希值，确认镜像未被第三方篡改或植入异常内容。
4.  查询FastGPT官方社区的同类问题记录，或联系安全扫描工具厂商确认当前版本镜像的误报规则。

## 解决与验证
若确认扫描结果为误报，可向安全扫描工具提交误报申诉，或调整扫描规则以排除该镜像的误标记。若镜像确实存在异常，需重新拉取官方镜像，或联系FastGPT官方确认镜像的安全状态。验证方式为启动镜像并运行基础功能，确认无异常行为，同时重新提交扫描确认标记已移除。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4648)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
