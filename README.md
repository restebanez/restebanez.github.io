# restebanez.github.io

Rodrigo Estébanez’s engineering blog about building reliable software where LLMs meet deterministic systems. Built with [Astro](https://astro.build/) and [AstroPaper](https://github.com/satnaing/astro-paper).

## Local development

```sh
pnpm install
pnpm dev
```

Run the full local validation before publishing:

```sh
pnpm lint
pnpm format:check
pnpm build
```

## Publishing

Add Markdown or MDX posts under `src/content/posts`. A push to `main` builds and deploys the site to GitHub Pages.

## License

The AstroPaper-derived source remains available under the MIT License. See [LICENSE](LICENSE).
