Exemplo de um CRUD com Node.js e Express e controle de cache via apicache.

## Requisitos
- Node.js
- NPM

## Instalação
```bash
npm install
```

## Execução
```bash
npm run server
```

## Rotas
O projeto possui uma collection que pode ser aberta em um cliente de requisições HTTP como o [Postman](https://www.postman.com/). A collection está localizada em `./PUC-API-Collection.json`.

- Listar produtos: `GET /products`
- Mostrar produto: `GET /products/:id`
- Criar produto: `POST /products`
- Atualizar produto: `PUT /products/:id`
- Deletar produto: `DELETE /products/:id`
