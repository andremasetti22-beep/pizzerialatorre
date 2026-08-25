# Versione statica per GitHub Pages (cartella `docs`)

Questa cartella contiene il sito in HTML puro, pronto da pubblicare.

- `index.html` — pagina principale (menù completo, sfondo dinamico, hero)
- `images/` — foto (panorama, logo, bosco, cuore, cascata)
- `favicon.png`, `.nojekyll`

## Come pubblicare su GitHub Pages

1. Fai il push del repository con questa cartella `docs/` nella radice.
2. Repository → Settings → Pages → Source: `Deploy from a branch`, branch `main`, cartella **`/docs`** → Save.
3. Dopo 1-2 minuti il sito è online su `https://<utente>.github.io/<repo>/`.

Errore "does not contain the requested file"? Significa che Pages sta puntando alla radice
(dove non c'è `index.html`): cambia la cartella in `/docs` come sopra.
In alternativa, copia il contenuto di `docs/` (index.html, images/, favicon.png, .nojekyll)
nella radice del repository e lascia Pages su `/ (root)`.

## Rigenerare l'HTML dopo modifiche al menù

```bash
bun run scripts/build-static-site.ts
```
