---
title: FastGPT打包后出现模型配置报错与菜单崩溃问题排查
slug: /zh/troubleshoot/fastgpt-packaging-model-config-crash
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3713
source_type: GitHub issue
---

# FastGPT打包后出现模型配置报错与菜单崩溃问题排查

## 现象
用户以相同方式打包4.8.20与4.8.20-fix版本均正常，但打包4.8.20-fix2（更改内容与4.8.20一致）后出现三类问题：1. 可用模型列表为空；2. 模型配置触发报错；3. 点击知识库菜单、流程菜单后程序崩溃。启动日志包含报错：`Load models error Error: ENOENT: no such file or directory, scandir 'app/packages/service/core/ai/config/provider'`，同时接口`/api/core/ai/model/list`返回错误：`Cannot read properties of undefined (reading 'map')`。

## 可能原因
结合报错信息分析，系统尝试扫描`app/packages/service/core/ai/config/provider`目录时失败，该目录不存在或路径配置有误，导致模型配置加载失败并返回undefined数据，进而触发`map`方法调用报错，引发可用模型为空、接口响应异常以及菜单崩溃的连锁问题。该问题大概率源于打包过程中遗漏了该目录的打包规则，导致部署包中未包含该目录。

## 排查步骤
1. 登录部署环境，检查部署包中是否存在`app/packages/service/core/ai/config/provider`目录，确认目录路径是否正确。
2. 查看服务启动日志，确认ENOENT报错对应的缺失目录路径。
3. 核对打包相关配置，确认是否遗漏了该provider目录的打包规则。
4. 对比正常打包的4.8.20版本与出错的4.8.20-fix2版本的打包配置，找出配置差异。
5. 重启服务后，访问`/api/core/ai/model/list`接口，确认返回数据是否包含有效模型列表。

## 解决与验证
解决方法为将`app/packages/service/core/ai/config/provider`目录正确添加到打包配置中，确保打包后的部署包包含该目录及其内部文件。验证步骤：1. 重新执行打包流程，确认部署包中存在该目录。2. 启动服务，检查日志中是否仍存在ENOENT类型的报错。3. 登录系统前端，确认可用模型列表正常显示，点击知识库、流程菜单不再崩溃。4. 测试模型配置功能，确认不再出现配置报错。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3713)
