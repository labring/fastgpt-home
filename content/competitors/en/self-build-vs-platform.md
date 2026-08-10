<!--
Delivery metadata (not published with body content)
slug: self-build-vs-platform
Meta title: Self-Build vs Platform: Three-Year Build-vs-Buy TCO
Meta description: Compare self-build, open source, and platform options across labor, runtime, security, operations, upgrades, and support over three years. Keep TCO auditable.
keywords: self-build cost, three-year TCO, platform engineering, vendor support, open source self-hosting
Structured data: Article + BreadcrumbList (no FAQPage)
Mapped semantic questions: 33, 35
Demand basis: local GPT 108,899 (largest sitewide term family, 17% of total impressions); enterprise management knowledge base 5,304; common enterprise management systems 7,786 (real impressions from client Baidu Ads backend, 2026-01-01 to 2026-05-28)
Sources: client KB 7.1.5 / 7.3.3 / 7.4.2 / 7.5-01 / 7.5-02 / 7.5-04 / 7.5-09 - 3.3 - 4.3 - 5.4 - 6.3; verified on 2026-07-20
Internal links: 1. MaxKB procurement comparison 2. RAGFlow document-parsing comparison 3. Official pricing page
Schedule: W3 first batch
Sign-off: messaging review (does not block publishing) - Content is based on the client KB. Before publishing, ask the client to verify: 1. version and capability boundaries 2. commercial messaging 3. naming and wording. If anything is inaccurate, the client can skip this page or request corrections; no signature workflow is required.
-->

# Self-Build or Platform: Four Cost Buckets to Calculate

**Self-building or running open source directly gives more room when a platform engineering team already exists and wants deep control. A platform solution fits teams that need fast launch, a mature runtime, an upgrade path, and support channels.**

Technical teams can build a vector retrieval and Q&A prototype. Production adds parsing maintenance, training queues, workflow recovery, sandboxing, permissions, audit, evaluation, channels, and upgrades. These items determine long-term labor and delivery pace.

**Use the same three-year requirements checklist to calculate self-build and platform options separately, including development, testing, security, operations, upgrades, and on-call person-days.** The cost conclusion should show cash flow, person-days, and risk reserve together.

---

## 1. Production Boundary: Long-Term Work Beyond the Prototype

A self-built RAG prototype can run quickly: install a vector database, chunk documents, connect a model, and show a demo within days. In production, the work concentrates around the main chain:

- A document changes layout, parsing fails, and nobody can tell which step broke.
- The same document cannot be retrieved with a different phrasing because one body has only one index.
- Dozens of documents fail in the training queue, and the only available fix is rerunning the whole knowledge base.
- A workflow fails at step five, requiring breakpoint recovery and idempotent retry.
- Someone asks where last month's calls spent money, and cost needs to be split by parsing, vectorization, retrieval, and generation.
- The business team asks for Feishu and WeCom, and the channel adapter needs to be written from scratch.
- Security review arrives and asks whether code execution nodes have a sandbox, external tools have SSRF protection, secrets are managed safely, and audit logs are retained long enough.

Production quality depends on document quality, chunking method, update frequency, permission boundaries, retrieval configuration, and model capability. Each item needs a clear owner, regression set, and operations budget.

---

## 2. Cost Structure: Four Work Groups Plus Support Responsibility

Long-term work for self-building or running open source directly falls into four groups. Platform procurement also requires a separate review of vendor support responsibility. List person-days and service scope by group so the three-year TCO is comparable.

| Work group | Self-build / direct open source | Platform procurement | Validation method |
|---|---|---|---|
| Parsing, retrieval, and knowledge maintenance | Maintain multi-layout parsing, indexes, citations, and retraining queues in-house | Use the platform's existing knowledge-engineering chain and verify version boundaries | Same golden set and parsing-sample POC |
| Agent and workflow runtime | Build failure recovery, human interaction, debugging, and evaluation in-house | Configure platform capabilities and verify interactive state and tool boundaries | Same workflow fault-injection and recovery test |
| Security and governance | Own model adaptation, secrets, sandboxing, permissions, audit, and multi-tenancy | Verify governance capabilities and responsibility boundaries by version and contract | Same threat cases and permission matrix |
| Publishing, operations, and support | Maintain channels, upgrades, backup, monitoring, on-call, and user support in-house | Verify channels, upgrade path, and support tiers by procurement model | Three-year TCO and launch rehearsal |

