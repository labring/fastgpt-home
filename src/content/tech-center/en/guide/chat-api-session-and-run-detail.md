---
title: Integrating Through the Chat API: Sessions, History and Per-Run Details
slug: /en/guide/chat-api-session-and-run-detail
page_type: Deep-dive guide
source: https://doc.fastgpt.cn/zh-CN/self-host/config/env
source_type: Open-source repository docs and community threads
article_section: Selection & Evaluation
is_part_of: FastGPT Tech Center
meta_description: A technical decision guide for integrating enterprise AI applications via chat APIs, covering session management, history tracking, per-run details, setup steps, verification checks, and boundary conditions.
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# Integrating Through the Chat API: Sessions, History and Per-Run Details

## When this becomes a decision
You face this decision when you integrate chat capabilities into external business systems. Basic single-turn calls cannot support long-term business needs. They cannot retain multi-turn conversation context, reuse historical interaction records, or track per-run node execution details.
Your existing simple call logic will show limitations when you need to support concurrent user sessions, retain complete interaction chains, or troubleshoot call errors.
For example, an internal customer support assistant system needs independent chat sessions for each user, to keep past questions and assistant replies for later review. An operations automation tool needs to view model response nodes, knowledge base retrieved snippets, and tool call results after calling the chat API to locate execution failures.
These issues do not appear in single independent calls, but they directly affect system stability and maintainability in large-scale, persistent business integration scenarios.

## What to settle first
| Criterion | What to set | Basis |
|---|---|---|
| chatId usage rules | Choose reuse or new based on business scenario | Official documentation for session initiation parameter instructions |
| variables delivery method | Pass using variable names defined in application orchestration | Official documentation for session initiation parameter instructions |
| detail parameter configuration | Set to true for debugging scenarios, enable as needed in production | Official documentation for session initiation precautions |
| conversation history pull scope | Control offset and count using pagination parameters | Official documentation for conversation management API instructions |
| run details acquisition method | Enable detail=true or call the log API | Official documentation for response examples and log API |
| authentication method selection | Prioritize using body.appId + APIKey combination | Official documentation for key usage specifications |

You must adjust these criteria based on actual business needs. Reusing chatId works for scenarios that need multi-turn context. Creating a new chatId fits single independent conversations. Variables must exactly match the variable names defined in the target application’s orchestration, or the parameters will not be recognized correctly. Enabling the detail parameter increases response data size. If you do not need debug node details in production, disable it to reduce network transmission costs. Choose your authentication method based on SDK compatibility. The body.appId method has higher priority, and you do not need to embed appId in the APIKey. Some older SDKs may need to adjust the BaseUrl path to add the v1 prefix to avoid 404 errors.

## How to do it
### Session and History Management
First, define chatId generation rules. You must use a non-empty string shorter than 250 characters. You can use the external system’s dialog ID or a user’s unique identifier directly. If you want to use FastGPT’s built-in context feature, pass the chatId parameter when calling the session initiation API. The API will automatically load the historical messages of the corresponding session from the database, and only use the last entry in the request body’s messages array as the current user’s question. All other historical messages will be ignored.
To get basic information about an existing session, call the GET API `/core/chat/init` with the appId and chatId parameters. The returned result includes session configuration variables and application information.
To pull historical conversation records for a session, call the POST API `/core/chat/record/getPaginationRecords` with appId, chatId, offset, and pageSize parameters. This API supports pagination to get historical messages by offset. You can also use the loadCustomFeedbacks parameter to control whether to load custom feedback content.
To get a list of all sessions created via the API under your current application, call the POST API `/core/chat/history/getHistories` with appId, offset, pageSize, and set the source parameter to `api`. The returned list includes chatId, update time, session title, and other information.

### Variables Parameter Delivery
The variables parameter passes business variables to the chat application. You must use the variable names defined in the target application’s orchestration as keys, and pass the corresponding values. In regular conversation scenarios, place the variables parameter at the root level of the request body, on the same level as appId and chatId.
If you call a plugin-type application, you do not need to pass chatId and messages parameters. Only pass the plugin’s input parameters via variables. You can get the plugin’s output result from the element with `moduleType=pluginOutput` in the response’s `responseData` array.
Note that the model, temperature, and other parameters you pass will not take effect. These configurations are determined by the application’s orchestration logic and cannot be modified via API parameters. To pass multimodal content, replace the content field in the messages array with an array containing text, image_url, or file_url types. You must upload files to object storage first and get a public link for them.

### Per-Run Details Acquisition
To get per-run node details for a conversation, set the detail parameter to true when calling the session initiation API. The response’s `responseData` array will include detailed information for each execution node, including nodeId, moduleName, moduleType, token usage, run time, context preview, and more.
For regular (non-streaming) requests, the complete node details are included directly in the response body. For streaming requests, listen to the `event=flowNodeStatus` and `event=flowResponses` event streams to get real-time node execution status and details.
To get overall application runtime statistics, call the log APIs `/proApi/core/app/logs/getTotalData` and `/proApi/core/app/logs/getChartData`. These APIs return cumulative user count, conversation count, token consumption, and time-based statistical chart data respectively.

## How to verify
1. Send a session request with a valid chatId. Confirm that subsequent calls using the same chatId automatically load the historical conversation, and new user messages are appended to the session history.
2. Pass variables that match the application’s orchestration. Call the API and confirm the application correctly receives and uses the passed variable values, with no missing or misidentified parameters.
3. Send a request with the detail=true parameter. Confirm the response body includes the `responseData` array, and array elements include moduleType, tokens, runningTime, and other node execution-related fields.
4. Call the session list API. Confirm the returned results only include sessions created via the API, and the session updateTime matches the actual call time.
5. Call the pagination historical record API. Confirm the offset and pageSize parameters work, the returned record count matches the configured pageSize value, and records are sorted chronologically.
6. Call the API to modify a session’s title or pin status. Confirm the session’s custom title or pin status is updated correctly, and subsequent session information requests include the modified content.

## Limits: when this approach does not hold
If your deployed FastGPT version is lower than v4.15.0, the authProxy proxy team member identity feature will not work, and some API parameter priority rules differ from newer versions.
If the same chatId receives a large number of concurrent calls in a short time, MongoDB may trigger a WriteConflict error, causing session update failures. You will need to adjust call frequency or optimize database configuration.
If your application needs to process multimodal input but your deployment environment does not have a multimodal model configured or has abnormal object storage permissions, image and file requests may fail to parse.
Plugin-type applications only support single runs by default. You cannot pass a chatId to enable multi-turn sessions. You will need to build additional session management logic to support multi-turn plugin calls.
If your SDK is incompatible with FastGPT’s API format—for example, if you do not correctly set the BaseUrl path or request headers—you may get 404 or authentication failure errors.
If you have not completed Sandbox data migration after an upgrade, some session file resources may not be accessible, affecting conversation execution that relies on files.
If your application has enabled strict permission controls and the caller does not have access to the target application or session, API calls will be rejected.

## Keep reading

- [When the Knowledge Base Has the Answer but Search Misses It: A Layer-by-Layer Diagnosis](/guide/kb-retrieval-miss-diagnosis)

## References

- [FastGPT environment variables](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- [FastGPT upgrade notes](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/upgrade-instruction)

## Next steps

The criteria above can be checked against public documentation. To apply this process to a specific deployment, contact sales for support; the cloud service can be used directly to validate the process first.

- Contact sales: apply this process to your deployment
- Get started: validate the process on the cloud service
- Pricing: compare what each form covers

> Criteria taken from the open-source repository, verified 2026-09-28.
