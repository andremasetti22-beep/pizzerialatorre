# Sito statico per GitHub Pages (radice del branch `main`)

Nella radice del repository trovi la versione statica del sito:

- `index.html` — pagina principale (menù completo, hero, sfondo dinamico)
- `images/` — foto (panorama, logo, bosco, cuore, cascata)
- `favicon.png`
- `.nojekyll` — evita l'elaborazione Jekyll di GitHub Pages

## Pubblicazione

1. Push del repository sul branch `main`.
2. Repository → Settings → Pages → Source: `Deploy from a branch`, branch `main`, cartella **`/ (root)`** → Save.
3. Dopo 1-2 minuti il sito è online su `https://<utente>.github.io/<repo>/`.

## Rigenerare l'HTML dopo modifiche al menù

```bash
bun run scripts/build-static-site.ts
```