### 2.1 Group One: Parsing, Retrieval, and Knowledge Maintenance

Document parsing, chunking, indexing, retrieval, ReRank, citation tracing, and retraining queues.

Production needs fallback parsing for multiple layouts, adjustable chunking, multiple indexes for one body, independent index editing, single-item training queue repair, retrieval history review, and citation location.

### 2.2 Group Two: Agent and Workflow Runtime

Agent / workflow runtime, failure recovery, human interaction, debugging, logs, and evaluation.

The three key items are **failure recovery** (node retry idempotency and queue backlog), **human interaction** (pause, form confirmation, and in-place recovery), and **evaluation** (fixed question-set regression).

### 2.3 Group Three: Security and Governance

Model adaptation, tool security, secrets, SSRF, code sandboxing, authentication, RBAC, SSO, audit, and multi-tenancy.

Security review and customer compliance will ask for model adaptation, tool security, secrets, SSRF, code sandboxing, authentication, RBAC, SSO, audit, and multi-tenancy. **Code sandboxing and tenant isolation** belong to runtime architecture and should be checked early in solution design.

### 2.4 Group Four: Publishing, Operations, and Support

Publishing channels, API compatibility, upgrade rollback, backup recovery, monitoring and alerts, on-call, and user support.

An all-hands knowledge base needs on-call, alerts, backup recovery, and user support. Wrong answers, slow answers, and outages all need clear handlers and person-day budgets.

Vendor support is the fifth cost variable. The self-build side carries it through team on-call, while the platform side defines it through support tiers and service checklists:

| Item | Self-build / direct open source | Platform procurement |
|---|---|---|
| Coverage hours and first-response target | Internal on-call schedule and rotation | Divided by support tier, coverage can reach 7x24, and first-response targets increase by tier |
| Security patches and version upgrades | Track upstream, upgrade, and rehearse rollback internally | Paid tiers include security patches and new-feature support; upgrade support scope follows the contract |
| Fault location and recovery responsibility | Entirely on the internal team | Divided by responsibility matrix and written item by item in the service checklist |
| Initial deployment and debugging | Internal team owns it | Delivery scope can include installation, debugging, and vendor technical maintenance |
| Support channel | Community channels, with no response commitment | Tickets and dedicated support groups, with an account manager in the highest tier |

Convert self-build on-call into person-days and put it into three-year TCO. On the platform side, write coverage hours, first-response targets, repair responsibility, and upgrade rollback into the service checklist. Record first-response targets separately from repair time limits. Final commitments should be based on the contract.

### 2.5 Use Requirement Priority to Decide the Self-Build Boundary

Mark each item as "required / optional / future": **required items** cover parsing, retrieval, basic permissions, and publishing channels; **optional items** include evaluation systems, cost split, and session labeling; **future items** include multi-tenancy, clustering, and cross-region disaster recovery.

Internal knowledge bases with few required items, deferrable optional items, and clear future items are good candidates for self-build. When SSO, audit, multi-tenancy, and code sandboxing enter the required list together, the self-build scope expands into platform engineering. The requirement-priority table should become the direct input for the POC and both quotes.

---

## 3. Procurement Boundaries: Platform Fees and Migration Cost

Orchestration, RAG, ReRank, external tools, and observability add length to the call chain. Platform options need latency, token, parsing, and storage costs included in acceptance.

Choose one real business chain and compare direct model calls, self-built orchestration, and the platform option. Record end-to-end P95 / P99 latency, tokens, parsing and storage cost, failure rate, development person-days, and operations person-days.

Platform options can choose models, storage, vector backends, APIs, and deployment methods according to enterprise requirements. Workflow configuration and commercial features create migration cost. The POC should record application and data export, model switching, vector-backend switching, backup recovery, and API compatibility results, then write the exit path into the procurement checklist.

---

## 4. POC Validation: Put Both Options Into the Same Quote

### 4.1 Three-Year TCO Calculation Table

