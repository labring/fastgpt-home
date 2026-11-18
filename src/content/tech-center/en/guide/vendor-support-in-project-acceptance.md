---
title: Technical Support in Project Acceptance: Deployment, Training, Incidents and Upgrades
slug: /en/guide/vendor-support-in-project-acceptance
page_type: deep
source: https://fastgpt.io/contact
source_type: 深度场景内容
meta_title: Vendor Support Written Into Project Acceptance
meta_description: How FastGPT support covers deployment, integration, training, incidents and upgrades, and how each part becomes a checkable acceptance item.
delivery_metadata: {"source_front_matter":{"slug":"vendor-support-in-project-acceptance","meta_title":"Vendor Support Written Into Project Acceptance","meta_description":"How FastGPT support covers deployment, integration, training, incidents and upgrades, and how each part becomes a checkable acceptance item.","language":"en","content_type":"deep","product_version":"v4.17.3","review_date":"2026-11-16","translation_group":"vendor-support-in-project-acceptance","hreflang":"en; zh-CN counterpart identified by translation_group; final URLs resolved by CMS","source_language":"zh","source_sha256":"5d1ae1fe3ff623c5a4c499fade46b72157af3902754bd9da661ecbb732112505"},"editorial_notes":["Source of facts: the official FastGPT release notes listed above. Verified on 2026-11-16. Editions: v4.17.3 commercial and community; the customer deployment version takes precedence. Update history: see the source pages above. 90-day review: recheck before 2027-02-14."]}
schema_type: Article
date_modified: 2026-11-16
---

# Technical Support in Project Acceptance: Deployment, Training, Incidents and Upgrades

**Support is usually one sentence in a procurement file and five separate jobs during implementation: install it, connect it, teach it, fix it quickly, upgrade it safely. Each job has its own deliverable and acceptance step. Written into a list, they can be checked.**

## Five stages support actually covers

The value of vendor support does not lie in someone answering the phone. It lies in covering five stages between go-live and steady operation.

The first is deployment assistance. A self-hosted installation needs servers, images, databases and model services, and the vendor can provide first deployment assistance, with the exact scope defined by the current commercial plan and the order. The second is integration support: interfaces, identity and channels each raise their own questions. The third is training, so users can build knowledge bases, design workflows and publish applications. The fourth is incident handling with a channel and a process. The fifth is upgrades, which involve images, backfill tasks and compatibility checks.

All five share one property: each produces an artifact. A deployment record, an integration record, training material, a ticket and an upgrade record. Listing artifacts per stage makes support checkable in a way that a general commitment does not.

## Three differences across plans

Support comes in four tiers. Three differences are publicly verifiable. The free edition uses ticket support. Paid editions add a dedicated support group. The higher edition adds a dedicated account manager on top of that group. All paid tiers include security patches, new feature support and remote assistance, while training entitlements and service discounts vary by tier.

One element connects directly to training: the vendor runs a monthly online live session covering feature walkthroughs and hands-on practice. Course topics and attendance can be recorded alongside project-specific training and internal handover sessions.

Specific tier names, coverage hours and first-response targets belong to commercial terms rather than public documentation. When a tender requires a response time, cite the contract annex rather than a web page.

## Deployment: turn the split into a table

The most common deployment dispute concerns who does what. A four-column table removes most of it: task, owner, supporting party, deliverable.

At a minimum, cover server and network preparation, database and vector store installation, image pull and version confirmation, model service deployment or connection, administrator account initialisation, domain and certificates, logging and backup policy, and publication channel configuration.

The general split has the customer providing the environment, the vendor or integrator deploying the software, customer IT approving network and security policy, and business users working with the integrator on configuration. Exceptions exist, for instance when the customer asks the vendor to perform everything, and then remote access method and operation logging belong in the contract.

Completion is judged by the list, not by impression. Eight items, each with an artifact, and any gap named with an owner and a date.

## Training: three formats and one internal handover

Training takes three formats, each suited to a different situation.

Monthly online sessions suit large, distributed user groups at low cost, with limited interaction. On-site sessions tied to a project milestone suit key users who need answers on the spot. Documentation and a self-service knowledge base cover the long tail.

Add one internal handover. Vendor training targets key users, who then train their own departments. The handover artifact is a departmental handbook: common questions, standard operations, and whom to ask. That handbook indicates real adoption better than an attendance sheet.

Training entitlements vary by tier, so confirm the number of sessions and formats during procurement. Discovering a shortfall before go-live means a change request.

## Incidents: tiering and record keeping

Incident handling answers two questions: what counts as an incident, and who is called.

Tier by impact. Total loss of service, partial loss affecting a function or department, and degraded experience that does not block work form three levels with different channels and rhythms. The exact response targets come from the contract.

Name the channels. The dedicated support group is the primary channel for paid tiers, the ticket system is the fallback, and the higher edition adds an account manager. Then write the escalation path: how long without a response before escalating, to whom, and what qualifies as a major incident.

