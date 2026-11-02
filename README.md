# Cartas da Fé — PWA

Jogo católico independente com 450 perguntas. Aplicativo instalável com arquivos locais, sem dependências externas.

## Arquivos

- `index.html`: jogo completo, banco de perguntas e controles.
- `manifest.webmanifest`: configurações de instalação Android/iOS.
- `service-worker.js`: cache para abrir offline e atualização manual segura.
- `icon-192.png`, `icon-512.png`: ícones para instalação.
- `icon-maskable-512.png`: ícone recortável no Android.
- `apple-touch-icon.png`: ícone para dispositivos Apple.
- `icon.svg`: fonte vetorial do ícone.

## Publicação GitHub Pages

Em `Settings > Pages`, configurar `Deploy from a branch`, `main`, `/ (root)`. Abrir `https://jiomavj-tech.github.io/Cartas-da-f-/`. Para instalar, usar o botão do app ou menu ⋮ do Chrome > Instalar app.

## Atualização

Ao alterar qualquer arquivo pré-cacheado, atualizar `VERSION` no service-worker para renovar o cache. O app oferece um botão para atualizar sem interromper a partida. Dados de pontuação e histórico salvos em `localStorage` não são apagados.

Nota: a leitura de voz offline depende do mecanismo TTS instalado no Android; algumas vozes online podem não funcionar sem conexão.
