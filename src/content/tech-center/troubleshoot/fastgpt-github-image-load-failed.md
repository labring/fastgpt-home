---
title: 解决FastGPT使用过程中GitHub关联图片无法正常显示的问题
slug: /zh/troubleshoot/fastgpt-github-image-load-failed
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6312
source_type: GitHub issue
---

# 解决FastGPT使用过程中GitHub关联图片无法正常显示的问题

## 现象
在FastGPT的使用或部署场景中，出现图片无法正常加载显示的问题，页面仅展示图片占位符。本次issue附带的截图尺寸为1761×1128，对应图片资源链接为`https://github.com/user-attachments/assets/c6191e26-ea70-4a0e-9e62-506f31abb84c`，无法正常加载出实际图片内容。

## 可能原因
因仅提供了异常截图，具体原因需按实际环境确认，可能涉及以下方向：图片资源的访问权限限制、FastGPT的资源加载配置拦截、网络环境导致的资源加载失败。

## 排查步骤
1.  在浏览器中直接打开issue附带的图片资源链接`https://github.com/user-attachments/assets/c6191e26-ea70-4a0e-9e62-506f31abb84c`，确认该链接是否可以正常加载图片。
2.  检查FastGPT运行所在的网络环境，确认是否存在防火墙、代理或访问策略，限制了对GitHub用户附件资源的访问。
3.  查看FastGPT的运行日志，搜索与图片资源加载相关的错误信息（日志路径与关键词需按实际环境确认）。
4.  核对FastGPT的静态资源加载配置，确认是否存在对外部图片资源的拦截规则（配置项需按实际环境确认）。

## 解决与验证
1.  若直接访问图片链接无法加载，联系资源提供方或平台修复该链接的访问权限问题。
2.  若因网络限制导致加载失败，调整网络策略或配置代理，允许访问GitHub用户附件类资源。
3.  若因FastGPT配置拦截了外部资源，按实际环境修改对应配置项以放行目标资源。
4.  验证方法：在FastGPT中重新上传或引用目标图片，确认图片可以正常加载并显示。

> 来源：https://github.com/labring/FastGPT/issues/6312
