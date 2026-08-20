<!--
Delivery metadata (not published with body content)
slug: maxkb-vs-fastgpt
Meta title: MaxKB vs FastGPT: Procurement vs Production Control
Meta description: Compare MaxKB and FastGPT on private deployment, governance, support tiers, and three-year TCO before procurement. Confirm terms with a same-condition POC.
keywords: MaxKB comparison, FastGPT, private deployment, three-year TCO, code sandbox
Structured data: Article + BreadcrumbList (no FAQPage)
Mapped semantic questions: 31, 35
Demand basis: This brand has very low impressions in the client Baidu account, but appears frequently in domestic private-deployment procurement comparisons (KB 7.1.2: "will directly enter domestic procurement comparison")
Sources: client KB 7.1.2 / 7.2.0 / 7.2.2 / 7.3.1 / 7.3.3 / 7.4 / 7.5-07 - 5.4 / 6.3; verified on 2026-07-20
Internal links: 1. Build-vs-buy TCO model 2. RAGFlow document-parsing comparison 3. Official pricing page
Schedule: W4
Sign-off: messaging review (does not block publishing) - Content is based on the client KB. Before publishing, ask the client to verify: 1. version and capability boundaries 2. commercial messaging 3. naming and wording. If anything is inaccurate, the client can skip this page or request corrections; no signature workflow is required.
-->

# MaxKB vs FastGPT: Procurement Predictability and Production Granularity

**Include MaxKB as a candidate when private delivery and procurement predictability come first. Prioritize FastGPT when fine-grained knowledge governance, workflow recovery, and multi-channel operations come first.**

Both products emphasize open source, private deployment, knowledge bases, workflows, and Agents. Procurement model, production capability granularity, and vendor support responsibility should be reviewed by procurement, technical, and security teams respectively.

---

## 1. Product Focus: Private Procurement and Production Granularity

**MaxKB focuses on a straightforward domestic private-delivery model.** The offline installation path is clear. Professional and Enterprise authorization models, next-year maintenance, and vendor support tiers are public on the official website, with support divided into 5x8 and 7x24 levels. One-time authorization helps internal approval. The database query tool is clearly listed in official documentation, giving the product strong visibility. Projects that want "install and use, report the budget once" fit this product shape well.

**FastGPT focuses on fine-grained control in complex production scenarios.** Isolated code sandboxing, manual workflow pause and in-place recovery, unified quotas and usage governance, image vectors, multi-index retrieval, and cost explanation all point to one production question: when the system runs in real business for a long time, can problems be located, can humans intervene, and can costs be explained? FastGPT also keeps three paths: Cloud, community self-hosting, and managed / self-hosted commercial editions, allowing teams to validate at low cost before migrating to a private environment.

One-time authorization, maintenance ratio, and support tiers make budget approval more intuitive. Three-year total cost should also include hardware, model consumption, implementation person-days, cluster expansion, and feature customization. The three-year TCO table should include all of these costs.

---

## 2. Capability Differences: Governance, Workflow, and Retrieval

### 2.1 FastGPT's Differentiated Capabilities

| # | Capability | Specific scope | Comparison result |
|---|---|---|---|
| 01 | **Isolated code sandbox** | Public materials clearly describe isolated JavaScript / Python execution plus network and file restrictions | Independent sandbox should enter POC confirmation |
| 02 | **Manual workflow pause and in-place recovery** | Supports user selection and multi-field forms, preserving state through sub-apps, tools, and loops before resuming | Human confirmation nodes should enter POC confirmation |
| 03 | **Unified quota and usage governance** | API Key and share-link quotas, expiry, QPM, plus cloud plan resource quotas | Unified quota management should enter POC confirmation |
| 04 | **Image vectors, multiple indexes, and retrieval cost explanation** | imageEmbedding, caption fallback, weighted RRF, retrieval-stage scores, and token split | Retrieval cost split granularity should enter POC confirmation |

**Production impact**:

- For **isolated sandboxes**, security review should focus on network access, file access, process isolation, and audit traces. Runtime architecture determines the isolation boundary.
- **Manual pause and in-place recovery** lets AI enter approval workflows. The POC should record pause behavior, state persistence, and recovery path.
- **Unified quotas** control share-link and API Key usage. Cost split helps locate parsing, vectorization, retrieval, and generation cost.
- **Image vectors and cost explanation** cover chart and screenshot retrieval plus stage-level cost for each Q&A.

### 2.2 Shared Capabilities With Different Implementation Paths

