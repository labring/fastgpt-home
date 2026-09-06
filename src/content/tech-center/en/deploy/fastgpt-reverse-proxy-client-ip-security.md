---
title: Prevent Spoofed Client IPs for FastGPT Behind Proxies
slug: /en/deploy/fastgpt-reverse-proxy-client-ip-security
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/troubleshooting/attention
source_type: Official documentation
---

# Prevent Spoofed Client IPs for FastGPT Behind Proxies

## Problem Context
FastGPT uses client IP addresses for multiple critical features: IP rate limiting, share-link IP allowlists, chat log IP records, and IP geolocation. When self-hosted FastGPT is deployed behind a reverse proxy, load balancer, Ingress controller, or CDN, unfiltered incoming `X-Forwarded-For` or `X-Real-IP` headers allow attackers to spoof client IPs, bypassing security controls and corrupting IP-based data.

## Mandatory Configuration Steps
To mitigate this risk, follow three core setup rules:
1. Overwrite incoming IP headers in the final reverse proxy: do not pass user-supplied `X-Forwarded-For` headers; instead, set the header to the real connection source IP.
2. Enable trusted proxy validation in FastGPT to only trust forwarded IP headers from approved proxy sources.
3. Restrict direct access to FastGPT’s service port via firewall or security group rules, allowing only the reverse proxy to connect.

### FastGPT Environment Variables
Set these values in your FastGPT `.env` file:
```dotenv
TRUSTED_PROXY_ENABLE=true
TRUSTED_PROXY_IPS=172.18.0.0/16
```
`TRUSTED_PROXY_IPS` must include the direct upstream proxy’s IP or CIDR range, such as the Docker subnet for the Nginx container, Ingress Controller private address, or load balancer origin address. Never use a trust-all CIDR like `0.0.0.0/0`, and do not add regular client networks to the trusted list.

### Nginx Configuration Examples
For a single Nginx layer exposed directly to end users:
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
        proxy_set_header Connection "upgrade";
    }
}
```
For deployments with a CDN or load balancer in front of Nginx, add upstream proxy IP ranges to Nginx’s trusted list first:
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
        proxy_set_header Connection "upgrade";
    }
}
```
If your CDN uses a dedicated real-IP header (such as Cloudflare’s `CF-Connecting-IP`), replace `real_ip_header` with that header value and configure `set_real_ip_from` to the CDN’s published egress IP ranges.

## Validation
After updating Nginx configurations, apply changes with:
```bash
nginx -t && nginx -s reload
```
Test your setup by sending a request with spoofed IP headers:
```bash
curl -H 'X-Forwarded-For: 6.6.6.6' -H 'X-Real-IP: 6.6.6.6' https://fastgpt.example.com
```
A correct configuration will record and validate the real client IP instead of the spoofed `6.6.6.6` value.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/troubleshooting/attention)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
