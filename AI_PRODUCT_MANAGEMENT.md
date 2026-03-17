# AI Product Management

A process framework for building products with AI coding agents. Captures the workflow, document lifecycle, naming conventions, parallel planning patterns, and self-review tooling that emerged from building GlobalAiCoach — formalized so it can be dropped into any new project.

**Supersedes:** `PROTOTYPE_DESIGN_PROCESS.md` (which covered basic session logging). This document captures the full end-to-end process including the research-to-reference pipeline, parallel planning, self-review tooling, and the operator's role.

> Evolving document. Updated as the process matures.
> Last updated: 2026-03-09

---

## Table of Contents

1. [Philosophy](#1-philosophy)
2. [The Operator Model](#2-the-operator-model)
3. [System Hierarchy](#3-system-hierarchy)
4. [Document Architecture](#4-document-architecture)
5. [The Document Lifecycle](#5-the-document-lifecycle)
6. [Feature Development Flow](#6-feature-development-flow)
   - [Autonomous Build Loop](#autonomous-build-loop-v087)
7. [Parallel Planning](#7-parallel-planning)
8. [Versioning Strategy](#8-versioning-strategy)
9. [Naming Conventions](#9-naming-conventions)
10. [Session Logging](#10-session-logging)
11. [Testing & Quality Assurance](#11-testing--quality-assurance)
12. [Cadenced Monitoring & Self-Improvement](#12-cadenced-monitoring--self-improvement)
13. [Self-Review & Dev Tooling](#13-self-review--dev-tooling)
14. [CLAUDE.md: The Operating System](#14-claudemd-the-operating-system)
15. [New Project Setup](#15-new-project-setup)
16. [Lessons Learned](#16-lessons-learned)
17. [Future Considerations](#17-future-considerations)

---

## 1. Philosophy

### Why This Exists

AI coding agents are powerful but amnesiac. Without process, you lose:
- **Context** — the agent doesn't remember why you built something
- **Decisions** — trade-offs vanish between sessions
- **Coherence** — features conflict because the agent doesn't know what else exists
- **Speed** — you re-explain the same things every session

Process solves this by creating a **persistent knowledge layer** that survives across sessions, agents, and even projects. The agent reads the docs, understands the system, and picks up where it left off.

### Core Beliefs

1. **Many small releases over few large ones.** v0.8.12 is better than a big v0.8.1. Small releases are easier to review, test, revert, and reason about. Each commit is a version.

2. **Document thyself.** The thinking is the asset. Every research path explored, design decision weighed, and architectural insight discovered is valuable — and will be lost when the context window ends unless it's captured. If you did meaningful thinking, document it. Don't wait to be asked. The next session should build on your work, not rediscover it. A well-documented decision in 3 sentences saves hours of re-analysis later. Documents are the product's memory — code tells you what the system does; docs tell you why it does it, what it used to do, and what it should do next.

3. **Research is not design. Design is not code. Code is not documentation.** Each phase has its own artifact with its own lifecycle. Conflating them creates docs that are half-aspiration, half-reality.

4. **The AI does the work; the human does the judgment.** The agent writes code, generates reports, runs tests. The human decides what to build, reviews quality, and makes trade-offs. The process should maximize the human's leverage.

5. **Build the tools to review the work.** Don't rely on reading every line. Build preview tools, screenshot capture, automated tests, and structured review workflows so the agent can present its work for efficient human review.

6. **Reference docs describe what IS, not what WILL BE.** Aspirational content goes in Design Docs. Reference docs are source of truth for the current system state. Mixing them creates confusion about what's real.

7. **Build observable by default.** Every module should be built so it can be monitored, tested, and improved by the AI agent — not just by humans. Runtime diagnostics, structured logging, and testable interfaces are not afterthoughts. They're part of the design.

8. **The system improves itself.** The agent doesn't just build features — on a regular cadence it monitors production behavior, pulls logs, identifies issues, and proposes fixes. Most users don't report problems until they're catastrophic. The system should find and fix issues before users notice them. Observability must be designed into every module so there's something meaningful to monitor.

9. **Capture mistakes so the agent learns.** When an agent makes an error that required correction, add a rule to CLAUDE.md: "Never X because Y." This is how the agent improves across sessions. The agent is amnesiac — without written rules, it will make the same mistake every time. Mistake capture is continuous retrospective.

10. **Design for agentic review.** Every module should be built so a fresh agent (or a different agent) can review it efficiently. Structured outputs, explicit success criteria, and observable behavior make review faster and more reliable. Review time is the new bottleneck — invest in tools that make review efficient.

---

## 2. The Operator Model

The human is the **operator** — running multiple AI agent sessions in parallel, each focused on different aspects of the product. This is fundamentally different from pair programming.

### How the Operator Works

```
┌─────────────────────────────────────────────────────────┐
│                    OPERATOR (Human)                      │
│                                                         │
│   Decides what to build, reviews work, makes trade-offs │
│   Runs multiple sessions simultaneously                 │
│   Top window: planning future releases                  │
│   Bottom window: building current release               │
└────────┬──────────────┬───────────────┬─────────────────┘
         │              │               │
    ┌────▼────┐   ┌─────▼─────┐   ┌────▼────┐
    │ Session │   │  Session  │   │ Session │
    │ BUILD   │   │  DESIGN   │   │ REVIEW  │
    │ v0.7.10 │   │  v0.8.0   │   │ Testing │
    └─────────┘   └───────────┘   └─────────┘
```

### Operator Principles

- **Parallel over serial.** Plan the next release while building the current one. Research while designing. The bottleneck should never be the agent — it should be your decision-making.

- **Separation of concerns across sessions.** Each session has a focused scope. Don't mix "build this feature" with "plan the next quarter." Different sessions, different contexts, different outcomes.

- **Structured handoff between sessions.** Session A produces a design doc. Session B reads that doc and implements it. The doc IS the handoff. No verbal explanation needed.

- **Review tooling over manual inspection.** Build tools that let the agent present its work in reviewable form — screenshots, reports, test results. You review outputs, not process.

### Human Best Practices

These are operator habits that make the process work. The AI follows the process; the human manages the sessions.

#### Every Chat Produces a Document

If a chat was worth opening, it produces an output artifact. No exceptions (except trivial one-line fixes done inline during a build).

| Chat Type | Output Document |
|-----------|----------------|
| **Research** | `Docs/Research/[TOPIC].md` |
| **Design** | `Docs/Design/V[X.Y]_[FEATURE].md` or `[SYSTEM]_DESIGN.md` |
| **Build+Test** | Code + `CHANGELOG.md` + `DEVELOPMENT_LOG.md` entry + test results |
| **Monitoring** | Monitoring report (in DEVELOPMENT_LOG or dedicated report file) |
| **Process** | Updated process doc (like this one) |

This is a forcing function for documentation quality. If a chat has no document at the end, the work done in that chat is invisible to future sessions and effectively lost.

#### Chat Naming Convention

Name every chat with a reference tag so you know what it is at a glance. Format:

```
[version] [system/module] — [phase]
```

Examples:
- `v0.7.12 Body Module — Design`
- `v0.7.12 Body Module — Build`
- `v0.7.10 Coaching — Build`
- `v0.8.0 Data Layer — Research`
- `Process — AI Product Management`

The tag is the first thing typed in a new chat. It becomes the label on your screen and makes multi-window management possible.

#### Chat Boundaries

Not every process phase requires a new chat. The key insight: **start a new chat when the context would hurt more than help.** Build context is invaluable for testing. Stale build context is noise for the next feature.

| Chat | What Happens In It | Why It's One Chat |
|------|-------------------|-------------------|
| **Research** | Investigate a topic, produce findings doc | Independent — happens whenever needed, not tied to a release |
| **Design** | Architecture + design + release impl doc | Design includes its own research/thinking; one focused scope |
| **Build+Test** | Implement, test, iterate, fix, get approval | Build context is essential for testing. The build↔test loop is fast and fluid — specs are often wrong on first pass, so rapid iteration within the same context is critical |
| **Monitoring** | Pull logs, analyze, produce health report | Fresh context; loads from monitoring scripts, not build history |

| Transition | New Chat? | Why |
|-----------|-----------|-----|
| Research → Design | Yes | Different scope. Design loads research doc as input. |
| Design → Build | Yes | Design doc IS the handoff. Build chat validates it can stand alone. |
| Build ↔ Test | **No** | Testing needs build context. The iteration loop is too fast and intertwined to split. First builds are rough — you need the context to know whether a failure is a code bug or a spec issue. |
| Test → Approval | **No** | Approval happens at the end of the build+test chat. Operator reviews in-context. |
| Release → Next work | **Yes** | After release close-out, the build chat is full of dead ends, debugging tangents, and superseded decisions. That noise hurts the next task. Fresh chat loads clean reference docs. |
| Any → Monitoring | Yes | Different scope and cadence entirely. |

**Why new chats matter (when they do):**

1. **Context window discipline.** Long chats accumulate stale context that gets compressed and lossy. A fresh chat loads CLAUDE.md + the relevant design doc cleanly — no assumptions from three hours ago competing for attention.

2. **Documentation quality test.** If a fresh build chat can't pick up from the design doc alone, the design doc isn't complete enough. Every new chat is a **process test** — it validates whether the handoff artifacts actually work. Because AI agents are amnesiac, the only things that survive between chats are the documents. If something is missing, you find out immediately.

3. **Scope containment.** A design chat that drifts into implementation starts holding two mental models. When it gets long, the agent confuses "what we planned" with "what we built." Clean phase boundaries prevent this.

4. **Signal-to-noise ratio.** After a build+test cycle, the chat contains debugging tangents, superseded approaches, and stale decisions. Starting fresh for the next task gives the model clean context to work with.

**Exception:** Very small patches (v0.7.8.1, v0.7.8.2) can use a single chat for design + build + test when the scope is trivial.

#### Managing Multiple Windows

The typical operator layout:

```
┌──────────────────────────────────────────┐
│  TOP: Planning / Design / Research       │
│  (future releases, strategic thinking)   │
├──────────────────────────────────────────┤
│  BOTTOM: Build / Test                    │
│  (current release, hands-on work)        │
└──────────────────────────────────────────┘
```

Rules of thumb:
- **Max 2-3 active chats** at a time. More than that and you lose the ability to review quality.
- **One build chat at a time.** Two simultaneous builds risk merge conflicts.
- **Design and research chats can overlap freely** — they produce documents, not code changes.
- **Monitor which chat is touching which files.** If two chats need the same file, sequence them.

#### The Operator's Daily Rhythm

1. **Morning:** If monitoring is active, review the morning report. Decide priorities for the day.
2. **Start of work:** Check ROADMAP.md for current version status. Open the right phase chat (or start a new one).
3. **During work:** Top window plans ahead, bottom window builds current. Switch focus as decisions are needed.
4. **End of day:** Verify DEVELOPMENT_LOG is updated. Check that any completed phase has its design doc marked "Implemented." Commit if work is committable.
5. **Between phases:** Close the old chat. Start a new one. Name it. This is the process test.
6. **When correcting the agent:** If you had to correct a mistake, add a rule to CLAUDE.md: "Never X because Y." This is the continuous retrospective — the agent learns across sessions only through written rules.

#### Mistake Capture

When the agent makes a mistake that required operator correction, capture it as a preventive rule in CLAUDE.md. This is the single most impactful practice for improving agent quality over time.

**Format:** Add rules to a "Known Mistakes" or relevant section of CLAUDE.md:
```
- Never use `subsystem` when referring to top-level systems — use Platform → System → Module hierarchy
- Never create patch versions (v0.8.6.1) for planned roadmap items — only for mid-build discoveries
- Never build custom logging — use the existing CloudWatch infrastructure via scripts/fetch-sessions.sh
```

**When to capture:**
- Agent made a naming error you had to correct
- Agent used the wrong architectural pattern
- Agent created unnecessary complexity
- Agent missed a security concern
- Agent broke an existing convention

**Why this matters:** The agent is amnesiac. Without a written rule, it will make the same mistake in every future session. Each rule is a permanent improvement.

### What the Agent Should Know About Sessions

When a new chat starts, the agent should orient itself immediately:

1. **Read CLAUDE.md** — always loaded automatically, provides operating rules
2. **Check the user's first message** — the chat name tag tells you the version, system, and phase
3. **Read the relevant design doc** — if this is a build chat, the design doc is your specification
4. **Check ROADMAP.md** — understand where this release fits in the dependency chain
5. **Check DEVELOPMENT_LOG.md** — understand what was done recently and any open issues

If the agent can't find enough context to proceed, that's a signal — ask the operator what's missing, and that gap should be fixed in the docs for next time.

---

## 3. System Hierarchy

### Platform → System → Module

The product is organized into three levels of granularity. Using consistent language across docs, code, and conversations prevents confusion.

```
PLATFORM (GlobalAiCoach)
│
├── SYSTEM: SIM Engine
│   ├── MODULE: Mind (System 2 reasoning)
│   ├── MODULE: Voice (Speech style)
│   ├── MODULE: Memory (Short-term memory)
│   ├── MODULE: Conversation Manager
│   └── MODULE: Body Manager
│
├── SYSTEM: Speech Pipeline
│   ├── MODULE: STT (streaming transcription)
│   ├── MODULE: TTS (sentence-chunked synthesis)
│   └── MODULE: Proxy Router (multi-region failover)
│
├── SYSTEM: Content System
│   ├── MODULE: Course/Activity resolver
│   ├── MODULE: Video config resolver
│   └── MODULE: Multi-brand support
│
├── SYSTEM: Scoring & Reports
│   ├── MODULE: LLM scoring
│   ├── MODULE: Score aggregation
│   └── MODULE: Report generation
│
├── SYSTEM: Coaching Engine
│   ├── MODULE: Coach identity
│   ├── MODULE: Coach presence
│   └── MODULE: Focus area mapping
│
├── SYSTEM: CRM
│   ├── MODULE: Profile lookup
│   ├── MODULE: CRM Panel UI
│   └── MODULE: Relationship tracking
│
└── SYSTEM: Onboarding Engine
    ├── MODULE: Content sections
    ├── MODULE: Agent workflows
    └── MODULE: Interface tour
```

### Definitions

| Level | What It Is | Example | Scope |
|-------|-----------|---------|-------|
| **Platform** | The entire product — all systems, infrastructure, and tooling | GlobalAiCoach | One per product |
| **System** | A major functional boundary with its own architecture, reference doc, and design docs | SIM Engine, Speech Pipeline, CRM | 5–10 per platform |
| **Module** | A discrete, toggleable component within a system. Can be enabled/disabled independently. | Mind (System 2), STT, Coach Presence | 2–5 per system |

### Why This Matters

- **Architecture docs** define **systems** — their boundaries, responsibilities, and interfaces with other systems.
- **Design docs** specify **modules** — implementation details within a system.
- **Reference docs** describe **systems** — one per system, covering all its modules.
- **Feature flags / complexity levels** control **modules** — e.g., SIM Engine `complexity: 'standard'` enables Mind but not all conversation rules.
- **Customer conversations** use **modules** — "Which modules do you want in the SIM Engine?" is how we talk about configuration and licensing.

### Naming in Code

Systems and modules map to the codebase:

| Level | Code Location | Example |
|-------|--------------|---------|
| **System** | Top-level service directory | `src/services/simEngine/` |
| **Module** | Files/subdirectories within system | `src/services/simEngine/promptAssembler.ts` (Mind module) |
| **Cross-system service** | Top-level service file | `src/services/scoringEngine.ts` |

When naming new systems or modules, use this hierarchy. A "feature" that spans multiple systems is an **integration** (like CRM integration into SIM Engine), not a new system.

---

## 4. Document Architecture

### The Four-Category System

Every document in the project falls into one of four categories. Each has a distinct purpose, update cadence, and lifecycle.

```
Docs/
├── [Reference Docs]         ← How the system works RIGHT NOW
│   ├── ARCHITECTURE.md
│   ├── SIM_ENGINE.md
│   ├── STT_TTS_ENGINE.md
│   ├── CONTENT_OPS.md
│   ├── DATA_MODEL.md
│   ├── API_REFERENCE.md
│   ├── CRM.md
│   ├── ONBOARDING_ENGINE.md
│   └── ...
│
├── Design/                  ← Forward-looking proposals
│   ├── [SYSTEM]_ARCHITECTURE.md    ← High-level system boundaries
│   ├── [SYSTEM]_DESIGN.md          ← Detailed implementation spec
│   ├── V[X.Y]_[FEATURE].md           ← Release-specific implementation
│   └── AaronDesignDocs/               ← Executive/strategy docs
│
├── Research/                ← Persistent findings (never archived)
│   ├── COACHING_SCIENCE.md
│   ├── STT_PROVIDERS.md
│   └── ...
│
├── Testing/                 ← Test logs, debug analysis, scripts
│   ├── TEST_LOG_v0.7.6.md
│   ├── STT_STREAMING_DEBUG_LOG.md
│   └── ...
│
└── _old/                    ← Superseded docs (historical reference)
```

| Category | Location | Purpose | Updated | Archived? |
|----------|----------|---------|---------|-----------|
| **Reference** | `Docs/` top-level | Living system state | On release | When superseded |
| **Design** | `Docs/Design/` | Proposals & specs | During planning | When implemented |
| **Research** | `Docs/Research/` | Persistent findings | When research completes | Never (stays as reference) |
| **Testing** | `Docs/Testing/` | Test results & analysis | During QA | Rarely |

### Session Logs (Temporal Tracking)

Separate from the four categories, these documents track the passage of time:

| Doc | Scope | Updates | Content |
|-----|-------|---------|---------|
| `Docs/REQUEST_LOG.md` | Every request | Real-time | **WHY** — user intent |
| `Docs/DEVELOPMENT_LOG.md` | Daily/per-session | After work blocks | **HOW** — technical decisions |
| `CHANGELOG.md` | Per commit | On commit | **WHAT** — user-facing changes |
| `ROADMAP.md` | Per release | On completion | **WHEN** — status & dependencies |

### Root-Level Files

```
project/
├── CLAUDE.md          ← AI agent operating instructions (always loaded)
├── CHANGELOG.md       ← Version-by-version changes
├── ROADMAP.md         ← Active roadmap with dependency chains
├── ROADMAP_ARCHIVE.md ← Completed version details
└── Docs/
    ├── DEVELOPMENT_LOG.md
    ├── DEVELOPMENT_LOG_ARCHIVE.md
    ├── REQUEST_LOG.md
    └── DOC_WORKFLOW.md  ← Procedures for maintaining all of the above
```

---

## 5. The Document Lifecycle

Documents progress through a clear pipeline. Each phase produces its own artifact type.

```
RESEARCH (independent)      DESIGN                  BUILD + TEST            REFERENCE
──────────────────────      ────────────────        ────────────────        ────────────────
Docs/Research/              Docs/Design/            src/ + tests            Docs/ (top-level)

Persistent findings         Architecture doc        Code implementation     System state doc
Provider comparisons        → Design spec           Commit per version      Updated on release
Framework analysis          → Release impl doc      Build ↔ test loop       Version-stamped header
Competitive landscape       Problem → Solution      Approval in build chat

Never archived              Marked "Implemented     Archived at major       Updated in-place
Referenced when needed      in vX.Y" when done      version boundaries      when system changes
```

### Phase Transitions

Research is **independent but gated** — research docs live on their own and may be created weeks before a design uses them. However, design sessions for medium/large features include an **automatic research gate**: the agent checks whether relevant research exists, and if not, flags the gap and recommends a separate research session before proceeding. This means research can happen proactively or reactively, but it's never silently skipped for significant features.

| Transition | Trigger | What Happens |
|-----------|---------|--------------|
| Research → (available) | Research complete | Findings doc in `Docs/Research/`. Referenced by design chats when relevant — not a linear precursor. |
| Design → Build | Design doc approved, release planned | Design doc (`V[X.Y]_FEATURE.md`) is the build spec. New chat. |
| Build ↔ Test | Build produces something testable | Fluid loop within same chat. Test, fix, iterate until pass/fail criteria met. |
| Build+Test → Release | Operator approves in build chat | Close-out: reference docs updated, design doc marked, ROADMAP updated. |
| Reference → Archive | System significantly rewritten | Move old reference doc to `Docs/_old/`, new doc takes its place |

### The Critical Rule

**A design doc becomes a reference doc by updating the reference doc, NOT by renaming the design doc.** The design doc stays in `Docs/Design/` with a note "Implemented in vX.Y — see [REFERENCE_DOC.md]". The reference doc gets updated with the new system state.

### What Claude Should Do Automatically

This is the key process improvement: **Claude should create the right document at the right phase without being told.**

| Phase | What to Create/Do | When |
|-------|-------------------|------|
| **Research** | Create `Docs/Research/[TOPIC].md` | When asked to research or compare options |
| **Research Gate** | Check for existing research; flag gaps to operator | At the START of any design session for medium/large features |
| **Architecture** | Create `Docs/Design/[SYSTEM]_ARCHITECTURE.md` | When defining system boundaries for the first time |
| **Design** | Create `Docs/Design/[SYSTEM]_DESIGN.md` | When specifying implementation details for a system |
| **Release Planning** | Create `Docs/Design/V[X.Y]_[FEATURE].md` | When planning a specific release's implementation |
| **Build** | Update `CHANGELOG.md`, `ROADMAP.md` | On every commit |
| **Post-Build** | Update affected reference doc(s) | After committing a release |

**The agent should not wait to be told "create a design doc" or "update the reference doc."** These are automatic steps in the pipeline. If you're planning a release, you create the release design doc. If you've committed code that changes a system, you update the reference doc. If you're starting a design session for anything beyond a small feature, you check the research gate first.

---

## 6. Feature Development Flow

### End-to-End: From Idea to Reference Doc

```
1. USER REQUEST
   └─→ Log in REQUEST_LOG.md immediately
   └─→ Assess scope: trivial fix? or feature?

2. RESEARCH GATE (automatic checkpoint in design sessions)
   └─→ Assess feature size: small (single module tweak), medium (new module
        or cross-module change), large (new engine, new architecture, multi-system)
   └─→ For medium/large: research is a REQUIRED checkpoint before designing
   └─→ Check: does relevant research already exist in Docs/Research/?
        ├── YES → Reference it, confirm findings still apply, proceed to design
        └── NO  → Document what research is needed and STOP design
              ├── List specific research questions/topics needed
              ├── Note what the design is blocked on without this research
              └── Flag to operator: "Research needed — recommend a separate
                   research session before continuing design"
   └─→ For small features: research is optional — note "Research: N/A (small scope)"
   └─→ Research itself happens in a SEPARATE research session (one job per session)
   └─→ Design resumes in a new session once research is available

3. DESIGN (research-informed)
   └─→ FIRST: Verify research gate (see step 2)
        ├── "Research: [TOPIC].md" — reference the findings doc
        ├── "Research: N/A (small scope)" — explicit skip with reason
        └── If research is missing for a medium/large feature → flag it, don't proceed
   ├─→ Architecture doc (if new system): Docs/Design/[SYSTEM]_ARCHITECTURE.md
   ├─→ Design spec (implementation details): Docs/Design/[SYSTEM]_DESIGN.md
   └─→ Release implementation doc: Docs/Design/V[X.Y]_[FEATURE].md
        ├── Release Scope (areas, priorities P0/P1/P2)
        ├── Research Referenced (new — links to research that informed the design)
        ├── The Problem (context + diagrams)
        ├── Implementation sections (code specs, file plans)
        ├── Verification (how we know it's done)
        └── Validation Story (reviewer walkthrough — do this, see that, here's the value)

4. BUILD + TEST (same chat — fast, fluid loop)
   └─→ FIRST: Check git status for clean working tree
        ├── Clean → proceed
        └── Dirty → flag uncommitted changes to operator, ask how to proceed
              (commit first? stash? expected and safe to continue?)
              Never start building on a dirty tree without explicit acknowledgment.
   └─→ Implement according to design doc
   └─→ Test against design doc's Verification section
   └─→ Fix issues, re-test — the loop is rapid and intertwined
   └─→ First builds are rough; specs are often wrong — iterate on both
   └─→ Commit code (may happen before all tests pass — that's OK)
   └─→ Update CHANGELOG.md on commit
   └─→ Update ROADMAP.md on commit
   └─→ Log session in DEVELOPMENT_LOG.md
   └─→ Log test results in Docs/Testing/ or DEVELOPMENT_LOG
   └─→ Some tests may take days or involve other people — that's expected

5. REVIEW & APPROVAL (end of build chat — human gate)
   └─→ Operator reviews the completed, tested work
   └─→ Operator provides feedback — may require iteration
   └─→ Agent addresses feedback, re-tests if needed
   └─→ Operator approves → release proceeds to close-out
   └─→ This is the final human-in-the-loop gate before the release is official

6. RELEASE CLOSE-OUT
   └─→ Operator has approved
   └─→ All pass/fail criteria from design doc are met
   └─→ Final commit (if iteration happened during review)
   └─→ Update relevant reference docs (use trigger table)
   └─→ Mark design doc: "Implemented in vX.Y"
   └─→ Version-stamp reference doc header
   └─→ Define ongoing monitoring needs (if any) for this release
   └─→ ROADMAP status → ✅ Complete

7. ARCHIVE (at major version boundaries)
   └─→ Completed ROADMAP sections → ROADMAP_ARCHIVE.md
   └─→ Old DEVELOPMENT_LOG entries → DEVELOPMENT_LOG_ARCHIVE.md
```

### Review & Approval

The human is always in the loop. After testing passes, the operator reviews the work and either approves or provides feedback. This is not rubber-stamping — it's the operator verifying that the build matches their intent, not just the design doc's spec.

**What the operator reviews:**
- Does it actually solve the original problem?
- Does the UX feel right? (Not just "does it match the design doc" but "is the design doc right?")
- Are there edge cases the tests didn't catch?
- Does it integrate well with the rest of the platform?

**What happens during review:**
- Operator provides structured feedback (approve / needs changes + specific notes)
- If changes needed: agent iterates, re-tests, and presents again
- The feedback loop may go 1-3 rounds
- Once approved, the release proceeds to close-out

**In practice:** For small releases, review may be a quick look. For large releases, it may take a dedicated session. The operator decides the depth of review based on the release scope and risk.

### Release Close-Out Criteria

A release is **not closed** until:

1. **Code is committed** — the implementation matches the design doc
2. **Tests pass** — the Verification section criteria are met
3. **Operator has approved** — the human gate is satisfied
4. **Reference docs are updated** — affected system docs reflect the new state
5. **Design doc is marked** — "Implemented in vX.Y"
6. **Ongoing monitoring is defined** — what (if anything) needs to be monitored for this release going forward

The operator may commit code and move on to the next release before all tests pass — that's fine. The release just stays "open" in the ROADMAP until close-out is complete. This prevents the bottleneck of waiting for multi-day testing while keeping accountability for quality.

### Reference Doc Trigger Table

After committing code, check which reference docs need updating:

| If You Changed... | Update... |
|---|---|
| SIM Engine (prompts, profiles, rules) | SIM_ENGINE.md |
| STT/TTS (providers, warmup, voices) | STT_TTS_ENGINE.md |
| Courses, activities, video config | CONTENT_OPS.md |
| Component hierarchy, provider pattern | ARCHITECTURE.md |
| Data types, entity relationships | DATA_MODEL.md |
| API endpoints, auth, payloads | API_REFERENCE.md |
| CRM module | CRM.md |
| Onboarding engine | ONBOARDING_ENGINE.md |

**For new systems:** Create the reference doc the first time the system ships. Name it `Docs/[SYSTEM].md`.

### Design Doc Structure

Every release design doc follows this template:

```markdown
# v[X.Y] — Feature Name

Version: X.Y | Status: Design Complete | Date: YYYY-MM-DD
Parent Architecture: [link]
Related: [links]
Research: [link to Docs/Research/TOPIC.md] or "N/A (small scope)" with reason

> Release implementation design. [Brief context]. Informed by [research/testing].

## Table of Contents

## Release Scope
| Area | What Changes | Priority |
|------|-------------|----------|
| **Feature 1** | Changes | **P0** — critical path |

## The Problem
[Context + current state + what's wrong]

## Validation Stories (required — story first)
**This section comes immediately after the problem.** Before explaining how you'll solve it, show what success looks like. The reader should understand the value of the work before seeing any architecture or implementation detail.

The reviewer's walkthrough. Narrative scenarios that describe: what you do, what you see, and what's different from before. Each story is a linear path the reviewer follows — if the story plays out correctly, the feature is approved. Write stories that show the *value* of the work, not just that it doesn't crash.

> **Story N — "Title that captures the value"**
>
> Start by [setup]. Do [action]. You should see [observable outcome].
> The difference from before: [what was broken/missing and why this matters].

## Solution
[How and why this approach works. Connect the dots between the problem and the implementation — the reader should understand the design rationale before seeing code.]

## Token & Cost Impact (required for LLM-touching features)
For any feature that adds LLM calls, increases prompt size, or changes model routing, estimate the impact:

| Dimension | Estimate | Rationale |
|-----------|----------|-----------|
| **Prompt size delta** | +N words / +N tokens | What's added to System 1 or System 2 prompts |
| **New LLM calls per session** | N calls × model | e.g., "2-4 Haiku calls per session for perception generation" |
| **Cost per session delta** | ~$0.00N | Rough estimate at current pricing |
| **Latency impact** | +Nms per turn / hidden behind transition | Where the time goes and whether the user feels it |

This is not a gate — features that cost more can still ship. But the designer and reviewer should know the cost profile before building, not after. Token budgets per prompt component prevent context creep.

## Chunks
Implementation sections are called **chunks** — discrete, independently buildable pieces of work within a release. Each chunk has a clear scope, can be committed separately, and has its own validation criteria. Chunks are numbered (Chunk 1, Chunk 2, ...) and built sequentially within a build+test chat. A chunk may depend on a previous chunk but should be testable on its own once its dependencies are complete.

[Code specs, type definitions, file plans — organized by chunk]

## File Plan
| File | Action | What It Does |
|------|--------|-------------|
| `src/services/foo.ts` | New | Service description |
| `src/pages/Bar.vue` | Modify | Add feature X |

## Verification

### Success Criteria (required)
Explicit "Done when:" statements for each implementation task. Tell the agent what success looks like, not just how to implement. These become the acceptance criteria for review.

| Task | Done When |
|------|-----------|
| Feature 1 | [Observable outcome that can be verified] |
| Feature 2 | [Observable outcome that can be verified] |

### Testing (required)
What the agent should test and how. Pass/fail criteria for release close-out.

### Observability (required)
What this module logs. What metrics matter. How the agent can monitor it.

### Ongoing Monitoring (required)
What the monitoring loop should watch for after this release is closed.
What constitutes regression or degradation. When to alert the operator.
```

### Autonomous Build Loop (v0.8.7+)

When a release has many small, well-specified chunks, the operator can use **skip-permissions build agents** (`claude --dangerously-skip-permissions`) to execute chunks autonomously. This requires tighter design specs and a separate QA pass.

**The onus shifts from the build session to the design session.** When the build agent runs autonomously, the design doc IS the supervision. Every chunk must be specified precisely enough that a fresh agent can execute it without human guidance.

```
DESIGN SESSION (VS Code)          BUILD AGENT (Terminal, skip-permissions)      QA SESSION (VS Code)
─────────────────────────          ─────────────────────────────────────         ──────────────────────
Plan release, analyze codebase     Reads design doc chunk spec                   Reads design doc + code diff
Write chunk specs with:            Implements changes to specified files          Reviews against validation stories
  - Files to modify                Writes unit tests per spec                    Checks:
  - Unit tests to write            Runs tests, fixes failures                      - Did it build what was designed?
  - Operator validation gates      Commits with chunk ID in message                - Do tests actually validate?
  - Validation stories             Logs result in design doc Build Log              - Any regressions?
                                                                                   - Doc gaps?
        │                                    │                                          │
        │         ┌──────────────────────────┘                                          │
        │         │                                                                     │
        ▼         ▼                                                                     ▼
   Design reviews build result                                                 QA finds → categorize:
   Updates doc if needed                                                         ├── Impl bug → QA fixes directly
   Queues next chunk                                                             ├── Chunk didn't meet VS → fix chunk
                                                                                 ├── Design gap → back to Design
                                                                                 └── Doc gap → QA updates doc
```

#### Chunk Spec Format (Required for Skip-Permissions Build)

Each chunk in the design doc must include ALL of the following:

| Section | What It Contains | Why |
|---------|-----------------|-----|
| **Goal** | 1-2 sentence description of what the chunk achieves | Build agent knows the intent, not just the code changes |
| **Files to modify** | Numbered list with file path + specific change description | Build agent knows exactly where to work |
| **What NOT to change** | Explicit exclusions | Prevents scope creep — the build agent won't "improve" adjacent code |
| **Unit tests to write** | Test file path + specific test cases with expected input/output | Tests are part of the spec, not an afterthought |
| **Test command** | The exact pytest/vitest command to run | Build agent can validate immediately |
| **Operator validation gate** | What the operator should manually check after this chunk deploys, OR "None required mid-chunk" | Flags critical manual checkpoints vs chunks that can proceed without human review |

#### Operator Prompt Template

Each chunk includes an `#### Operator prompt` section with the exact terminal command. The prompt must include all of the following elements:

| Element | What to Include | Why |
|---------|----------------|-----|
| **Read the design doc** | `Read Docs/Design/V0.8.x_....md, specifically Chunk [ID]` | Points the agent to the spec |
| **Read files before modifying** | `Read the files listed before modifying them` | Prevents blind edits |
| **Follow doc triggers** | `Follow the Documentation Trigger Table in CLAUDE.md before modifying any file` | Ensures agent reads prereq reference docs (SIM_ENGINE.md, etc.) |
| **Implement the spec** | `Implement exactly what the spec describes` | The build instruction |
| **Write unit tests** | `Write all specified unit tests` | From the spec's test list |
| **Run tests** | `Run: cd backend && pytest [specific command]` | Specific pytest command |
| **What NOT to change** | `Do not modify any files listed in 'What NOT to change'` | Guardrails against scope creep |
| **Update Build Log** | `Update the Build Log section of this design doc with: files modified, test results, and set chunk status to COMPLETE` | Agent self-documents its work |
| **Commit** | `Commit with message 'v0.8.x chunk [ID]: [description]'` | Chunk-tagged commit message |

Example:
```bash
claude --dangerously-skip-permissions "Read Docs/Design/V0.8.6_SIM_ENGINE_FIXES.md, specifically Chunk A1 (Prompt Unification). Implement exactly what the spec describes. Read the files listed before modifying them. Follow the Documentation Trigger Table in CLAUDE.md before modifying any file. Write all specified unit tests. Run: cd backend && pytest tests/test_prompt_assembler.py -v. Do not modify any files listed in 'What NOT to change'. Update the Build Log section of this design doc with: files modified, test results, and set chunk status to COMPLETE. Commit with message 'v0.8.6 chunk A1: wire format_instructions.py into prompt pipeline'."
```

#### When to Use Autonomous Build

| Condition | Autonomous OK? | Why |
|-----------|---------------|-----|
| Chunk is well-specified (all 6 sections above) | Yes | Agent has enough context to execute |
| Chunk modifies prompts or LLM behavior | Yes, but needs operator validation gate | LLM output can't be fully validated by unit tests |
| Chunk modifies database schema | Yes, with caution | Migrations are hard to reverse — validate before deploying |
| Chunk involves architectural decisions | No — use supervised build | Architecture requires judgment the doc may not capture |
| Chunk scope is unclear or exploratory | No — use supervised build | Skip-permissions agent will make arbitrary decisions |

#### The QA Session

The QA session is a **separate VS Code session** that reviews build results. It:

1. **Reads only the design doc and code diff** — no build context. This proves doc completeness.
2. **Runs all unit tests** to verify they pass
3. **Reviews each chunk against its validation stories** — not just "does it compile" but "does it achieve the goal"
4. **Categorizes findings:**

| QA Finds | Action | Who |
|----------|--------|-----|
| Implementation bug (wrong variable, missing null check) | QA fixes directly + logs | QA session |
| Chunk didn't meet its validation story | QA creates fix chunk + adds to build queue | QA session |
| Design gap (missing case, wrong assumption, architectural issue) | QA writes finding → design session updates doc → new chunk | Design session |
| Doc gap (chunk worked but QA couldn't tell from docs) | QA updates the doc directly | QA session |

**Key principle:** QA owns "did we build what we designed?" Design owns "what should we build?"

#### Build Log Format

Every design doc with autonomous build chunks should include a **Build Log** section — a chronological record using rich text entries (not tables). Each entry is a headed subsection with the date, what happened, and what was learned.

```markdown
## Build Log

> **Process:** Terminal sessions (`claude --dangerously-skip-permissions`) execute chunks
> autonomously. This VS Code session acts as manager/QC.

### Phase/Chunk Name — STATUS

**Date:** YYYY-MM-DD
**Commit:** `abc1234` (if applicable)
**Files modified (N):** list of files

**Research:** What was investigated and what was found.

**What was built:** Numbered list of changes per file.

**Test result:** X/X pass
**QC status:** Pending review / Reviewed / Issues found
```

Entry types flow naturally: research findings → design decisions → build results → QA findings. Use descriptive headings, not type tags. The log should read like a narrative, not a spreadsheet.

See [V0.8.6_SIM_ENGINE_FIXES.md](Design/V0.8.6_SIM_ENGINE_FIXES.md) and [V0.8.7_COACHING_ENGINE_FIXES.md](Design/V0.8.7_COACHING_ENGINE_FIXES.md) for live examples.

---

## 7. Parallel Planning

### The Multi-Window Pattern

The operator runs multiple AI sessions simultaneously. Each session has a focused scope and produces specific artifacts that other sessions can consume.

```
TIME ─────────────────────────────────────────────────────────→

Session A (BUILD+TEST): [── v0.7.10 build ↔ test ↔ approve ──][release]
Session B (DESIGN):     [── v0.8.0 design doc ──────────────────────────]
Session C (RESEARCH):   [── coaching science ──][findings]
```

### Rules for Parallel Sessions

1. **Each session reads shared docs, writes to its own scope.** Session A reads the ROADMAP but only writes code and updates CHANGELOG. Session B reads research findings but only writes design docs.

2. **Handoff via documents, not verbal context.** Session B doesn't need to "know" what Session A is doing. It reads the design doc that Session A is implementing. If Session C produces research findings, Session B reads the research doc.

3. **Dependency tracking in ROADMAP.** Every release states what it depends on. "Depends on v0.7.9" or "Independent of v0.8.1." This lets the operator see what can run in parallel.

4. **Don't solve merge conflicts across sessions.** If two sessions need to modify the same file, sequence them. The operator decides the order.

### The ROADMAP as Dependency Graph

```markdown
## Phase Summary (Quick-Scan Index)

| Version | Goal | Status | Depends On |
|---------|------|--------|------------|
| v0.7.10 | Coaching upgrade | In Progress | v0.7.9 |
| v0.7.10.1 | UI Review Tool | Planned | Independent |
| v0.7.11 | Activity flow | Planned | v0.7.10 |
| v0.8.0 | Data layer | Planned | v0.7.16 |
| v0.8.2 | CDN | Planned | Independent of v0.8.1 |
```

Independent releases can be reordered or built in parallel. The summary table is the quick-scan index; detailed release sections live below it (and archive to `ROADMAP_ARCHIVE.md` when completed).

---

## 8. Versioning Strategy

### Rules

1. **Sequential numbering only.** `v0.8.0`, `v0.8.1`, `v0.8.2`. No letter suffixes (a/b/c).

2. **One version = one commit.** Each version number maps to a single commit with a focused scope.

3. **Independence in description, not number.** If v0.8.3 doesn't depend on v0.8.2, say "Independent of v0.8.2" in the depends-on line. Don't use letter suffixes to signal parallel work.

4. **Renumbering fine before commit.** Roadmap order can shift as priorities change. Once committed, the version is fixed.

5. **Sub-releases share major.minor.** v0.8.0 through v0.8.N are all part of the v0.8 phase.

6. **Patch versions only for mid-build discoveries.** v0.7.8.1, v0.7.8.2 are patches to v0.7.8. Use only when you're already building a release and discover a small fix that should ship with it. Planned roadmap items always get their own sequential release number (v0.8.7, not v0.8.6.1).

### How Small Is Small Enough?

A release should be:
- **Committable in one session** — if it takes multiple days, split it
- **Reviewable in one sitting** — if the diff is too large to review, split it
- **Revertable without collateral damage** — if reverting it would break unrelated features, it's too big
- **Describable in one sentence** — if the CHANGELOG entry needs a paragraph, split it

---

## 9. Naming Conventions

### Document Naming

| Type | Pattern | Example |
|------|---------|---------|
| **Release design (complete)** | `V[X.Y]_[FEATURE_NAME].md` | `V0.8.2_COMPLETE_SIM_ENGINE_MOVE.md` |
| **Release design (stub/draft)** | `V[X.Y].x_[FEATURE_NAME].md` | `V0.8.x_ACTIVITY_INSTANTIATION.md` |
| **Architecture doc** | `[SYSTEM]_ARCHITECTURE.md` | `COACH_ENGINE_ARCHITECTURE.md` |
| **Design spec** | `[SYSTEM]_DESIGN.md` | `COACH_PRESENCE_DESIGN.md` |
| **Reference doc** | `[SYSTEM].md` | `SIM_ENGINE.md`, `CRM.md` |
| **Research doc** | `[TOPIC].md` | `COACHING_SCIENCE.md`, `STT_PROVIDERS.md` |
| **Test log** | `TEST_LOG_v[X.Y].md` | `TEST_LOG_v0.7.6.md` |
| **Debug analysis** | `[SYSTEM]_DEBUG_LOG.md` | `STT_STREAMING_DEBUG_LOG.md` |
| **User test** | `UT_[DATE]_[Name]_[Type].md` | `UT_2026-02-26_Johnny_Analysis.md` |

**Design doc version numbering:** Roadmap version numbers change frequently as releases are reordered. Design doc filenames use `V0.8.x_` (stub) until the design session is complete, then get their final version number. A real version number on a design doc filename means "design is locked." This prevents constant file renaming as the roadmap evolves.

### Document Headers

Every reference doc has a version-stamped header:

```markdown
# Doc Title
> System state doc. Describes current [system] implementation.
> Last updated: v0.7.6 — 2026-02-25
```

Design docs have status tracking. **The H1 title must lead with the release name** so it can be copied directly to start a session:

```markdown
# v0.7.10 Feature Name — Design Doc
Version: 0.7.10 | Status: Design Complete | Date: 2026-02-27
```

**Pattern:** `# v[X.Y] Release Name — Design Doc`
- Release name comes FIRST (operator copies H1 to kick off sessions)
- "Design Doc" is a SUFFIX, never in the middle
- Use em-dash (—) as separator

### File & Folder Naming

- **ALL CAPS with underscores** for documentation files: `AI_PRODUCT_MANAGEMENT.md`
- **kebab-case** for code files: `coach-script-generator.ts` (or camelCase per framework convention)
- **Folders** follow the project convention: `Docs/Design/`, `src/services/`, `tools/ui-review/`

### Cross-Reference Conventions

- Reference docs link to their design docs: "See [COACH_ENGINE_ARCHITECTURE.md](Design/COACH_ENGINE_ARCHITECTURE.md) for the design."
- Design docs link to research: "Informed by [COACHING_SCIENCE.md](../Research/COACHING_SCIENCE.md)."
- Design docs link to parent architecture: "Part of Coach Engine. See [COACH_ENGINE_ARCHITECTURE.md]."
- Implemented design docs note: "Implemented in v0.7.10 — see [COACHING.md](../COACHING.md)."

---

## 10. Session Logging

### REQUEST_LOG — Capturing Intent

Every user request gets logged immediately, not after the fact. This preserves the original intent before it gets refined through implementation.

```markdown
## 2026-02-28

### Feature Name
**Request:** "User's exact words or close paraphrase"

**Context:** Why they wanted it (business reason, UX issue, etc.)

**Outcome:** What was built to address it.
```

For multi-part features, sub-requests are nested:

```markdown
### CRM Integration
**Request:** "Add CRM lookup so the SIM knows the customer"

**Refinements:**
- "Make it trigger automatically when an activity loads"
- "Add phone entry in the CRM panel"
- "Show relationship stage (new/occasional/regular/vip)"

**Outcome:** Unified CRM module (v0.7.9) with activity-triggered lookup, phone entry panel, relationship stages.
```

### DEVELOPMENT_LOG — Technical Record

Updated daily or after major work blocks. Each entry captures what was done, why, and what's next.

```markdown
### 2026-02-28 — Session Title

**Focus:** One-line description of main goal

**Completed:**
- **Feature Name** — What was built
  - Technical detail 1
  - Technical detail 2

**Decisions:**
- Decision made and why

**Files Changed:**
- `src/services/foo.ts` — What changed

**Next Steps:**
1. What to do next
```

### CHANGELOG — User-Facing Changes

Updated on every commit. Grouped by version:

```markdown
## v0.7.10 — Coaching Upgrade (2026-02-28)
- Per-segment coach intro with audio timing
- Coach hints during roleplay with dismissal
- Activity report focus area scores
```

### Archive Rotation

At major version boundaries (e.g., v0.7 → v0.8):
- Completed ROADMAP sections → `ROADMAP_ARCHIVE.md`
- Old DEVELOPMENT_LOG entries → `DEVELOPMENT_LOG_ARCHIVE.md`

Keep active files lean. The archive is the full history.

---

## 11. Testing & Quality Assurance

### The Two-Stage Pattern

Every feature gets two stages: **build it**, then **build the test that evaluates it**. The test should evaluate the feature from the same perspective the operator will review it later — so the agent can catch issues before the human ever looks.

```
BUILD                           TEST
────────────────                ────────────────
Implement the feature    →      Design a test that evaluates it
                                from the operator's review perspective
                         →      Run the test
                         →      Evaluate the test results
                         →      Fix issues found
                         →      Re-run until clean
```

### What "Design a Test" Means

This is not just unit testing. The agent should intelligently design verification that matches the feature type:

| Feature Type | Test Approach | Example |
|-------------|--------------|---------|
| **UI component** | Screenshot capture across languages, visual regression | Playwright captures of ReportPage in EN/ZH/ES/FR |
| **LLM prompt change** | Run prompt through test scenarios, evaluate output quality | Feed 3 test conversations through scoring pipeline, check score distributions |
| **Data wiring** | Validate resolution chains, check all paths resolve | Walk every course → activity → store → video config path |
| **API integration** | Hit endpoint with test payloads, verify response shape | Call STT endpoint with test audio, confirm transcript format |
| **State machine** | Walk through state transitions, verify edge cases | Trigger every mood transition in SIM Engine, check prompt updates |
| **Performance** | Before/after latency benchmarks | Measure TTS response time across 10 test phrases per language |

### Test Design as Part of Module Design

When designing a new module, the design doc should include a **Verification** section that specifies:

1. **What to test** — which behaviors matter
2. **How to test it** — what the agent should run
3. **What "good" looks like** — pass/fail criteria the agent can evaluate
4. **What to log** — what runtime data the module should emit for ongoing monitoring

This is a design requirement, not an afterthought. If you can't specify how to test a module, the module isn't well-enough defined to build.

### User Testing

Automated tests catch implementation issues. User testing catches design issues. The two are complementary:

- **Automated tests** run on every build (agent-driven)
- **User tests** happen at milestone points (human-driven, agent-analyzed)

User test outputs (session recordings, CloudWatch logs, observation notes) go to `Docs/Testing/` and are analyzed by the agent to identify patterns, friction points, and improvement opportunities.

### Roleplay Edge Case Registry

Live roleplay sessions surface failure modes that automated tests don't cover — WebSocket dropouts, race conditions between events, audio pipeline edge cases, and timing-dependent bugs. These are catalogued in **[Docs/Testing/ROLEPLAY_EDGE_CASES.md](../Testing/ROLEPLAY_EDGE_CASES.md)** using a structured format (`REC-NNN` IDs with category, trigger, evidence, fix version, and test status).

**Process:** When a new edge case is discovered during QA or live testing, add it to the registry immediately. When the roleplay test harness is upgraded (v0.8.19), each registry entry becomes a scripted test scenario with assertions and regression guards. This closes the loop between live discovery and automated coverage.

### Agentic Review Process

The build agent has a blind spot: it's been staring at its own code for an entire session. Long context windows accumulate assumptions. A fresh agent reviewing the output will catch things the build agent can't see — the same way a code reviewer catches things the author missed.

**The review handoff pattern:**

```
BUILD+TEST CHAT                    REVIEW SESSION (new chat or different agent)
─────────────────                  ────────────────────────────────────────────
Build the feature            →     Build agent prepares a review doc:
Test and iterate                     - What was built and why
Get to "build complete"              - Key decisions made
                                     - Known risks / open questions
                                     - Success criteria from design doc
                              →     Fresh session reviews against:
                                     - Design doc's success criteria
                                     - Architectural rules in CLAUDE.md
                                     - Security rules
                                     - Code quality
                              →     Review findings go to Docs/Testing/
                              →     Operator reviews both build and review output
```

**Why a fresh session matters:** The build chat's context is full of debugging tangents, superseded approaches, and stale decisions. A fresh review session loads only the clean artifacts — design doc, code diff, review doc — and evaluates without bias from the build process.

**Cross-agent review:** Different AI models have different blind spots. Running the review in a different agent (e.g., build in Claude Code, review in Codex) exploits this — each model catches things the other misses. This is more valuable than running the same model twice.

**Current practice:** Manual — operator starts a new session for review. Future: the Quality Agent (v0.8.7) automates this as part of the release process.

### Tool Development for Review

Development time is no longer the bottleneck — review time is. Building tools that make review faster and more thorough has outsized impact:

- **UI screenshot capture** — agent captures visual state across languages/states for quick human scan
- **Diff summarization** — structured summary of what changed, organized by concern (UI, data, logic, config)
- **Test harness generation** — agent builds a test that evaluates its own output from the operator's perspective
- **Review doc generation** — structured artifact summarizing build decisions, risks, and success criteria for the review session

The principle: **design for agentic review from the start.** When building a module, consider how a fresh agent (or a different agent) will review it. Structured outputs, clear success criteria, and observable behavior all make review faster and more reliable.

---

## 12. Cadenced Monitoring & Self-Improvement

### The Two Loops

Testing and monitoring are related but operate on different time horizons. Conflating them leads to gaps in both.

```
TESTING LOOP (per-release)              MONITORING LOOP (ongoing, platform-wide)
────────────────────────                ────────────────────────────────────────
Scope: One release                      Scope: The whole platform
Time: Days (during build+test chat)     Time: Weeks/months (after release)
Goal: Does this release work?           Goal: Is the platform healthy?
Trigger: Build produces something       Trigger: Cadence (daily/hourly)
Output: Test log, pass/fail             Output: Health report, recommendations
Owner: Build+test chat                  Owner: Quality Agent (v0.8+) or monitoring chat

Design doc defines:                     Design doc defines:
  → What to test                          → What ongoing monitoring this
  → Pass/fail criteria                      release needs post-close-out
  → How to verify                         → What metrics to watch
```

**Both loops should be designed into every release.** The design doc's Verification section covers the testing loop. A new **Ongoing Monitoring** section (or note within Verification) specifies what the monitoring loop should watch for after the release is closed.

### The Concept

The system is built to be **monitorable and improvable by the AI agent itself**. This doesn't mean monitoring runs continuously — it runs on a **cadence** set by the operator, with the ability to increase frequency during critical periods.

### Monitoring Cadence

| Mode | Frequency | When | What |
|------|-----------|------|------|
| **Steady state** | Daily | Normal operations | Morning report: session health, error rates, performance trends, improvement recommendations |
| **Post-release** | Daily (enhanced) | First 3-5 days after a release | Same as steady state + feature-specific metrics, regression checks |
| **Critical** | Hourly | Major releases, production issues, user testing periods | Targeted monitoring of specific systems, real-time issue detection |
| **Off** | None | Early prototype, pre-launch | Monitoring infrastructure exists but isn't actively run |

The operator sets the cadence. The agent runs the monitoring at that cadence and produces a structured report.

### The Morning Report (Steady State)

When monitoring is active, the agent pulls logs and produces:

```markdown
## Monitoring Report — 2026-03-01

### Session Health
- Sessions in last 24h: 47
- Completion rate: 89% (42/47)
- Average session duration: 8.2 min
- Abandoned sessions: 5 (3 at STT stage, 2 at scoring)

### Error Summary
- STT streaming failures: 2 (fallback to batch worked)
- TTS timeout: 1 (user waited 4.2s)
- Scoring failures: 0

### Performance
- Avg first response latency: 1.8s (target: <2s) ✓
- P95 response latency: 3.1s (target: <3s) ✗
- TTS queue depth: normal

### Recommendations
1. P95 latency spike at 14:00 UTC correlates with high load — consider pre-warming
2. 3 STT abandons suggest streaming reconnect could be more aggressive
3. One user repeated the same activity 4 times — possible UX confusion, worth reviewing transcript
```

### Designing for Observability

**This is a module design requirement.** Every module should be built with observability in mind. When designing a new module, answer these questions in the design doc:

1. **What should be logged?** — Key events, state transitions, timing data
2. **What constitutes an error vs. a warning vs. normal operation?**
3. **What metrics matter?** — Latency, success rate, usage count, quality scores
4. **How can the agent retrieve and analyze these logs?** — CloudWatch queries, log formats, filtering keys
5. **What would improvement look like?** — If the agent found an issue, what action could it take?

### The Self-Improvement Loop

```
MONITOR → ANALYZE → RECOMMEND → (OPERATOR APPROVES) → IMPROVE → MONITOR
```

The agent:
1. **Monitors** — pulls logs at the set cadence
2. **Analyzes** — identifies patterns, anomalies, degradation
3. **Recommends** — proposes specific fixes or improvements
4. **Waits for approval** — the operator reviews and approves
5. **Improves** — implements the approved changes
6. **Monitors** — verifies the improvement in the next cycle

**The agent never auto-deploys fixes.** It recommends. The operator decides. But the agent should be proactive about finding issues — most users don't report problems until they're catastrophic.

### Runtime Diagnostics Infrastructure

Use the platform's existing logging infrastructure (CloudWatch). Don't build custom logging systems.

```bash
./scripts/fetch-sessions.sh                  # List recent sessions (24h)
./scripts/fetch-sessions.sh list 3           # List sessions from last 3 days
./scripts/fetch-sessions.sh get <id>         # Full session data (JSON)
./scripts/fetch-sessions.sh transcript <id>  # Conversation transcript
```

**Bandwidth management:** At certain points, to save bandwidth, specific logging channels can be turned on/off. Design logging with granularity levels (critical, standard, verbose) so the operator can dial detail up or down without code changes.

### Monitoring Types

The platform needs monitoring across multiple dimensions:

| Type | What It Watches | Example |
|------|----------------|---------|
| **System monitoring** | Infrastructure health, API uptime, error rates, latency | STT streaming failures, TTS timeouts, proxy health |
| **Behavioral monitoring** | SIM quality, conversation coherence, mood transitions | SIM staying in character, mood shifts tracking correctly |
| **Application monitoring** | User flows, completion rates, UX friction | Session abandonment, repeated activities, scoring anomalies |
| **Improvement loop monitoring** | Quality trends over time, regression detection | Score distributions shifting, latency creeping up |

**Current state (v0.7):** CloudWatch session logging provides raw data for all four types, but no automated monitoring agent or structured report generation exists yet.

**Needed (v0.8):** The **Quality Agent** (v0.8.7) will own monitoring — agent-driven log analysis, structured reporting, the morning report workflow. Depends on v0.8.1 (database layer) for richer queryable data, and v0.8.5 (behavioral tracking) for event-level analytics. Research needed to design the monitoring architecture: what specific CloudWatch queries, what alert thresholds, what report format, what agent scripts.

---

## 13. Self-Review & Dev Tooling

### The Problem

The operator can't manually read every line of code the agent writes. And the agent can't visually verify its own UI work. Solution: build tools that bridge this gap.

### Tool Architecture

```
tools/                        ← Internal dev/build tooling
  ui-review/
    reviewFixtures.ts         ← Mock data for review (all languages)
    capture-screenshots.ts    ← Playwright screenshot capture

scripts/                      ← One-off scripts, benchmarks
  fetch-sessions.sh           ← Retrieve session logs from CloudWatch

src/pages/
  DevReviewToolPage.vue       ← Review route (must be in src/ for build)
  DevReviewGalleryPage.vue    ← Screenshot gallery for captured screenshots
```

### Distinction: Modules vs Tools vs Scripts

| Type | Location | Purpose | Ships to Production? |
|------|----------|---------|---------------------|
| **Modules** | `src/` | Product features (SIM Engine, CRM, etc.) | Yes |
| **Tools** | `tools/` | Dev/build tooling (review, validation) | No |
| **Scripts** | `scripts/` | One-off operations (session fetch, benchmarks) | No |

### The Review Loop

```
1. Claude makes UI/code changes
2. Claude runs tool (e.g., npm run review:ui)
3. Tool captures artifacts (screenshots, test results)
4. Operator reviews artifacts at dev route or in output folder
5. Operator provides structured feedback (approve / needs changes + notes)
6. Claude reads feedback and iterates
```

### Future Tooling Patterns

As the process matures, build tools for:
- **Content validation** — verify course/activity/video wiring before commit
- **Performance profiling** — automated latency benchmarks
- **Regression detection** — before/after comparison for UI changes
- **Prompt testing** — run persona prompts through test scenarios
- **Monitoring dashboard** — structured log analysis for the morning report

---

## 14. CLAUDE.md: The Operating System

CLAUDE.md is the single most important file in the project. It's loaded into every AI session automatically and defines how the agent operates.

### What Goes in CLAUDE.md

1. **Product vision** — one paragraph so the agent understands context
2. **Architecture overview** — systems, key patterns, how they connect
3. **Build commands** — how to run, build, test
4. **Versioning rules** — how we number releases
5. **Documentation trigger table** — file-pattern routing (what docs to read before modifying code) combined with discovery index (what docs exist and what they cover). Based on the "Codified Context" paper's constitution trigger table pattern.
6. **Documentation workflow** — what to update and when
7. **Key conventions** — naming, patterns, things the agent should know
8. **Security rules** — API key handling, input validation patterns, security-sensitive code paths. Only 14.5% of agent context files in the wild address security. Be explicit: where keys live, what must not be committed, what endpoints need auth, what CORS policies apply.
9. **Mistake capture rules** — "Never X because Y" rules accumulated from operator corrections. This section grows over time and is the primary mechanism for cross-session learning.
10. **Current Build Context** — two-slot rotating window: Current (what's being built now — design doc, prereq reading, key decisions made during build) and Previous (what just shipped — key discoveries that weren't in the design doc). When Current ships, it becomes Previous and the next roadmap release becomes Current. Always includes a mandatory "read before any build session" doc (e.g., Platform Dictionary). This prevents sessions from missing context that emerged *during* the previous build and wasn't captured in design docs.

### What Does NOT Go in CLAUDE.md

- **Full process documentation** — that's this document (AI_PRODUCT_MANAGEMENT.md)
- **Feature specifications** — those go in design docs
- **Research findings** — those go in research docs
- **How-to tutorials** — the agent doesn't need tutorials, it needs rules

### The Summary Principle

CLAUDE.md is a **summary** of the process, not the process itself. It contains the rules and trigger points. This document (AI_PRODUCT_MANAGEMENT.md) contains the reasoning, examples, and full context. When starting a new project:

1. Create `AI_PRODUCT_MANAGEMENT.md` (or copy from a previous project)
2. Create `CLAUDE.md` with summarized rules pointing to this doc
3. Create `Docs/DOC_WORKFLOW.md` with procedures

---

## 15. New Project Setup

### Quick Start

```
Phase 1: Foundation (before any code)
├── 1. CLAUDE.md — AI agent instructions
├── 2. Docs/VISION.md — Why the product exists
├── 3. Docs/REQUIREMENTS.md — What to build (prioritized)
├── 4. ROADMAP.md — Phases and milestones
└── 5. Docs/AI_PRODUCT_MANAGEMENT.md — This file (drop in from previous project)

Phase 2: Session Infrastructure
├── 6. Docs/REQUEST_LOG.md — Start logging requests
├── 7. Docs/DEVELOPMENT_LOG.md — Start logging sessions
├── 8. CHANGELOG.md — Start tracking changes
└── 9. Docs/DOC_WORKFLOW.md — Procedures for maintaining docs

Phase 3: As Development Progresses
├── 10. Docs/Research/ — When research is needed
├── 11. Docs/Design/ — When designing features
├── 12. Docs/ (reference docs) — When systems ship
├── 13. Docs/Testing/ — When testing and debugging
├── 14. tools/ — When self-review tooling is needed
└── 15. ROADMAP_ARCHIVE.md + DEVELOPMENT_LOG_ARCHIVE.md — When active files get long
```

### Adapting to a New Project

This process was developed for a Vue 3 + TypeScript prototype. When adapting:

- **The four-category doc system works universally.** Research, Design, Reference, Testing are domain-agnostic.
- **Session logging works universally.** REQUEST_LOG, DEVELOPMENT_LOG, CHANGELOG, ROADMAP.
- **Versioning rules work universally.** Sequential numbering, one-per-commit, explicit dependencies.
- **Naming conventions may need adjustment.** Adapt the doc naming patterns to your project's conventions.
- **Tooling is project-specific.** The preview tool, session log retrieval, etc. are specific to GlobalAiCoach. Build equivalent tools for your project.
- **CLAUDE.md content is entirely project-specific.** The structure (vision, architecture, commands, workflow) transfers; the content does not.

---

## 16. Lessons Learned

### What Works

- **"Create the design doc" should be automatic.** Every time the agent is planning a release, it should create `Docs/Design/V[X.Y]_[FEATURE].md` without being asked. Every time it commits code that changes a system, it should update the reference doc without being asked. These are process steps, not discretionary.

- **Parallel planning doubles throughput.** Planning v0.8.0 while building v0.7.10 means the design doc is ready when implementation starts. No idle time between phases.

- **Research docs prevent re-investigation.** The STT provider comparison was done once and never repeated. The coaching science research was done once and informs multiple releases. Research docs are the highest-ROI documentation.

- **Small versions make review possible.** A 50-line diff is reviewable. A 500-line diff is not. When you can't review, you can't catch quality issues. Small versions are a quality tool, not just an organizational preference.

- **The ROADMAP dependency graph enables prioritization.** Seeing "v0.8.2 is independent of v0.8.1" immediately tells the operator it can be reordered or parallelized.

### What Needs Improvement

- **Document creation is still manual.** The agent should recognize "I'm in the research phase" and create the research doc automatically. "I'm planning a release" → create the design doc. "I've committed code" → update the reference doc. This needs to be explicit in CLAUDE.md instructions.

- **Testing doc taxonomy is loose.** Test logs, debug logs, user test analyses, and test scripts all live in `Docs/Testing/` with inconsistent naming. A clearer naming schema would help.

- **Archive rotation timing is ambiguous.** "Major version boundaries" is vague. Define explicitly: archive when a phase completes (v0.7.x → v0.8.0).

- **Design doc "doneness" is judgment.** When exactly does a design doc become a reference doc? Current rule: when the release is committed and the reference doc is updated. The design doc stays in `Docs/Design/` with a note. This could be more explicit.

- **Review tooling is nascent.** The UI Review Tool is the first. Future tools needed: content validator, prompt tester, performance profiler, regression detector.

---

## 17. Future Considerations

### MCP Context Retrieval Server

**Problem:** As the documentation corpus grows, convention-based routing (trigger table in CLAUDE.md) will eventually hit limits. The agent has to read the trigger table, match file patterns manually, and self-select which docs to load. This works at our current scale (~16 reference docs, ~10,000 lines) but won't scale indefinitely.

**Solution:** Build a lightweight MCP retrieval server that provides programmatic access to the doc corpus. Based on the "Codified Context" paper (arXiv 2602.20478), which built a Python MCP server (~1,600 lines) for a 108K-line codebase with 54 context documents.

**Tools the server would provide:**
- `suggest_doc(task_description)` — given a natural language description of what you're working on, return the most relevant reference docs to read
- `search_docs(keyword)` — keyword search across all reference and design docs, returning relevant sections (not whole files)
- `list_systems()` — return the Platform → System → Module hierarchy with doc pointers
- `find_context(file_pattern)` — given a source file path, return which reference docs cover that area (programmatic version of the trigger table)

**When to build:** When any of these signals appear:
- CLAUDE.md exceeds ~300 lines and trigger table alone can't route effectively
- Reference docs exceed ~25 files or ~20,000 lines total
- The agent frequently loads the wrong doc or misses relevant context
- Build sessions regularly run out of context window due to doc loading

**Implementation approach:** Python MCP server using the MCP SDK. Reads the doc corpus at startup, builds a keyword index, and exposes the tools above. Claude Code connects to it via `.claude/mcp.json` configuration. The trigger table in CLAUDE.md remains as fallback — the MCP server augments it, doesn't replace it.

**Reference:** See [Research/AI_AGENT_DEVELOPMENT_PRACTICES.md](Research/AI_AGENT_DEVELOPMENT_PRACTICES.md) §5.2 for the full "Codified Context" paper analysis.

### Prescriptive Agent Prompts (Tier 2 Evolution)

**Current state:** Our reference docs are descriptive — they document how systems work. The "Codified Context" paper's domain agents are prescriptive — they tell the agent how to *think about* the system, what mistakes to avoid, what patterns to follow. They're expert personas, not documentation.

**Future possibility:** For complex systems (SIM Engine, Speech Pipeline, Scoring), create short (~100 line) prescriptive preambles that complement the reference docs. These would contain:
- "When working on this system, always X, never Y"
- Common failure patterns and how to avoid them
- Key architectural invariants that must not be violated
- Decision heuristics for common choices

**When to consider:** When the Known Mistakes section in CLAUDE.md starts accumulating system-specific rules that would be better organized per-system. The prescriptive preambles would be the natural home for those rules.

---

## Appendix: Process Checklist

### Every Request
- [ ] Log in `REQUEST_LOG.md` (user intent + context)
- [ ] Assess scope: trivial fix or feature?

### Planning a Feature
- [ ] Research needed? → Create `Docs/Research/[TOPIC].md`
- [ ] New system? → Create `Docs/Design/[SYSTEM]_ARCHITECTURE.md`
- [ ] Implementation details? → Create `Docs/Design/[SYSTEM]_DESIGN.md`
- [ ] Planning a release? → Create `Docs/Design/V[X.Y]_[FEATURE].md`
- [ ] Add to `ROADMAP.md` with dependencies

### Designing a Module
- [ ] Include Verification section (what to test, how, pass/fail criteria)
- [ ] Include Observability section (what to log, what metrics, how agent retrieves)
- [ ] Specify logging granularity levels (critical / standard / verbose)

### Building a Release
- [ ] Check `git status` — clean working tree? If dirty, flag to operator before proceeding
- [ ] Implement according to design doc
- [ ] Design and run tests matching the feature type (see Testing table)
- [ ] Evaluate test results — fix issues before committing
- [ ] Update `CHANGELOG.md` on commit
- [ ] Update `ROADMAP.md` (mark items complete)
- [ ] Update `DEVELOPMENT_LOG.md` (session entry)

### After Committing
- [ ] Update affected reference docs (trigger table)
- [ ] Mark design doc: "Implemented in vX.Y"
- [ ] Version-stamp reference doc header
- [ ] If monitoring is active: verify next monitoring cycle shows clean results

### At Major Version Boundaries
- [ ] Archive completed ROADMAP sections → `ROADMAP_ARCHIVE.md`
- [ ] Archive old DEVELOPMENT_LOG entries → `DEVELOPMENT_LOG_ARCHIVE.md`
- [ ] Review and update `CLAUDE.md` if process has changed

### Monitoring Cadence (when active)
- [ ] Daily (steady state): Pull logs, produce morning report
- [ ] Post-release: Enhanced daily checks for 3-5 days
- [ ] Critical: Hourly checks during major events
