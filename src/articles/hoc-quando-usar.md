---
title: "High-Order Components: Implementação e casos de uso."
date: "29-07-2024"
category: frontend
active: false
---

É comum vermos uma técnica nas redes sociais, em algumas codebases ou tutoriais, mas não aplicarmos pois não pensamos em use cases onde ela seria uma mão na roda. Por isso, eis aqui algumas formas de como, no react, usar `High-Order Components`(HOC) para transformar seus códigos mais reutilizáveis e escaláveis.

## O que é

Basicamente, no contexto do react, um HOC é uma técnica de programação que permite reutilizar lógicas de componentes em outros componentes. Pragmaticamente, temos componentes que renderizarão outros componentes, assim como você utiliza aquele componente como um container pois ele tem `children` como prop. 

Analogamente, pense em um cenário onde você tem o componente A, que é o componente "pai" e o componente b, que será o "filho". O componente b quer receber uma prop `data`, onde ele receberá dados do usuário logado, por exemplo. Entretanto, em um contexto comum onde não queremos repetir código, podemos aplicar o conceito. Veja como é simples:

```tsx
// componente b
function ProfileView({ user }: { user: User }) {
    return (
        <>
            <img src={user.image}/>
            <h1>{user.name}</h1>
        </>
    )
}
```

```tsx
// componente A
function withUser(Component: React.FC<{ user: User }>) {
    return function ProfileContainer() {
        const user = useUser();
        return <Component user={user}/>
    }
}
```

Sim, você poderia utilizar o hook `useUser` diretamente no componente `ProfileView`, mas imagine que você tenha outros componentes que também precisam do usuário logado. Com o HOC, você pode reutilizar a lógica de buscar o usuário em um único lugar, e não em todos os componentes que precisam dele. Pensando em escalabilidade e manuntenção, isso é muito importante. E além disso, você tem a plena liberdade para 
- Utilizar mais de uma prop
- Utilizar HOCs dentro de HOCs, dentro de HOCs...
- Utilizar HOCs para renderizar componentes diferentes baseados em condições
- Utilizar HOCs para renderizar com o context(não precisará ficar importando o tempo inteiro)
- Separar mais e mais a lógica de negócio do componente visual(chega de `useEffect` e `useState` em todos os componentes)


## Apenas alguns use cases

Bem, provavelmente você já trabalhou com autenticação, e sabe que ao tempo inteiro estamos enviando tokens para praticamente qualquer requisição que temos que fazer ao servidor. E, ainda que seja simples "getar" a token, se torna chato quando você deve fazer isso em praticamente todas as pages. Mas, com um HOC, isso pode ficar mais simples:
```tsx
function withAuth(Component: React.FC) {
    return function AuthContainer() {
        const token = useAuth();
        if (!token) return (
            <>
                <h1>Ops, você não está logado!</h1>
                <Link to="/login">Clique aqui para logar agora.</Link>
            </>
        )
        return <Component token={token}/>
    }
}
```

De antemão, resolvemos dois problemas. Você não vai ter que ficar resgatando sua token o tempo inteiro e você já tem uma válvula de escape garantida quando a token não estiver presente. _(Se você já fez o mesmo if para vários componentes, assim como eu, deve estar se perguntando porque não fez isso antes, assim como estou nesse exato momento!)_ Mas e se você quiser, além de fazer um componente que use autenticação, um componente que receba uma lista de dados de produtos? Simples:
```tsx
function withProductData(Component: React.FC) {
    return function DataContainer({ token }: { token: string }) {
        const [data, setData] = useState();
        const [error, setError] = useState();
        useEffect(() => {
            fetch('https://api.com/products', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => res.json()).then(setData)
            .catch(setError)
        }, [token])
        if (data.length == 0) return (
            <>
                <h1>Ops, não encontramos dados!</h1>
                <Link to="/data">Clique aqui para tentar novamente.</Link>
            </>
        )
        if (error) return (
            <>
                <h1>Ops, ocorreu um erro!</h1>
                <Link to="/data">Clique aqui para tentar novamente.</Link>
            </>
        )
        if (!data) return <h1>Carregando...</h1>
        return <Component data={data}/>
    }
}
```

Voila! Agora resolvemos **três** problemas! Você não vai ter que ficar resgatando sua token o tempo inteiro, você já tem uma válvula de escape garantida quando a token não estiver presente e você já tem um componente que faz fetch de dados e trata os erros de forma genérica, renderiza loading e tem uma tela para quando dados vierem vazias. Ainda dentro desse componente, você, com o erro, poderia ler o status e renderizar uma tela de erro para cada status que tiver recebido(404, 500, 401...). Pense como fazer uma abstração genérica para toda a aplicação iria poupar seu tempo!

E se fizermos uma abstração mais genérica no nosso código anterior?
```tsx
function withFetchedData(Component: React.FC<{ data: Product[] }>, model: string) {
    return function DataContainer({ token }: { token: string }) {
        const [data, setData] = useState();
        const [error, setError] = useState();
        useEffect(() => {
            fetch(`https://api.com/${model}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => res.json()).then(setData)
            .catch(setError)
        }, [token])
        if (data && data.length == 0) return (
            <>
                <h1>Ops, não encontramos dados!</h1>
                <Link to="/data">Clique aqui para tentar novamente.</Link>
            </>
        )
        if (error) return (
            <>
                <h1>Ops, ocorreu um erro!</h1>
                <Link to="/data">Clique aqui para tentar novamente.</Link>
            </>
        )
        if (!data) return <h1>Carregando...</h1>
        return <Component data={data}/>
    }
}
```
Uma pequena mudança, mas que, se estiver funcional dentro do seu projeto, pode garantir com que, em um HOC, você consiga abstrair a lógica de componentes conectados a API de toda sua aplicação. Louco, não?!

Agora, para utilizar um cponente com autenticação e dados de produtos, você pode fazer:
```tsx
const ProductList = withAuth(withFetchedData(ProductList, 'products'));
```
Louco, não? 

## Conclusão

E, quanto mais você pensa em abstrair lógica de componentização, mais use cases podem vir à tona. Web Sockets, Web Hooks, Context API, Cookies, Workers, Local Storage, GraphQL, dentre outros. Tenho certeza que, se você pensar em um problema que você já teve que resolver, você pode pensar em um HOC que resolveria esse problema de forma mais genérica e reutilizável!

Também, deve-se tomar cuidado para não focar demais em abstrair, visando ter a escalabilidade de componentes perfeitas e acabar falhando em manter a simplicidade do código e as vezes de fato escalar(experiência própria). Afinal, somos desenvolvedores e, o Ctrl+C e Ctrl+V é eternamente sagrado.

Obrigado por ler!