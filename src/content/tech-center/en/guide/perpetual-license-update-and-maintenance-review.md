---
title: Perpetual Use and Product Updates in a FastGPT Deployment
slug: /en/guide/perpetual-license-update-and-maintenance-review
page_type: deep
source: https://fastgpt.io/contact
source_type: 深度场景内容
meta_title: Perpetual Use, Updates and Long-Term Deployment Costs
meta_description: Plan perpetual FastGPT use alongside update access, maintenance and operating costs, with checks for deployment scope, new scenarios and release changes.
delivery_metadata: {"source_front_matter":{"slug":"perpetual-license-update-and-maintenance-review","meta_title":"Perpetual Use, Updates and Long-Term Deployment Costs","meta_description":"Plan perpetual FastGPT use alongside update access, maintenance and operating costs, with checks for deployment scope, new scenarios and release changes.","language":"en","content_type":"deep","product_version":"v4.17.3","review_date":"2026-11-16","translation_group":"perpetual-license-update-and-maintenance-review","hreflang":"en; zh-CN counterpart identified by translation_group; final URLs resolved by CMS","source_language":"zh","source_sha256":"a995437858c6b5ba452c836481e95951cb60db6b29524e7cf08af860cd13f2a8"},"editorial_notes":["Source of facts: the official FastGPT release notes listed above. Verified on 2026-11-16. Editions: v4.17.3 commercial and community; the customer deployment version takes precedence. Update history: see the source pages above. 90-day review: recheck before 2027-02-14."]}
schema_type: Article
date_modified: 2026-11-16
---

# Perpetual Use and Product Updates in a FastGPT Deployment

**For a long-running internal application, separate the right to keep using the software from the services that deliver later updates. FastGPT commercial licensing supports a licence without an expiry date. Update access, upgrade assistance and maintenance are planned separately, alongside infrastructure and model consumption. This gives procurement a clear initial scope and operations a usable ongoing budget.**

## Separate the three purchase shapes

Before discussing cost, separate three purchase shapes, or the numbers will not line up.

The community edition is public source. Its licence allows use as a backend service for other applications and delivery of a platform to an enterprise, while prohibiting operation of a similar multi-tenant SaaS service built on the source without written authorisation, and prohibiting removal or modification of console branding and copyright notices. There is no licence fee; the cost is building and running it.

The hosted service is subscription-based in two variants: an international edition that can call overseas models and a domestic edition limited to domestic models. Subscription fees, model consumption and resource usage follow current rules. No servers are needed on the customer side, and cost tracks usage.

Self-hosted deployment is licensed per server in three editions, with tenant limits of 100, 1,000 and unlimited, single sign-on and OA integration from the professional edition, and separate invoicing and payment modules at the flagship edition.

The three curves differ. Community deployment carries implementation and operating costs. Hosted service follows plan and usage charges. Self-hosted commercial deployment combines licence, infrastructure and ongoing service costs. Comparing them requires aligning the shape first.

## Planning perpetual use alongside updates

The v4.17.1 release notes describe support for perpetual or no-expiry commercial licences. Under that arrangement, record the licensed version and deployment scope separately from update and maintenance schedules. The update plan names the target releases, package delivery route and implementation owner. The support plan names response channels and upgrade assistance.

A company may begin with internal policy questions and later add a ticket assistant. That expansion changes interfaces, model usage and operating work even when the original software remains licensed. Keeping these items separate allows the team to budget new scenarios without treating a perpetual licence as a promise that every future service or module is included.

## Four dimensions of the licence clause

The clause looks short and carries four dimensions, each capable of forcing an extension later.

The object is software use rights: one server, within an agreed term, version and scope. Ownership of the software, source code, algorithms, models and documentation does not transfer. A second server, cluster expansion or an unlicensed module requires separate confirmation.

The term defines how long the rights last. It is not the same as the maintenance term. Expiry of the licence governs continued use; expiry of maintenance governs access to support and updates. The two may diverge, so the contract should state both.

The version scope states which major versions are covered and whether moving to the next major version requires an additional fee. A vague version clause becomes a negotiation at the first upgrade.

The fourth dimension is scope and limits: tenant caps, whether single sign-on and OA integration are included, whether separate invoicing and payment are included. Using capability outside the purchased edition means using beyond the licence.

Align the four and quotations become comparable. Comparing totals alone often reverses the conclusion.

## Updates and maintenance are different products

The two words are used interchangeably in procurement files, and the cost of that habit is a missing budget line.

Updates cover version development: new features, defect fixes and security patches. Maintenance covers run-time support: response to issues, incident handling and assistance with environment adaptation. Both may sit in one contract or be signed separately.

Ask for the two to be listed separately: how far updates reach, how they are delivered, whether the customer upgrades alone or with vendor assistance; what maintenance covers, through which channel, and whether remote assistance is included. Then ask what happens if only one is renewed. The answer usually exposes the real boundary.

The technical side matters too. In v4.17.3 the images form a defined set: application and professional images at v4.17.3, plugin image v1.2.0, code sandbox v5.0.0 and AI Proxy v0.7.7. Agent sandbox deployments require compatible FastGPT, sandbox and preview proxy releases; the code execution sandbox is versioned separately. An upgrade is not a single image swap, which changes the effort estimate behind a maintenance plan.

