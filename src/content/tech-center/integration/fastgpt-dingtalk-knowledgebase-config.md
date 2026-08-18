---
title: FastGPT对接钉钉知识库的配置流程与使用注意事项
slug: /zh/integration/fastgpt-dingtalk-knowledgebase-config
page_type: 集成与发布渠道
source: https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/dingtalk_dataset
source_type: 官方文档
---

# FastGPT对接钉钉知识库的配置流程与使用注意事项

### 功能边界说明
FastGPT支持通过钉钉企业内部应用接入钉钉知识库，仅支持导入钉钉在线文档的文本内容，不支持PDF、Word、Excel、PPT等二进制文件。同步知识库前需配置专属操作账号，并确保该账号拥有目标知识库的只读权限，否则对应知识库不会出现在FastGPT的添加文件列表中。

### 完整配置与使用步骤
1. **创建钉钉应用**：打开钉钉开发者后台应用详情，选择目标企业下的企业内部应用，无可用应用则先进入应用开发页面创建企业内部应用。
2. **获取必填参数**：
   - App Key：在应用详情页左侧「凭证与基础信息」中复制Client ID（原AppKey和SuiteKey）
   - App Secret：同一页面复制Client Secret（原AppSecret和SuiteSecret），该密钥属于敏感信息，不可公开发送
   - User ID：由企业通讯录管理员通过`oa.dingtalk.com`进入通讯录-成员管理，找到操作成员后复制其User ID，该值非手机号、姓名或unionId；若成员详情未展示User ID，可导出成员列表获取。建议使用专属同步账号。
3. **配置应用权限**：在钉钉应用详情页左侧「权限管理」中搜索并开通以下权限：`qyapi_get_member`、`Wiki.Workspace.Read`、`Wiki.Node.Read`、`Storage.File.Read`，配置完成后保存并发布应用。若接口报错出现`requiredScopes`，需按提示补开对应权限。
4. **创建钉钉知识库**：进入FastGPT知识库列表点击「新建」，选择第三方知识库下的钉钉知识库，填写App Key、App Secret、User ID后确认创建。
5. **添加文件与同步**：进入知识库详情页，点击右上角「添加文件」选择目标钉钉知识库及对应在线文档或文件夹，确认导入；选择文件夹时会递归导入该文件夹下所有支持的在线文档。文档内容更新后，可在已导入文件的更多菜单中点击「同步」重新读取最新正文并更新索引。

### 易错点与注意事项
需注意正确获取User ID，避免误用手机号、姓名或unionId；配置的操作账号必须拥有目标知识库的访问权限，否则无法在FastGPT的添加文件列表中看到对应知识库。此外，App Secret需妥善保管，不可随意分享。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/dingtalk_dataset)
