// Require fs
//const fs = require("fs");
import fs from "fs";

// Test Object
const testObject = {
    title: "Name",
    price: "price",
    thumbnail: "url random"
}

// Class constructor
class Contenedor {
    constructor(fileName){
        this.fileName = fileName;
    }

    async save(object) {
        let id = 0
        const file = await fs.promises.readFile(`./${this.fileName}.txt`, "utf-8");
        let fileParse = JSON.parse(file)
        let fileLen = fileParse.length-1
        
        try{
            id = fileParse[fileLen].id + 1
        }
        catch(err){
            id = 1
        }

        try{
            object.id=id;
            fileParse.push(object);
            await fs.promises.writeFile(`./${this.fileName}.txt`, JSON.stringify(fileParse,null,2))
            return id;
        }
        catch (err){
            console.log("There was an error saving the file.")
        }

        
    };

    async getById(id) {
        try {
            const file = await fs.promises.readFile(`./${this.fileName}.txt`, "utf-8");
            let fileParse = JSON.parse(file);
            const item = fileParse.find(x => x.id === id);
            return item
        }
        catch (err) {
            return null;
        }
    };

    async getAll() {
        try {
            const file = await fs.promises.readFile(`./${this.fileName}.txt`, "utf-8")
            return JSON.parse(file)
        }
        catch(err){
            console.log("There was an error reading the file.")
        }
    };

    async deleteById(id) {
        const file = await fs.promises.readFile(`./${this.fileName}.txt`, "utf-8");
        let fileParse = JSON.parse(file)
        let newParse = fileParse.filter((i) => {
            return i.id !== id
        });
        try {
            await fs.promises.writeFile(`./${this.fileName}.txt`, JSON.stringify(newParse,null,2))
        }
        catch (err) {
            console.log("There was an error deleting the object with id: "+id)
        }
    };

    async deleteAll() {
        try {
            await fs.promises.writeFile(`./${this.fileName}.txt`, "[]")
        }
        catch (err) {
            console.log("There was an error deleting the contents of the file.")
        }
    };

    async updateById(title, price, thumbnail, uid) {
        try {
            const file = await fs.promises.readFile(`./${this.fileName}.txt`, "utf-8");
            let fileParse = JSON.parse(file);

            const index = fileParse.findIndex(obj => {return obj.id === uid});

            fileParse[index].title = title;
            fileParse[index].price = price;
            fileParse[index].thumbnail = thumbnail;

            await fs.promises.writeFile(`./${this.fileName}.txt`, JSON.stringify(fileParse,null,2))
            return uid;
        }
        catch (err) {
            console.log("There was an error")
        }
    }
};

export default Contenedor;


// Instantiate new Contenedor
//const cont1 = new Contenedor("productos");

//cont1.updateVal("Gonzalo", 200, "t.cib", 2)

// Test save method
//cont1.save(testObject)
//    .then((data) =>console.log("Successfully added new item with id: "+data));

// Test getById method
//cont1.getById(2)
//    .then((data) =>console.log(data));

// Test getAll method
//cont1.getAll()
//    .then((data) =>console.log(data));

// Test deleteById method
//cont1.deleteById(2)

// Test getAll method -- llamar a este metodo hace que siempre quede s??lo 1 item en el archivo productos.txt, por eso est?? comentado
//cont1.deleteAll()