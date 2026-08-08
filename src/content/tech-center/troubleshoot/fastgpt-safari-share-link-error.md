---
title: 解决iPhone Safari首次打开FastGPT免登录分享链接报错问题
slug: /zh/troubleshoot/fastgpt-safari-share-link-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6335
source_type: GitHub issue
---

# 解决iPhone Safari首次打开FastGPT免登录分享链接报错问题

## 现象
在iPhone Safari浏览器非隐私模式下，首次直接打开FastGPT免登录分享链接（路径格式为`/chat/share?shareId=xxx`）时，页面会显示报错提示“凭证已过期，请重新登录”。刷新页面后报错消失，可正常使用该链接。该免登录分享链接在电脑Chrome浏览器中首次打开可正常加载。

## 可能原因
该问题属于zustand hydration时序问题：1. `share.tsx`中的`localUId`存储在使用`zustand persist + localStorage`的`useShareChatStore`中；2. 首次访问时，zustand需要从localStorage中hydrate数据，此时`loaded`状态为`false`，`localUId`值为`undefined`；3. `ChatContextProvider`中的`useScrollPagination`在组件挂载时会立即发起请求（配置项`manual: false`）；4. 此时请求携带的`outLinkUid`参数为空，导致服务端返回403错误；5. 前端将该403错误码识别为`TOKEN_ERROR_CODE`，从而显示对应报错文本。

## 排查步骤
1. 确认访问环境为iPhone Safari浏览器非隐私模式，且使用的是FastGPT应用的免登录分享链接；
2. 首次打开该链接，观察是否出现“凭证已过期，请重新登录”报错，刷新页面后是否恢复正常；
3. 查看前端代码中`useShareChatStore`的hydrate逻辑，确认`loaded`状态与`localUId`的取值时机；
4. 核对`ChatContextProvider`中`useScrollPagination`的请求触发条件，确认是否在`localUId`未加载完成时发起了请求；
5. 检查前端对服务端403错误的处理逻辑，确认是否将其关联至`TOKEN_ERROR_CODE`。

## 解决与验证
解决该问题的核心是调整zustand hydration的时序，确保`localUId`加载完成（即`loaded`状态为`true`）后，再触发`useScrollPagination`的请求。验证步骤如下：
1. 部署修复了时序问题的代码版本；
2. 使用iPhone Safari浏览器非隐私模式首次打开免登录分享链接，确认无报错且可正常使用；
3. 重复多次测试，确认问题不再复现；
4. 对比电脑Chrome浏览器的访问情况，确认功能不受影响。

> 来源：https://github.com/labring/FastGPT/issues/6335
