# Profile README redesign — AI readiness positioning

**Date:** 2026-05-27
**Repo:** `gillisandrew/gillisandrew` (GitHub profile README)
**Status:** Draft pending user review
**Branch:** `redesign-ai-readiness` (created from `main` after reset to origin)

## Context — why this spec exists

Today's session opened a brainstorm to redesign the profile README based on a stale local clone that didn't include `aea25e0 docs: update profile README for AI readiness positioning` (March 2026). That work produced a "three-tracks" design (security / digital humanities / client engineering) and shipped through implementation before a `git fetch` revealed the divergence. The user pivoted: AI readiness is the lead identity, not DevSecOps-generalist.

The three-tracks work is preserved on the local branch `archived-three-tracks-design` for reference; this spec supersedes it.

## Goal

Update the profile README at `gillisandrew/gillisandrew` so it:

- Leads with the AI-readiness consulting positioning the user adopted in their March update
- Keeps the existing service triad (Training & Workshops · DevSecOps Consulting · Hands-on Implementation) intact
- Adds credibility proof via a "Selected work" section linking 3 concrete projects
- Surfaces digital-humanities work as a one-line side-project footer (not a peer section)
- Strips the repo down to README + spec + plan + `.gitignore` only (the existing cruft AND the Claude Code workflows are purged)

## Non-goals

- Re-litigating the lead identity decision (settled: AI readiness)
- Replacing or duplicating `agillis.dev`
- Adding GitHub-stats widgets, badge rows, or animated SVGs
- Building a programmatic README generator (the existing `site/` Next.js scaffold is discarded — same as the three-tracks spec said)
- Keeping the Claude Code Review / PR Assistant workflows (user opted to purge)

## Decided constraints

| Constraint | Value | Rationale |
|---|---|---|
| Lead identity | AI readiness (helping teams adopt AI safely) | User pivot mid-session; aligns with their March 2026 web edit |
| Service triad | Training & Workshops · DevSecOps Consulting · Hands-on Implementation | User confirmed the existing triad still fits |
| Audience | Employers + consulting customers (single README) | Carried over from previous brainstorm |
| Tone | Warm but trimmed; 1–2 emoji max | Carried over from previous brainstorm |
| Repo scope | README-only — workflows purged | User chose to purge `.github/workflows/*.yml` |
| Selected work projects | dragonglass-cli, attestations-demo, linked-past (3) | User selection — two supply-chain proofs + one AI-agent tooling bridge |
| DH placement | One-line side-project footer | User selection — visible but subordinated |
| Structure | Approach B — light restructure (drop "Background" section) | User selection from 2 proposed approaches |

## README content (final draft)

```markdown
# Hey, I'm Andrew.

I help engineering teams adopt AI tools without compromising on security, compliance, or operational discipline. Independent consultant; cloud-infrastructure and DevSecOps background; Terraform, TypeScript, Go.

## What I do

- **Training & Workshops** — Preparing teams to collaborate with AI effectively
- **DevSecOps Consulting** — Security automation, supply chain integrity, infrastructure as code
- **Hands-on Implementation** — AWS infrastructure, CI/CD pipelines, deployment automation

## Selected work

- **[dragonglass-cli](https://github.com/gillisandrew/dragonglass-cli)** — Obsidian plugin manager with provenance verification and SBOM attestations
- **[attestations-demo](https://github.com/gillisandrew/attestations-demo)** — minimal example of SLSA provenance for build artifacts via GitHub Actions
- **[linked-past](https://github.com/gillisandrew/linked-past)** — multi-dataset SPARQL tools for AI agents, with scholarly citations

## Get in touch

Available for consulting and project work — [agillis.dev](https://agillis.dev) · [gillis.andrew@gmail.com](mailto:gillis.andrew@gmail.com)

---

✦ *Side project: digital prosopography of the Roman Republic — [dprr-mcp](https://gillisandrew.github.io/dprr-mcp/).*
```

## Structural notes

- **Hook line kept verbatim** from the user's March 2026 update. No reason to rewrite a working opener.
- **Tech-stack credibility (`Terraform, TypeScript, Go`)** is compressed into the intro paragraph since the Background section is dropped (Approach B).
- **Triad copy lifted verbatim** from origin's README. The user wrote it; preserve their voice.
- **`linked-past` framed as AI-agent tooling** in Selected Work, with the DH/ancient-world angle deliberately held back. The footer then reveals it as a side project — a small narrative payoff for a curious reader.
- **Single ✦ emoji** in the side-project footer (matches the 1–2 max constraint).
- **`obsidian-plugins-registry` deliberately omitted** despite being a strong project — it's private (404s for unauthenticated visitors), and Selected Work already has two supply-chain proofs.

## Repo cleanup actions

Paths removed from `main` as part of this change:

| Path | Reason |
|---|---|
| `site/` (35 files) | Next.js + shadcn scaffold; duplicates agillis.dev |
| `plan.md` | Old "blog transformation" planning doc |
| `implementation-prompts.md` | Companion to plan.md |
| `todo.md` | Stale todos |
| `.github/workflows/claude-code-review.yml` | Claude Code Review workflow — user opted to purge |
| `.github/workflows/claude.yml` | Claude PR Assistant workflow — user opted to purge |
| `.claude/` directory (if any tracked files exist) | Project agent settings; doesn't belong in a profile repo |

Final tracked files post-change:

- `README.md` — the profile content above
- `.gitignore` — fresh; excludes `.DS_Store`, `.claude/`, `node_modules/`
- `docs/superpowers/specs/2026-05-27-profile-readme-ai-readiness-design.md` — this spec
- `docs/superpowers/plans/2026-05-27-profile-readme-ai-readiness-plan.md` — the implementation plan (will be added during writing-plans)

## Out-of-band action for the user (not implementation scope)

In the GitHub UI, update the profile's **Pinned repositories** to mirror Selected Work + 1–3 extras. Suggested set: `dragonglass-cli`, `attestations-demo`, `linked-past`, `dprr-mcp`, plus any client work the user wants surfaced.

## Success criteria

1. `github.com/gillisandrew` renders the new README cleanly on desktop and mobile widths
2. All linked repositories resolve (dragonglass-cli, attestations-demo, linked-past, dprr-mcp Pages URL, agillis.dev)
3. Repo file tree contains only the four files listed under "Final tracked files post-change" above
4. The Claude Code Review and PR Assistant workflows are no longer present
5. Latest commit on `main` shows the "Verified" badge on GitHub
6. The previous three-tracks work remains accessible on the local `archived-three-tracks-design` branch

## Risks / open questions

- **Hook line uses contraction "I'm"** in the title (`Hey, I'm Andrew.`). Renders fine on github.com but accessibility tools may parse the apostrophe oddly. Acceptable per user's March choice.
- **`linked-past` description omits the "ancient world / Roman Republic" context** in Selected Work, relying on the footer to provide it. A scanner who reads only Selected Work may wonder why "SPARQL tools for AI agents" is in this profile. The footer is small enough that it could be missed. Risk accepted — the alternative (mentioning Roman Republic in Selected Work) elevates DH above the "side project" framing the user picked.
- **`dprr-mcp` link in the footer points to GitHub Pages** — relies on the existing Pages deployment continuing to serve. If Pages config changes, link rots silently.
- **`.github/workflows/` directory** being purged means future Claude Code automation has to be set up fresh if the user wants it back.
- **Pre-fetch lesson learned this session is documented in agent memory** under `feedback_fetch_before_plan.md` so future redesigns don't repeat the stale-baseline mistake.
