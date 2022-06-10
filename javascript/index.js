

const stock = [producto1, producto2, producto3, producto4, producto5];
let carrito = []

let divContainer = document.querySelector(".productosLista")

function displayInPage(arrayConProductos) {
    arrayConProductos.forEach(element => {
        let divProducto = document.createElement("div");
        divProducto.classList = "comics_polaroid"
        divProducto.innerHTML = `
            <picture>
                <img class="comics_polaroid_picture" src="${element.imagen}" alt="${element.id}">
            </picture>
            <div class="polaroid_content">
               <strong> ${element.nombre}</strong>
               <p> ${element.precio}</p>
                <button id="alCarrito">Al carrito</button>
            </div>`;
        divContainer.appendChild(divProducto)
    });
    let carritoLocalStorage = JSON.parse(localStorage.getItem("carrito"));
    if(carritoLocalStorage){
        carritoLink(carritoLocalStorage)
    }
}
displayInPage(stock)

let botonesDeAgrgadoAlCarrito = document.querySelectorAll("#alCarrito")

botonesDeAgrgadoAlCarrito.forEach(element => {
    element.addEventListener("click", alCarrito)
})

botonesDeAgrgadoAlCarrito.forEach(element =>{
    element.addEventListener("click", () =>{
        Toastify({
            text: "Se a añadido un producto al carrito",
            duration: 1200,
            gravity: 'top',
            position: 'right',
            destination: "http://127.0.0.1:5500/Proyecto%20Final%20Segunda%20entrega/carrito.html",
            stopOnFocus: true,
            avatar: "https://icons.iconarchive.com/icons/crountch/one-piece-jolly-roger/48/Gouvernement-Mondiale-icon.png",
            style: {
                background: "lightblue",
                color: "black"
              },
        }).showToast();
    
    })
})

function alCarrito(evento) {
    let getCarritoStorage = JSON.parse(localStorage.getItem("carrito"))
    
      if(getCarritoStorage){
          carrito = getCarritoStorage
      }
      
      let index = carrito.findIndex(producto => producto.id  === evento.target.parentNode.parentNode.children[0].children[0].alt)
      console.log(index)

    let id = evento.target.parentNode.parentNode.children[0].children[0].alt;
    let nombre = evento.target.parentNode.children[0].innerText;
    let precio = evento.target.parentNode.children[1].innerText;
    let imagen = evento.target.parentNode.parentNode.children[0].children[0].src;
      if(index === -1){
        const producto = new AlCarrito(id, nombre, precio, imagen)
        carrito.push(producto)
      }
      else{
          carrito[index].cantidad++;
          console.log(carrito[index].precio)
          carrito[index].subtotal = carrito[index].precio * carrito[index].cantidad;
      }
    
    localStorage.setItem("carrito", JSON.stringify(carrito))
    carritoLink(carrito)
}
function carritoLink(array){

    let textoCarrito = document.querySelector("#carritoLink");
    let totalProductos = 0;

    for(let product of array){
        totalProductos += product.cantidad;
    }
    textoCarrito.innerHTML = `<img src="./assets/images/basket.svg" alt="Carrito">${totalProductos}`
}