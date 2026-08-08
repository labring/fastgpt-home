---
title: FastGPT自部署故障排查通用注意事项与操作步骤
slug: /zh/deploy/fastgpt-self-deploy-troubleshooting
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/troubleshooting/attention
source_type: 官方文档
---

# FastGPT自部署故障排查通用注意事项与操作步骤

## 通用排查前置步骤
使用FastGPT遇到问题时，需先完成版本检查与基础排查流程：
1. 版本检查与升级：多数已知问题已在最新版本修复，先在FastGPT首页或管理后台查看当前运行的版本号，若非最新稳定版，参考更新指南升级至最新版本。
2. 基础排查顺序：若升级后问题仍存在，按以下顺序排查：首先查看Docker容器或服务器日志，提取具体的Error Stack报错信息；其次清理浏览器缓存或使用无痕模式重新访问；最后确认数据库（MongoDB、PostgreSQL/Milvus）连接正常，且API密钥有效。

## 反向代理客户端IP防伪造配置
当FastGPT前置有反向代理、负载均衡或CDN时，需防止客户端伪造X-Forwarded-For、X-Real-IP等请求头，避免影响IP限流、分享链接白名单、对话日志IP记录等功能。需完成三项配置：
1. 配置反向代理覆盖IP请求头；
2. 开启FastGPT可信代理校验；
3. 限制服务端口暴露范围，仅允许反向代理访问FastGPT服务端口。

FastGPT需配置以下环境变量：
```
TRUSTED_PROXY_ENABLE = true
TRUSTED_PROXY_IPS = 172.18.0.0/16
```
其中`TRUSTED_PROXY_IPS`需填写FastGPT直接接收的上一跳代理IP或CIDR（如Nginx容器所在Docker网段），禁止填写`0.0.0.0/0`或普通客户端网段。

### 单层Nginx直接对外配置示例
```nginx
server {
    listen 80;
    server_name fastgpt.example.com;
    location / {
        proxy_pass http://fastgpt:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection upgrade;
    }
}
```

### 带CDN/负载均衡的Nginx配置示例
```nginx
server {
    listen 80;
    server_name fastgpt.example.com;
    # 仅填写CDN或负载均衡出口IP/CIDR
    set_real_ip_from 10.0.0.0/8;
    set_real_ip_from 172.16.0.0/12;
    real_ip_header X-Forwarded-For;
    real_ip_recursive on;
    location / {
        proxy_pass http://fastgpt:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection upgrade;
    }
}
```

配置完成后执行`nginx -t`验证配置，再执行`nginx -s reload`生效。可通过以下命令验证配置是否正确：
```bash
curl -H X-Forwarded-For: 6.6.6.6 -H X-Real-IP: 6.6.6.6 https://fastgpt.example.com
```
若FastGPT记录的是真实客户端IP而非`6.6.6.6`，则配置生效。

## 问题反馈要求
若上述步骤均无法解决问题，可先在GitHub Issues或相关社群搜索类似问题。联系技术支持时，需提供当前使用的完整版本号、问题的详细描述与复现步骤、相关的系统错误日志或截图。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/troubleshooting/attention
