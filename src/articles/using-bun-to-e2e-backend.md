---
title: "Usando BunJS para um backend E2E"
date: "26-07-2024"
category: backend
active: false
---

Okay, o hype do Bun passou. Você, através daquelas centenas de Tuítes e aquelas dezenas de vídeos, já entendeu que ele é 10x mais rápido que o node. Mas, ainda assim, não parou para experimentar o runtime e suas APIs. 

Em quesitos de entrega, compatibilidade e outros coeficientes que realmente importam e contam, ele de fato não traz nenhum diferencial drástico, mas, o que me atraiu a utilizá-lo foi simplesmente o fato dele não estar amadurecido tanto quanto o Node; A prióri, isso pode cheirar mal (o que de fato é, pensando em colocar código em produção), mas para estudos de caso, aprendizado, testes e implementações, ele é como uma mina a ser explorada.

Enquanto estava descobrindo e me aventurando pelas [docs do Bun](https://bun.sh/docs), tive espontaneamente a ideia de, ao invés de simplesmente fazer um `bun add express/fastify/elysia` e fazer o mesmo código pela centésima vez, por que não trabalhar nas minhas próprias abstrações?

Antes de começar a entrar no assunto de fato, gostaria de fazer a sugestão ao leitor: tente, por insistência própria, fazer as mesmas coisas ditas durante o artigo. Te garanto que vai ser uma boa experiência e que você vai aprender bastante!

1. [Fazendo o Hello World](#fazendo-o-hello-world)
2. [Olhando através das bibliotecas](#olhando-através-das-bibliotecas)
3. [Cozinhando os dados](#cozinhando-os-dados)
4. [Roteamento, entrega de arquivos](#roteamento-entrega-de-arquivos)
5. [Catching de error](#catching-de-error)
6. [Aprimorando as features](#aprimorando-as-features)
7. [É realmente necessário?](#é-realmente-necessário)
8. [Mais sobre o Bun](#mais-sobre-o-bun)
9. [Conclusão](#conclusão)

## Fazendo o Hello World

Para inicializar um servidor e, nele, receber requisições HTTPs e respondê-las, basta algumas linhas de código:
```ts
const server = Bun.serve({
    // configurações aqui...
    port: 3000,
    async fetch(req)  {
        return new Response("Hello World!")
    }
}) 
```
Simples, não? Note que, nosso Hello World será correspondente a qualquer rota, a qualquer método e a qualquer circustância que seja... Para mudar isso, temos que ter em mente que essa função `fetch` é uma configuração que nosso servidor vai receber, e podemos simplesmente vê-la como a porta de entrada, e é justamente aqui onde trabalharemos nossa abstração!

Vamos começar?
```ts
// http.ts
export const ServerConfig = {
    async fetch(request) {
        let response: Response = new Response("Hello World!");
        return response
    }
} as Serve
```
```ts
import { ServerConfig } from "./http";
const server = Bun.serve(ServerConfig)
console.log(`Servidor rodando na porta ${server.port}!`)
```

Não mudamos nada efetivamente, mas agora temos uma separação onde, num arquivo criamos o nosso servidor e em outros o configuramos, abrindo espaço para trabalharmos melhor em nossas abstrações.
## Olhando através das bibliotecas

> PS: muitas das coisas ditas aqui serão suposições, uma vez que eu não entrei nas codebases das libs e analisei de fato; Não passam de tentativas de replicações.

Com certeza, a biblioteca mais utilizado no ecositema javascript quando falamos de backend é o express. E foi justamente este que baseei.

Olhando mais a fundo para a nossa função fetch, observamos que ele recebe o argumento `request`. Institivamente, pensei que ele seria um objeto com body, params, query e vários outras propriedades úteis engatilhadas e prontos para o uso... Não. Ele tem outras propriedades, porém todas estavam em formatos de promises, e se eu quisesse trabalhar com uma interface e uma DX semelhante a express, eu não precisaria ficar digitando await para resgatar o corpo da requisição, ou da formData, por exemplo.

## Cozinhando os dados

Toda vez que estamos iniciando um backend utilizando o express, nos deparamos com o código:

```ts
import express from 'express'

const app = express();
app.use(express.json())
app.get('/', (req, res) => {
    res.json({ message: "Hello World!" })
})
```

Eis nossa interface de desenvolvimento: a Application. Novamente, nós também queremos uma interface de base síncrona, com um req object mastigado e com um objeto de response onde será enviado as nossas respostas. Mas antes, antes de tudo, temos que realmente pensar como será nosso objeto de Request e de Resposta. 
```ts
export type ServerRequest<T> = {
    body: T,
    params: { [key: string]: string },
    query: { [key: string]: string },
    headers: Headers,
    method: | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD',
    url: string,
    pathname: string,
    cookies: string | null,
}

export type ServerResponse = {
    json: (body?: any) => Response;
    status: (code: number, json?: any) => Response;
    file: (file: BunFile) => Response
}
```
Não é completo, mas serve para quase tudo que estaremos construindo. E, claro, como é um código criado por nossas mãos, temos total liberdade de fazer manunteção, implementar novas features, etc.

Agora, temos que pensar em como ter uma interface que utiliza destes tipos. Para isso, bastamos pegar o nosso objeto de request vindo da função `fetch` do próprio Bun e passarmos por uma função que vai traduzir isso, ou seja: 
#### (Request) -> ServerRequest
```ts
const METHODS_WITHOUT_BODY = ['DELETE', 'GET']

export async function getRequest(request: Request): ServerRequest {
    let body = {};
    const { pathname } = new URL(request.url)
    const cookies = request.headers.get('cookie')
    try {
        if (!METHODS_WITHOUT_BODY.includes(request.method)) {
            body = await request.json()
        }
    } catch (error) {}
    const req = { 
        body, 
        cookies, 
        headers: request.headers, 
        method: request.method as Methods, 
        pathname, 
        url: request.url, 
        params: {}, 
        query: {} 
    }
    return req
}
```
Dessa forma, temos o objeto do jeito que queríamos. Note que `params` e `query` estão sem implementação, mas, novamente, podemos implementá-los a hora que quisermos.

Voltando ao nosso `ServerConfig`:
```ts
import { getRequest } from './getRequest'
export const ServerConfig = {
    async fetch(request, server) {
        let response: Response = new Response();
        // traduzindo nossa request
        const req = await getRequest(request)
        // montando nosso objeto de response
        const res = { 
            json: (data) => {
                response = new Response(JSON.stringify(data), { 
                headers: { 
                        'Content-Type': 'application/json' 
                    }, 
                status: 200 })
                return response
            },
            status: (status, json?: any) => {
                response = new Response(JSON.stringify(json), { status })
                return response
            },
            file: (file) => {
                response = new Response(file)
                response.headers.set('Content-Type', file.type)
                return response
            }
         } satisfies ServerResponse
    }
} as Serve
```
Avançamos muito! Temos nosso servidor configurado, com os objetos de request e response pronto para serem feitos, e agora só precisamos criar nossa aplicação, não é?! Não. Ainda há um importantíssimo passo: o roteamento.

## Roteamento, entrega de arquivos
Quando falamos de configuração de rotas, já lembramos de `express.router()`. E é justamente nele que vamos nos inspirar, mas antes, vamos ilustrar um pouco do fluxo de nossa aplicação.

![Um fluxograma denotando como a aplicação construída funciona.](/public/articles-assets/bun-e2e-diagram.png)

Agora, preocupando-se com o roteamento, temos que criar uma função que vai servir como uma _fábrica_ de roteadores, que poderão ser utilizados recursivamente e, por fim, serem montados no nosso servidor a partir de nossa application. Vamos ao código: 
```ts
export type Route = {
    callback: (req: Request, res: ServerResponse) => Promise<any> | any,
    method: Methods
    pathname: string
}

export function router() {
    let routes = [] as Route[]
    return {
        get(pathname: string, callback: (req: Request, res: ServerResponse) => Promise<any> | any) {
            routes.push({
                method: 'GET',
                callback,
                pathname: pathname
            })
        },
        post(pathname: string, callback: (req: Request, res: ServerResponse) => Promise<any> | any) {
            routes.push({
                method: 'POST',
                callback,
                pathname: pathname
            })
        },
        put(pathname: string, callback: (req: Request, res: ServerResponse) => Promise<any> | any) {
            routes.push({
                method: 'PUT',
                callback,
                pathname: pathname
            })
        },
        del(pathname: string, callback: (req: Request, res: ServerResponse) => Promise<any> | any) {
            routes.push({
                method: 'DELETE',
                callback,
                pathname: pathname
            })
        },
        use(handle: RouterInterface | Route, pathname?: string) {
            // checando se é uma rota só ou um roteador(meio go horse)
            if ((handle as Route).callback) {
                return routes.push(handle as Route);
            } 
            return ((routerInterface: RouterInterface) => {
                let routes = routerInterface.routes
                if (pathname) routes.map((route) => route.pathname = `${pathname}${route.pathname}`)
                routes.push(...routes)
            })(handle as RouterInterface)
        },
        getRoutes() {
            return routes
        }
    }
}
```
Dessa forma, podemos simplesmente criar um roteador e utilizá-lo em nossa aplicação. Vamos ver como ficaria:
```ts
import { router } from './router'
const userRouter = router()
const users = [
    { name: "John Doe", age: 20 },
    { name: "Jane Doe", age: 21 }
]
userRouter.get('/', async (req, res) => {
    return res.json(users)
})
userRouter.post('/', async (req, res) => {
    users.push(req.body)
    return res.json({ message: "Usuário adicionado com sucesso!" })
})
```
Bem semelhante ao express não? Agora que temos uma interface para roteamento, precisamos aplicar nossa application. Ela vai fazer nada mais nada menos que receber a request e a response previamente configuradas, receber um mainRouter, achar a rota correspondente e executar a função callback. Vamos ver como ficaria:
```ts
export async function Application(req: Request, res: ServerResponse, mainRouter: RouterInterface) {
    const routes = mainRouter.getRoutes()
    const route = routes.find(route => route.pathname === req.pathname && route.method === req.method)
    if (!route) {
            const file = Bun.file(`${process.cwd()}/public/${request.pathname}`)
            const exists = await file.exists()
            if (exists) {
                return response.file(file)
            }
            throw new AppError(`Route ${request.pathname} not found`, 404)
    }
    return route.callback(req, res)
}
```
Simples, não? Agora, só precisamos aplicar isso em nosso `ServerConfig` e, por fim, temos um servidor completo, com roteamento e abstrações feitas por nós mesmos.
```ts
import { Application } from './application'
const mainRouter = router()
mainRouter.get('/', async (req, res) => {
    return res.json({ message: "Hello World!" })
})
mainRouter.use(userRouter, '/users')
export const ServerConfig = {
    async fetch(request, server) {
        let response: Response = new Response();
        // traduzindo nossa request
        const req = await getRequest(request)
        // montando nosso objeto de response
        const res = { 
            json: (data) => {
                response = new Response(JSON.stringify(data), { 
                headers: { 
                        'Content-Type': 'application/json' 
                    }, 
                status: 200 })
                return response
            },
            status: (status, json?: any) => {
                response = new Response(JSON.stringify(json), { status })
                return response
            },
            file: (file) => {
                response = new Response(file)
                response.headers.set('Content-Type', file.type)
                return response
            }
         } satisfies ServerResponse
        // aplicando nossa aplicação
        return Application(req, res, mainRouter)
    }
} as Serve
```
Com isso fechamos o ciclo de nossas rotas, reproduzindo as funcionalidades do express, mas com nossas próprias abstrações e sem depender de nenhuma lib externa. Ótimo, não?

## Catching de error
Aumentar a robustez implementando um ambiente prepara para exceptions, erros e é uma prática quase que essencial. Não é uma tarefa difícil, mas dependendo do tamanho do projeto, das tecnologias utilizadas, pode ser trabalhoso. No express, por exemplo, há plugins que fazem isso, como o express async errors. Mas será que deveríamos adicionar dependência(s) ao projeto para fazer isso? 

Bem, como estamos construíndo o nosso próprio fluxo com nossas próprias abstrações, essa tarefa vai ser relativamente fácil. Uma das práticas que sigo é criar um custom error `AppError` e simplesmente fazer um try catch. Vamos ver como ficaria:
```ts
export class AppError {
    public readonly message: string

    public readonly statusCode: number

    constructor(message: string, statusCode = 400) {
        this.message = message
        this.statusCode = statusCode
    }
}
```
Para quem nunca criou um custom error, é só isso mesmo. Agora, Mudando nossa application para capturar os erros, sejam os lançados por nós de forma "voluntário" (_exceptions_) ou erros inesperados, de runtime.
```ts
export async function Application(req: Request, res: ServerResponse, mainRouter: RouterInterface) {
    const routes = mainRouter.getRoutes()
    const route = routes.find(route => route.pathname === req.pathname && route.method === req.method)
    if (!route) {
            const file = Bun.file(`${process.cwd()}/public/${request.pathname}`)
            const exists = await file.exists()
            if (exists) {
                return response.file(file)
            }
            throw new AppError(`Route ${request.pathname} not found`, 404)
    }
    try {
        return route.callback(req, res)
    } catch (error) {
        if (error instanceof AppError) {
            return response.status(error.statusCode || 400, {
            status: "error",
            message: error.message,
          })
        }
        return response.status(500, {
            status: "error",
            message: `Internal server error - ${error.message}`,
            stack: error.stack
        })
    }
}
```
Simplesmente adicionamos o try catch e checamos se ele, sendo uma classe, é uma instância de nosso erro customizado. Por sinal, em projetos maiores, você pode adicionar vários tipos de erros e, dessa forma, fazer retornos cada vez mais dinâmicos conforme necessário.

## Aprimorando as features

E se quisermos adicionar cache? E se quisermos adicionar middlewares de autenticação? E se quisermos adicionar uma interface de websockets? E se quisermos adicionar um sistema de logs? E se quisermos adicionar um sistema de rate limit?

Eu lhe digo, pequeno gafanhoto, que tudo isso é possível simplesmente com os recursos que a linguagem proporciona. Basta você ter a criatividade e a vontade de fazer! E bem, não pense que é não é experiente o suficiente, pois se todos pensassem assim, não teríamos as libs que tanto utilizamos hoje em dia.

Para implementar cache, você pode simplesmente criar um Map que vai armazena as chaves/valor, utilizando setTimeout para expirar as chaves. 

Para autenticação, você pode criar funções que geram "tokens" (você pode até ir um pouco longe implementando uma criptografia mais segura, mas eu estou satisfeito usando btoa, crypto e RNG) e armazenam em arquivos

Para implementar websockets sem uma biblioteca, você pode usar a nativa do Bun(ou node), e criar abstrações que farão uma interface mais ergonômica. (_te desafio a conseguir implementar a mesma funcionalidade de [rooms](https://socket.io/docs/v3/rooms/) do Socket.io_)

Para logs, você pode simplesmente fazer uma organização de funções que vão escrever em arquivos, você pode fazer prints com cores diferentes, você pode fazer logs de erros, de informações, de avisos, etc.

Para rate limit, bom, eu nunca pensei sobre. Mas garanto que ainda pensarei e implementarei!

Agora, a pergunta que pode vir à cabeça, é realmente necessário?

## É realmente necessário?

A resposta é: quase sempre, não. Mas, ainda assim, é uma boa ideia quando você está trabalhando num projeto pessoal e quer aprender. Quando fiz isso pela primeira vez, aprendi simplesmente muita coisa sobre os recursos que a linguagem me proporciona, aprimorei arduamente meus conhecimentos sobre tipos, uma vez que eu estava tipando uma lib e não poderia deixar a experiência de desenvolvimento ruim(_é, ainda tem uns anys por aí, mas te juro que tentei_). 

A realidade é dura e você dificilmente vai passar por situações assim no ambiente de trabalho, onde prazos são curtos e entregas são grandes. Por outro lado, é corriqueiro que lidemos com libs pouco atualizadas (ou muito atualizadas, o que também acaba sendo um problema), pacotes que entram em conflito (_react native..._), bibliotecas que não cumprem tudo, e com certeza aconteceu ou acontecerá de você sentir que faria uma lib melhor que aquela que você está utilizando. Talvez ocasionalmente você dará um fork e adicionará sua própria edição. 

Ademais, isso é uma porta de entrada e tanto quando estamos falando de contribuição open source. Você ter a habilidade de criar um website tem uma boa distância de você criar uma biblioteca para frontend. Ainda que você saiba fazer um bom CSS escalável e componentes impecáveis, o espectro quando você está criando uma lib de componentes é diferente. E, te garanto, que hoje em dia uma das coisas que mais torna-te um destaque é contribuir em projetos que estão em várias codebases ([Erick Wendel mentioned](https://www.youtube.com/watch?v=AkFtNCbo8PA)), e te garanto que, sobretudo se você não tiver experiência trabalhando com fluxos de PR e code review, contribuir vai te ajudar nisso e vai te mostrar como a comunidade de devs espalhado pelo mundo pode ser incrível, proativa e colaborativa!

Além disso, o que as grandes empresas fazem é simplesmente isso: criar abstrações do zero com suas customizações e suas regras de negócio bem inseridas, pois, no contexto delas, onde o código é gigantesco e a manutenção é constante, é mais fácil e mais seguro ter um código que você conhece de cabo a rabo, além de mais escalável quando você tem sêniors e uma equipe de qualidade. Assim nasceu o react, o angular, o graphql e outras tecnologias que faziam sentido no contexto da empresa e depois foram abertas para o uso. Não é à toa que as grandes empresas fazem testes técnicos mais pesados, utilizando algoritmos e afins; Eles valorizam que você tenha o conhecimento dos recursos da linguagem!

Bem... Até esqueci que o tema do artigo era Bun.

## Mais sobre o Bun
Outra coisa que me atraiu no Bun é que ele proporciona algumas APIs, o que, ainda mais, me impulsionou nessa ideia de construir um projeto sem nenhuma dependência. O Bun oferece um sdk de testes, bem semelhante ao jest(sim, o Node também tem, mas não é nada eficiente), e um módulo nativo de SQLite, que torna tudo mais fácil pra fazer uma conexão simples com o DB (é, o Node adicionou isso semana passada, _uma clara cópia ao Bun_). Em produção o SQLite pode não ser uma boa ideia, é claro, mas mais uma vez: você pode fazer uma abstração e separação de camadas de forma que em qualquer momento você poderá trocar o SQLite por algum outro banco.

Além disso, uma coisa que me atraiu muito no Bun foi sua comunidade receptiva, que está disposta a discutir e ajudar. Tive um problema quando fazia um seed no SQLite, e perguntei no discord oficial do Bun. Em pouco tempo, ironicamente, o próprio founder do Bun me respondeu de forma clara e me ajudou a resolver. Isso é algo que eu não esperava, e que me fez ter mais confiança na tecnologia.

E por fim, o Bun é uma tecnologia que está crescendo, e que tem um potencial gigantesco. Tenho certeza que muitas features virão. Ademais, já vejo alguns devs desenvolvendo produtos e colocando em produção utilizando Bun ao invés de node. 


## Conclusão

Espero que você tenha gostado do artigo e que tenha aprendido algo. Se você gostou, compartilhe com seus amigos e me siga no twitter (@CaioHenriqueOl3). Se você não gostou, me mande uma mensagem e me diga o que eu posso melhorar. 

Por sinal, as coisas foram inspiradas no repositório em que construí algumas coisas ditas aqui. Se você quiser ver o código completo, [clique aqui](https://github.com/CaioHVectorA/StoreHub/).

Obrigado!