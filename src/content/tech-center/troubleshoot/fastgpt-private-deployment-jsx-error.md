---
title: 解决FastGPT私有部署后网页报jsxDEV类型错误问题
slug: /zh/troubleshoot/fastgpt-private-deployment-jsx-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5843
source_type: GitHub issue
---

# 解决FastGPT私有部署后网页报jsxDEV类型错误问题

## 现象
本地无Docker私有部署FastGPT 4.13.2版本，从4.8版本升级并拉取最新fastgpt-plugin仓库代码后，FastGPT主服务完成配置与打包，通过pnpm next dev启动成功，但网页访问时出现报错：TypeError: (0 , react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV) is not a function。用户曾尝试将各目录的next、react、react-dom版本统一调整为14与18，重新打包启动后仍出现该报错。

## 可能原因
项目不同目录下的package.json文件中，next、react、react-dom版本不一致，引发依赖冲突，导致jsxDEV函数无法被正确调用，最终触发该类型报错。例如document目录下的next版本为15、react与react-dom版本为19，其他目录下的next版本为14、react与react-dom版本为18。

## 排查步骤
1. 检查项目各目录（包括主服务目录、document子目录等）的package.json文件，核对next、react、react-dom的版本号
2. 确认FastGPT主服务的打包流程已完整执行
3. 检查fastgpt-plugin、sandbox、mongodb、redis等依赖服务是否正常启动
4. 确认本地部署的FastGPT版本为4.13.2

## 解决与验证
将所有目录下的next、react、react-dom版本统一调整为14与18，重新执行FastGPT主服务的打包流程，重启主服务后访问网页，确认报错不再出现。若仍存在异常，需按实际环境确认相关配置项。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/5843)
