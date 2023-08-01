# Template Dashboard Reatjs / Laravel

*Inicialmente vocês precisaram de fazer um fork do projeto para seu repositório*

**Para iniciar a trabalhar no projeto:**
Não esqueçam de instalar o node.js na maquina de vocês, e também o yarn, será fundamental para a instalanção dos pacotes no projeto React(frontend)

- git clone **linkdorepositório**

## React.js 
Após o clone do projeto dentro do mesmo estarão duas pastas, a do frontend onde está a aplicação React.

Ao navegar ao conteudo da pasta o primeiro comando será usar o yarn install onde será instalada todas as dependencias do node e as bibliotecas que estão presentes no projeto

feito isso rodem o **yarn start** para que o servidor local seja aberto
geralmente é aberta a porta 127.0.0.1:3000 ou mais conhecida como http://localhost:3000

detalhe caso apareça algum erro é por que tem que rodar o artisan server do backend já que são aplicações vinculadar onde uma consome a api da outra rsrs

## Laravel

Após o clone do projeto dentro do mesmo estarão duas pastas, a do backend onde está a aplicação Laravel.

Ao navegar para a pasta backend:
- Executar **composer update** na pasta do projeto
- Criar schema no Banco de Dados
- Criar arquivo .env com base no .env.example
- Executar **php artisan key:generate**
- Executar **php artisan migrate**

Depois, no terminal na pasta do seu projeto dê o comando: 

- git remote add **seunome** **linkdofork**

Quando solicitado "Dar pull":

- git pull **seunome** **nomebranch**

Ao concluir uma tarefa:

- git add .
- git commit -m **nomedocommit**
- git push **seunome** **nomebranch**
