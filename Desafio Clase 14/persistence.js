import fs from "fs";

// Class constructor
class PersistanceHandler {
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
        const idInt = parseInt(id);
        try {
            const file = await fs.promises.readFile(`./${this.fileName}.txt`, "utf-8");
            let fileParse = JSON.parse(file);
            const item = fileParse.find(x => x.id === idInt);
            if (item) {
                return item
            } else {
                return `No item with id ${id} was found`
            }
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
        const idInt = parseInt(id);
        const file = await fs.promises.readFile(`./${this.fileName}.txt`, "utf-8");
        let fileParse = JSON.parse(file)
        let newParse = fileParse.filter((i) => {
            return i.id !== idInt
        });
        try {
            await fs.promises.writeFile(`./${this.fileName}.txt`, JSON.stringify(newParse,null,2));
            if (idInt) {
                return {msg: `ID ${id} has been deleted successfully.`}
            } else {
                return {msg: `IDs are numeric, ${id} is not a valid ID`}
            }
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

export default PersistanceHandler;