### Projeto não Finalizado
## Getting Started

## Executando o projeto local


>Necessário ter o Docker instalado.
Certifique-se que as envs de ambiente estejam definidas
Para usar a autenticação com o Github é necessário criar um OAuth app no github
[Exemplo](/GitHub-OAuth-APP.md)

O projeto pode ser executado rodando:
> docker-compose run -d

Ele fará o build do back-end e do front-end da aplicação em dois container, e deixará tudo configurado para sair usando.

Após os containers serem criados, basta acessar a url http://localhost:3000


# Front-Web

O Front-end da aplicação é uma página onde o usuário pode logar apenas através do GitHub para poder registrar momentos com imagens, videos e textos

#### Tecnologias
* TypeScript
* NextJS
* TailWindCSS
* JWT

# Server

Api com as rotas consumidas pelo Front-Web, responsável pela autenticação e persistencia dos dados.

#### Tecnologias
* TypeScript
* Node
* Fastify
* Prisma
* JWT
* zod
* Axios



## To-Do
<input type="checkbox"> Página para atualizar um registro
<br>
<input type="checkbox"> Página para visualizar um registro separadamente




