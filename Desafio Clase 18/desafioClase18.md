# Desafio Clase 18

## Crear DB con sus 2 colecciones
```
use ecommerce

db.createCollection("mensajes")

db.createCollection("productos")
```

---

## 1) & 2)

```
db.mensajes.insertMany([
    {mail:"1@aaa.com", date:"1/1/22", message:"a"},
    {mail:"2@aaa.com", date:"1/1/22", message:"b"},
    {mail:"3@aaa.com", date:"1/1/22", message:"c"},
    {mail:"4@aaa.com", date:"1/1/22", message:"d"},
    {mail:"5@aaa.com", date:"1/1/22", message:"e"},
    {mail:"6@aaa.com", date:"1/1/22", message:"f"},
    {mail:"7@aaa.com", date:"1/1/22", message:"g"},
    {mail:"8@aaa.com", date:"1/1/22", message:"h"},
    {mail:"9@aaa.com", date:"1/1/22", message:"i"},
    {mail:"10@aaa.com", date:"1/1/22", message:"j"}
])

db.productos.insertMany([
    {title:"Product_1", price:110, thumbnail:"http://some-image.com"},
    {title:"Product_2", price:456, thumbnail:"http://some-image.com"},
    {title:"Product_3", price:4678, thumbnail:"http://some-image.com"},
    {title:"Product_4", price:200, thumbnail:"http://some-image.com"},
    {title:"Product_5", price:2929, thumbnail:"http://some-image.com"},
    {title:"Product_6", price:555, thumbnail:"http://some-image.com"},
    {title:"Product_7", price:781, thumbnail:"http://some-image.com"},
    {title:"Product_8", price:115, thumbnail:"http://some-image.com"},
    {title:"Product_9", price:1106, thumbnail:"http://some-image.com"},
    {title:"Product_10", price:999, thumbnail:"http://some-image.com"}
])
```

---

## 3) & 4)

```
db.mensajes.find()

db.productos.find()

db.mensajes.estimatedDocumentCount()

db.productos.estimatedDocumentCount()
```

---

## 5)

### a)
```
db.productos.insertOne({title:"Product_11", price:400, thumbnail:"http://some-image.com"})
```

### b)
```
db.productos.find({"price": {$lt: 1000}})

db.productos.find({$and: [{"price": {$gt: 1000}}, {"price" : {$lt: 3000}}]})

db.productos.find({"price": {$gt: 3000}})

db.productos.find({}, {title: 1, _id:0}).skip(2).limit(1).sort({price: 1})
```

### c)
```
db.productos.updateMany({}, {$set: {stock: 100}}, {upsert: 1})
```

### d)
```
db.productos.updateMany({"price": {$gt: 4000}}, {$set: {stock: 0}})
```

### e)
```
db.productos.deleteMany({"price": {$lt: 1000}})
```

---

## 6)

```
use admin

db.createUser({
    user: "pepe",
    pwd: "asd456",
    roles: [{role: "read", db: "ecommerce"}]
})

mongosh --port 27017 -u pepe -p "asd456" --authenticationDatabase "admin"

use ecommerce

db.productos.find()

db.productos.updateMany({}, {$set: {stock: 30}}, {upsert: 1})
```
