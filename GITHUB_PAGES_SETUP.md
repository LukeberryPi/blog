# GitHub Pages Setup - Gabriel Ferreira Blog

Este documento explica como configurar o GitHub Pages para hospedar este site Next.js com todas as funcionalidades, incluindo o download do currículo.

## ✅ Configurações já aplicadas

As seguintes configurações já foram implementadas no projeto:

### 1. Next.js configurado para exportação estática (`next.config.js`)
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
```

### 2. GitHub Actions Workflow (`.github/workflows/deploy.yml`)
- Workflow configurado para build automático e deploy no GitHub Pages
- Executado automaticamente quando há push na branch `adapt`
- Inclui todas as otimizações necessárias para Next.js

### 3. Arquivo `.nojekyll`
- Arquivo criado em `public/.nojekyll` para evitar processamento Jekyll
- Copiado automaticamente para a pasta `out` durante o build

## 📋 Passos para ativar o GitHub Pages

### 1. Push do código para o GitHub
```bash
git add .
git commit -m "Configure for GitHub Pages deployment"
git push origin adapt
```

### 2. Configurar GitHub Pages no repositório
1. Vá para as **Settings** do seu repositório no GitHub
2. Role até a seção **Pages** no menu lateral
3. Em **Source**, selecione **GitHub Actions**
4. O workflow será executado automaticamente

### 3. Verificar o deploy
- Vá para a aba **Actions** do repositório
- Verifique se o workflow "Deploy Next.js site to Pages" executou com sucesso
- O site estará disponível em: `https://[seu-usuario].github.io/[nome-do-repositorio]`

## 🔧 Funcionalidades preservadas

### Download do Currículo
- ✅ O arquivo `cv-gabriel-ferreira.pdf` está na pasta `public/`
- ✅ É copiado automaticamente para a pasta `out/` durante o build
- ✅ O link `/cv-gabriel-ferreira.pdf` funciona corretamente no GitHub Pages
- ✅ O atributo `download="Gabriel-Ferreira-cv.pdf"` força o download com nome personalizado

### Outras funcionalidades
- ✅ Todas as páginas (home, about, projects) funcionam
- ✅ Imagens otimizadas para produção
- ✅ CSS e JavaScript compilados corretamente
- ✅ Links externos funcionam normalmente
- ✅ Responsividade mantida

## 🚀 Comandos úteis

### Build local para testar
```bash
npm run build
```

### Servir localmente a versão de produção
```bash
# Instale o serve globalmente se ainda não tiver
npm install -g serve

# Sirva a pasta out
serve out -p 3000
```

## 📁 Estrutura de arquivos importantes

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml          # Workflow do GitHub Actions
├── public/
│   ├── .nojekyll              # Previne processamento Jekyll
│   └── cv-gabriel-ferreira.pdf # Currículo para download
├── out/                       # Pasta gerada pelo build (não commitada)
│   ├── .nojekyll              # Copiado automaticamente
│   ├── cv-gabriel-ferreira.pdf # Currículo copiado
│   └── ...                    # Outros arquivos do site
├── next.config.js             # Configuração do Next.js
└── package.json               # Scripts de build atualizados
```

## 🔍 Troubleshooting

### Se o currículo não estiver funcionando:
1. Verifique se o arquivo está em `public/cv-gabriel-ferreira.pdf`
2. Confirme que o build foi executado (`npm run build`)
3. Verifique se o arquivo aparece em `out/cv-gabriel-ferreira.pdf`

### Se o site não carregar:
1. Verifique se o GitHub Pages está configurado corretamente
2. Confirme que o workflow executou sem erros
3. Verifique se a branch está configurada como `adapt` no workflow

### Se houver problemas de cache:
1. Force um novo deploy fazendo um novo commit
2. Aguarde alguns minutos para propagação do cache do GitHub Pages

## 📞 Suporte

Se você encontrar algum problema, verifique:
1. Os logs do GitHub Actions na aba "Actions"
2. As configurações do GitHub Pages nas "Settings"
3. Se todos os arquivos necessários estão no repositório
