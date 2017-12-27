## OqFazer UI ##

## Tecnologias: ##

- Nodejs: 8.4v
- Angularjs: 2v
- Bower
- Gulp
- CSS 3
- SASS
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
```shell
sudo apt-get update
sudo apt-get install nodejs

sudo apt-get install npm
```
Ou siga o [Tutorial do Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-an-ubuntu-14-04-server)

- Instale SASS e COMPASS pelos comandos:
```shell
sudo apt-get update
sudo apt-get install ruby-sass
sudo apt-get install ruby-listen
sudo apt-get install ruby-compass
```

- Instale as dependências:
```shell
npm install -g bower

npm install
bower install
```

- Configurando o Nginx:

Editar o arquivo default do Nginx:
```shell
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
```shell
git clone https://github.com/thiagolsfortunato/OqFazer.git
```
Seguir seus passos no  README.md do projeto para executá-lo
Existem três opções para executar a aplicação:

#### Gulp
Para utilizar o gulp execute o comando (ambiente de desenvolvimento):
Dessa forma as modificações feitas no projeto serão atualizadas automaticamente no browser quando algum arquivo for alterado.
```shell
npm run index
```
Ao rodar este comando no shell, automaticamente abrirá o Monit no seu browser
em

`http://localhost:3000`

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

`http://localhost:8002/`

### Observações
O OqFazer utiliza Browser Sync (Gulp) que escuta as alterações de seus arquivos, modificando
automaticamente em seu Browser.

No seu terminal há verificação de Padrões SASS, CSS e JS, caso ocorra alguma irregularidade
em seu código, no seu terminal já estará apontando o erro. FIQUE ATENTO.

Para modificar layout do projeto, utilize somente os arquivos em `app/src/sass/*.scss`


### Deploy
Ao finalizar sua tarefa, execute:
```shell
npm run gulp
```
Este comando é responsável por concatenar e minificar seus arquivos CSS E JS!

Logo após, teste seus projeto com os arquivos minificados:
```shell
node index.js
```

E abra o browser em `http://localhost:8081`

### Todo
- Testes
- Variáveis de ambiente
- Cache