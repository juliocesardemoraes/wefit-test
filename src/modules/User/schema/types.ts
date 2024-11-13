export interface IUser {
  id: string;
  cnpj: string;
  cpf: string;
  nome: string;
  celular?: string | null;
  telefone?: string | null;
  email: string;
  checkEmail: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string | null;
  cidade: string;
  bairro: string;
  estado: string;
  tipo_pessoa: string;
  tipo_usuario: string;
}
