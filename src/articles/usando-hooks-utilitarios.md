---
title: "Usando hooks utilitários em React"
date: "19-08-2024"
category: frontend
active: false
---

Não é segredo que hooks são uma das melhores features do React. Além dos proporcionados pela própria biblioteca, é possível criar hooks customizados para facilitar o desenvolvimento de aplicações, e reutilizar lógicas complexas em prol da escalabilidade e manutenibilidade do código.

Entretanto, é comum que no início do aprendizado de React, desenvolvedores não reconheçam situacões em que hooks customizados são úteis. Neste artigo, vamos explorar alguns hooks utilitários comuns e outros que já apliquei em projetos reais. Vamos lá!

> Lembre-se que os nomes dos hooks são arbitrários e podem ser alterados de acordo com a sua preferência.

### useLocalStorage
Esse hook é bem clássico e geralmente o primeiro que é apresentado como uma solução em um custom hook. É simples: Assim como o `useState`, ele retorna um valor e uma função para atualizá-lo, mas ao invés de guardar o estado na memória, ele guarda no `localStorage`. Eis uma implementação simples:

```jsx
import { useState } from 'react';

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = value => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
```

E agora você pode utilizá-lo em qualquer componente da seguinte forma:

```jsx
import useLocalStorage from './useLocalStorage';

function MyComponent() {
  const [name, setName] = useLocalStorage('name', 'Caio Henrique');

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
      />
    </div>
  );
}
```

### useWindowDimensions
Esse hook é bem intuitivo. Basicamente, ele capta as dimensões da janela do navegador e retorna um objeto com as propriedades `width` e `height`. Isso é útil para situações em que você precisa adaptar o layout da aplicação de acordo com o tamanho da tela de forma que o CSS não consiga resolver. Já utilizei em um cenário onde eu precisava exibir um modal de acordo com o tamanho da tela do usuário, pedindo-o para virar o celular caso a tela fosse muito pequena. Eis uma implementação simples:

```jsx
import { useState, useEffect } from 'react';

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
```
E agora você pode utilizá-lo em qualquer componente da seguinte forma:

```jsx
import useWindowDimensions from './useWindowDimensions';

function MyComponent() {
  const { width, height } = useWindowDimensions();
    if (width < 500) {
      return <p>Por favor, vire o celular para visualizar o conteúdo melhor!</p>;
    }
  return (
    <div>
      <p>Width: {width}</p>
      <p>Height: {height}</p>
    </div>
  );
}
```
Dessa forma, você pode adaptar o layout da sua aplicação de acordo com o tamanho da tela do usuário.

### useAuth

É comum que, em aplicações conectadas a APIs, nós armazenamos JWT tokens no localstorage/cookies e precisamos resgatá-los para fazer requisições autenticadas. Fazer isso repetidamente em todos os componentes que precisam de autenticação é trabalhoso e propenso a erros. Por isso, é útil criar um hook que faça isso de forma centralizada. Eis uma implementação simples:

```jsx
import { useState, useEffect } from 'react';

function useAuth() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const token = document.cookie.split('=')[1];
    // ou, utilizando localStorage:
    // const token = window.localStorage.getItem('token');
    setAuth(token);
  }, []);

  return auth;
}
```
### useApi e useFetch
Antes dos hooks, temos um problema a solucionar, que é construir uma abstração para fazer requisições para um servidor, que seja escalável, sirva para qualquer tipo de requisição e seja fácil de utilizar. Para isso, eu utilizo dois hooks, que resolvem este mesmo problema porém de uma forma diferente.

O useApi é um hook que retorna as funções de cada método HTTP, como `get`, `post`, `put`, `delete`, etc; E um estado booleano `loading` que indica se a requisição está em andamento, além de um estado `data` e `error` que guardam a resposta da requisição e o erro, respectivamente. Eis uma implementação simples:

```jsx
import { useState } from 'react';

function useApi() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const get = async (url) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const post = async (url, body) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
    // fazer o mesmo para put, delete, etc...
  return { get, post, loading, data, error };
}
```
Já o useFetch é um hook que automaticamente faz a requisição `get` para um endpoint e retorna o resultado. Eis uma implementação simples:

```jsx
### useArrState
Esse se demonstrou útil quando eu tinha uma situação como, por exemplo um carrinho. Nesse hook, eu fiz um cenário onde eu poderia adicionar itens, remover itens pelo seu índice, limpar toda a array e, principalmente, refazer ações.
### useDebounce
### useToggleState
### useObjState