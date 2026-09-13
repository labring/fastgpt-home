---
title: 解决FastGPT启动时加载系统模型报错的问题
slug: /zh/troubleshoot/fastgpt-startup-model-load-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5823
source_type: GitHub issue
---

# 解决FastGPT启动时加载系统模型报错的问题

## 现象
私有部署FastGPT 4.13.2版本，搭配fastgpt-plugin V0.2.4时，项目启动时抛出报错：`Load systen model error, please check fastgpt-plugin TypeError: fetch failed`，同时会输出对应的Node.js调用栈日志。

## 可能原因
该报错源于FastGPT调用fastgpt-plugin时的网络请求失败，可能的触发因素包括：fastgpt-plugin服务未正常启动、FastGPT与fastgpt-plugin的网络连通性异常、配置的fastgpt-plugin访问地址有误。

## 排查步骤
1.  确认fastgpt-plugin服务已正常启动，核对其监听地址与端口是否与FastGPT配置中的对应参数一致。
2.  在FastGPT部署的服务器上，使用curl工具访问配置的fastgpt-plugin地址，验证网络连通性，例如执行`curl http://{fastgpt-plugin配置地址}`，确认可以正常获取返回内容。
3.  检查FastGPT的配置文件，确认fastgpt-plugin相关的配置项参数无误。
4.  查看fastgpt-plugin的运行日志，排查其自身是否存在启动异常或请求处理失败的情况。

## 解决与验证
根据排查结果修复对应问题，例如启动未正常运行的fastgpt-plugin、修正错误的访问地址、解决网络连通障碍等。修复完成后，重新启动FastGPT服务，观察启动日志，确认不再出现`Load systen model error, please check fastgpt-plugin TypeError: fetch failed`报错，即可验证问题已解决。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/5823)
