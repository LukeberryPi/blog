---
title: "Truques que lhe farão ter mais eficiência no javascript."
date: "29-07-2024"
category: frontend
active: true
---
1. [Arrays, objetos](#arrays-objetos)
    1. [Array.from](#arrayfrom)
    2. [Spread Operator](#spread-operator)
    3. [Desestruturação](#desestruturação)
    4. [Dicionários e Operador `in`](#dicionários-e-operador-in)
    5. [`Object.values` e `Object.keys`](#object.values-e-object.keys)
2. [Promises](#promises)
    1. [Capturando erros sem try catch usando await](#capturando-erros-sem-try-catch-usando-await)
    2. [Promise.all e seus irmãos](#promise.all-e-seus-irmãos)
3. [Controles de fluxo](#controles-de-fluxo)
    1. [O `sleep` do javascript](#o-sleep-do-javascript)
    2. [Como travar a execução de um código momentaneamente](#como-travar-a-execução-de-um-código-momentaneamente)

Ao desenvolver software, é comum ter situações onde precisamos de uma solução rápida e menos trabalhosa possível, sem perder a eficiência. Além disso, como qualquer desenvolvedor(_até os de java_), não queremos um código verboso.

Por isso, juntei alguns truques e _hacks_ que me ajudam no dia a dia com Mocks, testes, controle de fluxo de código, manipulações, controle e muito mais. Espero que esse artigo te ajude!

> Note que algumas vezes, use cases do ecossistema react serão mais citados, mas esses truques podem te ajudar em qualquer tecnologia!

## Arrays, objetos

Arrays e objetos são estruturas de dados essenciais, que naturalmente são muito utilizadas em javascript. E, por isso, é importante saber manipulá-las de forma eficiente:

### Array.from

Eu demorei mais do que gostaria para descobrir o método `Array.from`, que serve basicamente pra você criar uma array instantaneamente e de forma _inline_ no seu código. Dessa forma:

```ts
const myArray = Array.from({ length: 10 })
```

Dessa forma, temos uma array com 10 posições, inicialmente todas undefined. Nisso, já pode-se usar em maps para componetizações de teste. Ademais, caso queira preencher com dados e valores, basta fazer assim:

```tsx
const myArrayFilled = Array.from({ length: 10 }, (_, index) => (
    id: index,
    name: `User ${index}`,
    birthDate: new Date(2000 + index, 1, 1)
))
```

Temos dados fictíceos! Isso já serve para testes. Mas caso queira ir ainda mais longe, você pode usar bibliotecas de mocks, como `faker` ou `mockjs`. Eis um pequeno exemplo de um caso real onde usei essa técnica para fazer um seed no meu Db

```tsx
import { fakerPT_BR as faker } from '@faker-js/faker';
import { Database } from '../db'
function generateProduct() {
    const title = faker.commerce.productName();
    const price = parseFloat(faker.commerce.price());
    const description = faker.commerce.productDescription();
    return {
        title,
        price,
        description,
    };
}

const db = new Database('dev.sqlite');
Array.from({ length: 10000 }).forEach(() => {
    db.prepare(`INSERT INTO products (title, price, description) VALUES ($title, $price, $description)`).run(generateProducts())
})
```
Certamente o código fica bem mais limpo e fácil de entender do que um `for` tradicional.

### Spread Operator


Talvez você já conheça o spread operator, mas não sabe o quão ele é poderoso. Caso não conheça, basicamente ele serve para "espalhar" os valores de um array ou objeto em outro.
Eis um exemplo:
```ts
// Em arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [...arr1, ...arr2];
console.log(arr3); // [1, 2, 3, 4, 5, 6]
// Em objetos:
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const obj3 = { ...obj1, ...obj2, d: 5 };
console.log(obj3); // { a: 1, b: 2, c: 3, d: 5 }
```
Note que, no caso do obj3, você pode sobrescrever valores, o que torna muito útil pra certos cases. Um que é recorrente é quando você quer passar um objeto com as mesmas prioridades porém com alguma formatação diferente para uma API, por exemplo. Assim:
```ts
const user = {
    name: 'John Doe',
    email: 'johndoe@gm.co',
    password: '123456',
    cellphone: '123456789',
    birthDate: '01/01/2000',
    address: {
        street: 'Rua das Flores',
        number: 123,
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
    }
}
// é um objeto grande demais para escrever manualmente cada propriedade, não?
post('/user', { ...user, cellphone: formatCellphone(user.cellphone) })
```

Além disso, você pode transformar strings em arrays de uma forma mais rápida que usando `split`:

```ts
const array = [...'Hello, World!']
// ou
const str = ["Hello, World!"]
const array = [...str]
```

Você pode abusar disso em funções, tirando um limite de argumentos que você pode passar sem ser um array. Talvez seja raro calhar um caso onde você usa isso, mas tenho certeza que as bibliotecas que você usa fazem isso.

Ademais, se você usa react, provavelmente você já fez o seguinte código:
```tsx
setMyState({ ...myState, key: value })
```
Se nunca fez, saiba que é uma forma de atualizar o estado de um componente sem perder os valores antigos. Isso é muito útil em formulários, por exemplo.

E você pode usar o spread operator para fazer uma cópia de um array ou objeto, sem referenciar o mesmo objeto. Isso é muito útil para evitar mudanças indesejadas.

### Desestruturação
Um recurso bem comum, onde você pode pegar índices em array e propriedades no objeto e alocar a variáveis separadamente. Isso é muito útil para evitar repetição de código e tornar o código mais limpo. Eis um exemplo:
```ts
const { name, email, id } = user
const [first, second, third] = [1, 2, 3]
// casos reais:
const { data } = await axios.get('https://api.com/data')
const [state, setState] = useState('initial state')
```
E você pode usar isso em argumentos de funções também, assim como é muito comum em componentes reacts e eu costumo utilizar em controllers e funções de backend onde são objetos pequenos; Você pode usar isso em funções anônimas, geralmente utilizadas dentro de `maps` e `filters`, também. E, por fim, você tem a liberdade de usar isso _recursivamente_, como no exemplo:
```ts
function printProductBrandStreetBydata(data) {
    const { product: { brand: { location: street } } } = data
    console.log(street)
}
```
### Dicionários e Operador `in`
Se você já trabalhou com python, você sabe o quão útil é um dicionário. Em javascript, você pode usar objetos para utilizar como se fosse um dicionário. O operador `in` checa se uma propriedade existe em um objeto.

Trabalhando em aplicações comuns, sobretudo no frontend, pode ser raro aparecer casos de uso onde dicionário é uma solução. Mas contextos onde você pode fazer validações de dados, otimizações, testes, dentre outros, você pode usar dicionários. Eis um exemplo simples:
```ts
// dictionary
const dictionary = {}
function addWord(word, meaning) {
    dictionary[word] = meaning
}
fetch('https://api.com/dictionary').then(res => res.json()).then(data => {
    for (const word in data) {
        addWord(word, data[word])
    }
})
export function getWordMeaning(word) {
    return dictionary[word] || 'Word not found'
}
```

### `Object.values` e `Object.keys`

Ainda mais dentro de objetos, você tem duas funções onde converte objetos para array. Seja uma array com suas chaves ou uma array com os valores. Pragmaticamente, eles são objetivamente úteis quando você está consumindo uma API onde os dados vêem todos via objetos;Um caso onde tive que fazer isso foi quando consumi um JSON gigantesco de pokemon onde, ao invés de arrays, viam objetos onde a chave e o nome do pokemon

As funções também são úteis trabalhando com pacotes. Uma vez, estive utilizando um pacote que fazia conversão de arquivo excel para JSON, e o retorno era todo a base de objeto. E então, o `Object.values` me salvou!

Falamos bastante das estruturas de dados mais utilizadas, mas não acaba por aqui; Por que não falamos das benditas Promises?

## Promises

Promises são uma das estruturas mais importantes do javascript, e são essenciais para trabalhar com assincronismo. E, por isso, é importante saber manipulá-las de forma eficiente.
Além de controlar os fluxos com await ou com .then, você pode tratá-la de formas diferentes que podem ser úteis em diferentes contextos:

### Capturando erros sem try catch usando await

É comum que, para evitar verbosidade e muita repetição, utilizamos o async/await para lidar com promises. Mas, se você, assim como eu, não gosta de colocar try/catch em cada função da sua aplicação, pode tratar error da seguinte forma:
```ts
function handleError(error) {
    // faça algo com o erro..
}
async function fetchUser() {
    const response = await fetch('https://api.com/user')
    if (!response.ok) {
        throw new Error('Failed to fetch user')
    }
    return response.json()
}
async function main() {
    const response = fetchUser()
    response.catch(handleError)
    await response
    // faça algo com response - a promise já foi resolvida.
}
```
Isso, além de evitar que você abra mais blocos no seu código, dá mais liberdade de utilizar diretamente funções genéricas de tratamento de erros. No frontend, por exemplo, você pode ter uma grande função que interpreta o status de um erro de uma requisição HTTP e assim designa um feedback visual correspondente para o usuário.

### Promise.all e seus irmãos

A classe `Promise` tem alguns métodos que te ajudam a lidar com múltiplas promises de forma mais eficiente. O `Promise.all` é um deles, e ele serve para você esperar que todas as promises sejam resolvidas para continuar a execução do código, além de retornar a resposta delas em uma array. Lembra do seed que fiz no banco de dados utilizando `Array.from`? Caso cada requisição fosse uma Promise, por exemplo, se eu estivesse utilizando prisma, eu poderia fazer algo assim:
```ts
import prisma from '../prisma'
const products = Array.from({ length: 1000 }).map(() => prisma.product.create({
    data: generateProduct()
}))
const allItems = await Promise.all(products)
```
Teoricamente, o código funciona perfeitamente e cria mil produtos no banco de dados, esperando todas as promises rodarem em paralelo e serem resolvidas. Entretanto, é importante lembrar que, se uma das promises falhar, todas as outras serão canceladas. Por isso, podemos usar um dos _irmões_ do `Promise.all`, o `Promise.allSettled`. Ele funciona de forma parecida, mas não cancela as promises que falharam. Assim, você pode tratar os erros de forma mais eficiente.
```ts
import prisma from '../prisma'
const products = Array.from({ length: 100000 }).map(() => prisma.product.create({
    data: generateProduct()
}))
const allItems = await Promise.allSettled(products)
```
Agora, não precisamos nos preocupar com erros durante a criação dos produtos.

Além disso, a família `Promise` é grande. Temos o `Promise.race`, que retorna a primeira promise que for resolvida, o que pode se tornar interessante em scrapping e certos contextos específicos. E, por fim, temos o `Promise.any`, que retorna a primeira promise que for resolvida, mas ignora as que falharam. 

## Controles de fluxo

As vezes, sobretudo para fins de debug e testes, queremos manipular o controle de fluxo a nosso favor. Aqui estão alguns macetes que podem te ajudar:

### O `sleep` do javascript
Diferente da maioria das outras linguagens, o javascript não tem um método nativo para fazer um sleep. Mas, você pode fazer isso de forma simples com o `setTimeout` e com promises:
```ts
const sleep = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms))

function scrapeData() {
    // faz alguma coisa
    await sleep(5000)
    // faz outra coisa
}
```
Assim como propositalmente indiquei no nome da função, isso é uma utilidade praticamente essencial para scrapping, onde você precisa esperar um tempo para a página carregar, cada ação funcionar, cada navegação acontecer, entre outros. Mas e se você querer fazer isso sem async/await?

### Como travar a execução de um código momentaneamente

Assim como o _sleep_, podemos fazer a mesma coisa sem async/await. Eis um exemplo:
```ts
const sleepSync = (ms = 1000) => {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    // Espera ocupada
  }
}
```
Tenha preferência por usar o `sleep` com async/await, pois o `sleepSync` pode travar a execução do código, o que pode ser um problema em aplicações que precisam de alta performance. Mas, em situações específicas, ele pode ser útil.

## Conclusão
Obrigado por ter lido até aqui!

Espero que esses truques te ajudem a ser mais eficiente no seu dia a dia. Acha que faltou algum? Contate-me nas redes sociais! Ainda há muito a ser explorado, como datas, logs, regex, dentre outros! E, se você gostou desse artigo, compartilhe com seus amigos e colegas de trabalho!