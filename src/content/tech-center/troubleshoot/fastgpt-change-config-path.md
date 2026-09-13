---
title: 修改FastGPT构建启动后config.json文件的默认读取路径
slug: /zh/troubleshoot/fastgpt-change-config-path
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4779
source_type: GitHub issue
---

# 修改FastGPT构建启动后config.json文件的默认读取路径

## 现象
执行npm run build构建FastGPT项目后，启动项目时程序会默认在/app/data目录下查找config.json配置文件，需将该配置文件更换至其他指定路径。

## 可能原因
FastGPT的配置读取逻辑默认将config.json的查找路径固定为/app/data，需通过调整对应代码逻辑修改该读取路径。

## 排查步骤
1. 定位到readConfigData方法所在的代码文件，路径为projects/app/src/service/common/system/index.ts。
2. 查看该文件的第26至47行代码，确认当前config.json的默认读取路径。
3. 确认需要更换的目标config.json文件路径，需按实际环境确认。

## 解决与验证
修改readConfigData方法中的config.json读取路径为目标路径。修改完成后，重新执行npm run build构建项目，启动项目后确认程序可在指定路径下正常加载config.json文件，验证配置读取是否成功。

> 来源: [FastGPT GitHub issue #4779](https://github.com/labring/FastGPT/issues/4779)
