---
title: 解决FastGPT本地连接远程OneAPI模型测试失败的问题
slug: /zh/troubleshoot/fastgpt-local-remote-oneapi-connect-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3930
source_type: GitHub issue
---

# 解决FastGPT本地连接远程OneAPI模型测试失败的问题

## 现象
用户使用私有部署V4.8.22版本的FastGPT，在本地Windows环境启动。其远程OneAPI服务通过Docker部署在CentOS服务器，地址为192.168.0.243，端口3001，且OneAPI已完成模型添加并本地测试成功。用户在FastGPT的模型添加页面配置该远程模型后，执行模型测试时出现报错，无法正常连接远程模型服务。

## 可能原因
结合本次部署与操作的具体信息，可能的触发原因包括：第一，本地Windows主机无法连通远程CentOS服务器的3001端口；第二，FastGPT的env.local配置文件中，OneAPI服务的地址、端口等参数配置有误；第三，服务器或本地主机的防火墙规则拦截了3001端口的跨网段通信；第四，FastGPT配置的模型名称、密钥与OneAPI中的实际参数不匹配。

## 排查步骤
1.  验证端口连通性：在本地Windows的命令提示符中执行`telnet 192.168.0.243 3001`，检查是否能建立连接。若无法连接，需进一步排查网络路由或防火墙设置。
2.  核对环境配置：打开FastGPT的env.local配置文件，确认其中关于OneAPI服务的地址、端口参数，与实际部署的192.168.0.243:3001完全一致。
3.  检查防火墙规则：登录CentOS服务器，确认3001端口已开放，且允许本地Windows主机的IP地址访问该端口。同时检查本地Windows的防火墙是否拦截了出站到该地址和端口的请求。
4.  核对模型参数：确认OneAPI平台中已添加的模型名称、访问密钥等信息，与FastGPT模型添加页面中配置的参数完全匹配。

## 解决与验证
根据排查结果执行对应修复操作：若存在端口连通问题，修复网络路由配置或调整防火墙规则，确保本地Windows主机可以正常访问192.168.0.243的3001端口；若配置参数有误，修正env.local文件中的对应配置项；若模型参数不匹配，调整FastGPT中的模型配置至与OneAPI一致。修复完成后，重新保存FastGPT的模型配置，再次执行模型测试，确认测试结果显示成功。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3930)
