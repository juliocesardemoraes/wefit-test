import faker from "faker-br";

function getRandomInt(max, min = 1) {
  return Math.floor(Math.random() * max) + min;
}

const gerarStringRandomica = (length = 9) => {
  let strToGenerate = "";
  for (let i = 0; i < length; i++) {
    const numeroGerado = getRandomInt(9);
    strToGenerate += numeroGerado;
  }
  return strToGenerate;
};

export const generateMockData = async () => {
  const emailUnico = faker.internet.email();
  return {
    tipoPessoa: "f",
    tipoUsuario: faker.helpers.randomize(["c", "v"]),
    cpf: faker.br.cpf(),
    nome: faker.name.findName(),
    celular: gerarStringRandomica(10),
    telefone: gerarStringRandomica(10),
    email: emailUnico,
    checkEmail: emailUnico,
    cep: gerarStringRandomica(8),
    logradouro: faker.address.streetName(),
    numero: gerarStringRandomica(2),
    complemento: gerarStringRandomica(2),
    cidade: faker.address.city(),
    bairro: "centro",
    estado: "mg",
  };
};
