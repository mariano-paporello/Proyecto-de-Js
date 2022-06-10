class producto {
    constructor(id, nombre, precio, imagen, info) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.info= info
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


const producto1 = new producto(1, "Overlord Vol.1", 600, `./assets/images/overlord1.jfif`, "Las aventuras de momonga ahora conocido como Ainz Ooal Gown que fue transportado al mundo del juego Ygdrasill con su grandiosa guarida conocida como la gran tumba de Nazarick. Ainz actualmente en el cuerpo de un no muerto ha perdido algunas de sus emociones humanas y con los NPC de la tumba que ahora están vivos y le rinden homenaje como un ser supremo");
const producto2 = new producto(2, "Evangelion Vol.1", 550, `./assets/images/Evangelion1.jpg`, "Las aventuras de Shinji y Ray a bordo de los prototipo de Eva, dispuestos a enfrentarse a los malvados ángeles que quieren destruir el mundo." );
const producto3 = new producto(3, "Spy X Family Vol.1", 700, `./assets/images/spyxfamily1.jpg`, "Los países de Westalis y Ostania libran desde hace años una guerra fría donde el espionaje y los asesinatos son moneda corriente. El inigualable espía conocido como Twilight es el mejor agente de Westalis que tiene por objetivo encargarse del poderos");
const producto4 = new producto(4, "Baki Dou Vol.2", 500, `./assets/images/51nCKhn59sS.jpg`, "La historia de Baki Hanma, un joven luchador que entrena intensamente para superar a su padre Yujiro Hanma que es uno de los luchadores más potentes del mundo. Pronto se ve obligado a poner a prueba su fuerza, ya que es retado por cinco presos del corredor de la muerte.");
const producto5 = new producto(5, "Berserker Vol.1", 700,`./assets/images/berserker1.jpg`, " La historia de Guts , un antihéroe mercenario que vaga por el mundo en solitario en búsqueda de Apóstoles , unos seres demoníacos que antaño fueron humanos pero que sacrificaron una parte importante de sus vidas para conseguir poderes que les permitieran alcanzar sus más oscuros deseos.")