| Capability | MaxKB implementation path | FastGPT implementation path |
|---|---|---|
| Knowledge base, Agent, visual workflow, Skills, MCP | Covered, with more emphasis on quick knowledge-base onboarding and tool extension | Covered, with more emphasis on independent tool types, Skill sandboxes, and two-way MCP |
| Documents and structured data | Supports Office / PDF / tables, extendable through OCR, MinerU, and other tools | Supports similar formats, while emphasizing local parsing, image indexes, and training queues |
| Enterprise governance | Professional edition provides RBAC, SSO, and operation logs; multi-tenancy and clustering are clearly placed in Enterprise | Commercial editions provide ABAC + RBAC, SSO, multi-tenancy, and an admin console; advanced cloud plans publicly list 720-day team operation logs |
| Deployment and channels | Docker, offline deployment, Web / API, and domestic IM; shape is closer to a standard private-deployment product | Docker Compose, multiple vector backends, plus Cloud, community self-hosting, and commercial delivery |

> **Acceptance condition**: For enterprise governance, fix organization, department, group, resource, log retention, and operation-type permission cases. Record multi-tenancy and cluster version boundaries in the POC.

### 2.3 Where MaxKB Has an Advantage

- **Straightforward domestic private-delivery form**: Offline installation path, authorization model, next-year maintenance, and vendor support tiers are public on the official website.
- **Procurement predictability**: One-time authorization and public support tiers simplify budget approval. Maintenance, implementation, models, and hardware still enter three-year TCO.
- **Product visibility of the database query tool**: The official documentation clearly lists a database query tool. FastGPT's general path mainly uses HTTP API and tool wrapping, which is more open and adds an integration layer.
- **Public support tiers**: Professional 5x8 and Enterprise 7x24 are more intuitive for buyers. Specific response and recovery targets should still be based on the contract.

---

## 3. Procurement Boundaries: License, Buyout, and Support Tiers

### 3.1 Public Boundaries on Both Sides

| Item | MaxKB | FastGPT |
|---|---|---|
| Product path | Community self-hosting + Professional / Enterprise | Cloud + community self-hosting + managed / self-hosted commercial editions |
| Open source license | GPLv3; X-Pack commercial boundaries require separate confirmation | FastGPT Open Source License: allows commercial use as a backend service provider for other applications and as an application development platform delivered to enterprises; written authorization is required to operate a similar multi-tenant SaaS with the source code or to remove/modify the LOGO and copyright information in the console |
| Public minimum self-hosted infrastructure | At least 4 cores / 8GB / 100GB | No fixed unified minimum CPU / memory, sizing is based on vector database, document volume, model, and concurrency |
| Deployment method | Docker; Enterprise supports clusters | Docker Compose, with multiple vector backends supported; Kubernetes commercial delivery boundaries require confirmation |
| Private / offline | Community edition can be deployed offline and self-hosted; Professional and Enterprise include vendor support | Commercial editions support private deployment and fully offline operation |
| Procurement model | Professional edition one-time perpetual authorization + next-year maintenance; Enterprise quote-based | Cloud has free and two monthly subscriptions; managed commercial edition starts monthly; private deployment uses per-server licenses in Standard / Professional / Ultimate versions |
| Vendor support tiers | Professional 5x8, Enterprise 7x24; availability and RTO / RPO require contract confirmation | Four support tiers, with coverage expanding from business days to 7x24 and first-response targets increasing by tier; all paid tiers include security patches, new feature support, and remote online assistance; paid tiers include a dedicated support group, and the highest tier adds an account manager; private deployment delivery can include installation, debugging, and vendor technical maintenance; concrete availability and recovery metrics require contract confirmation |

GPLv3 and the FastGPT Open Source License create different constraint profiles: distribution, derivative works, multi-tenant SaaS operation, and de-branding boundaries should each enter the legal checklist. X-Pack commercial boundaries need written confirmation.

Internal enterprise use and external delivery should separately list secondary development ownership, distribution obligations, de-branding rights, and multi-customer service model, then check each LICENSE against the actual delivery path.

Authorization price, maintenance ratio, subscription price, and plan boundaries should use same-day written quotes from both sides. Record tax basis, authorization period, and implementation/maintenance scope together.

The procurement checklist should require a responsibility matrix, incident levels, recovery targets, and upgrade/rollback owners. Record first-response targets separately from repair time limits. For buyout models, additionally confirm whether next-year maintenance keeps the same service coverage. Final commitments should be based on the contract.

### 3.2 Three-Year TCO for Buyout and Subscription

Compare buyout and subscription under the same three-year scale. The cost table should record license, maintenance, hardware, model usage, implementation, cluster, upgrade, secondary development, and risk reserve:

