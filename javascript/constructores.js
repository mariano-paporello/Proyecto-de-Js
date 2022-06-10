class producto {
    constructor(id, nombre, precio, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
    }
}
class AlCarrito {
    constructor(id, nombre, precio, imagen, cantidad, subtotal) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.cantidad= 1;
        this.subtotal = precio;
    }
}


const producto1 = new producto(1, "Overlord Vol.1", 600, `./assets/images/overlord1.jfif`);
const producto2 = new producto(2, "Evangelion Vol.1", 550, `./assets/images/Evangelion1.jpg`);
const producto3 = new producto(3, "Spy X Family Vol.1", 700, `./assets/images/spyxfamily1.jpg`);
const producto4 = new producto(4, "Baki Dou Vol.2", 500, `./assets/images/51nCKhn59sS.jpg`);
const producto5 = new producto(5, "Berserker Vol.1", 700,`./assets/images/berserker1.jpg`)