---
title: FastGPT自部署故障排查的通用注意事项与操作流程
slug: /zh/deploy/fastgpt-troubleshooting-precautions
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/troubleshooting/attention
source_type: 官方文档
---

# FastGPT自部署故障排查的通用注意事项与操作流程

## 通用排查流程与注意事项
使用FastGPT自部署版本遇到问题时，需先完成版本检查与基础排查。首先确认当前运行版本号，可通过首页或管理后台查看，若未使用最新稳定版，需参考更新指南升级，多数已知问题已在新版本修复。若升级后问题仍存在，按顺序排查：先查看Docker容器或服务器日志，提取具体错误栈信息；尝试清理浏览器缓存或使用无痕模式重新访问；最后确认数据库（MongoDB、PostgreSQL/Milvus）连接正常，且API密钥有效。

## 反向代理客户端IP防伪造配置
当FastGPT前置有反向代理、负载均衡或CDN时，需配置防止客户端伪造IP请求头，避免影响IP限流、白名单校验等功能。首先配置反向代理覆盖IP头，再开启FastGPT的可信代理校验。需设置环境变量`TRUSTED_PROXY_ENABLE=true`和`TRUSTED_PROXY_IPS`，该参数需填写FastGPT直接接收的上一跳代理IP或CIDR，例如Docker网段、内网代理地址，禁止填写`0.0.0.0/0`或普通客户端网段。

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
若CDN使用专用真实IP头，需修改`real_ip_header`为对应头名，并配置官方公布的出口IP段。配置完成后执行`nginx -t`校验，再执行`nginx -s reload`生效，可通过`curl -H X-Forwarded-For:6.6.6.6 -H X-Real-IP:6.6.6.6 https://fastgpt.example.com`验证，若FastGPT记录的仍为真实IP则配置正确。

## 问题反馈要求
若上述步骤无法解决问题，需整理完整信息联系支持：包括当前使用的完整版本号、问题详细描述与复现步骤、相关系统错误日志或截图，可先在GitHub Issues或相关社群搜索类似问题后再反馈。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/troubleshooting/attention
