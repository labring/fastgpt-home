---
title: FastGPT中ReRank模型的配置与版本升级方法
slug: /zh/reference/fastgpt-rerank-upgrade-config
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/47
source_type: 官方文档小节
---

# FastGPT中ReRank模型的配置与版本升级方法

## 结论
FastGPT 4.7版本对ReRank模型格式作出调整，兼容Cohere格式的API接口。本地部署ReRank模型需更换指定镜像，也可通过配置文件接入对应重排服务。

## 具体怎么做
1.  本地ReRank模型适配：更换部署镜像为 `registry.cn-hangzhou.aliyuncs.com/fastgpt/bge-rerank-base:v0.1`。
2.  第三方重排服务接入：
    a.  访问https://dashboard.cohere.com/api-keys申请官方密钥。
    b.  编辑FastGPT配置文件，添加或更新`reRankModels`字段，示例配置如下：
    ```json
    {
        "reRankModels": [
            {
                "model": "rerank-multilingual-v2.0",
                "name": "检索重排",
                "requestUrl": "https://api.cohere.ai/v1/rerank",
                "requestAuth": "Coherer上申请的key"
            }
        ]
    }
    ```

## 注意事项
1.  该配置仅适用于FastGPT 4.7及以上版本。
2.  配置文件中的`requestAuth`需填写正确的申请到的密钥，否则会触发认证失败报错。
3.  修改配置文件后需重启FastGPT服务，配置方可生效。
4.  配置中的`model`字段需与所使用的重排模型名称严格对应。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/47)
