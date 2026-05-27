# Profile README Redesign (AI Readiness) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing profile README at `gillisandrew/gillisandrew` with the AI-readiness positioning specified in `2026-05-27-profile-readme-ai-readiness-design.md`; purge the cruft (`site/`, planning docs, `.github/workflows/`); leave the repo with exactly four tracked files; ship to `main`.

**Architecture:** Content change, no code. Work happens on branch `redesign-ai-readiness` (already exists with the spec commit `6fdec99`). Final state is a fast-forward merge to `main` and a push. Local clone is now at parity with origin (we already reset earlier in the session).

**Tech Stack:** Markdown, git, gh CLI. No build system, no tests; verification is by link-check, file-tree inspection, and visual rendering on github.com.

**Spec:** `docs/superpowers/specs/2026-05-27-profile-readme-ai-readiness-design.md`

**Working directory:** `/Users/gillisandrew/Projects/gillisandrew/gillisandrew`
**Branch at start:** `redesign-ai-readiness` (one commit ahead of `main`: the spec, `6fdec99`)
**Archive branch (do not touch):** `archived-three-tracks-design` preserves the discarded earlier design

---

## Task 1: Commit the plan + preflight checks

The plan file is untracked. Commit it. Then verify external dependencies and git state.

**Files:**
- Add to git: `docs/superpowers/plans/2026-05-27-profile-readme-ai-readiness-plan.md`

- [ ] **Step 0: Confirm Bitwarden vault is unlocked**

Run:
```sh
SSH_AUTH_SOCK=~/.bitwarden-ssh-agent.sock ssh-add -l
```

Expected: three `BW-*` keys listed (AUTH, SIGN, ENCRYPT). If you see `agent refused operation`, STOP and report BLOCKED — the user must unlock Bitwarden Desktop before any commit will succeed.

- [ ] **Step 1: Confirm branch state**

Run:
```sh
cd /Users/gillisandrew/Projects/gillisandrew/gillisandrew
git rev-parse --abbrev-ref HEAD
git log --oneline -3
```

Expected:
- Branch is `redesign-ai-readiness`
- Top of log: `6fdec99 docs: add AI-readiness profile README redesign spec`, then `aea25e0 docs: update profile README for AI readiness positioning`, then `3a93635 Merge pull request #14 ...`

- [ ] **Step 2: Commit the plan**

Run:
```sh
git add docs/superpowers/plans/2026-05-27-profile-readme-ai-readiness-plan.md
git commit -m "docs: add AI-readiness profile README implementation plan"
```

Expected: commit succeeds; output shows one new file added.

- [ ] **Step 3: Verify the commit is signed**

Run:
```sh
git log --show-signature -1
```

Expected: includes line `Good "git" signature for gillis.andrew@gmail.com with ED25519 key SHA256:HEiTXDaXX0bPCb8+DnkXLNR1iO6mpeUSLSRENaPQ+zc`. If signature is missing, STOP — vault may have re-locked.

- [ ] **Step 4: Verify all referenced GitHub repos exist**

Run:
```sh
for r in dragonglass-cli attestations-demo linked-past dprr-mcp; do
  echo -n "$r → "
  gh api "repos/gillisandrew/$r" --jq '"visibility=" + .visibility + " archived=" + (.archived|tostring)' 2>&1 | head -1
done
```

Expected: each prints `visibility=public archived=false`. If anything is private, archived, or missing, STOP and report the affected repo.

- [ ] **Step 5: Verify the dprr-mcp GitHub Pages URL**

Run:
```sh
curl -fsSL -o /dev/null -w "%{http_code}\n" https://gillisandrew.github.io/dprr-mcp/
```

Expected: `200`. If non-200, STOP.

- [ ] **Step 6: Verify origin has not advanced since our reset**

Run:
```sh
git fetch origin
git log --oneline origin/main..HEAD
git log --oneline HEAD..origin/main
```

Expected:
- `origin/main..HEAD` shows the two commits we've made on this branch (spec + plan)
- `HEAD..origin/main` is empty (no new commits on origin since we reset)

If `HEAD..origin/main` shows commits we don't have, STOP and report — the user may have pushed something while we were planning, and we'd risk overwriting.

---

## Task 2: Write the new README.md

Replace the AI-readiness README contents with the spec's final draft.

**Files:**
- Modify: `/Users/gillisandrew/Projects/gillisandrew/gillisandrew/README.md`

- [ ] **Step 1: Overwrite README.md with the new content**

Use the Write tool to replace `README.md` with exactly:

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

- [ ] **Step 2: Verify the bytes you wrote match the spec exactly**

Run:
```sh
diff <(sed -n '/^```markdown$/,/^```$/p' docs/superpowers/specs/2026-05-27-profile-readme-ai-readiness-design.md | sed '1d;$d') README.md
```

