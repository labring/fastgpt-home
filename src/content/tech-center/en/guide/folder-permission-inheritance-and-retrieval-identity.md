---
slug: /en/guide/folder-permission-inheritance-and-retrieval-identity
meta_title: "FastGPT Folder Inheritance and Retrieval Identity"
meta_description: "Trace FastGPT file visibility from folder inheritance and member identity to retrieval checks, navigation-only access, and published resource snapshots."
schema_type: Article
page_type: 实施指南
date_published: 2026-11-09
date_modified: 2026-11-09
keywords: ""
---

# Folder Inheritance and Retrieval Identity in File-Level Permissions

**Once file-level permissions are enabled, visibility follows three things: member identity, the file set that identity can read, and the authentication path used at retrieval time. Folder structure organises the file set and grants nothing on its own. The check order runs from identity to file set to retrieval filtering; reversing it produces the familiar contradictions of entering a folder but not opening a file, or retrieval results that change with the account.**

## Three things decide visibility

Member identity determines which teams and knowledge bases are reachable. The file set determines which material is readable. Retrieval authenticated as that member filters candidates to that set. The three are chained, and when one link fails the next never runs.

The file-level permission switch is off by default, and existing behaviour stays unchanged. Enabling it is an explicit act; afterwards, lists, details and retrieval recall are all checked file by file. That shapes the investigation: when two people see different results in the same knowledge base, check identity and file permissions before touching retrieval parameters.

## Inheritance and standalone: two layers of authorization

A new folder can inherit the parent's permissions or keep its own. Inherited folders follow changes to the parent's collaborators; standalone folders maintain their own; both can coexist in one tree, and inheritance can be restored. A change applies to every file beneath that folder, travelling down the hierarchy.

The failure here sits before the change, not in the choice: without a clear picture of which subtrees are standalone, the scope of a change is unknown afterwards. An inventory helps — folder path, inherited or standalone, collaborator list, last change time. Update it before the change and verify against it afterwards.

Authorization also separates operations from permissions. Editing knowledge base configuration, renaming files or tags, and enabling or disabling files are administrative actions that need management permission; content editing keeps its original edit permission. Reporting "can rename a file but cannot change the knowledge base configuration" as a defect is a common misreading of that separation.

## Parent folders act as navigation only

A member holding permission on a child resource sees the parent folder as a navigation entry and gains no management rights over it. FastGPT v4.17.3 states this explicitly. The way to verify is to attempt a rename or a delete with such an account and confirm it is refused. Being able to enter a folder says nothing about holding rights over it.

Keeping navigation and authorization apart gives the directory plan more room: layers by department, folders by project, exceptions by file. When all three live in one folder, a single authorization change needs checking in three places, and the error rate runs higher than adding a couple of folders.

## Where the two choices cost differently

Inheritance is cheap to maintain and expensive to change: one edit at the parent moves the whole subtree, which is efficient until the edit is wrong. Standalone is the opposite, cheap to change and expensive to maintain, because every new file needs its own collaborator list.

A practical rule is to inherit along organisational lines and go standalone where responsibility differs from the parent, such as a folder shared with an external party inside an otherwise internal project. Converting inheritance to standalone splits one grant into two, and every later staffing change touches both. Converting back to inheritance overwrites the standalone collaborators, so exporting the collaborator list first is the only way to recover them.

## Publish snapshots and runtime identity

When an application is published, static resources are checked against the snapshot taken at publish time, while dynamic resources are checked against the user actually running. After permissions change, the two can disagree: the static part still follows the old snapshot, the dynamic part already follows the new grants.

## Retrieval filters per member identity

Retrieval recall is filtered against files the member can read, and the filtering happens on calls authenticated as the current member. Two boundaries matter. Calls that preselect a knowledge base without member authentication do not apply file-level filtering. Share links and login-free windows follow their own authentication paths, so results from a member account cannot be used to infer their behaviour.

The check is to have two members run the same question, compare result counts and snippet origins, and then compare each with the respective file set. Identical results do not prove correct configuration, because two members whose file sets coincide will show no difference in retrieval.

## Publish snapshots and runtime identity

When an application is published, static resources are checked against the snapshot taken at publish time, while dynamic resources are checked against the user actually running. After permissions change, the two can disagree: the static part still follows the old snapshot, the dynamic part already follows the new grants.

Tracing this starts by classifying the resource, then checking authorization. Mixing them produces the conclusion that a permission change had no effect, when in fact half of it took effect.

## Fixing identity for comparison tests

Comparison tests hold three things constant: account, knowledge base, question. A fixed account removes file-permission differences, a fixed knowledge base removes recall differences from switching libraries, and a fixed question makes snippets comparable. With all three fixed, differences between two runs belong to retrieval or indexing.

When the purpose is instead verifying permissions, hold the question and vary the account, then watch whether results narrow with grants. The two test designs answer different questions and cannot be interchanged.

Record all three constants alongside the result. A comparison sheet without the account and the knowledge base is unusable a week later, when nobody remembers which member produced which row. Pairing each row with the file set at the time of the run turns the sheet into evidence rather than a screenshot of an outcome.

## Failure symptoms and check order

An empty list points at identity and file read permission. A listed file that will not open points at standalone authorization for that file. A missing document in retrieval points at the file set or the authentication path. Foreign files appearing in retrieval point at a call that skipped member authentication. For a failed delete, confirm the permission required for that resource and keep the API error.

The order stays identity, set, retrieval, action. Skipping steps duplicates work and turns configuration problems into product complaints. Each step should leave a record: account, folder path, retrieval question, response code. With four records in hand, the problem no longer rests on whose account of events is right, and a handover can reproduce the case without starting from the symptoms again.

## Test two identities with the same query

In an isolated knowledge base, create a shared document and a restricted document. Give each a distinctive marker and authorize only one test member to read the restricted file. From an app that authenticates retrieval as the current member, run the same query under both accounts. Record folder navigation, readable files and citations separately. If neither account retrieves the restricted file, search for its marker with the authorized account and check indexing before drawing an access-control conclusion. If the unauthorized account retrieves it, capture the entry point, session identity and citation ID. Run the same checks against the published version and record shared and unauthenticated entry points independently.

## Source of facts

Verified on 2026-11-09. Product version: FastGPT v4.17.3.

| Topic | Source |
| --- | --- |
| Folder inheritance, navigation-only parent folders, management versus edit permission | [Release notes 4.17.3](https://github.com/labring/FastGPT/releases/tag/v4.17.3) |
| File-level permissions and publish snapshots | [Release notes 4.17.1](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-17/4171) |
