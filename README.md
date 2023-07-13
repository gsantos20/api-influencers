
# Influencers API

Uma breve descrição sobre o que esse projeto faz e para quem ele é


## Configurações local

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env, o modelo esta no arquivo .env.example do

`MONGODB_URL` - Url de acesso do banco de dados mongo db.

### Exemplo : mongodb+srv://cluster0.example.mongodb.net

`MONGODB_USERNAME` - Usuario para acesso a base de dados

### Exemplo : user_example 

`MONGODB_PASSWORD` - Senha do usuario para acesso a base de dados

### Exemplo : password_example

`SECRET_JWT` - Token gerado aleatoriamente para autenticação

### Exemplo : puxTF6gyKQ00VQyWZCGjyWGosxCD4vSo

### Iniciar o projeto localmente

Clone o projeto

```bash
  git clone https://github.com/gsantos20/api-dashboard.git
```

Entre no diretório do projeto

```bash
  cd api-dashboard
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```

### Iniciar Testes

No Terminal use os seguintes comandos

```bash
npm run test
```

### Build do Projeto

No Terminal use os seguintes comandos

```bash
npm build

node dist/server.js
```


## Documentação da API


### Usuarios

```http
  POST /api/v1/user
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `username` | `string` | **Obrigatório**. Nome de usuario unico |
| `password` | `string` | **Obrigatório**. Senha do usuario |
| `email` | `string` | **Obrigatório**. Email do Usuario |
| `firstName` | `string` | **Obrigatório**. Nome do Usuario |
| `lastName` | `string` | **Obrigatório**. Sobrenome do Usuario |

Retorna um JSON com o usuario cadastrado

```http
  DELETE /api/v1/user/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | Identificador do influenciador |      
| `Bearear Token`      | `Bearer` | Token de autenticação de login |

Deleta um influenciador de acordo com o id.


### Influenciadores

```http
  GET /api/v1/influencers
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `firstName`      | `string` | Nome do influenciador |
| `lastName`      | `string` | Sobrenome do influenciador |
| `email`      | `string` | email do influenciador |
| `Bearear Token`      | `Bearer` | Token de autenticação de login |

Retorna um JSON de influenciadores de acordo com os parametros.


```http
  PATCH /api/v1/influencers/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | Identificador do influenciador |      
| `Bearear Token`      | `Bearer` | Token de autenticação de login |

Atualiza um influenciador de acordo com o id.

```http
  DELETE /api/v1/influencers/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | Identificador do influenciador |      
| `Bearear Token`      | `Bearer` | Token de autenticação de login |

Deleta um influenciador de acordo com o id.


## Arquitetura

![Arquitetura](https://i.imgur.com/nyutXgY.png)
####
### Tecnologias utilizadas

- Node.js
- TypeScript
- Express
- MongoDB
- JWT

### Conceitos utilizados

- SOLID
- Injeção de Dependência (Dependency Injection)
- Repository Pattern
- Service Pattern


