let carrito = JSON.parse(localStorage.getItem("carrito"));
let precioTotal = 0;
let tableBody = document.querySelector("#tableBody")
let subtotales = []
function displayInCart(arrayDeCarrito) {
    if(arrayDeCarrito){
    for (let product of arrayDeCarrito) {
        let row = document.createElement("tr")
        row.innerHTML = `<td>
        <picture><img src="${product.imagen}" alt="${product.id}"></picture>
        <p>${product.nombre}</p>
        <div>
    </td>
    <td>
        <p>$${product.precio}</p>
    </td>
    <td>
        <p id="pCantidad">
            <button id="menosCantidad" class="buttonCantidad"> - </button><span>${product.cantidad}</span> 
            <button id="masCantidad" class="buttonCantidad">+</button>
        </p>
    </td>
    <td>
        <p id="subTotalTd">$${product.subtotal}</p>
    </td>
    <td><button id="${product.id}" class="deleteButton ">Eliminar</button></td>
    </div>
    `
        tableBody.appendChild(row)
    }
    if(carrito && carrito.length>0){
        calcularTotal(carrito)
    }
    let buttonSumar = document.querySelectorAll("#masCantidad")
    let buttonRestar = document.querySelectorAll("#menosCantidad")
    
    buttonSumar.forEach(element=>{
        element.addEventListener("click", sumarItem)
    })
    buttonRestar.forEach(element => {
        element.addEventListener("click", restarItem)
    });
    }
    
}

displayInCart(carrito)

if(carrito){
    carrito.length == 0 && carritoVacio()
}

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
    if(carrito.length === 0){
        let tableFooter = document.querySelector("#tableFooter")
        tableFooter.innerHTML = ``
    }
}

function sumarItem (e)  {
    let index = e.target.parentNode.parentNode.parentNode.children[0].children[0].children[0].alt
    const itemIndex = carrito.findIndex(object => object.id === Number(index));
    //Opero sobre el index
    carrito[itemIndex].cantidad += 1
    carrito[itemIndex].subtotal = carrito[itemIndex].precio * carrito[itemIndex].cantidad
    subtotalHtml =e.target.parentNode.parentNode.parentNode.children[3].children[0]
    subtotalHtml.innerHTML = `$${carrito[itemIndex].subtotal}`
    let cantidadHtml=e.target.parentNode.children[1]
    cantidadHtml.innerText = `${carrito[itemIndex].cantidad}`
    localStorage.setItem('carrito', JSON.stringify(carrito));
    calcularTotal(carrito)
    
}


function restarItem (e) {
    let index = e.target.parentNode.parentNode.parentNode.children[0].children[0].children[0].alt
    const itemIndex = carrito.findIndex(object => object.id === Number(index));
    //Opero sobre el index
    carrito[itemIndex].cantidad -= 1
    carrito[itemIndex].subtotal = carrito[itemIndex].precio * carrito[itemIndex].cantidad
    subtotalHtml =e.target.parentNode.parentNode.parentNode.children[3].children[0]
    subtotalHtml.innerHTML = `$${carrito[itemIndex].subtotal}`
    let cantidadHtml=e.target.parentNode.children[1]
    cantidadHtml.innerText = `${carrito[itemIndex].cantidad}`
    localStorage.setItem('carrito', JSON.stringify(carrito));
    if(carrito.length > 0){
        calcularTotal(carrito)
        if(carrito[itemIndex].cantidad<=0){
            carrito.splice(itemIndex, 1)
            e.target.parentNode.parentNode.parentNode.remove()
            localStorage.setItem('carrito', JSON.stringify(carrito));
        }
    }

    
    
}

let vaciarButton = document.querySelector(".vaciarCarritoButton")
vaciarButton.addEventListener("click", vaciarElCarrito)

function vaciarElCarrito(e) {
    localStorage.removeItem('carrito')
    let tableFooter = document.querySelector("#tableFooter")
    tableFooter.innerHTML = ``
    let tableBody = document.querySelector("#tableBody")
    tableBody.innerHTML = ``
}

function calcularTotal(array){
    if(array){
        array.forEach(element=>{
            subtotales.push(element.subtotal)
            precioTotal = subtotales.reduce(
            (previousValue, currentValue) => previousValue + currentValue,0);
            })
            subtotales = []
            if(array.length === 0){
                precioTotal = 0
            }
    }
    let tableFooter = document.querySelector("#tableFooter")
    tableFooter.innerHTML = `<td></td>
    <td></td>
    <td></td>
    <td></td>
    <td> Total: $${precioTotal}</td>`
}



