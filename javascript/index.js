let carrito = []

cargarData()
function cargarData(){
    fetch("./javascript/data/productos.json")
        .then((response)=>response.json())
        .then((json)=> displayInPage(json))
}
let divContainer = document.querySelector(".productosLista")


function displayInPage(arrayConProductos) {
    //Recorro el array para crear la base html de los productos y ademas los botones de cada uno
    arrayConProductos.forEach(element => {
        let divProducto = document.createElement("div");

        divProducto.classList = "comics_polaroid"

        divProducto.innerHTML = `
            <picture class="infoWindow">
                <img class="comics_polaroid_picture" src="${element.imagen}" alt="${element.id}">
            </picture>
            <div class="polaroid_content">
               <strong> ${element.nombre}</strong>
               <p> $${element.precio}</p>
            </div>`;
        divContainer.appendChild(divProducto);
        
        let carritoLocalStorage = JSON.parse(localStorage.getItem("carrito"));
            if(carritoLocalStorage){
                carritoLink(carritoLocalStorage)
        } 

        // parte que permite mostrar mas información de cada producto
        let pictureHtml = divProducto.querySelector("picture")
        let imageHtml = pictureHtml.querySelector(".comics_polaroid_picture")
        mostrarFrente(element, pictureHtml, imageHtml)
        

        let button = document.createElement("button")
        button.innerHTML = "Comprar"
        divProducto.appendChild(button)
        // Parte del boton que permite añadir productos a el carrito
        button.addEventListener("click", ()=>{
            let getCarritoStorage = JSON.parse(localStorage.getItem("carrito"))
    
            if(getCarritoStorage){
                carrito = getCarritoStorage
            }
            let id = element.id
            let nombre= element.nombre
            let precio = element.precio
            let imagen = element.imagen
            const producto = new AlCarrito(id, nombre, precio, imagen)
            let index = carrito.findIndex(element=> element.id === producto.id)
            
            if(index === -1){
                const producto = new AlCarrito(id, nombre, precio, imagen)
                carrito.push(producto)
            }else{
                carrito[index].cantidad++;
                carrito[index].subtotal = carrito[index].precio * carrito[index].cantidad;
            }
            localStorage.setItem("carrito", JSON.stringify(carrito))
            carritoLink(carrito)
            
        })
        // Parte para poder mostrar el tostify al tocar el boton

            button.addEventListener("click", () =>{
                Toastify({
                    text: "Se a añadido un producto al carrito",
                    duration: 1200,
                    gravity: 'top',
                    position: 'right',
                    destination: "./carrito.html",
                    stopOnFocus: true,
                 avatar: "https://icons.iconarchive.com/icons/crountch/one-piece-jolly-roger/48/Gouvernement-Mondiale-icon.png",
                    style: {
                background: "lightblue",
                color: "black"
                },
            }).showToast();
        })
    });
}
carritoLink(carrito)



function mostrarFrente (element, pictureHtml, imageHtml){
    imageHtml.addEventListener("click", ()=>{
        pictureHtml.innerHTML =  `<img class="comics_polaroid_picture" src="${element.imagen}" alt="${element.id}">
        <div class="fondoTransparente "><p id="moreInfoActive">${element.info}</p></div>
        `
        let imageHtml = pictureHtml.querySelector("img")
        imageHtml.classList= "imageWhenEventActive comics_polaroid_picture"
        let divMoreInfo = pictureHtml.querySelector(".fondoTransparente")
        divMoreInfo.addEventListener("click", () =>{
            divMoreInfo.innerHTML = ``;
            divMoreInfo.classList = "fadeOut"
            imageHtml.classList = "comics_polaroid_picture"
            mostrarFrente(element, pictureHtml, imageHtml)
        })
     })
}
function carritoLink(array) {
    let textoCarrito = document.querySelector("#carritoLink");
    let totalProductos = 0;

    for (let product of array) {
        totalProductos += product.cantidad;
    }
    textoCarrito.innerHTML = `<p> Carrito </p> <img src="./assets/images/basket.svg" alt="Carrito">${totalProductos}`
}
