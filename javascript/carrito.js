let carrito = JSON.parse(localStorage.getItem("carrito"));

let tableBody = document.querySelector("#tableBody")

function displayInCart(arrayDeCarrito) {
    for (let product of arrayDeCarrito) {
        let row = document.createElement("tr")
        row.innerHTML = `<td><picture><img src="${product.imagen}" alt="${product.id}"></picture><p>${product.nombre}</p><div></td><td><p>$${product.precio}<p></td><td><p>${product.cantidad}</td><td><p>$${product.subtotal}</p></td><td><button id="${product.id}" class="deleteButton ">Eliminar</button></td></div>`
        tableBody.appendChild(row)
    }

}
displayInCart(carrito)
// operador ternario
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
    let index = carrito.findIndex(product => product.id === e.target.id)
    carrito.splice(index, 1)
    e.target.parentNode.parentNode.remove();
    localStorage.setItem("carrito", JSON.stringify(carrito))
    Swal.fire({
        title: "Producto Eliminado",
        text: `${e.target.parentNode.parentNode.children[0].children[1].innerText} eliminado correctamente`,
        icon: "success",
        confirmButtonText: "Perfecto!"
    })
    
}

let vaciarButton = document.querySelector(".vaciarCarritoButton")
vaciarButton.addEventListener("click", vaciarElCarrito)

function vaciarElCarrito(e) {
    carrito.splice(0)
    e.target.parentNode.parentNode.parentNode.parentNode.children[1].remove();
    localStorage.setItem("carrito", JSON.stringify(carrito))
}
