export interface DadosUsuario {
  nome: string;
  email: string;
  password: string;
  administrador: string;
}

export interface Usuario extends DadosUsuario {
  _id: string;
}

export interface ListaUsuariosResponse {
  quantidade: number;
  usuarios: Usuario[];
}

export interface CriarUsuarioResponse {
  message: string;
  _id: string;
}

export interface MensagemResponse {
  message: string;
}

export interface ErroResponse {
  message: string;
}
