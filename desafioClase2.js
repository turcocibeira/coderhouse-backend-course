class Usuario {
    constructor (nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullname(){
        return this.nombre;
    }

    addMascota(mascota){
        this.mascotas.push(mascota);
    }

    countMascotas(){
        return this.mascotas.length;
    }

    addBook(nombre, autor){
        this.libros.push({nombre: nombre, autor: autor});
    }

    getBookNames(){
        let names = [];
        this.libros.forEach((i) => names.push(i.nombre));
        return names;
    }



};

const libros = [
    {
        nombre: "Libro1",
        autor: "Pepe"
    },
    {
        nombre: "Libro2",
        autor: "Fabian Show"
    }
];

const mascotas = ["Gato", "Perro"];

const user1 = new Usuario("Juan", "Galvez", libros, mascotas);

console.log(user1.getFullname());
user1.addMascota("Tucan");
console.log(user1.countMascotas());
user1.addBook("libro3", "DonaldTrump");
console.log(user1.getBookNames());
