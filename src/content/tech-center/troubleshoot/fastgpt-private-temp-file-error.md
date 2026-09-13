---
title: 解决FastGPT私有部署多文件上传时临时文件丢失的问题
slug: /zh/troubleshoot/fastgpt-private-temp-file-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3880
source_type: GitHub issue
---

# 解决FastGPT私有部署多文件上传时临时文件丢失的问题

## 现象
私有部署版本4.8.21的FastGPT中，同时上传多个文件时，调用/v1/parse/file接口会返回500 Internal Server Error。报错日志显示FileNotFoundError: /root/temp/file.pdf，对应api_mp.py文件中read_file函数的第91行，loop.run_in_executor调用process_file_with_multiprocessing时无法找到指定临时文件。

## 可能原因
FastGPT的read_file函数为每个请求生成基于UUID的临时目录存储上传文件，在多进程处理文件任务完成后，立即删除了该临时目录。由于异步执行逻辑与文件清理的时序问题，部分请求中临时文件尚未完成处理就被删除，触发文件未找到错误。

## 排查步骤
1. 登录FastGPT的部署容器，找到api_mp.py文件中的read_file函数。
2. 查看函数内临时目录的创建与删除逻辑，确认删除操作的执行位置。
3. 执行多文件上传测试，复现500错误并查看完整报错日志。
4. 核对报错中的临时文件路径与代码中生成的路径是否一致。

## 解决与验证
修改api_mp.py中的read_file函数，调整临时目录的删除时机，确保在多进程任务完全结束且所有依赖该目录的操作完成后再执行删除。也可移除自动删除临时目录的代码，改用全局定期清理机制。验证方法：重新上传多个文件，检查接口是否返回正常结果，查看日志是否不再出现FileNotFoundError相关报错。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3880)
