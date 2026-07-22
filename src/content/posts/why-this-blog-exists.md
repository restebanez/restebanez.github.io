---
author: "Rodrigo Estébanez"
pubDatetime: 2026-07-22T23:00:00Z
title: "Building at the Boundary of Probabilistic and Deterministic Systems"
featured: true
tags:
  - architecture
  - llm
  - hilvan
description: "An engineering notebook about deciding what an LLM should infer and what deterministic code must guarantee."
---

Most useful LLM applications are neither purely probabilistic nor purely deterministic. They live at the boundary between the two.

The model can interpret language, recover implicit relationships, and propose structure. The surrounding software must preserve provenance, enforce invariants, evolve state, and make failures observable. Treating either side as sufficient produces brittle systems.

I am exploring that boundary through [Hilvan](https://github.com/restebanez/hilvan), a system that turns fragmented email into explicit lifecycle state. A booking is not one message. It is a sequence of observations: confirmation, payment, schedule change, check-in, boarding pass, cancellation, or claim. Each observation may be incomplete, duplicated, contradictory, or late.

That makes Hilvan a useful laboratory for a broader architectural question:

> What should the model be allowed to infer, and what must deterministic code guarantee?

This blog will document the answers as they emerge—not as abstract rules, but as designs tested against real failure modes. Topics will include extraction boundaries, lifecycle reducers, evidence and provenance, confidence, evaluations, provider variance, and the shape of code around non-deterministic components.

The goal is simple: use LLMs for what they are unusually good at without asking the rest of the system to pretend they are deterministic functions.
