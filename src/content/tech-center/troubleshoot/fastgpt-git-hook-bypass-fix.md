---
title: 解决FastGPT中AI代理绕过Git提交钩子的配置问题
slug: /zh/troubleshoot/fastgpt-git-hook-bypass-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6589
source_type: GitHub issue
---

# 解决FastGPT中AI代理绕过Git提交钩子的配置问题

## 现象
在FastGPT配置的AI代理执行git commit或git push命令时，若使用hook-bypass参数（如--no-verify），会静默跳过pre-commit、commit-msg、pre-push钩子，导致代码lint、格式化、提交前测试检查无法生效。

## 可能原因
当前FastGPT的.claude/settings.json配置仅启用了插件，未配置PreToolUse钩子来拦截带hook-bypass参数的git命令，现有enabledPlugins配置未包含相关拦截逻辑，导致AI代理可直接绕过Git钩子执行命令。

## 排查步骤
1.  定位到FastGPT项目根目录下的`.claude/settings.json`配置文件
2.  查看`hooks`字段下`PreToolUse`数组的配置内容
3.  检查是否存在针对Bash命令中git子命令的hook-bypass参数检测规则

## 解决与验证
### 解决方法
在`.claude/settings.json`的`hooks.PreToolUse`中添加针对Bash命令的拦截钩子，配置如下：
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{ "type": "command", "command": "npx block-no-verify@1.1.2" }]
      }
    ]
  }
}
```
该配置保留原有`enabledPlugins`配置不变，`block-no-verify`会读取Claude Code钩子的stdin payload中的`tool_input.command`，检测git子命令中的hook-bypass标志，通过退出码2拦截违规命令。

### 验证步骤
1.  将上述配置添加到`.claude/settings.json`并保存
2.  尝试执行带`--no-verify`参数的`git commit`或`git push`命令
3.  确认命令被拦截，无法绕过Git钩子完成提交或推送操作

> 来源：https://github.com/labring/FastGPT/issues/6589
