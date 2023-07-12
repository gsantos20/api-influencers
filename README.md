# Dashboard API

API feita para um projeto em angular com CRUD de Influenciadores

## Tecnologias utilizadas

- Node.js
- TypeScript
- Express
- MongoDB

## Conceitos utilizados

- SOLID
- Injeção de Dependência (Dependency Injection)
- Repository Pattern
- Service Pattern

## Entidades

<pre>
User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}</pre>

<pre>
Influencer {
  id: string
  firstName: string
  lastName: string
  email: string
}</pre>

### Rotas

   ## - Users
  
  - POST /user - cria um usuário
  - DELETE /user/:id - deleta um usuário
  - POST /login - gera um token de autenticação do login
  
   ## - Influenciador
    
  - GET /influencer - retorna os influenciadores salvos no banco
  - PUT /influencer/:id - atualiza um influenciador
  - DELETE /influencer/:id - deleta um influenciador

## Arquitetura

// ![Arquitetura](https://imgur.com/k5mXFoZ.png)
