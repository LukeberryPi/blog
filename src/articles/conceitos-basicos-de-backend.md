---
title: "Conceitos para começar no backend web"
date: "23-08-2024"
category: Backend
active: true
---

Quando comecei a estudar desenvolvimento web, inicializei pelo front-end, o que facilitou em diversos aspectos, desde o feedback mais fácil quanto na maior adesão de alguns sentidos da programação. Entretanto, ocasionalmente chegou o momento em que quis me tornar `fullstack`, onde tive que aprender alguns conceitos que depois me fez entender como um backend age e como sua comunicação com o front funciona.

Basicamente, a diferença entre um front-end e um backend é que o front-end é a parte do site ou aplicativo que o usuário vê e interage, enquanto o backend é a parte que o usuário não vê, mas que é essencial para o funcionamento do site ou aplicativo. 

Então, para você que quer começar no backend web ou quer se tornar fullstack, aqui estão alguns conceitos que julgo básicos e essenciais pra você compreender e aplicar no dia a dia.

## API
uma API, ou application programming interface, é um conjunto de regras e definições que permite que aplicações se comuniquem entre si. No contexto de uma API web, ela é um conjunto de rotas e métodos que permitem que o front-end se comunique com o backend. 

Um clássico exemplo é onde temos um restaurante e um cliente, onde o cliente faz um pedido e o restaurante o processa. Neste caso, o cliente é o front-end, o restaurante é o backend e o garçom é a API, que faz a comunicação entre os dois.
## Requisição e Resposta

Quando o backend é desenvolvido para web, ele funciona essencialmente em um fluxo de requisição e resposta(request/response, req/res), onde o site ou aplitivo envia um requisição para o servidor, enviando dados e informações feitas em diferentes formatos, como JSON, XML, HTML, arquivos e outros. O servidor, por sua vez, recebe essa requisição e o processa, fazendo as ações necessárias. Dado o sucesso(ou falha), ele retorna uma resposta, que contém um status, um corpo e alguns outros metadados que podem ser úteis.

A questão é que, na maioria das vezes, tudo vai se resumir a esse fluxo onde tem uma ida e uma volta, uma comunicação bilateral onde dados são enviados e recebidos dos dois lados. Afinal, de um certo ponto de vista, um backend é uma forma de processar e persistir dados e estados, e o front-end é uma forma de exibir e interagir com estes. Veja o exemplo a seguir:

![Um fluxograma denotando como um backend funciona em suma.](/public/articles-assets/backend-diagram.png)

Um exemplo simples é um onde o cliente consiste num formulário de login, onde o usuário insere seu email e senha e clica em um botão de login. O front-end então envia uma requisição para o backend, que verifica se o email e senha estão corretos. Se estiverem, ele retorna um token de autenticação, que o front-end pode usar para acessar recursos protegidos. Se não, ele retorna um erro, que o front-end pode usar para exibir uma mensagem de erro ou algo como "Tente novamente".

## Banco de dados

Não vai demorar muito pra você ter que lidar com um banco de dados, que, em resumo, é a forma de persistir dados de forma organizada, confiável e segura. Existem diversos tipos de banco de dados, como SQL, NoSQL e outros, cada um com suas vantagens e desvantagens. Em outra visão, podemos dizer que o backend é o intermédio entre o frontend e o banco de dados, e sua função é simplesmente garantir segurabilidade e confiabilidade dos dados antes de inseri-los ou retorná-los no banco.

E quando ter que lidar com um banco de dados, você vai ter que aprender a fazer operações CRUD(create, read, update, delete), que são as operações básicas de um banco de dados. Em resumo, elas são:
- Create: criar um novo registro
- Read: ler um registro
- Update: atualizar um registro
- Delete: deletar um registro

E agora exemplificando:
- Create: criar um novo usuário
- Read: Resgatar informações de um usuário(foto, nome, email, etc)
- Update: Atualizar a foto de um usuário ou seu número de telefone
- Delete: Deletar a conta de um usuário

## Segurança

Inicialmente, segurança pode parecer algo distante, mas pensar o quanto antes se torna um diferencial. Afinal, segurança é um dos aspectos mais importantes de um backend, e é essencial que você saiba como proteger seu backend de ataques maliciosos. Alguns conceitos básicos de segurança incluem:
- Criptografia: proteger dados sensíveis com criptografia
- Autenticação: garantir que apenas usuários autorizados possam acessar recursos protegidos
- Autorização: garantir que usuários autorizados possam acessar recursos protegidos
- Validação: garantir que os dados inseridos sejam válidos e seguros

E todos são aplicáveis em diferentes contextos, utilizando recursos da linguagem e do ecossistema que você está utilizando. As abordagens são diversas, mas os objetivos e os resultados são os mesmos: garantir que seu backend seja seguro e confiável.

## Arquitetura

Por fim, ocasionalmente se tornará essencial estar apto a arquitetar o código de forma organizada, escalável e de fácil manutenção. E para isso, você vai ter que aprender sobre arquitetura de software, que é o processo de projetar e organizar um sistema de software de forma. Alguns exemplos de arquitetura, são:
- MVC: Model-View-Controller
- MVVM: Model-View-ViewModel
- Hexagonal
- Modular
- Microservices
- Entre outros

Todos tem seu valor e nenhum é uma bala de prata; E justamente essa diversidade que faz com que você tenha que aprender a escolher e construir a arquitetura mais apropriada para dado contexto.

## Conclusão

Estes são alguns conceitos que, quando entendi de fato, me impulsionaram no desenvolvimento de backends. Espero que, ao ler este artigo, você tenha uma ideia melhor de como um backend funciona e como você pode começar a desenvolver backends web.