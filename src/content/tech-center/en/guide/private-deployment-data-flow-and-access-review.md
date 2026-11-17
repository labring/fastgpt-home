---
title: Self-Hosted Deployment: Verifying Data Flow, Model Calls and Tiered Access
slug: /en/guide/private-deployment-data-flow-and-access-review
page_type: deep
source: https://fastgpt.io/price
source_type: 深度场景内容
meta_title: Reviewing Self-Hosted Data Flow and Access Control
meta_description: Review checklist for FastGPT self-hosted deployments: where data lands, which model calls leave the network, and how file-level permissions resolve.
delivery_metadata: {"source_front_matter":{"slug":"private-deployment-data-flow-and-access-review","meta_title":"Reviewing Self-Hosted Data Flow and Access Control","meta_description":"Review checklist for FastGPT self-hosted deployments: where data lands, which model calls leave the network, and how file-level permissions resolve.","language":"en","content_type":"deep","product_version":"v4.17.3","review_date":"2026-11-16","translation_group":"private-deployment-data-flow-and-access-review","hreflang":"en; zh-CN counterpart identified by translation_group; final URLs resolved by CMS","source_language":"zh","source_sha256":"2b0c55e1483f2b56758a730f01e8e10b3bef602a0830c715c497ba4965fc4a76"},"editorial_notes":["Source of facts: the official FastGPT release notes listed above. Verified on 2026-11-16. Editions: v4.17.3 commercial and community; the customer deployment version takes precedence. Update history: see the source pages above. 90-day review: recheck before 2027-02-14."]}
schema_type: Article
date_modified: 2026-11-16
---

# Self-Hosted Deployment: Verifying Data Flow, Model Calls and Tiered Access

**Self-hosting answers where the software runs. A procurement review has to answer a narrower set of questions: which data lands in which store, whether model calls leave the network, and who can read which documents. Each question has its own configuration surface and its own acceptance step. Leave any of them verbal, and the security review will ask again after go-live.**

## Separate three tables before discussing compliance

Start with the licence shape. Self-hosted deployment is licensed per server, in three editions. The standard edition caps tenants at 100, the professional edition at 1,000, and the flagship edition places no cap. Single sign-on and OA integration start at the professional edition; the flagship edition adds separate invoicing and payment modules. A commercial install consists of the community image plus a commercial image, and the commercial image requires a licence to start. Community code can be modified; the commercial image cannot.

The licence shape sets the review scope. What the customer receives is the right to use one server within an agreed term, version and scope. Ownership of the software, source code, algorithms, models and documentation does not transfer. Procurement documents should therefore state three boundaries together: server count, version scope and term. Leave one out and adding a server or moving to a new major version means negotiating an extension later.

Then build three tables: data flow, model calls, access control. Keep them separate because three different groups own them. Implementation draws the data flow table, operations fills the model table, and business plus IT confirm the access table. Merge them into one sheet and every change drags all three parties back to the table.

## Four landing points between upload and retrieval

A knowledge base system typically writes data in four places: the uploaded original, the parsed text chunks, the vector index, and the records produced by retrieval and conversation. Self-hosting moves all four into an environment the customer controls. The exact path depends on the vector database and object storage in use.

The acceptance step is to push one real document through the full pipeline and confirm each landing point. The original sits in an upload directory or bucket, the chunks in database tables, the index in a vector collection, and conversation records in session tables. Each has to name a specific environment. Saying the data stays inside the internal network is not enough, because an internal network contains several segments and several storage systems.

Parsing is the step most often skipped. The parser accepts a wide range of office formats and extracts body text with embedded images, which are pulled out and stored with their references intact. One upload therefore produces more than one artifact. The data flow table has to account for extracted images and attachments as well as the source document.

Retrieval backend choice changes the flow again. PostgreSQL, OceanBase and Milvus are all supported. Whichever is selected determines which database holds the index, and a security review checks that database against its own operating standard. Name the backend in the design document so both sides review the same thing.

## Model calls: two paths, one decision

Model invocation is the point where a self-hosted project may still reach the public network. The platform supports model providers broadly and supports local models, so whether traffic leaves the network depends on which channels are configured. It does not follow from self-hosting.

Build a table of every configured model across five categories: language, embedding, reranking, speech synthesis and speech recognition. Mark each with an endpoint in the internal network, a dedicated cloud or the public internet. Each category drives a different part of the pipeline. Omitting the embedding model understates exposure, because vector search encodes the query through it, while full-text-only retrieval uses a different path.

Where an external model is unavoidable, document the chain. State which business scenarios may trigger the call, what content travels with it, and what happens on failure. A fallback needs a stated condition and a stated target. A description such as automatic switching without conditions cannot be tested.

A fully offline deployment localises the models, and model files and inference service versions are fixed with the environment. Upgrades then follow the customer's schedule, and the model version table should be maintained separately from the application version table and compatibility between models, vector dimensions and application configuration is checked during rollback.

## Tiered access: organisation and file layers

Enterprise reviews split permissions into two questions: can departments be isolated, and can individual documents be restricted. The platform answers them at different levels.

At the organisation level, permissions are assigned by department, group and role, with applications and knowledge bases authorised separately and the narrowest grant reaching a single account. The acceptance step is to create three accounts, such as a department administrator, a project member and a read-only member, then run application access and knowledge base retrieval under each and record the visible scope.

File-level permission is the second layer. It assigns collaborators per file or folder, supports inherited and independent states, allows inheritance to be restored, and supports ownership transfer. The switch is off by default. With the switch enabled, lists and details use file permissions. Retrieval filtering also requires authentication as the current member; a preselected knowledge base without member authentication follows a different path.

