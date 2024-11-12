# Caju - Plataforma de Admissão

Esse projeto é um desafio técnico para a Caju. Todas as regras do desafio podem ser [consultadas aqui](https://github.com/caju-beneficios/caju-front-teste-1).

![image](https://github.com/user-attachments/assets/9e6ab862-44e1-4595-9068-33328cb0de6a)

## Como rodar o projeto

Clone o repositório e instale as dependencias

```bash
git clone https://github.com/arroiz/caju-front
cd caju-front && yarn install
```

Faça uma cópia do arquivo .env.example e renomeie para .env

```bash
cp .env.example .env
```

Por padrão a variavel `VITE_APP_SERVICE_BASE_URL` já vem configurada para a porta padrão do JSON Web Server.

Inicie o servidor do Json Web Server para consumir a API

```bash
yarn init:db
```

Execute a aplicação

```bash
yarn dev
```

Se tudo ocorreu bem os seguintes serviços estarão disponiveis em:

##### Aplicação: http://localhost:3001/
##### Json Web Server: http://localhost:3000/

## Executando testes
Para rodar os testes locais, rode o comando abaixo:

```bash
yarn test:dev
```

Para rodar os testes end-to-end, rode o comando abaixo:

```bash
yarn test:e2e
```
