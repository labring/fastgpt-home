---
title: FastGPT 4.8.22 提示缺少索引模型：模型类型与升级排查
slug: /zh/troubleshoot/fastgpt-4822-model-workflow-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3849
source_type: GitHub issue
---

# FastGPT 4.8.22 提示缺少索引模型：模型类型与升级排查

## 适用场景与历史记录

原报告描述从 4.8.10 升级至 4.8.22 后提示缺少索引模型；评论另有模型列表延迟和全局变量界面变化的反馈。 原始讨论提交于 2025-02-21，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

维护者指出原截图缺少索引模型，并说明模型配置是使用前提。模型列表延迟和变量界面变化需要分别记录复测。

## 排查与复测

1. 在模型提供商中分别核对聊天模型与 embedding/索引模型的启用状态和渠道。
2. 对索引模型单独测试向量请求，再重试知识库或工作流入口。
3. 对模型列表延迟和变量显示问题分别记录网络响应及界面截图，避免混为同一故障。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：一直显示 检测到没有可用的索引模型](https://github.com/labring/FastGPT/issues/3849)

> 来源: [FastGPT 模型配置](https://doc.fastgpt.io/en/self-host/config/model/intro)

> 来源: [原讨论中的补充回复](https://github.com/labring/FastGPT/issues/3849#issuecomment-2678511409)

> 来源: [原讨论中的补充回复](https://github.com/labring/FastGPT/issues/3849#issuecomment-2680880447)
