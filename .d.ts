declare module "faker-br" {
  export const faker: {
    br: {
      cpf: () => string;
      cnpj: () => string;
      rg: () => string;
      cep: () => string;
      // Add other methods available in `faker-br` here as needed
    };
  };
}
