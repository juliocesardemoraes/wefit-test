## Teste - Wefit

### Para iniciar o banco de dados é necessario ter o docker-compose instalado em sua máquina e rodar o seguinte comando:

    docker-compose up -D

o docker-compose vai criar um container de um MySQL e você poderá acessar via localhost:3306 e a senha do usuário **root** é **senha_root_123**

### Para iniciar o servidor express basta executar o seguinte comando:

```
npm install
npm run dev
```

### Para rodar testes unitários e de integração

```
npm run test
```

### Como testar?

1 - Faça uma request neste endpoint

```
curl --location 'http://localhost:4568/user/create' \
--header 'Content-Type: application/json' \
--data-raw '{
  "tipoPessoa": "f",
  "tipoUsuario": "c",
  "cpf": "61636120601",
  "nome": "Irlene Costa",
  "celular": "4131109855",
  "telefone": "5844664271",
  "email": "Edimilson32@gmail.com",
  "checkEmail": "Edimilson32@gmail.com",
  "cep": "27268795",
  "logradouro": "Braga Rua",
  "numero": "93",
  "complemento": "65",
  "cidade": "Nova Mires do Descoberto",
  "bairro": "centro",
  "estado": "mg"
}'
```

2 - Alternativa:

Importar a collection da seguinte pasta

./README/postman/wefit.postman_collection.json

### Checklist

Criação de um backend com nodejs - OK

- [x] Integração com o banco de dados
- [x] Usar typeorm para banco de dados
- [x] Criação das envs
- [x] Ajustes no tsconfig
- [x] Adição de testes unitários para validação de campos
- [x] Adição do módulo de usuário
- [x] Adição de controllers, service, entity
- [x] Adição de validadores de campos
- [x] Utilização do zod.
- [x] Criação de CI/CD local usando husky.

### Campos e validação

Checagem se é valido: checagem de tipo e conteúdo.
Valores sem máscara. - OK

- [x] tipoPessoa. Checar se é valido e required F ou J(física ou juridica)
- [x] tipoUsuario. Checar se é valido e required V ou C(vendedor ou comprador)
- [x] cnpj. Checar se é valido caso possua no body.
- [x] cpf. Checar se é valido e required
- [x] nome. Checar se é valido e required
- [x] celular. Checar se é valido.
- [x] telefone. Checar se é valido.
- [x] email. Checar se é valido e required
- [x] checkEmail. Checar se é valido e igual ao email
- [x] cep. Checar se é valido e required
- [x] logradouro. Checar se é valido required
- [x] número. Checar se é valido required
- [x] complemento. Checar se é valido
- [x] cidade. Checar se é valido
- [x] bairro. Checar se é valido
- [x] estado. Checar se é valido
- [x] Inserção no banco de dados

### Extra

- [x] Erros customizados em português. Tive que montar um porque a biblioteca que tinha na net não rodou.
- [x] Testes de integração supertest.
- [x] Testes em massa com supertest.
