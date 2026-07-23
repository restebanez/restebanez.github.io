# AGENTS.md

## Purpose

This repository contains Rodrigo Estébanez's English-language engineering blog.

The blog explores practical lessons from building reliable software where LLMs meet deterministic systems, especially insights discovered while developing Hilvan.

Write for humans, not for search engines or technical documentation.

## Writing principles

- Write in clear, natural English. Use American spelling.
- Keep each post focused on one useful idea.
- Prefer short posts, usually between 400 and 800 words.
- Introduce the concrete problem within the first two paragraphs.
- Use a real example whenever possible.
- Explain the solution in plain language before naming implementation details.
- Include technical details only when they help the reader understand the insight.
- End with a clear takeaway rather than a generic summary.
- Use first person when describing decisions or lessons from building Hilvan.
- Prefer short paragraphs and direct sentences.
- Use sentence case for titles and headings.
- Avoid unnecessary headings, long lists, jargon, marketing language, and filler.
- Do not add a table of contents to short posts.
- Keep code examples small enough to understand immediately.

The reference for tone and structure is `src/content/posts/give-the-model-coordinates-not-freedom.md`. When in doubt, match it.

A good default structure is:

1. The problem.
2. A concrete example.
3. The solution.
4. Why it works.
5. What was learned.

This is guidance, not a mandatory template. The article should still feel natural.

### Patterns to avoid

These patterns make prose read as machine-generated. Do not use them:

- Rhetorical question triads ("Did it X? Did it Y? Or did it simply Z?"). One question at most.
- More than one balanced antithesis per post ("Let the LLM interpret. Let code decide."). It works once, usually as the closer.
- Throat-clearing sentences ("It's worth noting that...", "The system is not infallible.", "In today's world..."). Delete them and start with the substance.
- More than two em-dashes per post.
- The word "delve", "leverage" (as a verb), "robust", "seamless", or "game-changer".
- Symmetrical paragraph openers ("First... Second... Finally...") unless the post is genuinely enumerative.
- A closing paragraph that restates the whole post. End on the takeaway, not a summary.

## Technical claims

Before drafting, inspect the relevant evidence. Hilvan's source code, evals, and decision records live in `../hilvan` (adjust the path if the repo is checked out elsewhere). If the evidence is not accessible, say so and ask rather than writing from general knowledge.

- Distinguish measured results from intuition.
- Do not claim that something "solves" or "eliminates" a problem unless the evidence supports that wording.
- Describe unmeasured benefits as expectations or hypotheses.
- Prefer specific observations over broad claims about LLMs.
- Mention model names, frameworks, schemas, offsets, or other implementation details only when they matter to the story.
- Preserve the distinction between what the LLM proposes and what deterministic code verifies.
- Never publish private email content, credentials, personal data, or identifying customer information.
- Examples derived from real data must be anonymized or reduced to the minimum text needed.

## Article format

Posts live in:

```text
src/content/posts/
```

Use a lowercase kebab-case filename ending in `.md` or `.mdx`.

Every post must have front matter compatible with `src/content.config.ts`:

```yaml
---
author: Rodrigo Estébanez
pubDatetime: 2026-07-23T00:00:00+01:00
title: A human-readable title
draft: true
tags:
  - llm
  - reliability
description: A concise sentence describing the article.
---
```

Additional rules:

- Use `draft: true` while an article is being reviewed.
- Change it to `draft: false` only after explicit approval to publish.
- Use lowercase tags. Prefer existing tags over inventing new ones; check other posts first.
- Write a concise description suitable for search results and link previews.
- Do not mark every article as `featured`; use it only when explicitly requested.
- Do not repeat the title as an H1 in the article body because AstroPaper renders it.
- Set `pubDatetime` to the actual publication date, not the drafting date, and update it if publication is delayed.

## Review before publication

Never commit or publish a new article immediately after drafting it.

Before committing:

1. Show the user the complete article, including its proposed title, description, tags, and publication date.
2. Explain any factual uncertainty or wording that may overstate the evidence.
3. Wait for explicit approval or requested revisions.
4. Apply the approved changes.
5. Re-read the final diff before committing.

Do not silently rewrite an approved article during publication. If validation later forces a content change, however small, show it to the user before pushing.

## Validation

After approval and before publishing, run:

```bash
pnpm install
pnpm lint
pnpm format:check
pnpm build
```

If formatting fails, run `pnpm format`, then repeat the relevant checks.

Do not publish when the build fails. Explain the failure and fix it only when it is within the requested scope.

## Deployment

The site is deployed through `.github/workflows/deploy.yml`. A push to `main` triggers the GitHub Pages build and deployment, so pushing to `main` **is** publishing. Only do it after the article has been explicitly approved and validation has passed.

1. Commit only the intended files with a concise message.
2. Push to `main`, unless the user requests a pull request or another branch.
3. Verify that the Deploy to GitHub Pages workflow starts.
4. Wait for the workflow to complete.
5. Confirm that the final article URL returns successfully.
6. Report the article URL, commit, and workflow result.

Publishing is not complete until both the workflow and the live URL have been verified.