Record keeping is the step most often skipped. Each incident records five fields: start time, scope, symptoms, actions and recovery time. Complete records make a quarterly review possible; missing records mean the same problem repeats and is diagnosed from scratch each time.

One technical detail belongs in the operations manual. Index state has three stages, and unindexed data is not recalled. When a user reports that newly imported material cannot be answered, check training progress before suspecting the model. Putting that check first saves a lot of wasted dialogue.

## Upgrades: who triggers, how the window is scheduled

Upgrades are where support most often goes wrong, because three parties are involved: the vendor, customer IT and users.

State the trigger. In self-hosted deployments the customer or integrator runs the upgrade inside a maintenance window, with the vendor providing notes and assistance. Hosted services schedule upgrades and notify customers. The windows and rollback paths differ, so contracts should address them separately.

Scheduling follows the installed components and the target release. In v4.17.3 the Agent sandbox preview proxy moves to v0.4.0; the code execution sandbox is independently versioned at v5.0.0. Keep these components distinct in the upgrade inventory. After required start-up dependencies finish, three background jobs backfill sandbox team ownership, folder ancestry and system-model pricing, sharing up to three cluster concurrency slots. Failed data can be repaired and retried.

One consequence must be known in advance. System models whose pricing has not migrated are treated as free in that version, and totals will not match. The first post-upgrade task is confirming that pricing migration completed.

The v4.17.2 notes list two manual tasks with a fixed order: migrate legacy knowledge base training tasks first, then migrate index rebuild state. Before that, stop every older application and professional service in the cluster and wait for the legacy task lease to expire; the roughly two hours mentioned on the page refers to that lease.

Written into the upgrade checklist, the window becomes schedulable work rather than an evening experiment.

## Acceptance: five checkable items

Acceptance lists usually cover functionality and leave support blank. Five items fill the gap.

First, deployment artifacts complete: servers and network, database, image versions, model service, administrator account, domain and certificates, logging and backup, channel configuration. Second, integration records complete, with success and failure paths per interface. Third, training delivered: sessions, participants, materials and the internal handbook. Fourth, support channels verified: each contracted channel tested once. Fifth, upgrade rehearsal done in a test environment with backfill results and retry paths recorded.

With all five passing, support is accepted. A commitment to provide support leaves nothing to check.

## Responsibility boundaries live in the order

Part of the support scope is public: four tiers, three services included in paid tiers, monthly online training. The rest belongs to commercial terms: response times, service hours, dedicated resources, renewal and maintenance boundaries. Those belong in the order and contract annex.

Split the procurement document accordingly. The first part states publicly verifiable capability with sources and verification dates. The second lists items requiring contractual confirmation.

Keeping the two apart prevents a review from mixing what a web page says with what a contract says. It also matches how internal risk teams read commitments: once written into a contract, a statement becomes an enforceable obligation.

## Failure patterns and repair order

Six patterns appear in support work. Nobody can use the system after training, which points to audience selection or a missing internal handover. Slow incident response points first to the wrong channel and second to unclear tiering. Abnormal behaviour after an upgrade points to image consistency and then to backfill tasks. Mismatched totals point to pricing migration. New material that cannot be retrieved points to index state. Recurring incidents point to missing records.

Repair order follows cost. Channels and tiering first, since they need no engineering. Training and handover second, as organisational work. Technical issues are prioritised by business impact, with loss of service or improper access addressed immediately. In reverse, the technical fix lands but habits do not change and the problem returns.

## A one-page delivery assurance list

| Stage | Deliverable | Acceptance step |
| --- | --- | --- |
| Deployment assistance | Eight deployment records | Sign off item by item |
| Integration | Interface inventory and records | Run success and failure paths |
| Training | Session records, materials, handbook | A key user builds a knowledge base and publishes unaided |
| Incident handling | Five fields per ticket | Sample three tickets for completeness |
| Upgrade | Upgrade record and backfill results | One rehearsal in a test environment |

The list is simple. The difficulty is treating it as part of the contract annex. Support written down and support left verbal produce two different second halves of a project.

## Data Sources

| Topic | Version | Source |
| --- | --- | --- |
| Support tiers, paid tier inclusions, training entitlements, deployment assistance scope | Current commercial plan | [FastGPT commercial deployment and support](https://fastgpt.io/contact) |
| Monthly online training and hands-on sessions | Cross-confirmed | [Customer material review](https://fastgpt.cn/contact) |
| Index states and recall scope | v4.17.2 | [self-host/upgrading/4-17/4172](https://doc.fastgpt.io/self-host/upgrading/4-17/4172) |
| Image lockstep, three backfill tasks, pricing migration | v4.17.3 | [self-host/upgrading/4-17/4173](https://doc.fastgpt.io/self-host/upgrading/4-17/4173) |
