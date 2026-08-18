---
title: FastGPT对接钉钉知识库的配置方法与使用流程
slug: /zh/integration/fastgpt-dingtalk-knowledge-config
page_type: 集成与发布渠道
source: https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/dingtalk_dataset
source_type: 官方文档
---

# FastGPT对接钉钉知识库的配置方法与使用流程

FastGPT 支持通过钉钉企业内部应用接入钉钉知识库，可实现钉钉在线文档的批量导入与索引更新，当前仅支持钉钉在线文档文本格式，不支持 PDF、Word、Excel、PPT 等二进制文件。

### 完整配置与操作步骤
1. 创建钉钉企业内部应用：打开钉钉开发者后台应用详情页面，选择目标企业下的企业内部应用；若没有可用应用，先进入应用开发页面创建企业内部应用。
2. 获取必填参数：
   - App Key：在应用详情的「凭证与基础信息」页面复制 Client ID（原 AppKey 和 SuiteKey）
   - App Secret：同一页面复制 Client Secret（原 AppSecret 和 SuiteSecret），该密钥属于敏感信息，请勿公开发送
   - User ID：由企业通讯录管理员在钉钉管理后台（oa.dingtalk.com）的「通讯录-成员管理」中获取，可通过导出成员列表获取该字段；需使用专门的专属账号，该账号需拥有目标知识库的只读权限
3. 配置钉钉应用权限：在钉钉应用详情页左侧进入「权限管理」，搜索并开通以下权限：`qyapi_get_member`、`Wiki.Workspace.Read`、`Wiki.Node.Read`、`Storage.File.Read`，保存配置后发布应用；若接口报错包含`requiredScopes`，需按提示补开对应权限。
4. 在FastGPT中创建知识库：进入FastGPT知识库列表，点击「新建」，选择第三方知识库分类下的「钉钉知识库」，填写上述App Key、App Secret、User ID参数后点击确认创建。
5. 导入与同步文档：进入新建的知识库详情页，点击右上角「添加文件」，选择目标钉钉知识库及需要导入的在线文档或文件夹，FastGPT会递归导入文件夹下的支持文档；当钉钉文档内容更新后，可在已导入文件的更多菜单中点击「同步」，重新读取最新正文并更新索引。

使用过程中需注意：User ID 并非手机号、姓名或 unionId，若成员详情页未展示 User ID，可通过导出成员列表获取；专属账号无权限访问的钉钉知识库，不会出现在FastGPT的添加文件列表中。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/dingtalk_dataset)