Expected: no output (files are identical). If diff shows differences, fix README.md before continuing.

- [ ] **Step 3: Spot-check rendering of special characters**

Run:
```sh
grep -n '✦' README.md
grep -n '·' README.md
grep -n '—' README.md | head -3
```

Expected:
- One match for `✦` (U+2726) on the side-project line
- One match for `·` (U+00B7) in the "Get in touch" line between site and email
- Multiple matches for `—` (em dash, U+2014) across the bullets

If the characters render as `?` or as a literal `\u` escape, the file encoding is wrong — STOP and re-write.

- [ ] **Step 4: Commit**

Run:
```sh
git add README.md
git commit -m "feat: redesign profile README around AI-readiness positioning"
```

- [ ] **Step 5: Verify commit signed**

Run:
```sh
git log --show-signature -1
```

Expected: includes "Good signature" line. If missing, STOP.

---

## Task 3: Add minimal .gitignore

Per spec — fresh `.gitignore` excluding `.DS_Store`, `.claude/`, `node_modules/`.

**Files:**
- Create: `/Users/gillisandrew/Projects/gillisandrew/gillisandrew/.gitignore`

- [ ] **Step 1: Write .gitignore**

Use the Write tool to create `.gitignore` with exactly:

```
# macOS
.DS_Store

# Claude Code project settings (should never be committed to a profile repo)
.claude/

# Node deps (in case site/ scaffolding ever returns)
node_modules/
```

- [ ] **Step 2: Verify .claude/ would be ignored if recreated**

Run:
```sh
git check-ignore -v .claude/foo
```

Expected: output ends with `.gitignore:5:.claude/	.claude/foo` (or similar — the key signal is the rule from line 5 matches). If empty output, the rule isn't matching — fix the file.

- [ ] **Step 3: Commit**

Run:
```sh
git add .gitignore
git commit -m "chore: add minimal .gitignore for profile repo"
```

---

## Task 4: Delete repo cruft including workflows

Remove every tracked path the spec marks for deletion: `site/`, `plan.md`, `implementation-prompts.md`, `todo.md`, `.github/workflows/claude-code-review.yml`, `.github/workflows/claude.yml`, and any tracked content under `.claude/`.

**Files:**
- Delete (from git): `site/*` (35 files), `plan.md`, `implementation-prompts.md`, `todo.md`, `.github/workflows/claude-code-review.yml`, `.github/workflows/claude.yml`, `.claude/*` (if any tracked)

- [ ] **Step 1: List what's about to be deleted**

Run:
```sh
git ls-files | grep -E '^(site/|plan\.md$|implementation-prompts\.md$|todo\.md$|\.github/workflows/(claude\.yml|claude-code-review\.yml)$|\.claude/)'
```

Expected: shows `plan.md`, `implementation-prompts.md`, `todo.md`, `site/*` paths, both `.github/workflows/*.yml` files, and any tracked `.claude/*` files. If any path you didn't expect appears, STOP.

- [ ] **Step 2: Check for uncommitted changes in those paths**

Run:
```sh
git status site/ plan.md implementation-prompts.md todo.md .github/ .claude/ 2>&1 | head -20
```

Expected: clean (no `M` or `A` markers). If anything is uncommitted in these paths, surface it before deleting.

- [ ] **Step 3: Remove the tracked paths in a single git rm**

Run:
```sh
git rm -r site/ plan.md implementation-prompts.md todo.md .github/workflows/claude.yml .github/workflows/claude-code-review.yml 2>&1 | tail -3
# .claude/ may not be tracked — handle conditionally
if git ls-files .claude/ | head -1 | grep -q .; then
  git rm -r .claude/
fi
```

Expected: `rm` lines for each file. The conditional handles the case where `.claude/` exists only in the working tree (not git-tracked).

- [ ] **Step 4: Remove the empty .github/workflows/ and .github/ directories from working tree**

After `git rm`, the parent directories may still exist on disk as empty dirs. Run:
```sh
[ -d .github/workflows ] && rmdir .github/workflows
[ -d .github ] && rmdir .github
```

Expected: silent success. If `rmdir` complains the directory isn't empty, investigate — there are other tracked or untracked files in `.github/` we didn't expect.

- [ ] **Step 5: Verify the expected file tree**

Run:
```sh
git ls-files
```

Expected, exactly these four lines and nothing else:
```
.gitignore
README.md
docs/superpowers/plans/2026-05-27-profile-readme-ai-readiness-plan.md
docs/superpowers/specs/2026-05-27-profile-readme-ai-readiness-design.md
```

If anything else appears, STOP and report.

- [ ] **Step 6: Commit**

Run:
```sh
git commit -m "chore: purge stale site/, planning docs, and Claude Code workflows"
```

- [ ] **Step 7: Verify commit signed and final history**

