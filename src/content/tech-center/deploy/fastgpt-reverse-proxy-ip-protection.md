---
title: 解决FastGPT反向代理场景下的客户端IP伪造防护问题
slug: /zh/deploy/fastgpt-reverse-proxy-ip-protection
page_type: 部署场景
source: https://doc.fastgpt.cn/self-host/troubleshooting/attention
source_type: 官方文档小节
---

# 解决FastGPT反向代理场景下的客户端IP伪造防护问题

# 场景说明
FastGPT 会在 IP 限流、分享链接 IP 白名单、对话日志 IP 记录、IP 属地展示等场景读取客户端 IP。自部署时如果 FastGPT 前面有 Nginx、负载均衡、Ingress 或 CDN，需要避免客户端伪造 X-Forwarded-For 或 X-Real-IP 请求头。需要同时完成三项配置：覆盖外部传入的 IP 请求头、开启可信代理校验、限制 FastGPT 端口暴露范围。

# 配置操作步骤
首先配置 FastGPT 环境变量，开启可信代理校验并指定可信代理网段：
```
TRUSTED_PROXY_ENABLE = true
TRUSTED_PROXY_IPS = 172.18.0.0/16
```
TRUSTED_PROXY_IPS 需要填写 FastGPT 直接看到的上一跳代理 IP 或 CIDR，例如 Nginx 容器所在 Docker 网段、Ingress Controller 内网地址或负载均衡回源地址。请勿填写 0.0.0.0/0，也不要把普通客户端网段加入可信列表。

接下来配置 Nginx，根据部署场景选择对应配置：
1. 单层 Nginx 直接对外时的配置：
```nginx
server {
listen 80 ;
server_name fastgpt.example.com;
location / {
proxy_pass http://fastgpt:3000;
proxy_http_version 1.1 ;
proxy_set_header Host $host;
proxy_set_header X-Forwarded-Proto $scheme;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $remote_addr;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection "upgrade" ;
}
}
```
2. Nginx 前置 CDN 或负载均衡时的配置：
```nginx
server {
listen 80 ;
server_name fastgpt.example.com;
# 只填写你的 CDN 或负载均衡出口 IP/CIDR，不要信任所有来源。
set_real_ip_from 10.0.0.0/8;
set_real_ip_from 172.16.0.0/12;
real_ip_header X-Forwarded-For;
real_ip_recursive on ;
location / {
proxy_pass http://fastgpt:3000;
proxy_http_version 1.1 ;
proxy_set_header Host $host;
proxy_set_header X-Forwarded-Proto $scheme;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $remote_addr;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection "upgrade" ;
}
}
```
如果 CDN 使用专用真实 IP 头，需要把 real_ip_header 改成对应头名，并把 set_real_ip_from 配置为该 CDN 官方公布的出口 IP 段。

配置完成后执行验证命令：
```bash
nginx -t && nginx -s reload
curl -H 'X-Forwarded-For: 6.6.6.6' -H 'X-Real-IP: 6.6.6.6' https://fastgpt.example.com
```
若配置正确，FastGPT 记录和校验的仍应是真实客户端 IP，不是 6.6.6.6。

# 端口暴露限制
需要通过防火墙或安全组只允许反向代理访问 FastGPT 服务端口，避免用户绕过 Nginx 直连 FastGPT。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/troubleshooting/attention)
