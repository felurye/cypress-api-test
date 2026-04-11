import { CriarUsuarioResponse, Usuario } from "../../support/types";
import { criarDadosUsuario } from "../../support/factories/usuario.factory";

describe("Usuarios API", () => {
  describe("GET /usuarios", () => {
    it("deve retornar a lista de usuarios com status 200", () => {
      cy.buscarUsuarios().then((response) => {
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(5000);
        expect(response.body.usuarios).to.be.an("array").and.not.be.null;

        if (response.body.usuarios.length > 0) {
          const usuario = response.body.usuarios[0];
          expect(usuario).to.have.all.keys(
            "_id",
            "nome",
            "email",
            "password",
            "administrador"
          );
          expect(usuario._id).to.be.a("string");
          expect(usuario.nome).to.be.a("string");
          expect(usuario.email).to.be.a("string");
          expect(usuario.administrador).to.be.a("string");
        }
      });
    });
  });

  describe("GET /usuarios/:id", () => {
    let usuarioId: string;

    before(() => {
      cy.criarUsuario(criarDadosUsuario()).then((response) => {
        usuarioId = (response.body as CriarUsuarioResponse)._id;
      });
    });

    after(() => {
      cy.deletarUsuario(usuarioId);
    });

    it("deve retornar o usuario por ID com status 200", () => {
      cy.buscarUsuarioPorId(usuarioId).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(5000);
        expect((response.body as Usuario)._id).to.eq(usuarioId);
      });
    });

    it("deve retornar status 400 ao buscar por ID invalido", () => {
      cy.buscarUsuarioPorId("id-invalido-xyz").then((response) => {
        expect(response.status).to.eq(400);
        expect(response.duration).to.be.lessThan(5000);
      });
    });
  });

  describe("POST /usuarios", () => {
    let usuarioCriadoId: string;

    after(() => {
      if (usuarioCriadoId) {
        cy.deletarUsuario(usuarioCriadoId);
      }
    });

    it("deve criar um novo usuario com status 201", () => {
      cy.criarUsuario(criarDadosUsuario()).then((response) => {
        const body = response.body as CriarUsuarioResponse;
        usuarioCriadoId = body._id;
        expect(response.status).to.eq(201);
        expect(response.duration).to.be.lessThan(5000);
        expect(body.message).to.eq("Cadastro realizado com sucesso");
        expect(body._id).to.be.a("string").and.not.be.empty;
      });
    });

    it("deve retornar status 400 ao cadastrar email duplicado", () => {
      const dados = criarDadosUsuario();

      cy.criarUsuario(dados).then((respostaInicial) => {
        const idDuplicado = (respostaInicial.body as CriarUsuarioResponse)._id;

        cy.criarUsuario(dados).then((response) => {
          expect(response.status).to.eq(400);
          expect(response.duration).to.be.lessThan(5000);
          expect(response.body.message).to.eq("Este email já está sendo usado");

          cy.deletarUsuario(idDuplicado);
        });
      });
    });
  });

  describe("PUT /usuarios/:id", () => {
    let usuarioId: string;

    beforeEach(() => {
      cy.criarUsuario(criarDadosUsuario()).then((response) => {
        usuarioId = (response.body as CriarUsuarioResponse)._id;
      });
    });

    afterEach(() => {
      cy.deletarUsuario(usuarioId);
    });

    it("deve atualizar os dados do usuario com status 200", () => {
      cy.atualizarUsuario(usuarioId, criarDadosUsuario()).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(5000);
        expect(response.body.message).to.eq("Registro alterado com sucesso");
      });
    });
  });

  describe("DELETE /usuarios/:id", () => {
    let usuarioId: string;

    beforeEach(() => {
      cy.criarUsuario(criarDadosUsuario()).then((response) => {
        usuarioId = (response.body as CriarUsuarioResponse)._id;
      });
    });

    it("deve excluir o usuario com status 200", () => {
      cy.deletarUsuario(usuarioId).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(5000);
        expect(response.body.message).to.eq("Registro excluído com sucesso");
      });
    });
  });
});
