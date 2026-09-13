---
title: FastGPT V4.14.1升级后团队应用自定义插件丢失排查指南
slug: /zh/troubleshoot/fastgpt-v141-plugin-missing-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5950
source_type: GitHub issue
---

# FastGPT V4.14.1升级后团队应用自定义插件丢失排查指南

## 现象
用户升级FastGPT至V4.14.1版本后，原本在V4.14.0版本中存在的团队应用目录下的自定义插件被清空或隐藏，用户反馈该情况有点吓人。无论是否执行升级脚本，均会出现该问题，执行升级脚本后会返回特定报错信息：
```json
{
    "code": 200,
    "statusText": "",
    "message": "",
    "data": {
        "total": 3,
        "skipedMigrated": 0,
        "skipedNoFolder": 2,
        "success": 0,
        "failed": 1,
        "failedTeams": [
            "686779d508919794d897ffb7"
        ]
    }
}
```
对比V4.14.0版本，系统可正常显示测试目录及自定义插件，升级后插件完全消失。

## 可能原因
根据报错信息与现象推测，V4.14.1版本的团队应用插件目录迁移逻辑发生变更，导致旧版本的自定义插件目录未被正确识别或完成迁移，进而出现插件被清空或隐藏的情况。报错中的`skipedNoFolder`字段数值为2，代表有2个插件目录未被识别迁移，`failedTeams`字段列出了出现迁移失败的具体团队ID，示例为`686779d508919794d897ffb7`。

## 排查步骤
1.  确认当前部署的FastGPT版本为V4.14.1，且升级前版本为V4.14.0。
2.  查看升级脚本执行后返回的JSON格式报错信息，核对是否包含`skipedNoFolder`、`failedTeams`等字段。
3.  登录FastGPT系统，进入团队应用目录，确认自定义插件是否确实丢失或隐藏。
4.  记录报错信息中`failedTeams`字段内的团队ID，如示例中的`686779d508919794d897ffb7`，用于后续验证与恢复操作。

## 解决与验证
暂未获取到官方提供的一键修复方案，可先回退至V4.14.0版本恢复插件数据。后续可通过以下方式验证与临时处理问题：
1.  核对`failedTeams`列表中的异常团队ID，确认该团队的插件目录结构。
2.  手动将自定义插件重新部署至对应团队应用目录，确认插件正常显示。
验证时可对比回退版本与升级后的插件显示状态，确认问题是否复现。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/5950)
