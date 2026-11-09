# Guia de Deploy no GitHub Pages — NutrinK

Este guia explica como o NutrinK é publicado no GitHub Pages sem erros de MIME type ou 404 de manifest.

---

### Diagnóstico dos 6 Erros Anteriores:
1. **1 erro de MIME type no `main.tsx` (`video/mp2t` ou `text/plain`)**: Ocorria quando o GitHub Pages tentava servir o repositório fonte diretamente da raiz (branch `main` / `root`) em vez da pasta compilada `dist/`. O navegador tentava carregar `/src/main.tsx` como TypeScript puro sem ser compilado para JavaScript bundle.
2. **5 erros 404 no `manifest.json`**: O navegador e o verificador PWA tentavam acessar `./manifest.json` na raiz da publicação, mas os arquivos estavam apenas dentro da pasta `/public/` do código-fonte.

---

### Soluções Implementadas:

1. **Configuração de Build de Produção do Vite**:
   - `npm run build:client` compila todo o código TypeScript e React (`src/main.tsx`) em bundles JavaScript minificados dentro de `dist/assets/index-[hash].js`.
   - O `dist/index.html` gerado aponta automaticamente para esse bundle compilado com caminhos relativos.
2. **Manifest PWA na raiz de produção**:
   - O arquivo `manifest.json` está presente em `public/manifest.json` e é copiado automaticamente pelo Vite para a raiz de `dist/manifest.json`.
   - Adicionamos também uma cópia sincronizada na raiz do repositório (`/manifest.json`) e garantimos que todos os caminhos de ícones e rotas sejam relativos (`./favicon.svg`, `./icon-192.svg`, `./icon-512.svg`, `./?source=pwa`).
3. **Caminhos Relativos (`base: './'`)**:
   - Configurado em `vite.config.ts`, permitindo funcionamento perfeito tanto no domínio personalizado `www.nutrink.com.br` quanto em subdiretórios do GitHub Pages.
4. **GitHub Actions Workflow Automatizado**:
   - Criado o arquivo `.github/workflows/deploy.yml` que:
     - Instala as dependências via Node.js 22.
     - Executa o build de produção (`npm run build:client`).
     - Publica automaticamente o conteúdo da pasta `dist/` no GitHub Pages.

---

### Como Ativar no Repositório do GitHub:

1. Acesse o repositório no GitHub: **Settings** > **Pages**.
2. Em **Build and deployment** > **Source**, selecione:
   - **GitHub Actions** (Recomendado — o workflow `.github/workflows/deploy.yml` fará o build e deploy da pasta `dist` automaticamente a cada commit na branch `main`).
3. Em **Custom domain**, certifique-se de que está preenchido com `www.nutrink.com.br` (o arquivo `CNAME` já está configurado na raiz e na pasta `public/`).
4. Em **Enforce HTTPS**, marque a caixa de seleção.
