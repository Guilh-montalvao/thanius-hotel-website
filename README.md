# Thanyu's Hotel

Site completo em Next.js App Router, TypeScript estrito, React e Tailwind CSS 3.4. Animações com GSAP, ScrollTrigger, Motion e Lenis.

## Rodar o projeto entregue

Requer Node.js 22 ou superior. A compilação foi verificada com Node.js 24.22.1.

```bash
cd thanyus-hotel
npm ci
npm run dev
```

Abra http://localhost:3000.

Para produção:

```bash
npm run typecheck
npm run build
npm run start
```

## Começar pelo create-next-app

Esta alternativa serve para montar uma pasta nova e aplicar os arquivos completos desta entrega. O ZIP já contém o projeto configurado, então não é necessário executar o scaffold para usar o ZIP.

```bash
npx create-next-app@16.4.5 thanyus-hotel --ts --tailwind --app --no-src-dir --no-eslint --no-react-compiler --import-alias "@/*" --use-npm --yes
cd thanyus-hotel
npm i gsap motion lenis lucide-react
npm i -D tailwindcss@3.4 postcss autoprefixer
```

Substitua os arquivos do scaffold pelos arquivos entregues, inclusive package.json, package-lock.json, postcss.config.mjs e app/globals.css. Exclua o favicon padrão do scaffold para usar apenas o app/icon.svg desta entrega. Em seguida, execute npm ci. Tailwind 3.4 foi escolhido para oferecer o tailwind.config.ts solicitado e tokens explícitos.

## Direção visual revisada

A composição usa a fachada iluminada como um letreiro de chegada. Bricolage Grotesque e DM Sans substituem a dupla serifada anterior. O cartão de reserva, o carimbo da avaliação e as fotografias com legendas seguem a ideia de um álbum da casa. Os títulos perderam a numeração editorial. O café recebe uma sequência de fotos sobrepostas com notas em papel amarelo. A cidade aparece em uma imagem panorâmica e a localização funciona como um cartão de endereço.

As fotografias do café e da galeria usam object-contain para preservar o conteúdo. No celular, a fachada aparece inteira, sem recortar a entrada ou a placa. No desktop, o hero usa preenchimento da tela e a fachada completa também está disponível na galeria.

## Dados para preencher

Todos estão em lib/site.ts com o comentário TODO: preencher.

1. url: domínio oficial completo, com https://.
2. rating.count: quantidade atual de avaliações no Google.
3. rating.url: link oficial das avaliações.
4. breakfastHours: horário confirmado do café da manhã.
5. checkIn: horário de entrada.
6. checkOut: horário de saída.
7. roomDetails: tipos e informações confirmadas das acomodações.
8. accessibility: condições de acessibilidade confirmadas.

Os campos vazios não aparecem na interface. A seção de acomodações apresenta as comodidades confirmadas e direciona a consulta ao WhatsApp. O domínio ativa canonical, URLs de Open Graph e o endereço no sitemap, evitando publicar um domínio fictício. A nota 4,3 aparece no site e nos dados estruturados; a quantidade de avaliações não é inventada.

## Fotografias

As sete imagens anexadas foram convertidas para JPEG e receberam os nomes pedidos, sem alteração visual do conteúdo. Não foram usadas imagens de banco nem produzidas imagens novas.

| Arquivo               | Conteúdo da imagem fornecida             |
| --------------------- | ---------------------------------------- |
| fachada.jpg           | Fachada e telhado colonial               |
| montalvania-aerea.jpg | Vista aérea ao entardecer                |
| cafe-mesa-1.jpg       | Mesa comprida de pães e bolos            |
| cafe-mesa-2.jpg       | Mesa de frutas em enquadramento vertical |
| cafe-frutas.jpg       | Bandejas de frutas em vista frontal      |
| cafe-sucos.jpg        | Balcão com jarras e garrafas térmicas    |
| cafe-salao.jpg        | Vista geral do café da manhã             |

A foto nomeada cafe-mesa-2.jpg corresponde à mesa de frutas vertical anexada. Não foi inventada uma segunda fotografia de pães. Os textos alternativos descrevem o conteúdo real de cada imagem.

## Implementação

- Conteúdo principal renderizado no servidor, com componentes de animação isolados.
- next/image em todas as fotos, importação estática e blur automático. Priority somente no hero.
- next/font com display swap e fontes servidas pelo próprio Next.js.
- Lenis usa o ticker do GSAP no desktop. No celular, a rolagem é nativa.
- Dois pins no desktop: café e galeria. Sem pins em telas abaixo de 1024 px.
- prefers-reduced-motion desliga Lenis, pins, parallax e animações de entrada. A galeria fica em grade estática.
- Limpeza com gsap.context, matchMedia.revert e kill dos ScrollTriggers de cada componente.
- Galeria com swipe nativo no celular, layoutId, dialog nativo, foco contido, setas, Esc e restauração do foco.
- Telefone, WhatsApp e Google Maps com destinos configurados.
- Metadata, Hotel em JSON-LD, sitemap.xml e robots.txt.
- Telas de erro e página não encontrada em português.

## Verificação

npm run typecheck e npm run build aprovados. A interação da galeria, as setas, Esc e a restauração do foco foram conferidos no navegador. O layout foi conferido em viewports de 360, 768, 1280 e 1920 px. Lighthouse não foi executado; pontuação acima de 90 é uma meta, não um resultado medido.

## Publicação

Use uma hospedagem com suporte a Next.js e otimização de imagens, como Vercel ou um servidor Node.js. Preencha o domínio em lib/site.ts antes do build de publicação. O projeto não depende de API paga, banco de dados, chave do Google Maps ou painel externo.
