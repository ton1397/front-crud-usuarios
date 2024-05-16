# README

## Descrição

Este projeto é uma aplicação front-end construída com Vue.js e o framework Quasar, que oferece um conjunto completo de componentes e ferramentas para a criação de interfaces de usuário ricas e responsivas. A aplicação está configurada para ser executada em um ambiente Docker para facilitar a configuração e a execução.

## Requisitos

- Node.js (versão 14 ou superior)
- Docker (versão 20.10 ou superior)
- Docker Compose (versão 1.27 ou superior)

## Instruções de Instalação

1. **Clone o repositório:**

   ```sh
   git clone https://github.com/ton1397/front-crud-usuarios.git
   cd seu-repositorio
   ```

2. **Instale as dependências:**

   ```sh
   npm install
   ```

3. **Certifique-se de ter o Docker instalado e em execução. Se não tiver, instale-o a partir do [site oficial do Docker](https://www.docker.com/get-started).**

4. **Suba os containers Docker:**

   ```sh
   docker-compose up --build
   ```

   Este comando irá construir e iniciar os containers Docker definidos no arquivo `docker-compose.yml`.

## Acessando a Aplicação

Após a finalização do comando Docker, você poderá acessar a aplicação no seguinte endereço:

- [http://localhost:8080](http://localhost:8080)

## Tecnologias Utilizadas

- **Vue.js**: Framework JavaScript para construção de interfaces de usuário.
- **Quasar**: Framework para desenvolvimento de aplicações Vue.js responsivas e de alta performance.
- **Docker**: Plataforma de containers para simplificar a configuração do ambiente de desenvolvimento.

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo LICENSE para mais informações.

---

Feito com ❤️ por [Seu Nome](https://github.com/seu-usuario)
