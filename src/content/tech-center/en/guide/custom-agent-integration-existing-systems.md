---
title: Custom Agent Integration: Scope, Interfaces and the Order of Work
slug: /en/guide/custom-agent-integration-existing-systems
page_type: deep
source: https://fastgpt.io/contact
source_type: 深度场景内容
meta_title: Custom Agents That Connect to Existing Systems
meta_description: How custom enterprise agents connect to existing models, OA and ERP systems: scope layers, interface tiers, MCP quotas, permissions and acceptance.
delivery_metadata: {"source_front_matter":{"slug":"custom-agent-integration-existing-systems","meta_title":"Custom Agents That Connect to Existing Systems","meta_description":"How custom enterprise agents connect to existing models, OA and ERP systems: scope layers, interface tiers, MCP quotas, permissions and acceptance.","language":"en","content_type":"deep","product_version":"v4.17.3","review_date":"2026-11-16","translation_group":"custom-agent-integration-existing-systems","hreflang":"en; zh-CN counterpart identified by translation_group; final URLs resolved by CMS","source_language":"zh","source_sha256":"5ed849c4ee2ae8d2a6ee5daf53594de30fa6b08e3140c08c0dc6f8db45cdacfd"},"editorial_notes":["Source of facts: the official FastGPT release notes listed above. Verified on 2026-11-16. Editions: v4.17.3 commercial and community; the customer deployment version takes precedence. Update history: see the source pages above. 90-day review: recheck before 2027-02-14."]}
schema_type: Article
date_modified: 2026-11-16
---

# Custom Agent Integration: Scope, Interfaces and the Order of Work

**Custom agent projects rarely fail on the model. They fail on boundaries: which layer changes, who provides the interface, which identity executes the call, and in what order the integration runs. Settle those four before work starts and every later change costs one round less.**

## Split customisation into three layers

Enterprises use one word for three different things: configuration, integration and code. Each has a different owner and a different risk profile, and quotations should keep them apart.

Configuration covers knowledge base structure, workflow design, prompts, publication channels and permission assignment. Business and implementation teams complete it inside the admin console without touching code, with the schedule determined by workflow complexity and testing scope.

Integration connects the agent to OA, ERP or a business database through external interfaces, the plugin mechanism and tool calls. Applications can be published to enterprise WeChat, WeChat official accounts, personal WeChat, Feishu, DingTalk and embedded pages.

Code is the third layer, and it depends on the licence. A commercial install is the community image plus a commercial image; community code can be modified, while the commercial image cannot. Requirements that would change the product itself either move up into configuration and plugins, or get scoped and priced by the vendor and written into the order and contract.

Writing the three layers into the proposal pays off at the first dispute. When a customer says a feature was not delivered, the first question is which layer it belongs to, and the answer determines who owns the gap.

## Tier integration by read, write and approval

The same business system carries three integration tiers, with cost and review requirements rising at each.

Read is the lowest. Querying stock levels, fetching ticket status or pulling customer records needs a read-only credential and an interface definition. The risk sits in field scope, so the definition should carry a field allowlist.

Write comes next. Creating tickets, writing conclusions back or updating tags adds a failure question: what happens when the write is wrong. Engineering needs idempotency keys and rollback paths; business needs a confirmation step, with human confirmation retained where a model would otherwise submit a formal document.

Approval is the highest. Approving, rejecting or withdrawing changes business state and normally stays outside autonomous execution. A workable design has the agent prepare the material and recommendation while a person confirms inside the original system. Stating that boundary in the design changes how a security review reads the proposal.

Once tiered, the interface inventory has categories. Each entry records tier, field scope, calling identity, failure handling and owner. Anything missing becomes on-site work during integration.

## Models: inventory first, replace second

When the customer already runs models and compute, the first step is an inventory. The platform supports model providers broadly and can be extended, so existing models usually stay; replacement is a choice, not a precondition.

The inventory covers five categories: language, embedding, reranking, speech synthesis and speech recognition. Each drives a different part of the pipeline, and counting only language models misses retrieval and voice dependencies. Record service endpoint, deployment location, version and credential ownership for each.

Three decisions follow. Which models stay where and which move into the new environment. Whether the embedding model changes with the knowledge base, which implies rebuilding the index. Whether reranking stays, since it materially affects result ordering and deserves a separate comparison test.

Replacement is an outcome variable. Run the same question set against the same knowledge base before and after, and record retrieval hits and citation quality. Without that record the decision rests on impression.

## OA and ERP connect differently

The technical difference between OA and ERP is small; the governance difference is large. OA usually brings a unified identity and a workflow engine, while ERP brings strict account controls and operation trace requirements.

The smoother path on the OA side is identity integration. The professional tier supports single sign-on and OA integration: account creation and mapping follow the agreed identity configuration before application access, and authorisation still comes from the organisation structure and resource grants inside the application. Split the duties explicitly: single sign-on answers who the user is, and the application answers what the user may read.

ERP usually goes through a service account plus interfaces. The service account receives permissions interface by interface, with readable fields and writable documents authorised separately. That differs from granting a person access; a leaked service account has a wider blast radius, so credential rotation belongs in the operations manual.

Both systems need an explicit calling identity. When an integration uses a service account, the receiving system or integration backend should also record the business operator and associate that identity with the request. Personal credentials still require checking which fields the target system actually saves. Define credentials, authorisation and trace fields during design, then verify the records against a known business object and operator during integration testing.

## Tool calls and MCP quota boundaries

