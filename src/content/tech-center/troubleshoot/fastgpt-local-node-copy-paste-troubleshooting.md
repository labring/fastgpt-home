---
title: FastGPT本地部署场景下编排节点复制粘贴失效排查
slug: /zh/troubleshoot/fastgpt-local-node-copy-paste-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1581
source_type: GitHub issue
---

# FastGPT本地部署场景下编排节点复制粘贴失效排查

## 现象
在FastGPT本地部署场景中，选中高级编排内的模块节点并按Ctrl+C时，界面提示复制成功，但在其他应用的高级编排页面中按Ctrl+V无法粘贴节点。在官方部署环境中，该复制粘贴操作可正常生效。

## 可能原因
未配置SSL证书会导致浏览器剪贴板API无法正常触发，进而引发复制粘贴失效。

## 排查步骤
1.  访问FastGPT官方部署环境，测试选中高级编排节点后执行Ctrl+C与Ctrl+V操作，确认操作是否正常生效。
2.  检查本地部署的FastGPT是否已配置SSL证书。
3.  查看浏览器控制台，确认是否存在与剪贴板API相关的报错提示，需按实际环境确认。

## 解决与验证
为本地部署的FastGPT配置SSL证书后，重新选中目标编排节点并按Ctrl+C，切换至其他应用的高级编排页面，按Ctrl+V即可完成节点粘贴。粘贴后可根据需求手动调整节点连线。

> 来源: [FastGPT GitHub issue #1581](https://github.com/labring/FastGPT/issues/1581)