Run:
```sh
git log --show-signature -1 | head -5
git log --oneline main..HEAD
```

Expected:
- Last commit shows "Good signature"
- `git log --oneline main..HEAD` shows exactly 5 commits ahead of `main`, in this order from newest to oldest: deletion (this task), `.gitignore` (Task 3), README (Task 2), plan (Task 1 Step 2), spec (`6fdec99`, pre-existing from brainstorming).

---

## Task 5: Merge to main and push

Branch is ready. Fast-forward `main` and push.

**Files:** none modified — branch operations only

- [ ] **Step 1: Re-verify origin hasn't moved**

Run:
```sh
git fetch origin
git log --oneline HEAD..origin/main
```

Expected: empty output (nothing new on origin). If origin has new commits, STOP and report — same divergence problem the previous attempt hit. The user must decide how to reconcile.

- [ ] **Step 2: Switch to main**

Run:
```sh
git checkout main
git log --oneline -1
```

Expected: `aea25e0 docs: update profile README for AI readiness positioning`. If different, STOP — local main has drifted from origin/main since the reset.

- [ ] **Step 3: Fast-forward merge**

Run:
```sh
git merge --ff-only redesign-ai-readiness
```

Expected: `Fast-forward` followed by a list of changed files. If you see a non-fast-forward error, STOP.

- [ ] **Step 4: Push main to origin via SSH**

Run:
```sh
git push origin main
```

Expected: `aea25e0..<new-sha>  main -> main`.

If push fails with an SSH error, the Bitwarden agent may have re-locked. Re-verify with `SSH_AUTH_SOCK=~/.bitwarden-ssh-agent.sock ssh-add -l`. If unlocked but push still fails, fall back to:
```sh
git -c "credential.helper=" -c "credential.helper=!gh auth git-credential" \
  push "https://github.com/gillisandrew/gillisandrew.git" main
```

- [ ] **Step 5: Delete the local feature branch**

Run:
```sh
git branch -d redesign-ai-readiness
```

Expected: `Deleted branch redesign-ai-readiness (was <sha>)`. Note: `archived-three-tracks-design` remains untouched.

---

## Task 6: Post-deploy verification

Confirm GitHub renders the README, file tree is right, signing carried through.

**Files:** none modified — verification only

- [ ] **Step 1: Confirm tracked file list on remote**

Run:
```sh
gh api repos/gillisandrew/gillisandrew/git/trees/main?recursive=1 \
  --jq '.tree[] | select(.type=="blob") | .path' | sort
```

Expected, exactly:
```
.gitignore
README.md
docs/superpowers/plans/2026-05-27-profile-readme-ai-readiness-plan.md
docs/superpowers/specs/2026-05-27-profile-readme-ai-readiness-design.md
```

If anything else appears (especially `.github/workflows/*`), STOP — the push didn't take.

- [ ] **Step 2: Confirm latest commit is verified**

Run:
```sh
gh api repos/gillisandrew/gillisandrew/commits/main --jq '.commit.verification.verified'
```

Expected: `true`.

- [ ] **Step 3: Confirm rendered README on github.com (visual)**

Open `https://github.com/gillisandrew` in a browser. The profile page auto-renders the README. Verify:
- Header reads "Hey, I'm Andrew."
- Three section headers in order: What I do · Selected work · Get in touch
- 3 service-line bullets in "What I do"
- 3 project links in "Selected work" (dragonglass-cli, attestations-demo, linked-past)
- Side-project footer renders with ✦ and italic text, dprr-mcp link clickable

- [ ] **Step 4: Confirm workflows are gone on remote**

Run:
```sh
gh api repos/gillisandrew/gillisandrew/contents/.github/workflows/claude.yml 2>&1 | head -1
```

Expected: `gh: Not Found (HTTP 404)`. If the file is still there, push didn't fully take — investigate.

---

## Out-of-band action (user, not in plan's scope)

Update profile **Pinned repositories** in the GitHub UI:

1. Visit `https://github.com/gillisandrew`
2. Click "Customize your pins"
3. Pin (suggested order): `dragonglass-cli`, `attestations-demo`, `linked-past`, `dprr-mcp`, plus 1–2 more (a strong public client project, or another supply-chain repo)

Pinned repos are not scriptable from the API reliably; this is a manual step.

---

## Success criteria (mirrors spec)

1. ✅ `https://github.com/gillisandrew` renders the new AI-readiness README
2. ✅ All 4 linked repositories resolve (3 in Selected work + 1 in footer)
3. ✅ Tracked file set on `main` matches the expected four files exactly
4. ✅ `.github/workflows/` directory and its contents are absent from `main`
5. ✅ Latest commit on `main` shows "Verified" badge on GitHub
6. ✅ Local `archived-three-tracks-design` branch still exists (unchanged) for reference
