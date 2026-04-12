## Descricao

<!-- Descreva o que foi feito e qual problema esta sendo resolvido. -->
<!-- Exemplo: "Adiciona testes para o endpoint /produtos cobrindo GET, POST e DELETE." -->

Closes #<!-- numero da issue -->

## Tipo de mudanca

- [ ] Novo teste ou cenario
- [ ] Correcao de teste existente
- [ ] Novo endpoint coberto
- [ ] Refatoracao (sem alteracao de comportamento)
- [ ] Atualizacao de dependencias
- [ ] Documentacao

## Checklist

- [ ] Os testes novos ou alterados estao passando localmente (`npm run cy:run`)
- [ ] Os testes existentes nao foram quebrados
- [ ] Dados de teste sao gerados via factory com `@faker-js/faker` (sem valores hardcoded)
- [ ] Dados criados durante os testes sao limpos com `after` ou `afterEach`
- [ ] Foram validados: `response.status`, `response.duration` e `response.body`
- [ ] O lint esta passando (`npm run lint`)
- [ ] Novos tipos foram adicionados em `cypress/support/types.ts`
- [ ] Novos commands foram adicionados em `cypress/support/commands/` e importados no `index.ts`

## Evidencias

<!-- Cole aqui screenshots do Cypress runner ou o output do terminal com os testes passando. -->
