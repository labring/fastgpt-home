---
title: FastGPT v4.15.1及以上Pro版环境变量配置要求
slug: /zh/reference/fastgpt-pro-env-config
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/4-15/4151
source_type: 官方文档小节
---

# FastGPT v4.15.1及以上Pro版环境变量配置要求

## 结论
FastGPT v4.15.1版本起，Pro/Admin服务的内部接口鉴权方式更新，需配置PRO_TOKEN和必填的FE_DOMAIN环境变量。社区版无需进行此项配置。

## 具体怎么做
1.  配置必填环境变量：
    - FE_DOMAIN：设置为FastGPT的域名，对应值为`fastgpt_domain`
    - PRO_TOKEN：生成至少32位的随机字符串，FastGPT主应用与Pro/Admin服务需配置完全相同的该值
2.  若FastGPT主应用配置了PRO_URL，必须同时配置PRO_TOKEN。

## 注意事项
- PRO_TOKEN长度必须不少于32位，主应用与Pro/Admin服务的配置值需保持一致。
- 若未配置PRO_TOKEN，Pro/Admin服务的内部接口鉴权会失败；FastGPT主应用配置PRO_URL时未配置PRO_TOKEN会导致服务启动失败。
- rootkey不再作为FastGPT主应用访问Pro/Admin内部接口的凭证，仅作为系统管理员密钥，用于调用`/api/admin/**`接口。
- 开源版部署配置文件不会内置PRO_TOKEN，Pro部署需在私有部署环境变量中手动添加该配置。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/4-15/4151)