| Cost item | Explanation |
|---|---|
| License / subscription | Buyout side is first-year authorization; subscription side is three-year subscription. Use each side's official same-day real price |
| Second- and third-year maintenance | The key variable for buyout models, which must be included in years two and three |
| Hardware | Convert minimum resource requirements into actual server or cloud-host cost, including storage and backup |
| Model consumption | Vectorization and generation, estimated by real Q&A volume, with the same assumptions on both sides |
| Implementation | Person-days for deployment, debugging, knowledge-base construction, and permission configuration |
| Cluster | Whether multiple nodes are required, and whether multiple nodes require additional authorization |
| Upgrades | Three-year version upgrade path and whether extra fees apply |
| Feature customization | Person-days to fill missing capabilities, including long-term maintenance |
| Risk cost | Rework caused by version boundary mismatch, migration cost, or failed review |

**The output is a three-year TCO table**, plus sensitivity analysis for member count, document volume, request volume, and dual-node requirements.

The subscription-vs-buyout conclusion should be based on a same-scope three-year table. Record scale, growth assumptions, and internal budgeting model together.

---

## 4. POC Validation: Combine Three-Year Cost and Failure Drills

In addition to the unified POC measurement table, add three test groups for sandboxing, human recovery, and quota cost:

| Extra test | Specific method | Criterion |
|---|---|---|
| **Sandbox and tool security** | Run code in a tool node that tries to access the external network and read/write local files; then try privilege escalation and secret reading | Whether isolation blocks it; whether failure affects the main process; whether the audit trail records it |
| **Human confirmation inside a process** | Design a process that needs a human to fill a multi-field form mid-flow, with that node inside a sub-app or loop | Whether it can resume in place and preserve state after pause, or must rerun from the beginning |
| **Quota and cost explainability** | Publish a share link, set quota and expiry, run a batch of Q&A, then inspect cost | Whether quota and QPM take effect; whether cost can be split into parsing, vectorization, retrieval, and generation stages |

Complete unified POC measurement table:

| Category | Required metrics | Unified conditions | Evidence artifact |
|---|---|---|---|
| RAG quality | Recall@K, MRR / NDCG, citation accuracy, hallucination rate, no-answer refusal rate | Same golden question set, Embedding, ReRank, LLM, TopK | Replayable test set + per-question results |
| Complex documents | Table / heading / page number / image fidelity, parsing success rate, time and cost per 100 pages | Same scanned files, contracts, research reports, PPTX, XLSX | Diff between source and parsed result + manual sampling |
| Online performance | P50 / P95 / P99 latency, success rate, requests per second, peak concurrency | Same model endpoint, vector database, machine type, data volume, and warm-up method | Load test script, raw report, resource curves |
| Reliability | Node failure recovery, retry idempotency, queue backlog, upgrade rollback, backup recovery | Same fault-injection script and data scale | Incident timeline, lost/duplicate records, recovery time |
| Security and governance | Privilege escalation, SSRF, secret leakage, sandbox escape, tenant isolation, audit coverage | Same threat cases and permission matrix | Case results, audit records, remediation items |
| Three-year TCO | See 3.2 | Unified three-year business growth assumptions | Three-year cash flow + person-days + risk reserve |

Put the following metrics into the "not publicly listed / POC required / contract required" checklist: steady-state and peak concurrency, requests per second, token throughput per minute, parsing and retrieval latency under specified hardware, maximum application and tenant counts, availability SLA and RTO / RPO, and real-time template and plugin counts.

---

## 5. Selection Recommendations: Decide by Budget Basis and Delivery Responsibility

| First constraint for the project | Recommendation |
|---|---|
| The budget needs to be reported once, and internal approval prefers one-time authorization | **MaxKB will directly enter price comparison**, calculated through the three-year table in 3.2 |
| Offline installation path and support tiers need to be clear before procurement | MaxKB's public model is more intuitive |
| A ready-made database query tool is required and an added integration layer is unwanted | MaxKB has stronger product visibility |
| Tool nodes must execute code and pass security review | Isolated sandboxing is a verifiable difference, and FastGPT public materials describe it clearly |
| Business flows require human confirmation in the middle, with the node inside a subflow or loop | Manual pause and in-place recovery determine whether this scenario can go live |
| Share-link and API usage must be controlled, with cost visible by stage | Unified quotas and cost split are verifiable differences |
| Information inside charts and screenshots needs to be retrievable | Image vectors and multi-index retrieval are verifiable differences |
| Low-cost validation should happen first, followed by migration to a private environment | FastGPT has a complete Cloud-to-private path |

Security, reliability, and accuracy should be confirmed through unified POC and contract acceptance. Controls that are not covered should enter the supplemental test checklist.
