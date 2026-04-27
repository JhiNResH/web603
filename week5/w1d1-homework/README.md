# Module 6 Week 1 Day 1 Homework

Node, Express, Mongoose backend for the inventory CRUD API.

## Import Sample Data

Start MongoDB, then run:

```bash
mongoimport --db react-crud --collection inventories --drop --file inventories.json
```

## Run API

```bash
cd node-mongo
npm install
npm start
```

The server listens on `http://localhost:8080`.

## Routes

- `POST /api/inventory`
- `GET /api/inventory/:id`
- `GET /api/inventories`
- `PUT /api/inventory`
- `DELETE /api/inventory/:id`
