# API para um PDV (Frente de Caixa)


![status](https://img.shields.io/badge/status-%20concluido-green)

## Sobre o Projeto

A  **API para um PDV (Frente de Caixa)**  é um projeto que abrangeu múltiplas sprints, cada uma com requisitos específicos, desde a criação de um banco de dados PostgreSQL até implementação de recursos avançados de gerenciamento de produtos, clientes, pedidos e usuários. Foi feita a implementação de funcionalidades cruciais, como autenticação de usuários com tokens e respostas personalizadas de acordo com os status codes HTTP. O projeto foi conduzido em equipe, com colaboração estreita entre os membros para garantir o cumprimento dos requisitos e a entrega da uma API como o projeto final do curso de desenvolvimento de software back-end da Cubos Academy.

## Funcionalidades

- Lista todas as categorias registradas.
- Cadastrar usuário
- Efetuar login do usuário
- Verificar se o usuário está logado
- Detalhar o usuário
- Editar o usuário
- Cadastrar um novo produto
- Atualizar um produto especifico
- Listar produtos
- Detalhar produto especifico 
- Excluir produto especifico
- Cadastrar cliente
- Listar Clientes
- Editar cliente
- Detalhar cliente especifico
- Cadastrar Pedido
- Listar Pedidos
  
## Endpoints

- **GET /categoria**

- **POST /usuario**

- **POST /login**

- **GET /usuario**

- **PUT /usuario**

- **POST /produto**

- **PUT /produto/:id**

- **GET /produto**

- **GET /produto/:id**

- **DELETE /produto/:id**

- **POST /cliente**

- **GET /cliente**

- **PUT /cliente/:id**

- **GET /cliente/:id**

- **POST /pedido**

- **GET /pedido**

## Demostração

Link do deploy: [Frente de Caixa](https://distinct-cloak-calf.cyclic.app)

  
## Como Executar o Projeto

1. Certifique-se de ter o Node.js, Git, VSCode instalados em sua máquina.
2. Clone este repositório: `git clone git@github.com:AlziraEva/desafio-cubosAcademy-projeto-api-banco.git`
3. Instale as dependências: `npm install`
4. Inicie o servidor: `npm run dev` 
5. Teste as Rotas: A API estará disponível em: [Frente de Caixa](https://distinct-cloak-calf.cyclic.app)


## Como Contribuir para o Projeto

1. Faça um fork deste repositório
2. Crie uma branch para sua feature: `git checkout -b feature/nova-feature`
3. Faça commit das suas alterações: `git commit -m 'Adiciona nova feature'`
4. Envie as alterações para o seu fork: `git push origin feature/nova-feature`
5. Abra um pull request neste repositório

## Contribuidores

- [Karla Silva](https://github.com/KarlaSilvaEng)
- [Lorraine](https://github.com/Lorrainelbs)
- [Ana Vitória](https://github.com/claracjz)
- [Alessandra Lira](https://github.com/AlleLira)
- [Alzira Eva](https://github.com/AlziraEva)

