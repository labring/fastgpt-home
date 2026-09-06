---
title: 解决FastGPT中Maximum call stack size exceeded报错问题
slug: /zh/troubleshoot/fastgpt-max-call-stack-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/260
source_type: GitHub issue
---

# 解决FastGPT中Maximum call stack size exceeded报错问题

## 现象
用户使用FastGPT时，运行日志或控制台会抛出RangeError类型报错，完整提示为：Maximum call stack size exceeded。从堆栈跟踪信息可见，错误反复触发于src/service/pg.ts文件的connectPg函数（第33行），同时关联node:internal/bootstrap/node模块的get方法（第411行），最终因调用栈持续累积超出最大限制导致崩溃。

## 可能原因
根据报错堆栈信息，核心问题是src/service/pg.ts中的connectPg函数出现了无限递归调用。函数在执行过程中反复调用自身，且未设置有效的终止条件，导致调用栈不断加深直至耗尽系统允许的最大调用栈大小。具体的触发场景需结合项目实际代码逻辑与运行环境确认。

## 排查步骤
1. 定位到报错指向的src/service/pg.ts文件，查看第17行与第33行的connectPg函数代码片段。
2. 检查该函数是否存在直接或间接调用自身的逻辑，确认是否遗漏了递归终止的判断条件。
3. 核对数据库连接相关的配置参数，确认是否存在配置错误导致连接失败，进而触发反复重试的逻辑。
4. 查看项目启动与运行的完整日志，排查是否存在其他前置错误间接引发该递归调用问题。

## 解决与验证
若问题源于递归调用逻辑错误，修改src/service/pg.ts中的connectPg函数，补充正确的递归终止条件，移除循环调用自身的代码路径。若问题由数据库连接配置错误导致，修正对应连接参数后重新部署项目。验证方式为重启FastGPT服务，执行原本触发报错的操作，确认日志中不再出现Maximum call stack size exceeded报错，且相关依赖数据库的功能可正常运行。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/260)
