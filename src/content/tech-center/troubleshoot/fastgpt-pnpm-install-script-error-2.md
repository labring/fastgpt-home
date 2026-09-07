---
title: 解决FastGPT私有部署pnpm安装脚本缺失报错问题
slug: /zh/troubleshoot/fastgpt-pnpm-install-script-error-2
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1572
source_type: GitHub issue
---

# 解决FastGPT私有部署pnpm安装脚本缺失报错问题

## 现象
在FastGPT私有部署场景下，执行`pnpm i`安装依赖时，postinstall脚本阶段触发报错。具体错误信息为：
```
ERR_PNPM_NO_SCRIPT  Missing script: gen:theme-typings
Command "gen:theme-typings
" not found. Did you mean "pnpm run gen:theme-typings"?
```
本次问题涉及的环境为：Ubuntu22.04 64位系统，Node.js18.16.1，pnpm9.1.1，使用的是2024年5月22日下载的master分支私有部署版本4.8.1-a。

## 可能原因
结合报错信息与已排查的内容，可能的触发原因为：
1. postinstall.sh脚本中调用`pnpm run gen:theme-typings`的命令存在格式问题，比如换行导致命令解析异常；
2. 当前使用的pnpm 9.x版本对脚本执行的解析规则与旧版本存在差异；
3. 脚本文件的执行权限不足，无法正常触发脚本内的命令。

## 排查步骤
1. 查看项目根目录下的package.json文件，确认scripts字段中是否存在`gen:theme-typings`的脚本配置；
2. 打开scripts/postinstall.sh文件，检查`pnpm run gen:theme-typings`命令的格式，确认是否存在多余换行、空格或语法错误；
3. 执行`pnpm -v`命令，确认当前使用的pnpm版本是否为9.1.1或其他9.x系列版本；
4. 执行`chmod +x ./scripts/postinstall.sh`命令，为postinstall脚本添加执行权限。

## 解决与验证
1. 若为脚本格式问题，修改postinstall.sh文件，将`pnpm run gen:theme-typings`调整为单独一行的正确格式，移除多余的换行或空格；
2. 若确认是pnpm 9.x版本的兼容性问题，可临时降级pnpm至8.x版本后重试；
3. 重新执行`pnpm i`命令，确认postinstall阶段不再触发脚本缺失报错，依赖安装流程正常完成。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1572)
