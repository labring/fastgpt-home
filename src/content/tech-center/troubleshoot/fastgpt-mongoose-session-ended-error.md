---
title: 解决FastGPT中Mongoose会话已结束的数据库操作报错问题
slug: /zh/troubleshoot/fastgpt-mongoose-session-ended-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6476
source_type: GitHub issue
---

# 解决FastGPT中Mongoose会话已结束的数据库操作报错问题

## 现象
私有部署v4.14.7版本的FastGPT服务日志中，出现`MongooseError: Cannot set a document's session to a session that has ended. Make sure you haven't called endSession() on the session you are passing to $session()`的错误，同时伴随`Unhandled Rejection at: Promise`的未处理拒绝错误。日志中还包含登录接口报错`Api response error: /api/support/user/account/loginByPassword {"code":503002,"statusText":"account_psw_error","message":"common:code_error.account_error","data":null}`，以及PG连接池移除、定时任务完成的相关日志。

## 可能原因
该报错的直接原因是代码尝试将已结束的Mongoose会话用于数据库操作。从错误栈来看，报错触发自定时器回调逻辑（`Timeout._onTimeout`），说明在回调执行时，传入的会话已经被调用`endSession()`终止。此外，数据库会话管理逻辑、连接池配置不合理也可能导致该问题，具体触发场景需按实际业务代码确认。

## 排查步骤
1.  查看服务完整错误日志，定位报错触发的代码位置，本次issue中报错指向`Timeout._onTimeout`以及`/app/projects/app/.next/server/pages/api/support/user/account/preLogin.js`相关逻辑。
2.  检查涉及数据库操作的异步回调、定时器任务中的会话使用逻辑，确认在执行数据库操作前，会话未被提前调用`endSession()`终止。
3.  确认当前FastGPT的部署版本为v4.14.7，核对版本相关的已知代码问题（需按实际环境确认是否存在对应缺陷）。
4.  检查数据库连接池的超时配置、会话生命周期管理逻辑，确认配置是否符合业务需求，需按实际环境调整。

## 解决与验证
解决该问题需调整会话的使用时机，确保在调用`$session()`进行数据库操作时，会话仍处于活跃状态，未被提前终止。具体可针对报错定位的代码位置，修改定时器或异步任务中的会话获取逻辑，避免复用已结束的会话。验证时，重启FastGPT服务，观察日志是否不再出现该Mongoose会话错误，同时验证相关业务功能（如登录、队列任务处理）是否正常运行，确认无未处理的Promise拒绝错误。

> 来源：[FastGPT GitHub Issue #6476](https://github.com/labring/FastGPT/issues/6476)