That produces an operational consequence. Within one knowledge base, the same question can return different passages for different members. Fix the identity before running retrieval tests or demonstrations. Two runs under different accounts are not comparable and will be read as instability.

A published application adds a third layer. Static resources are checked against the permission snapshot captured at publication, while dynamic resources are checked against the running user. Verify by publishing an application and accessing it as a newly added member: static visibility should match the snapshot, and dynamic resources should follow that member's own permissions.

## Identity sources and account lifecycle

Single sign-on and OA integration start at the professional edition, and they determine where accounts come from and how quickly access ends after someone leaves. Build a source table: which system creates the account, how it synchronises, and whether the local session ends on deactivation.

Keep the boundary explicit. Single sign-on authenticates identity; authorisation remains with the organisation structure and resource grants inside the application. Treating the two as one produces the familiar dispute in which login succeeds but expected documents are missing, with each side describing a different layer.

Integrating an OA or ERP system usually also requires credential management at the interface layer. External interfaces and a plugin mechanism connect third-party tools, and permission to create interface credentials depends on the team default permission switch. When that switch is enabled, the default group in new teams gains the ability to create API keys, and existing teams are not granted it retroactively. Check the actual state of the switch when taking over operations.

## Audit logs: what exists and how long it stays

Logging is often dismissed in one sentence during procurement. The verifiable position is narrower than the marketing: the [hosted-service pricing page](https://fastgpt.io/price) lists a 720-day team operation log for its higher tier, while in self-hosted environments log retention and export depend on deployment configuration and on the customer's own logging platform. State the retention period in writing.

Verification has three steps. First, list which operations appear in the admin console and capture each screen. Second, confirm those records can be exported to the customer's logging platform and which fields the export contains. Third, state the retention period, the deletion policy and who may delete.

Put all three in the acceptance list and the review stops asking for supplements. A statement that logging is supported invites a follow-up request for material.

## Versions, images and upgrade boundaries

Self-hosted version management carries a layer that hosted services do not: images must move as a set. In v4.17.3 the application and professional images are tagged v4.17.3, the plugin image v1.2.0, the code sandbox v5.0.0, and AI Proxy v0.7.7. The source runtime requires Node.js ^22.23.4, ^24.22.1 or ^26.12.1; check the complete version range when building from source.

Agent sandbox deployments require compatible FastGPT, sandbox and preview proxy releases; the code execution sandbox is versioned separately. FastGPT, the Agent sandbox and its preview proxy require compatible releases. The code execution sandbox is a separate component with its own version. That constraint decides how the maintenance window is scheduled: a split upgrade leaves an intermediate state with mismatched preview protocols.

Post-upgrade backfill work belongs in the operations manual. After start-up dependencies complete, v4.17.3 runs three backfill tasks covering sandbox team ownership, directory ancestor paths, and system model pricing conversion to million-token units. Up to three run concurrently, and failed items can be retried after the data is fixed. System models whose pricing has not migrated are treated as free in that version, so reconciliation has to check pricing separately before settlement.

Whether a version sits inside the licence scope is a separate question. The licence is described by term, version and scope. Before scheduling a major upgrade, confirm the licence covers it.

## Six acceptance steps in one pass

Compress the above into six steps and run them once, jointly, recording results as they are produced.

First, data landing. Upload one real document and capture each of the four storage locations with the environment and path.

Second, model inventory. List all five model categories with endpoint and network state, and record the trigger condition and fallback target for external calls.

Third, tiered access. Run application access and retrieval under three accounts and record the differences.

Fourth, publication permissions. Access a freshly published application as a new member and compare static and dynamic resource behaviour.

Fifth, log export. Export operation records once, confirm fields and destination, and record the retention period.

Sixth, upgrade rehearsal. Perform a full image-set upgrade in a test environment and record backfill results and retry paths.

The output is one page: what holds, what is outstanding, who owns the gap. That page is the material the security review asks for, and the baseline for later change.

## Failure patterns and repair order

Six failure patterns map to six different components. Two accounts seeing different citations points to file-level permissions and identity. Newly imported content missing from retrieval points to index state, since unindexed data is not recalled. A broken preview after an upgrade points to image versions. Members who cannot see their sandbox instances point to the sandbox team ownership backfill. Settlement totals that do not match point to model pricing migration. A partial export points to the rule that only files readable by the current member are exported when file-level permission is on.

Prioritise repair by the actual impact. Contain incorrect access, restore unavailable business tasks and inspect parsing or indexing failures at their respective stages. Repeat the original questions before drawing conclusions about model or capacity changes.

The closing point is short. Self-hosted acceptance material consists of three tables and one signed page. Once the tables are filled and the page is signed, the claim that data stays inside the network can be traced to a specific layer rather than a general assurance.

## Data Sources

| Topic | Version | Source |
| --- | --- | --- |
| Licence shape, edition differences, model and channel support | Current commercial plan | [FastGPT commercial deployment and support](https://fastgpt.io/contact) |
| File-level permissions, publication permission snapshot | v4.17.1 | [self-host/upgrading/4-17/4171](https://doc.fastgpt.io/self-host/upgrading/4-17/4171) |
| Sandbox image lockstep, document format coverage | v4.16.0 / v4.16.2 | [self-host/upgrading/4-16/4160](https://doc.fastgpt.io/self-host/upgrading/4-16/4160) |
| Image tags, backfill tasks, vector recall concurrency | v4.17.3 | [self-host/upgrading/4-17/4173](https://doc.fastgpt.io/self-host/upgrading/4-17/4173) |
