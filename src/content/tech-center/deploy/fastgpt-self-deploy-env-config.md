---
title: FastGPT自部署场景下的环境变量配置与参数说明
slug: /zh/deploy/fastgpt-self-deploy-env-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/config/env
source_type: 官方文档
---

# FastGPT自部署场景下的环境变量配置与参数说明

## 环境变量分类与适用服务
FastGPT自部署的核心服务包括主应用（projects/app）、商业版后台（pro/admin）与代码沙箱（projects/code-sandbox）。其中主应用与商业版后台会复用大部分服务端配置，数据库、密钥、对象存储等通用变量合并说明，专属变量单独列出。共享布尔变量使用`true`、`1`、`yes`或`y`表示开启，其余值视为关闭；`FILE_TOKEN_KEY`、`AES256_SECRET_KEY`与`INVOKE_TOKEN_SECRET`为运行期必填项，建议使用随机强密钥，不可使用示例值。

## 可直接复用的最小配置示例
在部署配置文件中添加以下基础环境变量即可完成最小可用配置：
1.  配置运行期必填密钥：
    ```env
    FILE_TOKEN_KEY=your-random-file-key-123456 # 文件读取鉴权密钥
    AES256_SECRET_KEY=your-aes-secret-key-654321 # AES加解密密钥
    INVOKE_TOKEN_SECRET=your-long-invoke-jwt-secret-789abcdef012 # 反向调用JWT密钥
    ```
2.  配置基础服务参数（均使用默认值或通用配置）：
    ```env
    DB_MAX_LINK=5 # 数据库连接池最大连接数
    SYNC_INDEX=true # 启动时自动创建缺失索引并清理废弃索引
    ROOT_KEY=fastgpt_root_key # 系统管理员API密钥
    CODE_SANDBOX_URL=http://localhost:3002 # 代码沙箱服务地址
    CODE_SANDBOX_TOKEN=codesandbox # 沙箱认证令牌
    ```
3.  配置模型调用参数（以兼容OpenAI协议为例）：
    ```env
    OPENAI_BASE_URL=https://api.openai.com/v1 # 默认模型接口地址
    CHAT_API_KEY=sk-你的实际API密钥 # 模型调用API密钥
    ```

## 其他配置注意事项
`PRO_TOKEN`与`PRO_URL`为商业版专用配置，非商业版无需设置；Agent沙箱需根据选定的提供方配置对应服务地址与密钥，未配置则不启用。`PLUGIN_BASE_URL`与`PLUGIN_TOKEN`用于配置插件服务的地址与认证令牌，默认指向本地3004端口的插件服务。部分App侧专属开关会在单独的配置项中说明，`packages/service/env.ts`包含少量此类变量。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
