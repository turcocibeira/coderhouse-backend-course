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
            return {msg: `There was an error saving the data.`}
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
                return null
            }
        }
        catch (err) {
            return {msg: `There was an error reading the data.`}
        }
    };

    async getAll() {
        try {
            const file = await fs.promises.readFile(`./${this.fileName}.txt`, "utf-8")
            return JSON.parse(file)
        }
        catch(err){
            return {msg: `There was an error reading the data.`}
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
            return {msg: `There was an error deleting item with ID ${id}`}
        }
    };

    async deleteAll() {
        try {
            await fs.promises.writeFile(`./${this.fileName}.txt`, "[]")
        }
        catch (err) {
            return {msg: `There was an error deleting all items.`};
        }
    };

    async updateById(id, body) {
        let idInt = parseInt(id);

        try {
            const file = await fs.promises.readFile(`./${this.fileName}.txt`, "utf-8");
            let fileParse = JSON.parse(file);

            const index = fileParse.findIndex(obj => {return obj.id === idInt});

            for (let key of Object.keys(body)){
                fileParse[index][key] = body[key]
            };

            console.log(fileParse)

            await fs.promises.writeFile(`./${this.fileName}.txt`, JSON.stringify(fileParse,null,2))
            return {msg: `Item with ID ${idInt} has been updated successfully.`};
        }
        catch (err) {
            return {msg: `There was an error updating item with ID ${idInt}, please check if that ID is valid.`};
        }
    };

// Cart specific functions

    async addProdToCart(prod, cartId){
        const cartInt = parseInt(cartId);

        try {
            let cart = await this.getAll();
            cart[cartInt-1].products.push(prod);
            await fs.promises.writeFile(`./${this.fileName}.txt`, JSON.stringify(cart,null,2))
            return {msg: `Item with ID ${prod.id} has been added to cart with ID ${cartId} successfully.`};


        }
        catch (err) {
            return {msg: `There was an error adding item with ID ${prod.id} to cart with ID ${cartId}, please check if that ID is valid.`};
        }
    };

    async deleteProdInCart(prodId, cartId) {
        const prodInt = parseInt(prodId);
        const cartInt = parseInt(cartId);

        const file = await fs.promises.readFile(`./${this.fileName}.txt`, "utf-8");
        let fileParse = JSON.parse(file);

        let newProdList = fileParse[cartInt-1].products.filter((i) => {
            return i.id !== prodInt
        });

        fileParse[cartInt-1].products = newProdList;

        try {
            await fs.promises.writeFile(`./${this.fileName}.txt`, JSON.stringify(fileParse,null,2));
            if (prodInt && cartInt) {
                return {msg: `Item with ID ${prodInt} from cart with ID ${cartInt} has been deleted successfully.`}
            } else {
                return {msg: `Please check wether Cart and/or Product IDs are correct`}
            }
        }
        catch (err) {
            return {msg: `There was an error deleting item with ID ${prodInt} from cart with ID ${cartInt}, please check if that ID is valid.`};
        }
    };
};

export default PersistanceHandler;