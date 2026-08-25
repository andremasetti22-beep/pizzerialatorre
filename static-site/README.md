# Versione statica per GitHub Pages

Questa cartella contiene il sito in HTML puro, pronto da pubblicare.

- `index.html` — pagina principale (menù completo, sfondo dinamico, hero)
- `images/` — foto (panorama, logo, bosco, cuore, cascata)
- `favicon.png`, `.nojekyll`

## Come pubblicare su GitHub Pages

1. Carica il contenuto di questa cartella nella radice del repository (oppure tutta la cartella e imposta Pages su `/static-site`).
2. Repository → Settings → Pages → Source: `Deploy from a branch`, branch `main`, cartella `/ (root)` o `/static-site`.
3. Il sito sarà online su `https://<utente>.github.io/<repo>/`.

## Rigenerare l'HTML dopo modifiche al menù

Il file è generato dai dati in `src/data/menu.ts`:

```bash
bun run scripts/build-static-site.ts
```
