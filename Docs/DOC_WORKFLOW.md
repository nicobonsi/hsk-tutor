# Document Workflow — HSK Tutor

> Procedures for maintaining project documentation. Reference when unsure what to create or update.
> Full process details: `AI_PRODUCT_MANAGEMENT.md`

---

## Every Session — Mandatory

1. **Log the request** in `REQUEST_LOG.md` — user's intent + context, before any work
2. **Read CLAUDE.md** — always (auto-loaded)
3. **Check ROADMAP.md** — understand where current work fits
4. **Read the relevant design doc** if this is a build session

## Every Commit — Mandatory

1. **Update `CHANGELOG.md`** — one-line user-facing description of what changed
2. **Update `ROADMAP.md`** — mark items complete, update status

## After a Release — Mandatory

1. **Update affected reference docs** in `Docs/` (use trigger table in CLAUDE.md)
2. **Mark the design doc** — add "Implemented in vX.Y" at the top
3. **Version-stamp the reference doc header** — `> Last updated: vX.Y — YYYY-MM-DD`
4. **Log the session** in `DEVELOPMENT_LOG.md`

## Starting a New Feature — Automatic

| Phase | Create... | Location |
|-------|-----------|----------|
| Research needed | `[TOPIC].md` | `Docs/Research/` |
| New system design | `[SYSTEM]_DESIGN.md` | `Docs/Design/` |
| Release planning | `V[X.Y]_[FEATURE].md` | `Docs/Design/` |
| System ships | `[SYSTEM].md` | `Docs/` (reference) |

Do not wait to be asked. If you are planning a release, create the design doc. If you committed code that changes a system, update the reference doc.

---

## Document Locations

```
hsk-tutor/
├── CLAUDE.md                  # AI agent instructions (always loaded)
├── ROADMAP.md                 # Active roadmap + dependency graph
├── CHANGELOG.md               # Version-by-version user-facing changes
├── AI_PRODUCT_MANAGEMENT.md   # Full process documentation
│
└── Docs/
    ├── REQUEST_LOG.md         # Every request: intent + outcome
    ├── DEVELOPMENT_LOG.md     # Session summaries: decisions + files changed
    ├── DEVELOPMENT_LOG_ARCHIVE.md  (created when log gets long)
    ├── DOC_WORKFLOW.md        # This file
    │
    ├── [SYSTEM].md            # Reference docs — current system state
    │   ├── SRS_ENGINE.md      (create when SRS system is next modified)
    │   ├── GAMIFICATION.md    (create when gamification is next modified)
    │   ├── EXERCISE_DELIVERY.md (create when exercise API is next modified)
    │   └── DATA_MODEL.md      (create when schema is next modified)
    │
    ├── Design/                # Forward-looking specs
    │   └── V[X.Y]_[FEATURE].md
    │
    ├── Research/              # Persistent findings (never archived)
    │
    ├── Testing/               # Test logs and debug analysis
    │
    └── _old/                  # Superseded docs
```

---

## Archive Rotation

**When:** At major version boundaries (e.g., v0.x → v1.0) or when active files exceed ~500 lines.

**How:**
- Completed ROADMAP sections → `ROADMAP_ARCHIVE.md`
- Old DEVELOPMENT_LOG entries → `DEVELOPMENT_LOG_ARCHIVE.md`

Keep active files lean. Archive is the full history.

---

## Reference Doc Header Format

Every reference doc starts with:

```markdown
# System Name
> System state doc. Describes current [system] implementation.
> Last updated: vX.Y — YYYY-MM-DD
```

## Design Doc Header Format

```markdown
# vX.Y — Feature Name
Version: X.Y | Status: Design Complete | Date: YYYY-MM-DD

> Release implementation design. [Brief context].
```
