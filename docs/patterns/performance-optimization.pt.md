# Framework de Decisão para Otimização de Performance

## Propósito

Este documento fornece um **framework prático de decisão** para avaliar otimizações de performance durante o desenvolvimento. Use isso para evitar otimização prematura enquanto garante que você aplica otimizações quando elas importam.

## Quando usar

- Antes de implementar qualquer otimização de performance
- Ao revisar código para melhorias de performance
- Ao decidir se uma otimização vale a complexidade
- Em sessões mensais de revisão de performance

## A Regra de Ouro

**Meça primeiro, otimize depois.** Não otimize baseado em suposições - use métricas reais (Lighthouse, bundle analyzer, Web Vitals).

## Critérios de Decisão

Antes de implementar qualquer otimização, pergunte:

1. **Existe um problema mensurável?** (Lighthouse score < 90, bundle size > 500KB)
2. **Os usuários notarão a diferença?** (É > 100ms de melhoria?)
3. **Qual é o custo de manutenção?** (Tornará o código mais difícil de entender?)
4. **É prematuro?** (Estamos otimizando antes de ter dados de uso reais?)

## Otimizações de Alto ROI (Geralmente Vale a Pena)

### Type Policies do Apollo Cache

**Aplicar quando:**

- Entidades aparecem em múltiplas queries (Task em lista + detalhe)
- Usando `refetchQueries` após mutações
- Entidades têm relacionamentos

**Pular quando:**

- CRUD simples com uma query por entidade
- Sem relacionamentos entre entidades

### Atualizações Otimistas

**Aplicar quando:**

- Ações frequentes do usuário (toggle, like, favorite)
- Latência de rede > 200ms
- Usuários esperam feedback instantâneo

**Pular quando:**

- Operações críticas (delete, pagamento)
- Mutações complexas com efeitos colaterais

### Dynamic Imports (Code Splitting)

**Aplicar quando:**

- Componentes > 50KB
- Rotas não acessadas por todos os usuários
- Bibliotecas pesadas de terceiros

**Pular quando:**

- Componentes pequenos (< 10KB)
- Conteúdo acima da dobra
- Componentes frequentemente usados

## Otimizações de Médio ROI (Avaliar Caso a Caso)

### Persistência de Cache

**Aplicar quando:**

- Apps mobile (offline-first)
- Usuários retornam frequentemente aos mesmos dados
- Dados mudam lentamente

**Pular quando:**

- Dados em tempo real
- Dados sensíveis
- Dados mudam frequentemente

### Otimização de Imagens Next.js

**Aplicar quando:**

- > 10 imagens por página
- Imagens > 100KB cada
- Imagens geradas pelo usuário

**Pular quando:**

- Poucas imagens (< 5 por página)
- Já otimizadas (SVG, WebP)
- Imagens de CDN

## Checklist de Revisão de Performance

Use isso **mensalmente** ou quando problemas de performance surgirem:

### Configuração Inicial (Fazer Uma Vez)

- [ ] Configurar bundle analyzer
- [ ] Configurar Lighthouse CI
- [ ] Configurar monitoramento Web Vitals
- [ ] Documentar métricas baseline

### Apollo Client

- [ ] Revisar uso de `refetchQueries`
- [ ] Verificar se Type Policies ajudariam
- [ ] Avaliar persistência de cache
- [ ] Medir performance de mutações

### Next.js

- [ ] Executar bundle analyzer
- [ ] Verificar Lighthouse score (meta > 90)
- [ ] Revisar dynamic imports
- [ ] Verificar uso do componente Image

## Métricas para Acompanhar

- **Bundle Size:** < 500KB (gzipped) para carga inicial
- **Lighthouse Score:** > 90 para Performance
- **LCP:** < 2.5s
- **FID:** < 100ms
- **CLS:** < 0.1

## Sinais de Alerta (Aplicar Otimização Imediatamente)

1. Lighthouse Performance < 50
2. Bundle size > 1MB
3. Latência de mutação > 1s
4. Taxa de cache hit < 30%
5. LCP > 4s

## Quando Pular Otimizações

Pular quando:

- Nenhum problema mensurável existe
- Otimização adiciona complexidade significativa
- Estágio inicial de MVP
- Usuários não notarão (< 100ms de melhoria)
- Custo de manutenção > benefício de performance

## Referência Rápida

Veja o framework detalhado de decisão em: `.cursor/rules/performance-optimization.mdc`

## Links

- [Apollo Cache Configuration](https://www.apollographql.com/docs/react/caching/cache-configuration/)
- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web Vitals](https://web.dev/vitals/)
