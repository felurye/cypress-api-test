import { faker } from "@faker-js/faker/locale/pt_BR";
import type { DadosUsuario } from "../types";

export const criarDadosUsuario = (
  overrides: Partial<DadosUsuario> = {}
): DadosUsuario => {
  const username = faker.internet
    .username()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  return {
    nome: faker.person.fullName(),
    email: `${username}_${Date.now()}@example.com`,
    password: faker.internet.password({ length: 8 }),
    administrador: "false",
    ...overrides,
  };
};
