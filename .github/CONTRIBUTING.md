# Guia de Contribuicao

Obrigado por dedicar seu tempo para contribuir com este projeto!

## Sumario

- [Como contribuir](#como-contribuir)
- [Configuracao do ambiente](#configuracao-do-ambiente)
- [Adicionando novos testes](#adicionando-novos-testes)
- [Convencoes de codigo](#convencoes-de-codigo)
- [Fluxo de pull request](#fluxo-de-pull-request)

## Como contribuir

1. Abra uma _issue_ descrevendo o problema ou a melhoria antes de comecar a implementar.
2. Faca um fork do repositorio e crie sua branch a partir de `main`.
3. Implemente as mudancas seguindo as convencoes descritas neste guia.
4. Garanta que todos os testes existentes continuam passando.
5. Abra um pull request usando o template disponivel.

## Configuracao do ambiente

```bash
# Clone o repositorio
git clone <url-do-repo>
cd cypress-api-test

# Instale as dependencias
npm install

# Execute os testes para validar o ambiente
npm run cy:run
```

**Pre-requisitos:** Node.js >= 18 e npm >= 9.

## Adicionando novos testes

### Novo endpoint

Ao adicionar testes para um novo endpoint, siga esta estrutura:

**1. Tipos** - adicione as interfaces em `cypress/support/types.ts`:

```typescript
export interface MeuRecurso {
  _id: string;
  nome: string;
  // ...
}

export interface CriarMeuRecursoResponse {
  message: string;
  _id: string;
}
```

**2. Factory** - crie o arquivo de geracao de dados em `cypress/support/factories/`:

```typescript
// cypress/support/factories/meu-recurso.factory.ts
import { faker } from "@faker-js/faker/locale/pt_BR";
import type { MeuRecurso } from "../types";

export const criarDadosMeuRecurso = (
  overrides: Partial<MeuRecurso> = {},
): MeuRecurso => ({
  nome: faker.commerce.productName(),
  // ...
  ...overrides,
});
```

**3. Commands** - crie o arquivo de commands em `cypress/support/commands/`:

```typescript
// cypress/support/commands/meu-recurso.ts
Cypress.Commands.add("criarMeuRecurso", (dados) => {
  return cy.api({
    method: "POST",
    url: "/meu-recurso",
    body: dados,
    failOnStatusCode: false,
  });
});
```

Em seguida, importe no barrel `cypress/support/commands/index.ts`:

```typescript
import "./meu-recurso";
```

**4. Testes** - crie o arquivo de testes em `cypress/e2e/`:

```
cypress/e2e/meu-recurso/meu-recurso.cy.ts
```

### Novo cenario em endpoint existente

Adicione o `it` dentro do `describe` correspondente ao metodo HTTP no arquivo de testes do endpoint.

## Convencoes de codigo

### Nomenclatura

| Item                   | Convencao               | Exemplo                                    |
| ---------------------- | ----------------------- | ------------------------------------------ |
| Arquivos de teste      | `kebab-case.cy.ts`      | `usuarios.cy.ts`                           |
| Arquivos de commands   | `kebab-case.ts`         | `usuarios.ts`                              |
| Arquivos de factory    | `kebab-case.factory.ts` | `usuario.factory.ts`                       |
| Funcoes de factory     | `criarDados<Recurso>`   | `criarDadosUsuario`                        |
| Custom commands        | `verboRecurso`          | `criarUsuario`, `buscarUsuarios`           |
| Interfaces de request  | `Dados<Recurso>`        | `DadosUsuario`                             |
| Interfaces de response | descritivo              | `CriarUsuarioResponse`, `MensagemResponse` |

### Testes

- Cada `describe` deve cobrir um unico endpoint + metodo HTTP.
- Use `before` para setup compartilhado por todos os testes do bloco (quando nao ha modificacao de estado).
- Use `beforeEach` quando cada teste precisa de estado proprio.
- Sempre limpe os dados criados com `after` ou `afterEach`.
- Valide `response.status`, `response.duration` e `response.body` em todos os testes.
- Use `as TipoEsperado` para narrowing de union types apos a assertiva de status.

### Lint

O projeto usa ESLint com regras TypeScript. Antes de abrir um PR, execute:

```bash
npm run lint
```

Para corrigir automaticamente:

```bash
npm run lint:fix
```

## Fluxo de pull request

1. Crie sua branch a partir de `main`:

   ```bash
   git checkout -b feat/nome-da-feature
   # ou
   git checkout -b fix/nome-do-bug
   ```

2. Faca commits com mensagens claras e objetivas no formato:

   ```
   feat: adiciona testes para o endpoint /produtos
   fix: corrige assertiva de status no teste de email duplicado
   chore: atualiza versao do faker
   ```

3. Abra o pull request para `main` usando o template disponivel.

4. O CI executa os testes automaticamente. O PR so pode ser mergeado com o pipeline verde.
