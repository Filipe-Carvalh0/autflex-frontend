# Frontend – Sistema de Produção e Controle de Matérias-Primas

Este projeto corresponde ao frontend de um sistema desenvolvido com arquitetura baseada em API, onde o front-end é totalmente desacoplado do back-end.
A aplicação consome uma API REST para realizar operações de cadastro, associação e consulta de produção com base no estoque disponível de matérias-primas.

## Arquitetura

- Front-end: Aplicação SPA (Single Page Application)
- Back-end: API REST (consumida via HTTP)
- Comunicação: JSON sobre HTTP
- Separação de responsabilidades:
    - Front-end: Interface, interação com o usuário e consumo da API
    - Back-end: Regras de negócio, persistência e cálculos

## Tecnologias Utilizadas
- React – Biblioteca principal para construção da interface
- JavaScript (ES6+)
- Axios – Comunicação com a API REST
- HTML5
- CSS3
- Hooks do React
- useState
- useEffect
- useCallback
- Arquitetura baseada em componentes
- Responsividade com CSS (layout adaptável a diferentes resoluções)

Funcionalidades Implementadas
### Cadastro de Produtos (CRUD)

-  Interface gráfica para:
    -  Criar produtos
    -  Editar produtos
    -  Listar produtos
    -  Excluir produtos

### Cadastro de Matérias-Primas (CRUD)

-  Interface gráfica para:
    -  Criar produtos
    -  Editar produtos
    -  Listar produtos
    -  Excluir produtos
    - Quantidade em estoque

### Associação de Matérias-Primas aos Produtos (CRUD)

- Interface integrada ao cadastro de produtos que permite:
    - Associar uma matéria-prima a um produto
    - Informar a quantidade necessária da matéria-prima
    - Editar associações
    - Excluir associações
    - Listar todas as associações existentes

## Como Executar o Projeto
- Pré-requisitos
- Node.js instalado
- API backend em execução
- Comandos:
    - npm install
    - npm run dev
