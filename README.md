# Cypress API Test

Projeto de testes automatizados de API com [Cypress](https://www.cypress.io/) e TypeScript, cobrindo os endpoints da API [ServeRest](https://serverest.dev).

## Pre-requisitos

- [Node.js](https://nodejs.org/) >= 18
- npm >= 9

## Instalacao

```bash
npm install
```

## Como executar

| Comando                                                        | Descricao                                     |
| -------------------------------------------------------------- | --------------------------------------------- |
| `npm run cy:open`                                              | Abre o Cypress no modo interativo             |
| `npm run cy:run`                                               | Executa todos os testes em modo headless      |
| `npm run cy:run:headed`                                        | Executa todos os testes com interface grafica |
| `npm run cy:run:spec -- "cypress/e2e/usuarios/usuarios.cy.ts"` | Executa um arquivo de teste especifico        |
| `npm run lint`                                                 | Verifica erros de lint                        |
| `npm run lint:fix`                                             | Corrige erros de lint automaticamente         |

## Endpoints testados

| Metodo | Endpoint        | Cenarios                                     |
| ------ | --------------- | -------------------------------------------- |
| GET    | `/usuarios`     | Listagem com validacao de estrutura e campos |
| GET    | `/usuarios/:id` | Busca por ID valido e invalido               |
| POST   | `/usuarios`     | Criacao com sucesso e email duplicado        |
| PUT    | `/usuarios/:id` | Atualizacao de dados                         |
| DELETE | `/usuarios/:id` | Exclusao de usuario                          |

## Tecnologias

| Tecnologia                                                            | Versao | Uso                             |
| --------------------------------------------------------------------- | ------ | ------------------------------- |
| [Cypress](https://www.cypress.io/)                                    | 13.x   | Framework de testes             |
| [cypress-plugin-api](https://github.com/filiphric/cypress-plugin-api) | 2.x    | Visualizacao de requisicoes API |
| [@faker-js/faker](https://fakerjs.dev/)                               | 10.x   | Geracao de massa de testes      |
| [TypeScript](https://www.typescriptlang.org/)                         | 5.x    | Tipagem estatica                |
| [@typescript-eslint](https://typescript-eslint.io/)                   | 8.x    | Lint para TypeScript            |

## CI/CD

Os testes sao executados automaticamente via GitHub Actions a cada push ou pull request para a branch `main`.

Para habilitar a gravacao no [Cypress Cloud](https://cloud.cypress.io/), adicione o secret `CYPRESS_RECORD_KEY` nas configuracoes do repositorio em **Settings > Secrets and variables > Actions**.
