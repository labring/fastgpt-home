---
title: FastGPT V4.14.10版本升级操作与验证指南
slug: /zh/deploy/upgrade-v4-14-10
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41410
source_type: 官方文档
---

# FastGPT V4.14.10版本升级操作与验证指南

## 这个版本改了什么
### 新增内容
1. 增加OpenSandbox docker部署方案及适配，支持通过挂载volume进行数据持久化
2. 新增沙盒读取文件链接工具，支持AI返回文件访问链接
3. 新增微信个人号发布渠道
4. 飞书发布渠道支持流输出
5. 支持通过环境变量配置目录最大上限
6. 增加rerank模型上限配置，避免超出单条document上限导致rerank失败
7. 增加LLM梯度计量计费模式，统一计费推送方式

### 优化内容
1. 优化工作流runtime，减少计算复杂度
2. 增加大变量计算限制，避免计算复杂度过高导致线程阻塞
3. 移除模型配置里“用于知识库文件处理”、“用于问题分类”等配置，统一增加“测试模型”标志。测试模型带有特殊标识，仅可在AI chat中使用，其余场景将被过滤

### 修复内容
1. 子工作流的全局变量默认值未生效
2. agent模式下已配置的rerank模型不显示
3. bge-m3 embedding向量模型输出都为0的问题
4. MCP并发调用时，连接异常导致调用失败
5. 修复登录接口安全问题
6. 修复MCP SSRF安全问题
7. 修复工作流工具错误未成功捕获问题
8. 修复子工作流全局变量默认值未生效

## 升级前要确认的事
1. 若使用docker compose部署方案，需提前准备调整配置文件；若使用sealos商业版，需联系支持人员获取在线沙盒服务方案
2. 备份原有docker-compose.yml及相关配置文件
3. 知悉原有sandbox服务的镜像名需从fastgpt-sandbox修改为fastgpt-code-sandbox

## 升级步骤（照做）
1. 调整docker compose配置：
   - 在文件顶部增加`x-volume-manager-auth-token: &x-volume-manager-auth-token 'vmtoken'`变量配置
   - 新增5组services：`opensandbox-server`、`opensandbox-agent-sandbox-image`、`opensandbox-execd-image`、`opensandbox-egress-image`、`fastgpt-volume-manager`
   - 调整`networks`配置，参考最新部署yml文件完全修改
   - 新增`configs`配置，复制部署yml文件底部的对应内容
   - 修改`fastgpt-app`/`fastgpt-pro`环境变量，添加以下配置：
     ```bash
     # ==================== Agent sandbox 配置 ====================
     AGENT_SANDBOX_PROVIDER: opensandbox
     # OpenSandbox 配置（PROVIDER: opensandbox 时生效）
     AGENT_SANDBOX_OPENSANDBOX_BASEURL: http://opensandbox-server:8090
     AGENT_SANDBOX_OPENSANDBOX_API_KEY:
     AGENT_SANDBOX_OPENSANDBOX_RUNTIME: docker
     AGENT_SANDBOX_OPENSANDBOX_IMAGE_REPO: registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-agent-sandbox
     AGENT_SANDBOX_OPENSANDBOX_IMAGE_TAG: v0.1
     AGENT_SANDBOX_OPENSANDBOX_USE_SERVER_PROXY: true
     # Volume 持久化配置（opensandbox provider 下可选）
     AGENT_SANDBOX_ENABLE_VOLUME: true
     AGENT_SANDBOX_VOLUME_MANAGER_URL: http://volume-manager:3000
     AGENT_SANDBOX_VOLUME_MANAGER_TOKEN: *x-volume-manager-auth-token
     ```
2. 修改sandbox服务镜像名：将原有`fastgpt-sandbox`替换为`fastgpt-code-sandbox`
3. 更新各服务镜像tag：
   - fastgpt-app: v4.14.10.4
   - fastgpt-pro: v4.14.10
   - code-sandbox: v4.14.10
   - fastgpt-plugin: v0.5.6
4. 重启所有服务
5. 重新更新系统工具：可通过卸载再安装或导入pkg覆盖的方式，恢复工具头像

## 升级后怎么验证
1. 确认所有服务正常启动，各镜像版本与更新后的tag一致
2. 测试沙盒读取文件链接工具功能是否正常
3. 验证微信个人号、飞书发布渠道的发布功能正常
4. 测试工作流运行、rerank模型配置、LLM梯度计费功能是否正常
5. 重新导入系统工具pkg后，确认工具头像恢复显示
6. 验证子工作流全局变量默认值生效、rerank模型正常显示等修复项是否解决

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41410)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
