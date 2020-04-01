# ProjectName
## Descrição

Tecnologias utilizadas:
* [ Nestjs ](https://nestjs.com/)
* [ Nodejs ](https://nodejs.org/en/)
* [ Mongodb ](https://www.mongodb.com/)
* [ Mongoose ](https://mongoosejs.com/)
* [ Class-validator ](https://github.com/typestack/class-validator)

## Instalação

Execute os seguintes comandos, o primeiro instala o mongo (estou pressupondo que
você tenha uma máquina ubuntu ou debian) e o segundo as dependências do npm.

```bash
$ npm install
```

## Rodando a aplicação

Em desenvolvimento você quer rodar em watch mode para atualizar à medida que
você editar os arquivos.

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testando a aplicação

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

