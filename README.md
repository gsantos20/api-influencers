
# Dashboard Influencers



## 💻 Sobre o projeto

♻️ Ecoleta - é uma forma de conectar empresas e entidades de coleta de resíduos orgânicos e inorgânicos as pessoas que precisam descartar seus resíduos de maneira ecológica.



---

## 🚀 Como executar o projeto

Este projeto é divido em duas partes:
 1. [BackEnd](https://github.com/gsantos20/api-influencers.git)
 2. [FrontEnd](https://github.com/gsantos20/dashboard-influencers.git)

💡 Tanto o Frontend precisam que o Backend esteja sendo executado para funcionar.


### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)


### Configurações local

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env, o modelo esta no arquivo .env.example do

`MONGODB_URL` - Url de acesso do banco de dados mongo db.

#### Exemplo : mongodb+srv://cluster0.example.mongodb.net

`MONGODB_USERNAME` - Usuario para acesso a base de dados

#### Exemplo : user_example 

`MONGODB_PASSWORD` - Senha do usuario para acesso a base de dados

#### Exemplo : password_example

`SECRET_JWT` - Token gerado aleatoriamente para autenticação

#### Exemplo : puxTF6gyKQ00VQyWZCGjyWGosxCD4vSo



### Executando a aplicação

#### 🎲 Rodando o Backend ( API )

```bash

# Clone este repositório
$ git clone git@github.com:gsantos20/api-influencers.git

# Acesse a pasta do projeto no terminal/cmd
$ cd api-influencers

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor inciará na porta:3000 - acesse http://localhost:3000 
```

#### 🧭 Rodando a aplicação web (Frontend)

```bash

# Clone este repositório
$ git clone git@github.com:gsantos20/dashboard-influencers.git

# Acesse a pasta do projeto no seu terminal/cmd
$ cd dashboard-influencers

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# A aplicação será aberta na porta:4000 - acesse http://localhost:4000

```


#### 🔒  Iniciar Testes

```bash
# No Terminal use os seguintes comandos

npm run test
```

#### ⚙ Build do Projeto


```bash
# No Terminal use os seguintes comandos

npm build

node dist/server.js
```


## 📖 Documentação da API


 - #### Usuarios

```http
  GET /api/v1/users
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `Username` | `string` | Nome de usuario unico |
| `Email` | `string` | Email do usuario |
| `FirstName` | `string` | Nome do Usuario |
| `LastName` | `string` | Sobrenome do Usuario |

 Retorna um JSON de usuarios de acordo com os parametros.

### 

```http
  POST /api/v1/user
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `Username` | `string` | **Obrigatório**. Nome de usuario unico |
| `Password` | `string` | **Obrigatório**. Senha do usuario |
| `Email` | `string` | **Obrigatório**. Email do Usuario |
| `FirstName` | `string` | **Obrigatório**. Nome do Usuario |
| `LastName` | `string` | **Obrigatório**. Sobrenome do Usuario |

Retorna um JSON com o usuario cadastrado.

### 

```http
  POST /api/v1/login
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `Username` | `string` | **Obrigatório**. Nome de usuario unico |
| `Password` | `string` | **Obrigatório**. Senha do usuario |

Retorna um objeto com um token de login do usuario.

### 

```http
  DELETE /api/v1/user/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | Identificador do influenciador |      
| `Bearear Token`      | `Bearer` | Token de autenticação de login |

Deleta um usuario de acordo com o id.

### 

 - #### Influenciadores

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

### 

```http
  PATCH /api/v1/influencer/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | Identificador do influenciador |      
| `Bearear Token`      | `Bearer` | Token de autenticação de login |

Atualiza um influenciador de acordo com o id.

### 

```http
  DELETE /api/v1/influencer/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | Identificador do influenciador |      
| `Bearear Token`      | `Bearer` | Token de autenticação de login |

Deleta um influenciador de acordo com o id.



## 🏗 Arquitetura

 * #### Users

![Users](https://i.imgur.com/Iz2ro83.png)

 * #### Influencers

![Influencers](https://i.imgur.com/7hYVHJl.png)



## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

#### **Backend API**  ([Node.js](https://nodejs.org/en)  +  [TypeScript](https://www.typescriptlang.org/) + [Express](https://expressjs.com/pt-br/) + [MongoDB](https://www.mongodb.com/))

-   **[React Router Dom](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom)**
-   **[React Icons](https://react-icons.github.io/react-icons/)**
-   **[Axios](https://github.com/axios/axios)**
-   **[Leaflet](https://react-leaflet.js.org/en/)**
-   **[React Leaflet](https://react-leaflet.js.org/)**
-   **[React Dropzone](https://github.com/react-dropzone/react-dropzone)**

> Veja o arquivo  [package.json](https://github.com/gsantos20/api-dashboard/blob/main/package.json)

#### **Frontend Web**  ([Angular](https://nodejs.org/en)  +  [TypeScript](https://www.typescriptlang.org/))

-   **[React Router Dom](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom)**
-   **[React Icons](https://react-icons.github.io/react-icons/)**
-   **[Axios](https://github.com/axios/axios)**
-   **[Leaflet](https://react-leaflet.js.org/en/)**
-   **[React Leaflet](https://react-leaflet.js.org/)**
-   **[React Dropzone](https://github.com/react-dropzone/react-dropzone)**

> Veja o arquivo  [package.json](https://github.com/gsantos20/influencers-dashboard/blob/main/package.json)


- Node.js
- TypeScript
- Express
- MongoDB
- JWT

## 🧾 Conceitos utilizados

- SOLID
- Injeção de Dependência (Dependency Injection)
- Repository Pattern
- Service Pattern


