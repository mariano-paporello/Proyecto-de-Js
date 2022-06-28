let carrito = JSON.parse(localStorage.getItem("carrito"));
let precioTotal = 0;
let tableBody = document.querySelector("#tableBody")
let subtotales = []
function displayInCart(arrayDeCarrito) {
    for (let product of arrayDeCarrito) {
        let row = document.createElement("tr")
        row.innerHTML = `<td><picture><img src="${product.imagen}" alt="${product.id}"></picture><p>${product.nombre}</p><div></td><td><p>$${product.precio}</p></td><td><p id="pCantidad"><button id="masCantidad" class="buttonCantidad">+</button>${product.cantidad}<button id="menosCantidad" class="buttonCantidad">-</button></p></td><td><p>$${product.subtotal}</p></td><td><button id="${product.id}" class="deleteButton ">Eliminar</button></td></div>`
        tableBody.appendChild(row)
    }
}
calcularTotal(carrito)
displayInCart(carrito)

carrito.length == 0 && carritoVacio()

function carritoVacio() {
    Swal.fire({
        title: "El carrito esta vacio",
        text: "No hay ningun producto en el carrito",
        confirmButtonText: `<a href="./index.html">Volver para comprar algo</a>`
    })
}

let deleteButtons = document.querySelectorAll(".deleteButton")

deleteButtons.forEach(element => {
    element.addEventListener("click", eliminarProducto)
})

function eliminarProducto(e) {
    let index = carrito.findIndex(p => p.id === Number(e.target.id))
    carrito.splice(index, 1)
    e.target.parentNode.parentNode.remove();
    localStorage.setItem("carrito", JSON.stringify(carrito))
    Swal.fire({
        title: "Producto Eliminado",
        text: `${e.target.parentNode.parentNode.children[0].children[1].innerText} eliminado correctamente`,
        icon: "success",
        confirmButtonText: "Perfecto!",
    })
    calcularTotal(carrito)
}
let vaciarButton = document.querySelector(".vaciarCarritoButton")
vaciarButton.addEventListener("click", vaciarElCarrito)

function vaciarElCarrito(e) {
    carrito.splice(0)
    e.target.parentNode.parentNode.parentNode.parentNode.children[1].remove();
    localStorage.setItem("carrito", JSON.stringify(carrito))
    calcularTotal(carrito)
}

function calcularTotal(array){
    
    array.forEach(element=>{
        subtotales.push(element.subtotal)
        precioTotal = subtotales.reduce(
        (previousValue, currentValue) => previousValue + currentValue,0);
        })
        subtotales = []
        if(carrito.length === 0){
            precioTotal = 0
        }
    let tableFooter = document.querySelector("#tableFooter")
    tableFooter.innerHTML = `<td></td><td></td><td></td><td></td><td> Total: $${precioTotal}</td>`
}






