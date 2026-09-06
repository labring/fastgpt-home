---
title: 解决FastGPT登录接口Set-Cookie无效字符报错问题
slug: /zh/troubleshoot/fastgpt-set-cookie-invalid-char-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4910
source_type: GitHub issue
---

# 解决FastGPT登录接口Set-Cookie无效字符报错问题

## 现象
用户拉取commit b4ecfb0的FastGPT代码后运行，调用`/api/support/user/account/loginByPassword`接口时出现报错。报错信息为`Invalid character in header content ["Set-Cookie"]`，完整错误栈显示该问题由Node.js的`ServerResponse.setHeader`方法抛出`TypeError [ERR_INVALID_CHAR]`导致，涉及Next.js框架的API路由处理逻辑。

## 可能原因
该报错的直接原因是Set-Cookie响应头中包含不符合HTTP协议规范的非法字符，Node.js的HTTP模块会拒绝设置包含此类字符的响应头，从而触发该错误。

## 排查步骤
1. 定位`/api/support/user/account/loginByPassword`接口的代码文件，找到生成Set-Cookie响应头的逻辑位置。
2. 检查生成Cookie值的代码，确认其中是否包含换行、制表符等HTTP头不允许的控制字符。
3. 按实际环境确认当前使用的Node.js版本与Next.js版本。
4. 复现登录操作，抓取接口返回的原始响应头，查看Set-Cookie字段的具体内容。

## 解决与验证
解决方法：清理Set-Cookie值中的非法字符，确保其符合HTTP协议要求。可将换行、制表符等非法字符替换为合法内容，或对Cookie值进行URI编码处理。
验证方法：重新启动服务并调用登录接口，确认不再出现`Invalid character in header content ["Set-Cookie"]`报错，接口可正常完成登录流程并返回有效响应。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4910)
