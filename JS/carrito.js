
// const carrito = localStorage.getItem("carrito"); 
let botonesEliminar = document.querySelectorAll("#carritoProductoEliminar");
const botonVaciar = document.getElementById("vaciarCarrito");

// Función para obtener el carrito del localStorage
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}

// Función para establecer el carrito en el localStorage
function establecerCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarProductosCarrito(){
    if (carrito == null) {
        document.getElementById("carritoVacio").classList.remove("disabled");
    } else{
            const carrito = obtenerCarrito();
            document.getElementById("carritoProductos").classList.remove("disabled");
            document.getElementById("carritoAcciones").classList.remove("disabled");
            const listaProductos = document.getElementById('carritoProductos');
            // const carritoProductos = document.getElementById('carritoProductos');
            const totalElement = document.getElementById('total');
            let total = 0;
    
            listaProductos.innerHTML = '';
    
            carrito.forEach(producto => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <div class="carritoProducto">
                    <img class="carritoProductoImg" src="${producto.img}" alt="${producto.nombre}">
                    <div class="carritoProductoNombre">
                        <small>Nombre</small>
                        <h3>${producto.nombre}</h3>
                    </div>
                    <div class="carritoProductoCantidad">
                        <small>Cantidad</small>
                        <p>${producto.cantidad}</p>
                    </div>
                    <div class="carritoProductoPrecio">
                        <small>Precio</small>
                        <p>${producto.precio}</p>
                    </div>
                    <div class="carritoProductoSubtotal">
                        <small>Subtotal</small>
                        <p>${producto.precio * producto.cantidad}</p>
                    </div>
                    <button class="carritoProductoEliminar" data-id=${producto.id}>🗑️</button>
                </div>
                `;
                listaProductos.appendChild(listItem);
    
                total +=producto.precio;
            });
    
            totalElement.textContent = '$' + total;
        }
    actualizarBotonesEliminar()
    actualizarTotal()
}


function actualizarBotonesEliminar(){
    botonesEliminar = document.querySelectorAll(".carritoProductoEliminar");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    const idProducto = e.currentTarget.dataset.id;
    let carrito = obtenerCarrito();
    const indice = carrito.findIndex(producto => producto.id === idProducto);
    console.log(indice);
    if (indice === -1) {
        carrito.splice(indice, 1);
        establecerCarrito(carrito);
        cargarProductosCarrito();
    }
}
cargarProductosCarrito();


//funcion total
const total = document.getElementById("totalCarrito")
function actualizarTotal(){
    const totalCalculado = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `${totalCalculado}`;

}