A dialogue Agent uses a model with tool-calling support to select attached tools and construct their arguments. A workflow can call a tool as an explicit step or use a tool-calling node for dynamic selection. Values may come from upstream variables, fixed configuration or model extraction. Inspect the arguments actually sent and the returned fields during integration testing.

MCP is the second route, reusing existing tool services instead of rebuilding each connector. One quota rule matters in advance: MCP application tool calls and external channel messages both count against the team conversation limit measured in requests per minute. Exceeding it returns the remaining allowance and a retry delay, and external channel messages are deduplicated before counting.

Two design requirements follow. High-frequency automation needs backoff and retry rather than an assumption of success. Load testing has to estimate MCP traffic and page sessions together, because both draw on the same allowance and testing one side alone underestimates the peak.

The difference between plugins and MCP is worth stating: a plugin registers a reusable tool inside the platform, while MCP connects an existing tool service. Which one to choose depends on who maintains the tool and how often it changes.

## Permission design in three layers

Permissions reach an integrated system at three levels, and all three need an answer.

The first is application visibility: which departments may use the agent, configured through organisation structure and resource grants. The second is knowledge base and file permission. With file permissions enabled, lists and details use file grants; retrieval filtering additionally requires current-member authentication, so different members of the same knowledge base may receive different citations. The third is interface credentials: which team owns them, who may create them, and how they rotate.

The layer most often missed sits between the second and third. The knowledge base filters by file permission, while the interface call runs as a service account that may have broader access than the end user, so per-person filtering silently stops applying on the interface path. Verify by running the same question once through the page as a person and once through the interface as the service account, then comparing the returned passages. A difference is expected in itself; an unrecorded difference is the problem.

## Integration sequence and acceptance

Order the integration by dependency, not by team availability.

First, model connectivity: call all five categories and record response time and error codes. Second, knowledge base readiness: import samples, wait for indexing, and confirm that unindexed data does not enter recall. Third, interface connectivity: work through the three tiers, running a success and a failure path for each. Fourth, identity: run both the page identity and the interface identity. Fifth, the end-to-end path from question to business record. Sixth, failure drills covering timeouts, malformed responses and unavailable dependencies, recording degradation behaviour.

Six steps produce the acceptance material as a by-product: interface inventory, model inventory, identity matrix, path records and failure records. Each step leaves one record, and the review does not have to reconstruct anything.

One constraint belongs in the plan. Workflow assisted generation is a commercial edition feature, and its output is a candidate version that a user must apply, inspect and debug before saving and publishing. It requires application edit permission, plus an administrator enabling both assisted generation and the sandbox. Treat that as a step in the plan rather than a substitute for delivery.

## Upgrades that do not break integrations

A finished integration is not a stable one. Version upgrades change interface fields, tool-call behaviour and permission models.

In v4.17.3 several changes touch integrations directly: MCP and external channels count against the team per-minute limit; members can configure dedicated models and channels while the team owner can replace invalid language, speech and reranking model references; a general page size above 500 is processed as 500; and the knowledge base export interface now exports a single knowledge base, limited to files readable by the current member when file-level permission is enabled.

Each affects integration scripts. Before upgrading, compare request and response fields interface by interface, with particular attention to pagination and export. After upgrading, rerun steps one, three and four of the integration checklist; the full six remain the complete regression.

The image constraint also shapes the window. Agent sandbox deployments require compatible FastGPT, sandbox and preview proxy releases; the code execution sandbox is versioned separately. Put that in the change ticket to avoid an inconsistent state midway.

## Connecting an agent built with an external tool

An externally built application may arrive as a running service or as a source project. A service can expose HTTP or MCP operations: the external runtime keeps executing its logic, while a FastGPT workflow supplies business inputs and consumes the result. A source project first needs deployment and a callable interface.

Record the runtime location, authentication, input and output fields, timeout behaviour and owner of session state. Test a successful task, an unavailable dependency and a repeated submission. Keep confirmation before a business-system write. Generating a FastGPT workflow candidate and converting an external application package are separate delivery tasks and should appear separately in the integration inventory.

## Failure patterns and ownership

Four failure categories cover most incidents, each with a different owner.

Connectivity, missing fields and response format changes belong to the integrator and system operations. Retrieval results that differ from expectations, or citation quality that drops, belong to knowledge base and model configuration. Access that leaks or hides the wrong documents belongs to permission design. Slow responses and throttled calls belong to capacity and quota planning.

Assign the next action from the observed failure and its business impact. Restore unavailable services and contain incorrect access first, then use the original task to verify data, interface and model changes. Capacity tuning follows evidence about the affected stage.

The closing point is practical. Delivery quality rests on four tables written before work starts: three customisation layers, a three-tier interface inventory, a five-category model inventory, and a three-layer permission design, plus the six-step integration order. With the tables in place, the project stays on the rails.

## Data Sources

| Topic | Version | Source |
| --- | --- | --- |
| Licence shape, image composition, model and channel support | Current commercial plan | [FastGPT commercial deployment and support](https://fastgpt.io/contact) |
| Agent tool selection and workflow calls | Current documentation | [Choose tools and Skill](https://doc.fastgpt.io/guide/build/tools/overview) |
| File-level permissions, publication snapshot | v4.17.1 | [self-host/upgrading/4-17/4171](https://doc.fastgpt.io/self-host/upgrading/4-17/4171) |
| MCP quota, dedicated models, pagination and export, assisted generation | v4.17.3 | [self-host/upgrading/4-17/4173](https://doc.fastgpt.io/self-host/upgrading/4-17/4173) |
