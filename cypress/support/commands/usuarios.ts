import type {
  DadosUsuario,
  Usuario,
  ListaUsuariosResponse,
  CriarUsuarioResponse,
  MensagemResponse,
  ErroResponse,
} from "../types";

declare global {
  namespace Cypress {
    interface Chainable {
      criarUsuario(
        dados: DadosUsuario
      ): Chainable<Response<CriarUsuarioResponse | ErroResponse>>;
      buscarUsuarios(): Chainable<Response<ListaUsuariosResponse>>;
      buscarUsuarioPorId(
        id: string
      ): Chainable<Response<Usuario | ErroResponse>>;
      atualizarUsuario(
        id: string,
        dados: DadosUsuario
      ): Chainable<Response<MensagemResponse>>;
      deletarUsuario(id: string): Chainable<Response<MensagemResponse>>;
    }
  }
}

Cypress.Commands.add("criarUsuario", (dados: DadosUsuario) => {
  return cy.api({
    method: "POST",
    url: "/usuarios",
    body: dados,
    failOnStatusCode: false,
  }) as Cypress.Chainable<Cypress.Response<CriarUsuarioResponse | ErroResponse>>;
});

Cypress.Commands.add("buscarUsuarios", () => {
  return cy.api({
    method: "GET",
    url: "/usuarios",
  }) as Cypress.Chainable<Cypress.Response<ListaUsuariosResponse>>;
});

Cypress.Commands.add("buscarUsuarioPorId", (id: string) => {
  return cy.api({
    method: "GET",
    url: `/usuarios/${id}`,
    failOnStatusCode: false,
  }) as Cypress.Chainable<Cypress.Response<Usuario | ErroResponse>>;
});

Cypress.Commands.add("atualizarUsuario", (id: string, dados: DadosUsuario) => {
  return cy.api({
    method: "PUT",
    url: `/usuarios/${id}`,
    body: dados,
    failOnStatusCode: false,
  }) as Cypress.Chainable<Cypress.Response<MensagemResponse>>;
});

Cypress.Commands.add("deletarUsuario", (id: string) => {
  return cy.api({
    method: "DELETE",
    url: `/usuarios/${id}`,
    failOnStatusCode: false,
  }) as Cypress.Chainable<Cypress.Response<MensagemResponse>>;
});
