---
author: Rodrigo Estébanez
pubDatetime: 2026-07-23T00:00:00+01:00
title: Give the Model Coordinates, Not Freedom
featured: true
draft: false
tags:
  - llm
  - reliability
  - provenance
  - hilvan
description: How text coordinates let LLMs interpret messy documents while deterministic code verifies what can be trusted.
---

LLMs are surprisingly good at finding information in messy documents. They are less reliable at telling you exactly where that information came from.

Imagine an email containing a flight itinerary. You ask a model to extract the airport code, and it returns `MAD`. The answer is correct, but was `MAD` actually present in the email? Or did the model simply know that Madrid's airport code is `MAD`?

If the result is going into a database, "probably correct" is not enough.

Hilvan, a tool I'm building that extracts structured data from two decades of transactional emails, solves this by adding coordinates to the text before showing it to the model:

```text
K03 | From  IB3826  22-Apr
K04 | Madrid (MAD)  08:45
K05 | To
K06 | Gran Canaria (LPA)  10:35
```

Instead of asking the model to reproduce a quotation, Hilvan asks it to return the value together with the coordinates that support it:

```json
{
  "type": "airport",
  "value": "MAD",
  "evidence": ["K04"]
}
```

The LLM proposes a claim, and ordinary code verifies it. If `MAD` does not appear in `K04`, the claim is rejected. The model cannot invent a convincing quotation, subtly alter the source text, or support an answer with a sentence that never existed.

This is particularly helpful for smaller models. Selecting a line identifier is easier than reproducing an exact passage while also following a schema and performing the extraction itself. The model has less work to do, and deterministic code handles the part machines are already good at: exact matching.

Coordinates also buy you something more valuable than fewer hallucinations: provenance.

Every stored fact links back to the exact characters in the original email, even though the model works from a cleaned version. Signatures may be removed, quoted replies discarded, and attachments converted to text. Hilvan keeps a map from that cleaned text to the source, so evidence remains anchored to the original email rather than to a temporary transformation.

In one real itinerary, the model correctly extracted `MAD` but pointed to `K03`, while the literal value appeared one line below in `K04`. The verifier rejected it.

That was a useful failure. Nothing invented entered the database, and the precise cause was visible: the model understood the table but slipped by one line.

This pattern captures how I increasingly think LLM applications should be built.

**Let the LLM interpret. Let deterministic code decide what can be trusted.**

Coordinates do not make a model more intelligent. They make its work inspectable, and that is often more important.
