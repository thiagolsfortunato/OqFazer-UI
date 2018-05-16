## OqFazer UI ##

[ ![Codeship Status for thiagolsfortunato/OqFazer-UI](https://app.codeship.com/projects/1abfe470-3b31-0136-36f6-4aa2219ea767/status?branch=master)](https://app.codeship.com/projects/290283)

## Tecnologias: ##

- Nodejs: 8.4v
- Angularjs: 2v
- Bower
- CSS 3
- HTML 5
- JavaScript

## Contribuidores

- Thiago Fortunato - thiagolsfortunato@hotmail.com


## Visão Geral

Projeto pessoal que tem a finalidade de prover um local para que Região do Vale do Paraíba possa consultar todos eventos que estão acontecendo na região.
O público alvo deste projeto são as lojas, agencias de evento ou quaisquer usuários que desejam compartilhar um evento.

O framework [AngularJS](https://angular.io/) foi utilizado para desenvolvimento da aplicação web,
que se interage com o backend [OqFazer](https://github.com/thiagolsfortunato/OqFazer).

### Principais funcionalidades

 - Cadastro de usuários, categorias, eventos, cidades, regiões;
 - Login/logout de usuário;
 - Consulta de eventos por filtros: cidade, região, categoria, usuários(owners);
 - Listagem de todos eventos;


## Instalação

Esta seção destina-se a apresentar as características do ambiente onde o sistema deve ser instalado.

## Desenvolvimento

### Configurando ambiente

- Instale o Node JS e NPM pelos comandos:
```
sudo apt-get update
sudo apt-get install nodejs

sudo apt-get install npm
```
Ou siga o [Tutorial do Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-an-ubuntu-14-04-server)


- Instale as dependências:

```
npm install -g bower

npm install
bower install
```

- Configurando o Nginx:

Editar o arquivo default do Nginx:

```
sudo nano /etc/nginx/sites-enabled/default
```

Adicionar o trecho de código abaixo no arquivo:

```shell
server {
      listen 8002 default_server;
      server_name localhost;

      location / {
            root [Diretório do projeto]/oqfazer-ui/app;
            index index.html;
      }

      location /api {
            proxy_pass http://localhost:8080;
            proxy_set_header Host      $host;
            proxy_set_header X-Real-IP $remote_addr;
      }
}
```

Pronto, o ambiente já está configurado e apto a execução da aplicação.

### Formas de executar a aplicação

Antes de executar a aplicação é necessário clonar o repositório do [OqFazer](https://github.com/thiagolsfortunato/OqFazer) backend

```
git clone https://github.com/thiagolsfortunato/OqFazer.git
```

Seguir seus passos no  README.md do projeto para executá-lo
Existem três opções para executar a aplicação:


#### Node
Para executar o projeto no node execute o comando: (ambiente de desenvolvimento):
```shell
nvm use [versao instalada];
node index.js;
```
Ao rodar este comando no shell, o OqFazer abrirá no seu browser
em:

`http://localhost:8081`

#### Nginx
Para executar o projeto no nginx realizar as configurações de ambiente e abrir o browser em: (ambiente de desenvolvimento e produção):

`http://localhost:8002`

### Todo
- Testes
- Variáveis de ambiente
- Cache