| Cost layer | Self-build / direct open source | Platform procurement | Fill-in requirement |
|---|---|---|---|
| Infrastructure | Servers or GPUs, database, vector database, object storage, network | Same for self-hosted, included in subscription for cloud | Use three-year business growth assumptions, not current usage |
| Model consumption | Vectorization + generation, estimated by real Q&A volume | Same | Use the same Q&A volume assumptions on both sides |
| License / subscription | Open source license basis plus secondary development and distribution boundaries | Official pricing page price on the day | Procurement fills same-day real prices for both sides |
| Parsing / OCR | Self-built or third-party calls | Same | The higher the complex-layout ratio, the larger this difference becomes |
| Platform engineering labor | Person-days across the four platform engineering groups | Integration and configuration person-days | Include in three-year total person-days |
| Security and operations | Sandbox, secrets, permissions, audit, multi-tenancy, monitoring | Partially included by version + customer-side operations | List by actual security review requirements |
| Upgrades and on-call | Upgrade rollback, backup recovery, alert response, user support | Support tier + customer-side first line | Count over three years, not only year one |
| Risk reserve | Key-person loss, rework, failed review | Version boundary mismatch, migration cost | Reserve on both sides |

**The final output is three tables: three-year cash flow, person-days, and risk reserve**, plus sensitivity analysis for member count, document volume, and request volume.

### 4.2 Six Required Test Categories

| Category | Required metrics | Unified conditions |
|---|---|---|
| RAG quality | Recall@K, MRR / NDCG, citation accuracy, hallucination rate, no-answer refusal rate | Same golden question set, Embedding, ReRank, LLM, TopK |
| Complex documents | Table / heading / page number / image fidelity, parsing success rate, time and cost per 100 pages | Same scanned files, contracts, research reports, PPTX, XLSX |
| Online performance | P50 / P95 / P99 latency, success rate, requests per second, peak concurrency | Same model endpoint, vector database, machine type, data volume, and warm-up method |
| Reliability | Node failure recovery, retry idempotency, queue backlog, upgrade rollback, backup recovery | Same fault-injection script and data scale |
| Security and governance | Privilege escalation, SSRF, secret leakage, sandbox escape, tenant isolation, audit coverage | Same threat cases and permission matrix |
| Three-year TCO | See 4.1 | Unified three-year business growth assumptions |

Version stability, upgrade rollback, data recovery, concurrency, security, and support response should enter the production acceptance checklist, with upgrade rehearsals, backup recovery, long-running load tests, security cases, and fault injection scheduled separately.

---

## 5. Selection Recommendations: Decide by Team Capability and Pace

| Project condition | Recommendation |
|---|---|
| The need is for small-team internal use, and the team can own deployment, upgrades, backup, and security | Community self-hosting or self-build can enter the candidate set, with procurement scope controlled by requirement priority |
| The need is concentrated on vector retrieval + Q&A, covering basic permissions and a single publishing channel | The self-build boundary is clear and manageable for the team |
| Requirements enter SSO, multi-tenancy, audit, long-retention logs, commercial support, or explicit SLA | These are long-term platform-engineering items, so include procurement options in the comparison |
| Strict external sync + department information isolation + strong audit and cost management are all required | Write each item into the contract and acceptance checklist, then include platform options in the comparison |
| The technical team can self-build, but headcount is already fully loaded | Calculate platform-engineering person-days alongside business person-days, and compare opportunity cost |
| Business stakeholders require response coverage and recovery responsibility that can be written into a contract | Convert self-build on-call into person-days, and put platform support tiers plus responsibility matrix into the comparison |

The self-build versus platform conclusion should be based on cost, person-days, delivery time, and risk reserve under the same three-year requirements checklist.

---

> **Sources**: Public product materials verified for the project and general engineering practice; the cost checklist comes from section 7.1.5 of the client product knowledge base, and the POC measurement table comes from section 7.3.3
> **Verification date**: 2026-07-20
> **Versions and plans**: References to FastGPT use the current public version boundaries for community self-hosting, Cloud, and commercial editions
> **Update record**: V1.2 (2026-08-08) rewrote visible copy while preserving facts on cost, support responsibility, and POC. Pricing and version boundaries use a 90-day review cycle

> **Update record addendum**: On 2026-08-08, page framing and body copy were unified around applicable scenarios, long-term cost, contract responsibility, and same-condition POC. Evidence remains stored in delivery metadata and the manifest.
