---
title: 解决FastGPT启动时提示找不到pluginTemplates目录的错误
slug: /zh/troubleshoot/fastgpt-missing-plugin-templates-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3622
source_type: GitHub issue
---

# 解决FastGPT启动时提示找不到pluginTemplates目录的错误

## 现象
启动FastGPT时触发初始化系统错误，完整报错信息如下：
```
Init system error Error: ENOENT: no such file or directory, scandir '/app/data/pluginTemplates'
    at readdirSync (node:fs:1507:26)
    at /app/projects/app/.next/server/chunks/59571.js:1:13060
    at C (/app/projects/app/.next/server/chunks/59571.js:1:13319)
    at Module.i (/app/projects/app/.next/server/instrumentation.js:1:2972)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async NextNodeServer.prepareImpl (/app/node_modules/.pnpm/next@14.2.5_@babel+core@7.24.9_babel-plugin-macros@3.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1_sass@1.77.8/node_modules/next/dist/server/next-server.js:475:17) {
  errno: -2,
  code: 'ENOENT',
  syscall: 'scandir',
  path: '/app/data/pluginTemplates'
}
```
报错核心信息为：系统无法执行scandir操作，目标路径`/app/data/pluginTemplates`不存在，错误码为ENOENT，errno为-2。

## 可能原因
该报错的直接原因是系统无法扫描指定的`/app/data/pluginTemplates`目录。结合部署逻辑推测，可能的触发场景包括：部署过程中未创建该插件模板目录，或数据挂载配置异常导致目录无法被正常访问，也可能是启动配置中指定了错误的目录路径。

## 排查步骤
1.  登录FastGPT部署所在的服务器或容器环境，进入应用部署目录，执行命令`ls -l /app/data`，检查该路径下是否存在`pluginTemplates`子目录。
2.  检查数据挂载的配置，确认`/app/data`路径对应的本地存储卷或目录已正确映射，没有出现路径偏移或挂载失败的情况。
3.  查看FastGPT的部署脚本或初始化脚本，确认是否包含创建`pluginTemplates`目录的相关步骤，若遗漏则需补充该步骤。
4.  检查启动命令或配置文件中是否明确指定了插件模板目录的路径，确认路径与`/app/data/pluginTemplates`一致。

## 解决与验证
若排查后确认`pluginTemplates`目录不存在，可通过命令`mkdir -p /app/data/pluginTemplates`手动创建该目录，其中`-p`参数用于自动创建上级目录。若为挂载配置错误，需修正挂载路径后重新部署启动服务。验证方式为：重新启动FastGPT服务，确认启动过程中不再出现该ENOENT报错，访问系统后检查插件模板相关功能是否可正常加载和使用。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3622)