## Four runtime cost lines

Long-term cost is more than the licence fee. Runtime carries at least four lines, each listed separately.

Servers and infrastructure come first. Applications, databases, vector stores and model services all consume resources, with model inference usually the largest. Peak sizing and average sizing produce noticeably different numbers.

Model consumption comes second. A self-hosted deployment can run local models or call external model services. External calls map directly to spend, while local ones move cost into accelerators and power. Both belong in the estimate, not only the visible invoice.

Operations labour comes third. Backup, monitoring, logging, certificates and upgrade windows need an owner. Labour is the line most often omitted and a meaningful share of a three-year total.

Support and upgrade services come fourth, governed by tier and contract, covering security patches, new feature support and remote assistance, within the scope of the current commercial plan.

Separated, quotations become comparable. One vendor may place model consumption on the customer side, another may bundle it into a service fee.

## How to isolate model consumption

Model consumption is the line most easily underestimated because it follows usage. Three conventions isolate it.

The unit of measure comes first. Pricing is consolidated into one structure: language models use tiered pricing, other models use a unit price; token prices and tier ceilings are entered per million tokens, speech synthesis per million characters, and speech recognition per 60 seconds. Without matching units, two quotations cannot be compared numerically.

Quota and throttling come second. MCP application tool calls and external channel messages both count against the team per-minute request limit, and exceeding it returns remaining allowance with a retry delay. High-frequency automation needs peak-based sizing rather than average-based sizing.

Model ownership comes third. Members can configure dedicated models and channels, and the team owner can replace invalid language, speech and reranking references. Dedicated models identify resource ownership. Attributing spend to a person or department also requires usage records, pricing fields and an organisational mapping.

With the three conventions aligned, an estimate such as cost per thousand questions becomes meaningful. Without them, it is impression.

## Data clauses and exit arrangements

After the licence, two questions remain: who owns the data, and what happens on exit.

Self-hosted data stays in the customer's own environment or cloud. Rights over customer content, self-built knowledge bases and application configuration belong to the customer. The current self-hosted contract states, in clause six, that identifiable customer data, internal material and knowledge base corpora may not be used for model training outside the contract, displayed, or provided to unrelated third parties without written consent, and that on termination the vendor returns or deletes data actually under its control at the customer's reasonable request.

Exit arrangements need three answers: how long the software remains usable after termination, in what form data is exported, and what migration assistance the vendor owes. All three belong in the contract or order. Verbal assurances do not survive a change of account manager.

The community licence boundary belongs here again: delivery to an enterprise is permitted, while operating a similar multi-tenant SaaS service and removing console branding are not. Customers planning an external service should design within that boundary.

## Building the comparison table

A comparison table does not rank totals. It marks what cannot be compared.

Use four columns: item, whether the quotation includes it, the assumptions behind it, and the difference. The items are licence, updates, maintenance, servers, model consumption, operations labour and implementation services.

Three assumptions drive most incomparability: where model consumption sits, whether maintenance includes remote assistance, and whether implementation covers deployment and training. Align those three and totals mean something.

Keep one extra row for change cost: adding a server, adding tenants, enabling a module, or moving to a new major version. That row decides the spend three years out, and for a second server it is explicitly a separate licence confirmation.

## Reconciliation and acceptance

After signing, reconcile quarterly on four items.

First, licensed scope against actual use: server count, tenant count and enabled modules. Second, whether target versions fall within the purchased update entitlement: compare upgrade records against contract dates. Third, whether model consumption matches usage: convert to million-token units and compare with the invoice, explaining any variance. Fourth, whether support channels still work: verify the channels included in the project.

Write the result onto one page with evidence: screenshots, exports and clause numbers. The next quarter starts from that page rather than from zero.

## Failure patterns

Five patterns recur. A licence extension demanded at upgrade time means the version scope was unclear. A second server described as out of scope means the licence named one server. A renewal that costs more than expected means updates and maintenance were not separated. Totals that do not match usually mean different model consumption conventions. Data that cannot be extracted at contract end means exit arrangements were never written.

All five resolve in the same place: the contract. If the clause exists, follow it. If it does not, the only path is renegotiation.

## Two tables, one page

Combine both tables onto one page as the procurement record.

The licence table has four rows: object, term, version scope, scope and limits. The runtime table has four rows: servers, model consumption, operations labour, support and upgrades. Each carries a column citing the contract clause.

With that page in hand, the decision rests on checkable clauses and conventions rather than on a ranking of totals. Three years later, the same page is the starting point for renewal.

## Data Sources

| Topic | Version | Source |
| --- | --- | --- |
| Purchase shapes, edition differences, licence and data clauses, fee scope | Current commercial plan and contract | [FastGPT commercial deployment and support](https://fastgpt.io/contact) |
| Pricing units, dedicated models, MCP quota | v4.17.3 | [self-host/upgrading/4-17/4173](https://doc.fastgpt.io/self-host/upgrading/4-17/4173) |
| Image set and lockstep constraint | v4.17.3 / v4.16.0 | [self-host/upgrading/4-16/4160](https://doc.fastgpt.io/self-host/upgrading/4-16/4160) |
| Community licence boundary | Repository licence | [github.com/labring/FastGPT](https://github.com/labring/FastGPT) |
